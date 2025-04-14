import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Gamepad2, RefreshCw, Trophy } from 'lucide-react';

// 游戏数据
const GAME_DATA = {
  matching: {
    cards: [
      { id: 1, chinese: '你好', pinyin: 'nǐ hǎo', type: 'chinese' },
      { id: 2, chinese: '你好', pinyin: 'nǐ hǎo', type: 'pinyin' },
      { id: 3, chinese: '谢谢', pinyin: 'xiè xiè', type: 'chinese' },
      { id: 4, chinese: '谢谢', pinyin: 'xiè xiè', type: 'pinyin' },
      { id: 5, chinese: '再见', pinyin: 'zài jiàn', type: 'chinese' },
      { id: 6, chinese: '再见', pinyin: 'zài jiàn', type: 'pinyin' },
      { id: 7, chinese: '早上好', pinyin: 'zǎo shang hǎo', type: 'chinese' },
      { id: 8, chinese: '早上好', pinyin: 'zǎo shang hǎo', type: 'pinyin' },
      { id: 9, chinese: '晚安', pinyin: 'wǎn ān', type: 'chinese' },
      { id: 10, chinese: '晚安', pinyin: 'wǎn ān', type: 'pinyin' },
      { id: 11, chinese: '对不起', pinyin: 'duì bu qǐ', type: 'chinese' },
      { id: 12, chinese: '对不起', pinyin: 'duì bu qǐ', type: 'pinyin' },
    ]
  },
  typing: {
    words: [
      { chinese: '你好', pinyin: 'nǐ hǎo', meaning: 'Hello' },
      { chinese: '谢谢', pinyin: 'xiè xiè', meaning: 'Thank you' },
      { chinese: '再见', pinyin: 'zài jiàn', meaning: 'Goodbye' },
      { chinese: '早上好', pinyin: 'zǎo shang hǎo', meaning: 'Good morning' },
      { chinese: '晚安', pinyin: 'wǎn ān', meaning: 'Good night' },
      { chinese: '对不起', pinyin: 'duì bu qǐ', meaning: 'Sorry' },
    ]
  },
  memory: {
    cards: [
      { id: 1, content: '你好', type: 'chinese' },
      { id: 2, content: 'nǐ hǎo', type: 'pinyin' },
      { id: 3, content: '谢谢', type: 'chinese' },
      { id: 4, content: 'xiè xiè', type: 'pinyin' },
      { id: 5, content: '再见', type: 'chinese' },
      { id: 6, content: 'zài jiàn', type: 'pinyin' },
      { id: 7, content: '早上好', type: 'chinese' },
      { id: 8, content: 'zǎo shang hǎo', type: 'pinyin' },
    ]
  }
};

const GamePage = () => {
  const [activeGame, setActiveGame] = useState('matching');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<any>({});
  const { toast } = useToast();

  // 修改匹配游戏状态
  const [cards, setCards] = useState<Array<{
    id: number,
    chinese: string,
    pinyin: string,
    type: string,
    isFlipped: boolean,
    isMatched: boolean
  }>>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // 打字游戏状态
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  // 记忆游戏状态
  const [memoryCards, setMemoryCards] = useState<Array<{id: number, content: string, type: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    initializeGame();
  }, [activeGame]);

  const initializeGame = () => {
    switch (activeGame) {
      case 'matching':
        initializeMatchingGame();
        break;
      case 'typing':
        initializeTypingGame();
        break;
      case 'memory':
        initializeMemoryGame();
        break;
    }
  };

  const initializeMatchingGame = () => {
    // 初始化卡片，不需要打乱顺序，只需要设置初始状态
    const initialCards = GAME_DATA.matching.cards.map(card => ({
      ...card,
      isFlipped: false,
      isMatched: false
    }));
    setCards(initialCards);
    setSelectedCard(null);
    setScore(0);
  };

  const initializeTypingGame = () => {
    // 随机打乱单词顺序
    const shuffledWords = [...GAME_DATA.typing.words].sort(() => Math.random() - 0.5);
    setCurrentWord(shuffledWords[0].chinese);
    setUserInput('');
    setTimeLeft(60);
    setScore(0);
  };

  const initializeMemoryGame = () => {
    const cards = [...GAME_DATA.memory.cards, ...GAME_DATA.memory.cards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        flipped: false,
        matched: false
      }));
    setMemoryCards(cards);
    setFlippedCards([]);
    setScore(0);
  };

  const handleCardClick = (index: number) => {
    // 如果卡片已经匹配，则不允许点击
    if (cards[index].isMatched) {
      return;
    }

    // 如果点击的是已选中的卡片，取消选择
    if (selectedCard === index) {
      setSelectedCard(null);
      const newCards = [...cards];
      newCards[index].isFlipped = false;
      setCards(newCards);
      return;
    }

    const newCards = [...cards];
    
    // 如果已经有选中的卡片
    if (selectedCard !== null) {
      const firstCard = cards[selectedCard];
      const secondCard = cards[index];

      // 检查是否匹配（一个是汉字一个是拼音，且属于同一个词）
      const isMatch = firstCard.chinese === secondCard.chinese && firstCard.type !== secondCard.type;

      if (isMatch) {
        // 匹配成功
        newCards[selectedCard].isMatched = true;
        newCards[index].isMatched = true;
        setScore(score + 10);
        toast({
          title: "匹配成功！",
          description: "继续加油！",
        });
      } else {
        // 匹配失败
        toast({
          title: "匹配失败",
          description: "请重试",
          variant: "destructive",
        });
      }
      
      // 重置选择状态
      setSelectedCard(null);
      newCards[selectedCard].isFlipped = false;
    } else {
      // 选中第一张卡片
      newCards[index].isFlipped = true;
      setSelectedCard(index);
    }
    
    setCards(newCards);
  };

  // 检查游戏是否完成
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      toast({
        title: "恭喜！",
        description: "你已完成所有匹配！",
      });
    }
  }, [cards]);

  const handleTypingSubmit = () => {
    const currentWordData = GAME_DATA.typing.words.find(w => w.chinese === currentWord);
    if (currentWordData) {
      // 移除声调并转换为小写进行比较
      const normalizedInput = userInput.toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => {
        const map: { [key: string]: string } = {
          'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
          'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
          'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
          'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
          'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
          'ǖ': 'u', 'ǘ': 'u', 'ǚ': 'u', 'ǜ': 'u'
        };
        return map[char] || char;
      });
      
      const normalizedPinyin = currentWordData.pinyin.toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => {
        const map: { [key: string]: string } = {
          'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a',
          'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e',
          'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i',
          'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o',
          'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u',
          'ǖ': 'u', 'ǘ': 'u', 'ǚ': 'u', 'ǜ': 'u'
        };
        return map[char] || char;
      });

      if (normalizedInput === normalizedPinyin) {
        setScore(score + 10);
        toast({
          title: "正确！",
          description: "继续下一个词",
        });
        // 随机选择下一个词
        const shuffledWords = [...GAME_DATA.typing.words].sort(() => Math.random() - 0.5);
        setCurrentWord(shuffledWords[0].chinese);
        setUserInput('');
      } else {
        toast({
          title: "错误",
          description: "请重试",
          variant: "destructive",
        });
      }
    }
  };

  const handleMemoryCardClick = (index: number) => {
    if (flippedCards.length < 2 && !memoryCards[index].flipped && !memoryCards[index].matched) {
      const newCards = [...memoryCards];
      newCards[index].flipped = true;
      setMemoryCards(newCards);
      setFlippedCards([...flippedCards, index]);

      if (flippedCards.length === 1) {
        const firstCard = memoryCards[flippedCards[0]];
        const secondCard = memoryCards[index];
        
        if (firstCard.content === secondCard.content) {
          newCards[flippedCards[0]].matched = true;
          newCards[index].matched = true;
          setScore(score + 10);
          setFlippedCards([]);
          toast({
            title: "匹配成功！",
            description: "继续加油！",
          });
        } else {
          setTimeout(() => {
            newCards[flippedCards[0]].flipped = false;
            newCards[index].flipped = false;
            setMemoryCards(newCards);
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-4 px-2 sm:py-8 sm:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center">
            <Gamepad2 className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl sm:text-2xl font-bold">中文学习游戏</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-bold">得分: {score}</span>
            </div>
            <Button onClick={initializeGame} variant="outline" size="sm" className="text-sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              重新开始
            </Button>
          </div>
        </div>

        <Tabs defaultValue="matching" onValueChange={setActiveGame} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8">
            <TabsTrigger value="matching" className="text-sm sm:text-base">匹配游戏</TabsTrigger>
            <TabsTrigger value="typing" className="text-sm sm:text-base">打字游戏</TabsTrigger>
            <TabsTrigger value="memory" className="text-sm sm:text-base">记忆游戏</TabsTrigger>
          </TabsList>

          <TabsContent value="matching">
            <div className="space-y-6 sm:space-y-8">
              {/* 汉字区域 */}
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center">汉字区域</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  {cards
                    .filter(card => card.type === 'chinese')
                    .map((card, index) => (
                      <Card
                        key={card.id}
                        className={`p-3 sm:p-4 cursor-pointer transition-all touch-manipulation ${
                          card.isFlipped ? 'bg-primary/20 border-2 border-primary' : ''
                        } ${card.isMatched ? 'opacity-50' : ''}`}
                        onClick={() => handleCardClick(cards.findIndex(c => c.id === card.id))}
                      >
                        <div className="flex justify-center items-center h-12 sm:h-16">
                          <p className="text-center text-lg sm:text-xl font-medium">
                            {card.chinese}
                          </p>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>

              {/* 拼音区域 */}
              <div>
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center">拼音区域</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                  {cards
                    .filter(card => card.type === 'pinyin')
                    .map((card, index) => (
                      <Card
                        key={card.id}
                        className={`p-3 sm:p-4 cursor-pointer transition-all touch-manipulation ${
                          card.isFlipped ? 'bg-primary/20 border-2 border-primary' : ''
                        } ${card.isMatched ? 'opacity-50' : ''}`}
                        onClick={() => handleCardClick(cards.findIndex(c => c.id === card.id))}
                      >
                        <div className="flex justify-center items-center h-12 sm:h-16">
                          <p className="text-center text-lg sm:text-xl font-medium">
                            {card.pinyin}
                          </p>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>

              {/* 游戏说明 */}
              <div className="bg-secondary/30 p-3 sm:p-4 rounded-lg text-sm sm:text-base">
                <h4 className="font-bold mb-2">游戏说明</h4>
                <p className="text-sm">
                  1. 点击上方汉字区域中的一个汉字<br />
                  2. 再点击下方拼音区域中对应的拼音<br />
                  3. 匹配正确的卡片会变暗<br />
                  4. 匹配错误可以继续尝试<br />
                  5. 完成所有配对即可获胜
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typing">
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">{currentWord}</h2>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full max-w-md p-2 border rounded text-base"
                  placeholder="请输入拼音..."
                  onKeyPress={(e) => e.key === 'Enter' && handleTypingSubmit()}
                />
                <Button onClick={handleTypingSubmit} className="mt-4 w-full sm:w-auto">
                  提交
                </Button>
              </div>
              <Progress value={(timeLeft / 60) * 100} className="w-full" />
              <p className="text-center text-sm sm:text-base">剩余时间: {timeLeft}秒</p>
            </div>
          </TabsContent>

          <TabsContent value="memory">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {memoryCards.map((card, index) => (
                <Card
                  key={index}
                  className={`p-3 sm:p-4 cursor-pointer transition-all touch-manipulation ${
                    card.flipped ? 'bg-primary/20' : ''
                  } ${card.matched ? 'opacity-50' : ''}`}
                  onClick={() => handleMemoryCardClick(index)}
                >
                  <div className="flex justify-center items-center h-12 sm:h-16">
                    <p className="text-center text-lg sm:text-xl">
                      {card.flipped || card.matched ? card.content : '?'}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GamePage; 