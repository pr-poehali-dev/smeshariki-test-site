import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tests = [
    {
      id: 1,
      title: 'Какой ты Смешарик?',
      description: 'Узнай, какой персонаж из мультика похож на тебя!',
      image: 'https://cdn.poehali.dev/projects/9923a66a-b443-4d64-a22f-d6a4231f18e2/files/6c1fec22-e997-4014-9f79-640a289038e1.jpg',
      questions: 12,
      completed: 8547,
      difficulty: 'Легкий',
      category: '🎭 Личность'
    },
    {
      id: 2,
      title: 'Знаток Смешариков',
      description: 'Проверь свои знания о мультфильме!',
      image: 'https://cdn.poehali.dev/projects/9923a66a-b443-4d64-a22f-d6a4231f18e2/files/56f9523e-cde5-408c-9695-aef579270cc1.jpg',
      questions: 20,
      completed: 6234,
      difficulty: 'Средний',
      category: '🧠 Знания'
    },
    {
      id: 3,
      title: 'Мир Смешариков',
      description: 'Проверь, как хорошо ты знаешь вселенную Смешариков!',
      image: 'https://cdn.poehali.dev/projects/9923a66a-b443-4d64-a22f-d6a4231f18e2/files/4ce47e0c-4dbe-48c4-b82a-666e969bbdc1.jpg',
      questions: 15,
      completed: 4892,
      difficulty: 'Сложный',
      category: '🌍 Вселенная'
    }
  ];

  const characters = [
    { name: 'Крош', color: 'bg-game-blue', trait: 'Энергичный', emoji: '🐰' },
    { name: 'Нюша', color: 'bg-game-pink', trait: 'Обаятельная', emoji: '🐷' },
    { name: 'Бараш', color: 'bg-game-purple', trait: 'Романтик', emoji: '🐑' },
    { name: 'Ёжик', color: 'bg-purple-500', trait: 'Умный', emoji: '🦔' },
    { name: 'Лосяш', color: 'bg-orange-500', trait: 'Учёный', emoji: '🦌' },
    { name: 'Копатыч', color: 'bg-yellow-600', trait: 'Трудолюбивый', emoji: '🐻' },
    { name: 'Совунья', color: 'bg-purple-400', trait: 'Спортивная', emoji: '🦉' },
    { name: 'Кар-Карыч', color: 'bg-indigo-500', trait: 'Артист', emoji: '🦜' }
  ];

  const achievements = [
    { id: 1, title: 'Новичок', description: 'Пройди первый тест', icon: 'Star', unlocked: true },
    { id: 2, title: 'Знаток', description: 'Пройди 10 тестов', icon: 'Award', unlocked: true },
    { id: 3, title: 'Эксперт', description: 'Набери 1000 очков', icon: 'Trophy', unlocked: false },
    { id: 4, title: 'Легенда', description: 'Займи первое место в рейтинге', icon: 'Crown', unlocked: false }
  ];

  const leaderboard = [
    { rank: 1, name: 'Алексей К.', score: 2450, avatar: '🏆', tests: 45 },
    { rank: 2, name: 'Мария С.', score: 2180, avatar: '🥈', tests: 38 },
    { rank: 3, name: 'Дмитрий П.', score: 1950, avatar: '🥉', tests: 32 },
    { rank: 4, name: 'Ольга Н.', score: 1720, avatar: '🎯', tests: 28 },
    { rank: 5, name: 'Иван Т.', score: 1590, avatar: '⭐', tests: 25 }
  ];

  const userProfile = {
    name: 'Игрок',
    level: 12,
    score: 1850,
    testsCompleted: 28,
    character: 'Крош',
    avatar: 'https://cdn.poehali.dev/projects/9923a66a-b443-4d64-a22f-d6a4231f18e2/files/6c1fec22-e997-4014-9f79-640a289038e1.jpg'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-lavender via-white to-game-sky">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-primary mb-4">
              🎮 Тесты по Смешарикам
            </h1>
            <p className="text-xl text-muted-foreground">
              Проверь свои знания о любимых персонажах!
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="home" className="gap-2">
                <Icon name="Home" size={16} />
                Главная
              </TabsTrigger>
              <TabsTrigger value="tests" className="gap-2">
                <Icon name="BookOpen" size={16} />
                Тесты
              </TabsTrigger>
              <TabsTrigger value="characters" className="gap-2">
                <Icon name="Users" size={16} />
                Персонажи
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-2">
                <Icon name="Award" size={16} />
                Достижения
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="gap-2">
                <Icon name="Trophy" size={16} />
                Рейтинг
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <Icon name="User" size={16} />
                Профиль
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-8">
              <Card className="bg-gradient-to-r from-game-purple to-game-pink text-white border-none shadow-xl animate-scale-in">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl">Добро пожаловать в мир Смешариков! 🎉</CardTitle>
                  <CardDescription className="text-white/90 text-lg">
                    Пройди увлекательные тесты, собирай достижения и соревнуйся с друзьями!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div className="text-4xl font-bold">{userProfile.testsCompleted}</div>
                      <div className="text-sm opacity-90">Пройдено тестов</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div className="text-4xl font-bold">{userProfile.score}</div>
                      <div className="text-sm opacity-90">Очков заработано</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div className="text-4xl font-bold">{userProfile.level}</div>
                      <div className="text-sm opacity-90">Уровень</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Sparkles" className="text-accent" />
                  Популярные тесты
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tests.map((test, index) => (
                    <Card 
                      key={test.id} 
                      className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg h-48">
                          <img 
                            src={test.image} 
                            alt={test.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <Badge className="absolute top-4 right-4 bg-white/90 text-foreground">
                            {test.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                          {test.title}
                        </CardTitle>
                        <CardDescription className="mb-4">{test.description}</CardDescription>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Icon name="FileQuestion" size={16} />
                            {test.questions} вопросов
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Users" size={16} />
                            {test.completed.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="font-normal">
                            {test.difficulty}
                          </Badge>
                          <Button className="group-hover:bg-primary group-hover:text-primary-foreground">
                            Начать тест
                            <Icon name="ArrowRight" size={16} className="ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tests" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Все тесты</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Filter" size={16} className="mr-2" />
                    Фильтры
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="ArrowUpDown" size={16} className="mr-2" />
                    Сортировка
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tests.map((test, index) => (
                  <Card 
                    key={test.id} 
                    className="hover:shadow-lg transition-all cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="p-0">
                      <img 
                        src={test.image} 
                        alt={test.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{test.title}</CardTitle>
                        <Badge className="text-xs">{test.category}</Badge>
                      </div>
                      <CardDescription className="mb-3 text-sm">{test.description}</CardDescription>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{test.questions} вопросов</span>
                        <span>{test.completed.toLocaleString()} прошли</span>
                      </div>
                      <Button className="w-full" size="sm">
                        Пройти тест
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="characters" className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Персонажи Смешариков</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {characters.map((character, index) => (
                  <Card 
                    key={character.name}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-24 h-24 ${character.color} rounded-full mx-auto mb-4 flex items-center justify-center text-5xl group-hover:animate-pulse-glow transition-all`}>
                        {character.emoji}
                      </div>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                        {character.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {character.trait}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">Достижения</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card 
                    key={achievement.id}
                    className={`transition-all animate-fade-in ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-game-lavender to-white border-primary shadow-lg' 
                        : 'opacity-50 grayscale'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                        achievement.unlocked 
                          ? 'bg-primary text-primary-foreground animate-pulse-glow' 
                          : 'bg-muted'
                      }`}>
                        <Icon name={achievement.icon as any} size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-1">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Badge className="bg-green-500 text-white">
                          <Icon name="Check" size={14} className="mr-1" />
                          Получено
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">Таблица лидеров</h2>
                <Button variant="outline" size="sm">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  За эту неделю
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {leaderboard.map((player, index) => (
                      <div 
                        key={player.rank}
                        className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-muted/50 cursor-pointer animate-fade-in ${
                          player.rank <= 3 ? 'bg-gradient-to-r from-game-lavender/30 to-transparent' : ''
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="text-3xl font-bold w-12 text-center">
                          {player.rank <= 3 ? player.avatar : `#${player.rank}`}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="text-xl">{player.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-bold text-lg">{player.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {player.tests} тестов пройдено
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {player.score.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">очков</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-gradient-to-br from-game-purple to-game-pink text-white border-none shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-6 mb-6">
                    <Avatar className="w-24 h-24 border-4 border-white">
                      <AvatarImage src={userProfile.avatar} />
                      <AvatarFallback className="text-3xl">{userProfile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-white/20 text-white text-sm">
                          Уровень {userProfile.level}
                        </Badge>
                        <span className="text-white/90">Твой персонаж: {userProfile.character}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Прогресс до следующего уровня</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-3 bg-white/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Target" className="text-primary" />
                      Статистика
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Пройдено тестов</span>
                      <span className="font-bold">{userProfile.testsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Всего очков</span>
                      <span className="font-bold text-primary">{userProfile.score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Место в рейтинге</span>
                      <span className="font-bold text-accent">4-е</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Award" className="text-accent" />
                      Достижения
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">
                        {achievements.filter(a => a.unlocked).length}/{achievements.length}
                      </div>
                      <p className="text-sm text-muted-foreground">получено</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="TrendingUp" className="text-green-500" />
                      Активность
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-500 mb-2">7</div>
                      <p className="text-sm text-muted-foreground">дней подряд</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </header>
      </div>
    </div>
  );
};

export default Index;
