import React, { useState, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Save, 
  File, 
  Mic, 
  FileText, 
  RefreshCcw, 
  SpellCheck, 
  Check, 
  Clock,
  PenTool
} from 'lucide-react';
import CharacterPractice from '@/components/writing/CharacterPractice';

// Sample writing topics
const WRITING_TOPICS = [
  {
    title: '我的家庭',
    prompt: '描述你的家庭成员，他们的性格特点和你们之间的关系。写出至少三个家庭成员，并分享一个你们共同经历的难忘时刻。',
    wordCount: '100-150字',
    level: '初级'
  },
  {
    title: '我的爱好',
    prompt: '介绍你最喜欢的爱好，为什么你喜欢它，以及它如何影响了你的生活。尝试使用一些描述性的词语来表达你的感受。',
    wordCount: '150-200字',
    level: '初级'
  },
  {
    title: '一次旅行经历',
    prompt: '描述一次令你印象深刻的旅行经历。包括地点、时间、同行人员、活动内容以及这次旅行给你带来的感受和思考。',
    wordCount: '200-250字',
    level: '中级'
  },
  {
    title: '中国文化与我的联系',
    prompt: '讨论中国文化的一个方面（如饮食、节日、艺术等）以及它如何影响了你的生活或思维方式。尝试使用具体的例子来支持你的观点。',
    wordCount: '250-300字',
    level: '高级'
  }
];

// Sample writing templates
const TEMPLATES = [
  { 
    id: 1, 
    name: '我的家庭 - 模板一', 
    description: '以家庭成员介绍为主，突出每个人的特点和关系',
    content: `我的家庭

我的家庭有[人数]口人，包括[列出家庭成员]。

[家庭成员1]是一个[性格特点]的人，他/她[描述特点]。在家庭中，他/她负责[职责]。

[家庭成员2]则是一个[性格特点]的人，他/她[描述特点]。他/她总是[行为特点]。

[家庭成员3]是[关系]，他/她[性格特点]。我们之间[关系描述]。

[难忘时刻]是我们全家最难忘的经历之一。那天[描述事件]，我们[做了什么]，[感受如何]。这次经历让我[感悟/收获]。

我的家庭虽然[特点]，但充满了[情感]。我爱我的家庭，因为[原因]。`
  },
  { 
    id: 2, 
    name: '我的家庭 - 模板二', 
    description: '以家庭活动为主线，穿插家庭成员特点',
    content: `我的家庭

在我的家庭中，我们经常[家庭活动]。这些活动让我们[感受/收获]。

我的[家庭成员1]是一个[性格特点]的人。他/她喜欢[爱好]，并且[特点描述]。每当我们[活动]时，他/她总是[行为]。

我的[家庭成员2]则不同，他/她[性格特点]。他/她擅长[技能]，在[场合]时特别有用。

[家庭成员3]是我们家的[角色]，他/她[特点描述]。虽然我们有时会[矛盾]，但[关系描述]。

记得有一次，我们全家[活动描述]。那天[事件描述]，[家庭成员1][做了什么]，[家庭成员2][做了什么]，而[家庭成员3][做了什么]。我们[感受]，[收获]。

家庭是[比喻]，[情感描述]。无论[情况]，我的家庭总是[特点]，这就是为什么我[感受]。`
  },
  { 
    id: 3, 
    name: '我的爱好 - 模板一', 
    description: '以爱好介绍为主，突出个人感受和影响',
    content: `我的爱好

在众多的爱好中，我最喜欢[爱好名称]。这个爱好已经陪伴我[时间长度]了。

[爱好名称]是一种[描述]的活动。每当我[进行爱好的方式]时，我总能感受到[感受]。这个爱好让我[收获/影响]。

我开始喜欢[爱好名称]是因为[原因]。记得[初次接触的经历]，那时[描述]，我[感受]。从那时起，我就[行为/决定]。

通过[爱好名称]，我学会了[技能/知识]。例如，我[具体例子]。这不仅[好处1]，还[好处2]。

[爱好名称]也影响了我的[生活方面]。它让我[改变/成长]，并且[影响]。每当我[情况]时，[爱好名称]总能[作用]。

总的来说，[爱好名称]不仅是一种娱乐，更是[意义]。它让我[收获]，也让我[感悟]。我相信我会继续[行为]，因为[原因]。`
  },
  { 
    id: 4, 
    name: '我的爱好 - 模板二', 
    description: '以爱好发展历程为主线，穿插个人成长',
    content: `我的爱好

[爱好名称]是我生活中不可或缺的一部分。这个爱好源于[起源]，经过[时间/过程]，已经成为我[地位/角色]。

最初接触[爱好名称]时，我[初始感受/经历]。那时的我[特点/水平]，经常[困难/挑战]。但我并没有放弃，而是[应对方式]。

随着时间推移，我的[爱好名称]水平逐渐[变化]。我参加了[活动/比赛]，结识了[人物]，学习了[技能/知识]。这些经历让我[成长/变化]。

[爱好名称]教会了我[道理/技能]。例如，[具体例子]。这不仅适用于[爱好名称]，也适用于[生活方面]。

现在，每当我[进行爱好的方式]时，我都能感受到[感受]。这个爱好已经成为我[角色/身份]的一部分，它让我[好处/影响]。

展望未来，我希望[愿望/计划]。无论[情况]，我都会继续[行为]，因为[爱好名称]已经成为了[意义/价值]。`
  },
  { 
    id: 5, 
    name: '一次旅行经历 - 模板一', 
    description: '以时间顺序描述旅行过程，突出感受和思考',
    content: `一次难忘的旅行经历

[时间]，我和[同行人员]一起去了[地点]旅行。这次旅行给我留下了深刻的印象。

出发前，我们[准备工作]。我[期待/感受]，因为[原因]。经过[交通方式]的[时间长度]旅程，我们终于到达了[地点]。

第一天，我们[活动1]。那里的[景色/特点]让我[感受]。特别是[具体描述]，[细节]。接着，我们[活动2]，[描述]。

第二天，我们[活动3]。这次经历让我[感受/思考]，因为[原因]。我们还[活动4]，[描述]。那里的[特点]与[比较对象]完全不同。

最后一天，我们[活动5]。在[地点/场合]，我[感受/思考]。这次旅行不仅让我[收获1]，还让我[收获2]。

回顾这次旅行，我[总结/感悟]。旅行不仅是[意义1]，更是[意义2]。它让我[改变/成长]，也让我[思考/计划]。我相信这次经历将永远留在我的记忆中。`
  },
  { 
    id: 6, 
    name: '一次旅行经历 - 模板二', 
    description: '以主题式描述旅行，突出不同方面的体验',
    content: `一次难忘的旅行经历

[时间]，我有幸与[同行人员]一起前往[地点]旅行。这次旅行不仅是一次[性质]的旅程，更是一次[意义]的体验。

关于[地点]的自然风光，[描述]。那里的[景色1]令人[感受]，[景色2]则让人[感受]。特别是在[时间/场合]，[具体描述]，美得[比喻]。

在文化体验方面，我们[活动1]。当地的[文化特点]与我的[比较]有很大不同。例如，[具体例子]。这让我[感受/思考]。

美食是这次旅行的另一大亮点。我们品尝了[食物1]，它的[特点]让我[感受]。还有[食物2]，虽然[特点]，但[评价]。这些美食不仅[特点]，还[意义]。

与[同行人员]的互动也让我印象深刻。我们[活动2]，[活动3]，[活动4]。在[场合]，我们[经历]，这让我[感受]。

这次旅行也带来了一些挑战。例如，[困难1]，我们[解决方式]。还有[困难2]，虽然[情况]，但最终[结果]。

总的来说，这次[地点]之旅让我[收获1]，[收获2]，也让我[感悟]。旅行不仅是[意义1]，更是[意义2]。它拓宽了我的[方面]，也让我[改变/成长]。我相信这次经历将成为我人生中[地位/价值]的一部分。`
  },
  { 
    id: 7, 
    name: '中国文化与我的联系 - 模板一', 
    description: '以个人经历为主线，探讨中国文化的影响',
    content: `中国文化与我的联系

中国文化博大精深，其中[文化方面]与我的生活有着密切的联系。这种联系不仅体现在[表现1]，还体现在[表现2]。

我第一次接触中国[文化方面]是在[时间/场合]。那时[经历描述]，我[感受/反应]。这种[特点]与中国传统文化中的[理念]不谋而合。

随着时间推移，我逐渐[变化/成长]。我开始[行为/学习]，发现[发现/感悟]。例如，[具体例子]。这让我[感受/思考]。

中国[文化方面]的核心是[理念/价值观]。这种理念强调[内容]，这与我的[个人特点/价值观][关系]。在[场合/情况]时，我常常[行为/思考]，这直接源于[文化影响]。

[文化方面]也影响了我的[生活方面]。我[行为/习惯]，这让我[好处/影响]. 特别是在[情况]时，这种[特点/习惯]显得尤为重要。

通过[文化方面]，我不仅[收获1]，还[收获2]. 它让我[改变/成长]，也让我[感悟]. 我相信，随着时间推移，我会[行为/计划]，因为[原因].

总的来说，中国[文化方面]已经成为我生活中[地位/角色]的一部分。它让我[感受/思考]，也让我[行为/决定]. 这种文化联系不仅[意义1]，更[意义2].`
  },
  { 
    id: 8, 
    name: '中国文化与我的联系 - 模板二', 
    description: '以对比分析为主线，探讨中西文化差异与融合',
    content: `中国文化与我的联系

作为一个[身份/背景]的人，中国文化，特别是[文化方面]，与我的生活产生了深刻的联系。这种联系不仅体现在[表现]，还体现在[表现]。

在[文化方面]上，中国文化与[比较文化]有着明显的区别。中国文化强调[特点1]，[特点2]，而[比较文化]则更注重[特点3]，[特点4]。这种差异在我[经历/场合]时表现得尤为明显。

例如，在[具体例子1]方面，中国文化[描述]，这让我[感受/思考]. 而在[具体例子2]方面，中国传统的[理念]则让我[感受/思考]. 这些经历让我[感悟/收获].

中国文化中的[理念/价值观]对我产生了深远的影响。它让我[改变/成长]，也让我[行为/决定]. 特别是在[情况]时，这种影响显得尤为重要。

然而，文化联系并非单向的。我也尝试将[个人文化]的[特点]融入对中国[文化方面]的理解中。这种融合让我[收获/感悟]，也让我[行为/思考].

通过这种文化交流，我不仅[收获1]，还[收获2]. 它让我[改变/成长]，也让我[感悟]. 我相信，真正的文化理解应该是[理念/观点].

总的来说，中国文化，特别是[文化方面]，已经成为我生活中[地位/角色]的一部分。它让我[感受/思考]，也让我[行为/决定]. 这种文化联系不仅[意义1]，更[意义2]. 在未来的日子里，我希望[愿望/计划].`
  }
];

const WritingPage = () => {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<'write' | 'templates' | 'practice'>('write');
  const [topic, setTopic] = useState(WRITING_TOPICS[0]);
  const [score, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState(82);
  const [showFeedback, setShowFeedback] = useState(false);
  const [writingTime, setWritingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Start timer when component mounts
  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setWritingTime(prev => prev + 1);
      
      // Auto-save every minute
      if ((writingTime + 1) % 60 === 0 && content.length > 0) {
        handleAutoSave();
      }
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [writingTime, content]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleAutoSave = () => {
    // In a real app, implement actual saving logic here
    setAutoSaved(true);
    toast({
      title: "草稿已保存",
      description: `保存时间: ${new Date().toLocaleTimeString()}`,
    });
    
    // Reset auto-save notification after 3 seconds
    setTimeout(() => setAutoSaved(false), 3000);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "语音输入已开启",
        description: "请对着麦克风说话...",
      });
      
      // Simulate voice input after 3 seconds
      setTimeout(() => {
        setContent(prev => prev + " 这是通过语音输入的内容，在实际应用中会转换成文字。");
        setIsRecording(false);
        toast({
          title: "语音输入已完成",
          description: "内容已添加到编辑器",
        });
      }, 3000);
    } else {
      toast({
        title: "语音输入已停止",
      });
    }
  };

  const handleSubmit = () => {
    if (content.length < 50) {
      toast({
        title: "内容太短",
        description: "请至少写50个字再提交",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, send content to backend for evaluation
    const newScore = Math.floor(Math.random() * 30) + 65; // Random score between 65-95
    setScore(newScore);
    setShowFeedback(true);
    
    toast({
      title: "评分完成",
      description: `您的得分是 ${newScore}/100`,
    });
  };

  const handleNewTopic = () => {
    // Select a random topic that's different from the current one
    let newTopic;
    do {
      newTopic = WRITING_TOPICS[Math.floor(Math.random() * WRITING_TOPICS.length)];
    } while (newTopic.title === topic.title && WRITING_TOPICS.length > 1);
    
    setTopic(newTopic);
    setContent('');
    setShowFeedback(false);
    
    toast({
      title: "新主题已生成",
      description: `新主题: ${newTopic.title}`,
    });
  };

  const handleSpellCheck = () => {
    // Simulate spell checking
    toast({
      title: "拼音纠错完成",
      description: "已修正2处拼音错误",
    });
    
    // In a real app, this would highlight and correct pinyin errors
    setContent(content.replace(/wo/g, "wǒ").replace(/ni/g, "nǐ"));
  };

  const handleSelectTemplate = (templateId: number) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    
    // In a real app, this would load actual template content
    setContent(template?.content || '');
    
    setMode('write');
    
    toast({
      title: "模板已应用",
      description: `已选择: ${template?.name}`,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">写作练习</h1>
        
        <Tabs defaultValue="write" className="w-full" onValueChange={(value) => setMode(value as 'write' | 'templates' | 'practice')}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="write">
              <FileText className="h-4 w-4 mr-2" />
              写作练习
            </TabsTrigger>
            <TabsTrigger value="templates">
              <File className="h-4 w-4 mr-2" />
              写作模板
            </TabsTrigger>
            <TabsTrigger value="practice">
              <PenTool className="h-4 w-4 mr-2" />
              写字练习
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="space-y-6">
            {/* 原有的写作练习内容 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>写作主题</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">{topic.title}</h3>
                      <p className="text-gray-600">{topic.prompt}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>字数要求: {topic.wordCount}</span>
                        <span>难度: {topic.level}</span>
                      </div>
                      <Button variant="outline" onClick={handleNewTopic}>
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        换一个主题
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>写作区域</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={handleVoiceInput}>
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleSpellCheck}>
                        <SpellCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleAutoSave}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="在这里开始写作..."
                      className="min-h-[300px] resize-none"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-500">
                        {content.length} 字
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(writingTime)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>写作评分</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>当前得分</span>
                          <span>{score}分</span>
                        </div>
                        <Progress value={score} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>平均得分</span>
                          <span>{averageScore}分</span>
                        </div>
                        <Progress value={averageScore} />
                      </div>
                      <Button className="w-full" onClick={handleSubmit}>
                        <Check className="h-4 w-4 mr-2" />
                        提交评分
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {showFeedback && (
                  <Card>
                    <CardHeader>
                      <CardTitle>评分反馈</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>内容完整性</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} />
                        <div className="flex justify-between">
                          <span>语法正确性</span>
                          <span>90%</span>
                        </div>
                        <Progress value={90} />
                        <div className="flex justify-between">
                          <span>词汇丰富度</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} />
                        <div className="flex justify-between">
                          <span>表达流畅性</span>
                          <span>80%</span>
                        </div>
                        <Progress value={80} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            {/* 原有的写作模板内容 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEMPLATES.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{template.description}</p>
                    <Button 
                      className="w-full mt-4" 
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      使用模板
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="practice" className="space-y-6">
            {/* 新增的写字练习内容 */}
            <CharacterPractice onScoreUpdate={setPracticeScore} />
            
            {practiceScore > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>练习统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>当前练习得分</span>
                        <span>{practiceScore}分</span>
                      </div>
                      <Progress value={practiceScore} />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>提示：保持练习，您的书写水平会不断提高！</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default WritingPage;
