import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// 阅读理解文章和题目
const readingComprehension = [
  {
    id: 1,
    level: 'beginner',
    title: '小明的周末',
    content: `小明是一个小学生，他非常喜欢周末。每到周末，他都会和爸爸妈妈一起去公园玩。

公园里有很多小朋友，他们一起踢足球、放风筝、玩捉迷藏。小明的爸爸会教他骑自行车，妈妈会带他去湖边喂鸭子。

有时候，他们还会去动物园看动物。小明最喜欢看大象和长颈鹿。他也会给动物拍照，回家后把照片贴在墙上。

周末的晚上，全家人会一起看电影或者玩游戏。小明觉得周末是最快乐的日子。`,
    questions: [
      {
        id: 1,
        question: '小明最喜欢什么动物？',
        options: ['大象和长颈鹿', '狮子和老虎', '猴子和熊猫', '兔子和猫'],
        correctAnswer: 0
      },
      {
        id: 2,
        question: '小明的爸爸教他做什么？',
        options: ['踢足球', '放风筝', '骑自行车', '玩游戏'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: '周末晚上，小明一家人会做什么？',
        options: ['去公园', '去动物园', '看电影或玩游戏', '去湖边喂鸭子'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: '小明会把照片贴在哪里？',
        options: ['书上', '桌子上', '墙上', '地上'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    level: 'advanced',
    title: '中国的传统节日',
    content: `中国有很多传统节日，每个节日都有其独特的习俗和文化内涵。

春节是中国最重要的传统节日，通常在农历正月初一。人们会贴春联、放鞭炮、吃团圆饭，还会给孩子们发红包。春节期间，人们会走亲访友，互相拜年，表达新年的祝福。

端午节在农历五月初五，是为了纪念古代爱国诗人屈原。这一天，人们会吃粽子、赛龙舟，还会在门上挂艾草和菖蒲，以驱邪避疫。

中秋节在农历八月十五，是仅次于春节的第二大传统节日。人们会赏月、吃月饼，家人团聚，共度良宵。月饼象征着团圆和美满。

这些传统节日不仅丰富了人们的生活，也传承了中华民族的文化精髓。`,
    questions: [
      {
        id: 1,
        question: '春节通常在什么时候？',
        options: ['农历正月初一', '农历五月初五', '农历八月十五', '农历十二月三十'],
        correctAnswer: 0
      },
      {
        id: 2,
        question: '端午节是为了纪念谁？',
        options: ['孔子', '屈原', '李白', '杜甫'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: '中秋节人们会吃什么？',
        options: ['粽子', '饺子', '月饼', '汤圆'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: '中秋节是第几大传统节日？',
        options: ['第一大', '第二大', '第三大', '第四大'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    level: 'beginner',
    title: '我的家',
    content: `我的家在一个安静的小区里。我们住在一栋五层楼的房子里，我家在第三层。

我的家有三个房间：客厅、厨房和卧室。客厅很大，有一台大电视和一张舒适的沙发。我们一家人经常在客厅里看电视、聊天。

厨房里有一台冰箱和一个大炉子。妈妈每天都会在厨房里为我们做饭。她做的菜很好吃，我最喜欢吃她做的红烧肉。

我的卧室里有一张床、一张书桌和一个书架。书架上有很多书，我最喜欢看故事书。每天晚上，我都会在书桌前做作业，然后躺在床上看书。

我的家虽然不大，但是很温馨。我爱我的家。`,
    questions: [
      {
        id: 1,
        question: '作者的家在几楼？',
        options: ['一楼', '二楼', '三楼', '四楼'],
        correctAnswer: 2
      },
      {
        id: 2,
        question: '作者最喜欢吃什么菜？',
        options: ['炒青菜', '红烧肉', '鱼香肉丝', '宫保鸡丁'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: '作者的书架上有什么？',
        options: ['玩具', '衣服', '书', '食物'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: '作者每天晚上会做什么？',
        options: ['看电视', '玩游戏', '做作业和看书', '睡觉'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 4,
    level: 'advanced',
    title: '中国的四大发明',
    content: `中国的四大发明是指造纸术、指南针、火药和印刷术，这些发明对世界文明的发展产生了深远的影响。

造纸术是由东汉时期的蔡伦改进的。在此之前，人们使用竹简、丝绸等材料记录文字，这些材料要么笨重，要么昂贵。造纸术的发明使得知识的传播变得更加便捷和经济。

指南针最早是由中国人发明的，最初用于风水占卜。后来，它被用于航海，帮助船只确定方向，促进了海上贸易和探险活动的发展。

火药最初是由炼丹术士在寻找长生不老药的过程中意外发现的。它最初用于制作烟花，后来被用于军事目的，改变了战争的方式。

印刷术最初是由毕昇发明的活字印刷术，后来在宋代得到了广泛应用。印刷术的发明大大提高了书籍的生产效率，促进了知识的传播和文化的普及。

这四大发明不仅体现了中国古代的科技水平，也为世界文明的发展做出了重要贡献。`,
    questions: [
      {
        id: 1,
        question: '造纸术是由谁改进的？',
        options: ['孔子', '蔡伦', '毕昇', '张衡'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: '指南针最初用于什么？',
        options: ['航海', '军事', '风水占卜', '计时'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: '火药最初是由谁发现的？',
        options: ['军事家', '科学家', '炼丹术士', '农民'],
        correctAnswer: 2
      },
      {
        id: 4,
        question: '活字印刷术是由谁发明的？',
        options: ['蔡伦', '毕昇', '张衡', '祖冲之'],
        correctAnswer: 1
      }
    ]
  }
];

const ReadingPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'advanced'>('beginner');
  const [currentPassageIndex, setCurrentPassageIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  // 获取当前难度的文章
  const filteredPassages = readingComprehension.filter(passage => passage.level === selectedLevel);
  const currentPassage = filteredPassages[currentPassageIndex];

  const handleLevelChange = (level: 'beginner' | 'advanced') => {
    setSelectedLevel(level);
    setCurrentPassageIndex(0);
    setAnswers([]);
    setHasSubmitted(false);
    setScore(0);
  };

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // 检查是否所有题目都已回答
    if (answers.length !== currentPassage.questions.length) {
      toast({
        title: "请回答所有问题",
        description: "您还有未回答的问题",
        variant: "destructive",
      });
      return;
    }

    // 计算得分
    let correctCount = 0;
    currentPassage.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const newScore = (correctCount / currentPassage.questions.length) * 10;
    setScore(newScore);
    setHasSubmitted(true);

    toast({
      title: "提交成功",
      description: `您的得分是 ${newScore.toFixed(1)}/10`,
    });
  };

  const handleReset = () => {
    setAnswers([]);
    setHasSubmitted(false);
    setScore(0);
  };

  const handleNextPassage = () => {
    if (currentPassageIndex < filteredPassages.length - 1) {
      setCurrentPassageIndex(currentPassageIndex + 1);
      setAnswers([]);
      setHasSubmitted(false);
      setScore(0);
    } else {
      toast({
        title: "已经是最后一篇文章",
        description: "您已完成所有文章",
      });
    }
  };

  const handlePrevPassage = () => {
    if (currentPassageIndex > 0) {
      setCurrentPassageIndex(currentPassageIndex - 1);
      setAnswers([]);
      setHasSubmitted(false);
      setScore(0);
    } else {
      toast({
        title: "已经是第一篇文章",
        description: "没有更多文章了",
      });
    }
  };

  // 将数字转换为字母选项 (0->A, 1->B, 2->C, 3->D)
  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // 65 是 'A' 的 ASCII 码
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">阅读理解</h1>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          {/* 难度选择 */}
          <div className="mb-6">
            <Tabs defaultValue={selectedLevel} onValueChange={(v) => handleLevelChange(v as 'beginner' | 'advanced')}>
              <TabsList className="w-full">
                <TabsTrigger value="beginner" className="w-1/2">初级</TabsTrigger>
                <TabsTrigger value="advanced" className="w-1/2">高级</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* 文章导航 */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPassage}
              disabled={currentPassageIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> 上一篇
            </Button>
            <div className="text-sm text-gray-500">
              文章 {currentPassageIndex + 1} / {filteredPassages.length}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPassage}
              disabled={currentPassageIndex === filteredPassages.length - 1}
            >
              下一篇 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          {/* 文章内容 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{currentPassage.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-lg leading-relaxed">
                {currentPassage.content}
              </div>
            </CardContent>
          </Card>
          
          {/* 选择题 */}
          <div className="space-y-6 mb-8">
            {currentPassage.questions.map((question, index) => (
              <Card key={question.id}>
                <CardContent className="pt-6">
                  <div className="font-bold mb-4">
                    {index + 1}. {question.question}
                  </div>
                  <RadioGroup
                    value={answers[index]?.toString() || ""}
                    onValueChange={(value) => handleAnswerChange(index, value)}
                    disabled={hasSubmitted}
                    className="space-y-3"
                  >
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex} 
                        className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                          answers[index] === optionIndex 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-200 hover:border-primary/50'
                        } ${
                          hasSubmitted 
                            ? optionIndex === question.correctAnswer 
                              ? 'border-green-500 bg-green-50' 
                              : answers[index] === optionIndex && answers[index] !== question.correctAnswer
                                ? 'border-red-500 bg-red-50'
                                : ''
                            : ''
                        }`}
                        onClick={() => !hasSubmitted && handleAnswerChange(index, optionIndex.toString())}
                      >
                        <div className="flex items-center justify-center w-8 h-8 mr-3 border rounded-md bg-white">
                          <span className="font-bold">{getOptionLabel(optionIndex)}</span>
                        </div>
                        <div className="flex-1">
                          {option}
                        </div>
                        {hasSubmitted && optionIndex === question.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                        )}
                        {hasSubmitted && answers[index] === optionIndex && answers[index] !== question.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-600 ml-2" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 提交按钮和得分 */}
          <div className="flex flex-col items-center space-y-4">
            {!hasSubmitted ? (
              <Button 
                size="lg" 
                onClick={handleSubmit}
                disabled={answers.length !== currentPassage.questions.length}
              >
                提交答案
              </Button>
            ) : (
              <>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold mb-2">得分: {score.toFixed(1)}/10</div>
                  <Progress value={score * 10} className="h-2 w-full max-w-md" />
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleReset} variant="outline">
                    重新作答
                  </Button>
                  <Button onClick={handleNextPassage} disabled={currentPassageIndex === filteredPassages.length - 1}>
                    下一篇
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReadingPage;
