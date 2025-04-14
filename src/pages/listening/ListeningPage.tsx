
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ListeningPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  // Example audio data
  const audioExamples = {
    beginner: {
      title: "基础对话：问候",
      duration: "30秒",
      transcript: "A：你好，你好吗？\nB：我很好，谢谢。你呢？\nA：我也很好。",
      keywords: ["你好", "谢谢", "很好"]
    },
    intermediate: {
      title: "日常对话：购物",
      duration: "45秒",
      transcript: "A：这件衣服多少钱？\nB：这件衣服两百元。\nA：太贵了，能便宜一点吗？\nB：一百八十元，不能再便宜了。",
      keywords: ["衣服", "多少钱", "便宜"]
    },
    advanced: {
      title: "情境对话：餐厅点餐",
      duration: "60秒",
      transcript: "服务员：欢迎光临，请问几位？\n顾客：两位。\n服务员：这边请，请问需要点什么？\n顾客：我要一份宫保鸡丁和一碗米饭。\n服务员：好的，请稍等。",
      keywords: ["餐厅", "点餐", "宫保鸡丁"]
    }
  };

  const currentAudio = audioExamples[level];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate audio progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          return prev + 1;
        });
      }, 300); // Faster for demo purposes
    }
  };

  const resetAudio = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSubmit = () => {
    // Simple scoring logic for demo
    const accuracyScore = Math.floor(Math.random() * 30) + 60; // 60-90 range
    setScore(accuracyScore);
    setHasSubmitted(true);
    
    toast({
      title: "听写已提交",
      description: `您的得分是 ${accuracyScore}/100`,
    });
    
    if (accuracyScore < 70) {
      toast({
        title: "已加入错题本",
        description: "这个听力练习已加入您的错题本",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setUserInput('');
    setHasSubmitted(false);
    setScore(0);
    resetAudio();
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">听力练习</h1>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Tabs defaultValue="beginner" onValueChange={(v) => {
            setLevel(v as 'beginner' | 'intermediate' | 'advanced');
            handleReset();
          }}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="beginner" className="w-1/3">初级</TabsTrigger>
              <TabsTrigger value="intermediate" className="w-1/3">中级</TabsTrigger>
              <TabsTrigger value="advanced" className="w-1/3">高级</TabsTrigger>
            </TabsList>
            
            <TabsContent value="beginner" className="space-y-6">
              <AudioPlayer 
                title={currentAudio.title}
                duration={currentAudio.duration}
                isPlaying={isPlaying}
                isMuted={isMuted}
                progress={progress}
                onTogglePlay={togglePlayPause}
                onReset={resetAudio}
                onToggleMute={() => setIsMuted(!isMuted)}
              />
              
              <ListeningExercise 
                userInput={userInput}
                setUserInput={setUserInput}
                onSubmit={handleSubmit}
                onReset={handleReset}
                hasSubmitted={hasSubmitted}
                transcript={currentAudio.transcript}
                score={score}
                keywords={currentAudio.keywords}
              />
            </TabsContent>
            
            <TabsContent value="intermediate" className="space-y-6">
              <AudioPlayer 
                title={currentAudio.title}
                duration={currentAudio.duration}
                isPlaying={isPlaying}
                isMuted={isMuted}
                progress={progress}
                onTogglePlay={togglePlayPause}
                onReset={resetAudio}
                onToggleMute={() => setIsMuted(!isMuted)}
              />
              
              <ListeningExercise 
                userInput={userInput}
                setUserInput={setUserInput}
                onSubmit={handleSubmit}
                onReset={handleReset}
                hasSubmitted={hasSubmitted}
                transcript={currentAudio.transcript}
                score={score}
                keywords={currentAudio.keywords}
              />
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <AudioPlayer 
                title={currentAudio.title}
                duration={currentAudio.duration}
                isPlaying={isPlaying}
                isMuted={isMuted}
                progress={progress}
                onTogglePlay={togglePlayPause}
                onReset={resetAudio}
                onToggleMute={() => setIsMuted(!isMuted)}
              />
              
              <ListeningExercise 
                userInput={userInput}
                setUserInput={setUserInput}
                onSubmit={handleSubmit}
                onReset={handleReset}
                hasSubmitted={hasSubmitted}
                transcript={currentAudio.transcript}
                score={score}
                keywords={currentAudio.keywords}
              />
            </TabsContent>
          </Tabs>
          
          {/* Progress Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm mb-1">
              <span>历史平均分</span>
              <span>78/100</span>
            </div>
            <Progress value={78} className="h-2 mb-4" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-secondary/30 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-gray-600">今日听力练习</p>
              </div>
              <div className="bg-secondary/30 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">82%</p>
                <p className="text-xs text-gray-600">平均正确率</p>
              </div>
              <div className="bg-secondary/30 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-gray-600">连续学习天数</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Audio Player Component
interface AudioPlayerProps {
  title: string;
  duration: string;
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  onTogglePlay: () => void;
  onReset: () => void;
  onToggleMute: () => void;
}

const AudioPlayer = ({ 
  title, 
  duration, 
  isPlaying, 
  isMuted,
  progress, 
  onTogglePlay, 
  onReset,
  onToggleMute
}: AudioPlayerProps) => {
  return (
    <div className="bg-secondary/30 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-gray-600">时长: {duration}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onToggleMute}
            className="rounded-full h-10 w-10"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onReset}
          className="rounded-full h-12 w-12"
        >
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button 
          size="icon" 
          onClick={onTogglePlay}
          className="rounded-full h-12 w-12 bg-primary"
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
};

// Listening Exercise Component
interface ListeningExerciseProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onReset: () => void;
  hasSubmitted: boolean;
  transcript: string;
  score: number;
  keywords: string[];
}

const ListeningExercise = ({ 
  userInput, 
  setUserInput, 
  onSubmit, 
  onReset,
  hasSubmitted, 
  transcript,
  score,
  keywords
}: ListeningExerciseProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">听写练习</h3>
      <p className="text-sm text-gray-600 mb-4">
        请听音频，然后在下方输入您听到的内容
      </p>
      
      <Textarea 
        value={userInput} 
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="在此输入您听到的内容..."
        disabled={hasSubmitted}
        className="min-h-24 mb-4"
      />
      
      <div className="flex justify-center gap-4">
        {!hasSubmitted ? (
          <Button onClick={onSubmit} disabled={userInput.trim() === ''}>
            提交听写
          </Button>
        ) : (
          <Button onClick={onReset} variant="outline">
            重新开始
          </Button>
        )}
      </div>
      
      {hasSubmitted && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold">您的得分</h4>
            <span className="text-xl font-bold">{score}/100</span>
          </div>
          <Progress value={score} className="h-2" />
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
            <h4 className="font-bold mb-2">正确文本</h4>
            <div className="whitespace-pre-line text-sm">{transcript}</div>
          </div>
          
          <div>
            <h4 className="font-bold mb-2">关键词</h4>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span 
                  key={index} 
                  className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-secondary/30 p-4 rounded-lg">
            <h4 className="font-bold mb-2">学习提示</h4>
            <p className="text-sm">
              注意听清楚声调和语气，尝试辨别不同说话人的语气变化。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeningPage;
