import React, { useState, useRef } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Repeat } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SpeakPage = () => {
  const [mode, setMode] = useState<'guided' | 'free'>('guided');
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState(75);
  const [practiceTime, setPracticeTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Example phrase data
  const examplePhrase = {
    chinese: '你好，你好吗？',
    pinyin: 'Nǐ hǎo, nǐ hǎo ma?',
    translation: 'Hello, how are you?'
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, start actual recording logic here
    
    // Start practice timer
    timerRef.current = setInterval(() => {
      setPracticeTime(prev => prev + 1);
    }, 1000);

    toast({
      title: "录音开始",
      description: "请说出示例句子",
    });
    
    // Simulate ending recording after 5 seconds
    setTimeout(() => {
      stopRecording();
    }, 5000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Simulate scoring
    const newScore = Math.floor(Math.random() * 30) + 65; // Random score between 65-95
    setScore(newScore);
    
    if (newScore < 70) {
      // Add to mistakes notebook
      toast({
        title: "已加入错题本",
        description: "这个句子已加入您的错题本",
        variant: "destructive",
      });
    } else {
      toast({
        title: "评分完成",
        description: `您的得分是 ${newScore}`,
      });
    }
  };

  const playExampleAudio = (speed: 'normal' | 'slow' = 'normal') => {
    toast({
      title: speed === 'normal' ? "播放示范" : "慢速播放示范",
      description: "正在播放示范音频...",
    });
    // In a real app, play actual audio here
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">口语练习</h1>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500">练习时长: <span className="font-bold">{formatTime(practiceTime)}</span></p>
          </div>
          
          <Tabs defaultValue="guided" onValueChange={(v) => setMode(v as 'guided' | 'free')}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="guided" className="w-1/2">引导模式</TabsTrigger>
              <TabsTrigger value="free" className="w-1/2">自由模式</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guided" className="space-y-6">
              <div className="bg-secondary/30 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-2">{examplePhrase.chinese}</h3>
                <p className="text-primary mb-4">{examplePhrase.pinyin}</p>
                <p className="text-gray-600 text-sm">{examplePhrase.translation}</p>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`rounded-full h-16 w-16 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary'}`}
                >
                  {isRecording ? (
                    <MicOff className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
              </div>
              
              <div className="flex gap-3 justify-center my-4">
                <Button variant="outline" onClick={() => playExampleAudio('normal')}>
                  <Play className="h-4 w-4 mr-1" /> 播放示范
                </Button>
                <Button variant="outline" onClick={() => playExampleAudio('slow')}>
                  <Repeat className="h-4 w-4 mr-1" /> 慢速示范
                </Button>
              </div>
              
              {score > 0 && (
                <div className="mt-8 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>发音评分</span>
                    <span className="font-bold">{score}/100</span>
                  </div>
                  <Progress value={score} className="h-2" />
                  
                  <div className="bg-secondary/30 p-4 rounded-lg mt-4">
                    <h4 className="font-medium mb-2">发音反馈</h4>
                    <p className="text-sm">
                      声调: <span className={score > 80 ? "text-green-500" : "text-red-500 font-bold"}>nǐ</span> hǎo, nǐ hǎo ma?
                    </p>
                    <p className="text-sm mt-2">
                      需要改进: 第一个"你"的三声发音不够准确，建议多练习三声的发音。
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="free">
              <div className="text-center py-12">
                {/* Unity模型将在这里集成 */}
                <div className="w-full h-[600px] bg-secondary/20 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Unity模型加载中...</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Progress Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm mb-1">
              <span>历史平均分</span>
              <span>{averageScore}/100</span>
            </div>
            <Progress value={averageScore} className="h-2 mb-4" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-secondary/30 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-gray-600">今日练习句数</p>
              </div>
              <div className="bg-secondary/30 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">75%</p>
                <p className="text-xs text-gray-600">平均正确率</p>
              </div>
              <div className="bg-secondary/30 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-gray-600">连续学习天数</p>
              </div>
            </div>
            
            <div className="bg-secondary/50 w-full mt-6 p-3 rounded-lg">
              <p className="text-sm font-medium text-center">
                {score > 90 ? "口语达人 🏆" : score > 80 ? "进步显著 🌟" : "继续加油 💪"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpeakPage;
