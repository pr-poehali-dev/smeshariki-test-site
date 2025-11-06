'''
Business: API для работы с тестами - получение тестов, вопросов и сохранение результатов
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict
'''

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('path', '')
    
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            if path == 'tests':
                cur.execute('''
                    SELECT id, title, description, image_url, category, 
                           difficulty, questions_count, completed_count
                    FROM tests
                    ORDER BY completed_count DESC
                ''')
                tests = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps([dict(t) for t in tests], ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif path == 'test':
                test_id = event.get('queryStringParameters', {}).get('id')
                
                cur.execute('''
                    SELECT id, title, description, image_url, category, 
                           difficulty, questions_count, completed_count
                    FROM tests
                    WHERE id = %s
                ''', (test_id,))
                test = cur.fetchone()
                
                if not test:
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Test not found'}, ensure_ascii=False),
                        'isBase64Encoded': False
                    }
                
                cur.execute('''
                    SELECT q.id, q.question_text, q.question_order,
                           json_agg(
                               json_build_object(
                                   'id', a.id,
                                   'text', a.answer_text,
                                   'points', a.points,
                                   'character', a.character_result
                               ) ORDER BY a.id
                           ) as answers
                    FROM questions q
                    LEFT JOIN answers a ON a.question_id = q.id
                    WHERE q.test_id = %s
                    GROUP BY q.id, q.question_text, q.question_order
                    ORDER BY q.question_order
                ''', (test_id,))
                questions = cur.fetchall()
                
                test_dict = dict(test)
                test_dict['questions'] = [dict(q) for q in questions]
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(test_dict, ensure_ascii=False),
                    'isBase64Encoded': False
                }
            
            elif path == 'leaderboard':
                cur.execute('''
                    SELECT username, total_score, tests_completed, level
                    FROM users
                    ORDER BY total_score DESC
                    LIMIT 10
                ''')
                users = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps([dict(u) for u in users], ensure_ascii=False),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            if path == 'submit':
                body_data = json.loads(event.get('body', '{}'))
                username = body_data.get('username', 'Гость')
                test_id = body_data.get('test_id')
                score = body_data.get('score', 0)
                result_character = body_data.get('result_character')
                result_text = body_data.get('result_text', '')
                
                cur.execute('''
                    SELECT id FROM users WHERE username = %s
                ''', (username,))
                user = cur.fetchone()
                
                if user:
                    user_id = user['id']
                    cur.execute('''
                        UPDATE users 
                        SET total_score = total_score + %s,
                            tests_completed = tests_completed + 1,
                            level = FLOOR((total_score + %s) / 100) + 1
                        WHERE id = %s
                    ''', (score, score, user_id))
                else:
                    cur.execute('''
                        INSERT INTO users (username, total_score, tests_completed, level)
                        VALUES (%s, %s, 1, %s)
                        RETURNING id
                    ''', (username, score, max(1, score // 100)))
                    user_id = cur.fetchone()['id']
                
                cur.execute('''
                    INSERT INTO test_results (user_id, test_id, score, result_text, result_character)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                ''', (user_id, test_id, score, result_text, result_character))
                result_id = cur.fetchone()['id']
                
                cur.execute('''
                    UPDATE tests
                    SET completed_count = completed_count + 1
                    WHERE id = %s
                ''', (test_id,))
                
                conn.commit()
                
                cur.execute('''
                    SELECT total_score, tests_completed, level
                    FROM users
                    WHERE id = %s
                ''', (user_id,))
                user_stats = cur.fetchone()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'result_id': result_id,
                        'user_stats': dict(user_stats)
                    }, ensure_ascii=False),
                    'isBase64Encoded': False
                }
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid request'}, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}, ensure_ascii=False),
            'isBase64Encoded': False
        }
