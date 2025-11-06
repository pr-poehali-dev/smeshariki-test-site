import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TestResultProps {
  character: string;
  score: number;
  userStats?: {
    total_score: number;
    tests_completed: number;
    level: number;
  };
  onBackToTests: () => void;
  onTakeAnother: () => void;
}

const characterInfo: { [key: string]: { emoji: string; color: string; description: string; traits: string[] } } = {
  'Крош': {
    emoji: '🐰',
    color: 'bg-game-blue',
    description: 'Ты энергичный и любознательный! Обожаешь приключения и всегда готов к новым открытиям.',
    traits: ['Активный', 'Любознательный', 'Оптимист', 'Смелый']
  },
  'Ёжик': {
    emoji: '🦔',
    color: 'bg-purple-500',
    description: 'Ты вдумчивый и рассудительный! Любишь размышлять и всегда находишь разумное решение.',
    traits: ['Умный', 'Спокойный', 'Рассудительный', 'Надёжный']
  },
  'Нюша': {
    emoji: '🐷',
    color: 'bg-game-pink',
    description: 'Ты обаятельная и творческая личность! Ценишь красоту и умеешь создавать уют вокруг себя.',
    traits: ['Творческая', 'Обаятельная', 'Добрая', 'Романтичная']
  },
  'Лосяш': {
    emoji: '🦌',
    color: 'bg-orange-500',
    description: 'Ты настоящий учёный! Обожаешь узнавать новое и делиться знаниями с другими.',
    traits: ['Эрудированный', 'Мудрый', 'Любопытный', 'Научный']
  },
  'Совунья': {
    emoji: '🦉',
    color: 'bg-purple-400',
    description: 'Ты активная и спортивная! Любишь здоровый образ жизни и помогаешь другим.',
    traits: ['Спортивная', 'Заботливая', 'Активная', 'Здоровая']
  },
  'Копатыч': {
    emoji: '🐻',
    color: 'bg-yellow-600',
    description: 'Ты трудолюбивый и надёжный! Любишь работать руками и создавать что-то полезное.',
    traits: ['Трудолюбивый', 'Надёжный', 'Хозяйственный', 'Добрый']
  },
  'Бараш': {
    emoji: '🐑',
    color: 'bg-game-purple',
    description: 'Ты творческая натура с душой поэта! Любишь искусство и красоту во всех её проявлениях.',
    traits: ['Творческий', 'Романтичный', 'Чувствительный', 'Поэтичный']
  },
  'Кар-Карыч': {
    emoji: '🦜',
    color: 'bg-indigo-500',
    description: 'Ты артистичная личность! Любишь выступать и делиться историями из своей жизни.',
    traits: ['Артистичный', 'Общительный', 'Весёлый', 'Опытный']
  }
};

const TestResult = ({ character, score, userStats, onBackToTests, onTakeAnother }: TestResultProps) => {
  const info = characterInfo[character] || characterInfo['Крош'];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className="bg-gradient-to-br from-game-lavender via-white to-game-sky border-none shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className={`w-32 h-32 ${info.color} rounded-full flex items-center justify-center text-7xl animate-scale-in shadow-xl`}>
              {info.emoji}
            </div>
          </div>
          <CardTitle className="text-4xl mb-2">Твой персонаж: {character}!</CardTitle>
          <CardDescription className="text-lg">
            {info.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {info.traits.map((trait) => (
              <Badge key={trait} variant="secondary" className="text-sm px-4 py-1">
                {trait}
              </Badge>
            ))}
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">{score}</div>
                  <div className="text-sm text-muted-foreground">Очков за тест</div>
                </div>
                {userStats && (
                  <>
                    <div>
                      <div className="text-3xl font-bold text-accent mb-1">{userStats.total_score}</div>
                      <div className="text-sm text-muted-foreground">Всего очков</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-secondary mb-1">{userStats.level}</div>
                      <div className="text-sm text-muted-foreground">Уровень</div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
            <Icon name="Sparkles" className="text-primary mt-1" size={24} />
            <div>
              <div className="font-semibold mb-1">Отличная работа!</div>
              <div className="text-sm text-muted-foreground">
                {userStats 
                  ? `Ты прошёл уже ${userStats.tests_completed} тестов. Продолжай в том же духе!`
                  : 'Попробуй пройти другие тесты, чтобы узнать больше о себе!'
                }
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onTakeAnother}
              className="flex-1"
              size="lg"
            >
              <Icon name="RefreshCw" size={20} className="mr-2" />
              Пройти другой тест
            </Button>
            <Button 
              onClick={onBackToTests}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              К списку тестов
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResult;
