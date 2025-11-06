import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Answer {
  id: number;
  text: string;
  points: number;
  character: string;
}

interface Question {
  id: number;
  question_text: string;
  question_order: number;
  answers: Answer[];
}

interface TestQuizProps {
  test: {
    id: number;
    title: string;
    description: string;
    image_url: string;
    category: string;
    difficulty: string;
    questions: Question[];
  };
  onComplete: (result: { character: string; score: number }) => void;
  onBack: () => void;
}

const TestQuiz = ({ test, onComplete, onBack }: TestQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const question = test.questions[currentQuestion];

  const handleAnswerSelect = (answer: Answer) => {
    setSelectedAnswer(answer.id);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const answer = question.answers.find(a => a.id === selectedAnswer);
    if (!answer) return;

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const characterCounts: { [key: string]: number } = {};
      let totalScore = 0;

      newAnswers.forEach(ans => {
        characterCounts[ans.character] = (characterCounts[ans.character] || 0) + 1;
        totalScore += ans.points;
      });

      const resultCharacter = Object.entries(characterCounts).reduce((a, b) => 
        b[1] > a[1] ? b : a
      )[0];

      onComplete({ character: resultCharacter, score: totalScore });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к тестам
        </Button>

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-2">
              <div>
                <CardTitle className="text-2xl mb-2">{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </div>
              <Badge>{test.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Вопрос {currentQuestion + 1} из {test.questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="text-xl">
            {question.question_text}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                selectedAnswer === answer.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedAnswer === answer.id
                    ? 'border-primary bg-primary'
                    : 'border-border'
                }`}>
                  {selectedAnswer === answer.id && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="flex-1">{answer.text}</span>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6 gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="min-w-[120px]"
        >
          <Icon name="ChevronLeft" size={20} className="mr-2" />
          Назад
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="min-w-[120px]"
        >
          {currentQuestion === test.questions.length - 1 ? 'Завершить' : 'Далее'}
          <Icon name="ChevronRight" size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TestQuiz;
