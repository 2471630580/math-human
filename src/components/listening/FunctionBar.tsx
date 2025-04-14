import React, { createContext, useState, useEffect } from 'react';
import { Book, Bookmark, BarChart, Volume2, Repeat, Timer, VolumeX } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 创建语音设置上下文
export const VoiceSettingsContext = createContext<{
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  selectedVoice: string;
  availableVoices: SpeechSynthesisVoice[];
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  setSelectedVoice: (voice: string) => void;
}>({
  volume: 1,
  isMuted: false,
  playbackRate: 1,
  selectedVoice: '',
  availableVoices: [],
  setVolume: () => {},
  setMuted: () => {},
  setPlaybackRate: () => {},
  setSelectedVoice: () => {},
});

const FunctionBar: React.FC = () => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loopCount, setLoopCount] = useState(1);
  const [isChallengeMode, setIsChallengeMode] = useState(false);

  // 加载可用的语音
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // 设置默认语音（优先选择中文语音）
      if (!selectedVoice) {
        const chineseVoice = voices.find(voice => 
          voice.lang.includes('zh') || voice.lang.includes('cmn')
        );
        if (chineseVoice) {
          setSelectedVoice(chineseVoice.name);
        } else if (voices.length > 0) {
          setSelectedVoice(voices[0].name);
        }
      }
    };

    // 某些浏览器需要等待voices加载
    if (window.speechSynthesis.getVoices().length) {
      loadVoices();
    } else {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const contextValue = {
    volume,
    isMuted,
    playbackRate,
    selectedVoice,
    availableVoices,
    setVolume,
    setMuted: setIsMuted,
    setPlaybackRate,
    setSelectedVoice,
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleLoopCountChange = (value: number[]) => {
    setLoopCount(value[0]);
  };

  const handlePlaybackRateChange = (value: number[]) => {
    setPlaybackRate(value[0]);
  };

  return (
    <VoiceSettingsContext.Provider value={contextValue}>
      <div className="flex justify-end space-x-2 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Book className="h-5 w-5 text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>选择课本 (Select Textbook)</DialogTitle>
              <DialogDescription>
                请选择您想学习的课本 (Please select the textbook you want to learn)
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {['一年级', '二年级', '三年级', '四年级', '五年级'].map((grade) => (
                <div 
                  key={grade}
                  className="bg-secondary rounded-lg p-4 text-center cursor-pointer hover:bg-primary hover:text-white transition-colors"
                >
                  <div className="font-bold mb-2">{grade}</div>
                  <div className="text-xs">推荐级别 (Recommended Level)</div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <BarChart className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>选择章节 (Select Chapter)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[1, 2, 3, 4, 5].map((chapter) => (
              <DropdownMenuItem key={chapter}>
                <div className="flex justify-between w-full">
                  <span>第{chapter}章 (Chapter {chapter})</span>
                  <span className="text-gray-500 text-sm">{chapter * 20}%</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <VolumeX className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>静音 (Mute)</span>
                <Switch 
                  checked={isMuted} 
                  onCheckedChange={setIsMuted}
                />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">音量 (Volume): {Math.round(volume * 100)}%</div>
                <Slider 
                  value={[volume]} 
                  min={0} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleVolumeChange}
                  disabled={isMuted}
                />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">语速 (Playback Rate): {playbackRate.toFixed(1)}x</div>
                <Slider 
                  value={[playbackRate]} 
                  min={0.7} 
                  max={1.3} 
                  step={0.1} 
                  onValueChange={handlePlaybackRateChange}
                />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">语音 (Voice)</div>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择语音 (Select voice)" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVoices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Repeat className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-4">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  循环次数 (Repeat Count): {loopCount === 4 ? "无限 (Infinite)" : loopCount}
                </div>
                <Slider 
                  value={[loopCount]} 
                  min={1} 
                  max={4} 
                  step={1} 
                  onValueChange={handleLoopCountChange}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1次 (1x)</span>
                  <span>2次 (2x)</span>
                  <span>3次 (3x)</span>
                  <span>无限 (Infinite)</span>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Timer className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>挑战模式 (Challenge Mode)</span>
                <Switch 
                  checked={isChallengeMode} 
                  onCheckedChange={setIsChallengeMode}
                />
              </div>
              <div className="text-sm text-gray-600">
                在挑战模式下，词语将被隐藏，并且您只有10秒的时间来回答。
                (In challenge mode, words will be hidden and you only have 10 seconds to answer.)
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Bookmark className="h-5 w-5 text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>我的错题本 (My Favorites)</DialogTitle>
              <DialogDescription>
                这里列出了您加入错题本的词语 (Here are the words you've added to your favorites)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 mt-4">
              {['你好', '谢谢', '再见'].map((word, index) => (
                <div 
                  key={index}
                  className="p-3 bg-secondary rounded-lg flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold">{word}</div>
                    <div className="text-xs text-gray-600">添加于 (Added on) 2023-06-{10 + index}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Book className="h-4 w-4 mr-2" />
                    学习 (Learn)
                  </Button>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </VoiceSettingsContext.Provider>
  );
};

export default FunctionBar;
