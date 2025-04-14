import React, { useState, useRef, useEffect, useContext } from 'react';
import { Play, VolumeX, Star, StarOff, ChevronUp, ChevronDown, Volume2 } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { VoiceSettingsContext } from './FunctionBar';

interface WordCardProps {
  word: {
    chinese: string;
    pinyin: string;
    meaning: string;
    meaningExtended: string;
    image: string;
  };
}

const WordCard = ({ word }: WordCardProps) => {
  const [showPinyin, setShowPinyin] = useState(true);
  const [isStarred, setIsStarred] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  
  // 使用语音设置上下文
  const { volume, isMuted, playbackRate, selectedVoice } = useContext(VoiceSettingsContext);

  useEffect(() => {
    // 初始化语音合成
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthesisRef.current = window.speechSynthesis;
    }
    
    return () => {
      // 组件卸载时停止语音
      if (speechSynthesisRef.current && utteranceRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  const toggleStar = () => {
    setIsStarred(!isStarred);
    toast({
      title: isStarred ? "已从错题本移除 (Remove from favorites)" : "已加入错题本 (Add to favorites)",
      description: isStarred ? "词语已从您的错题本中移除 (Word removed from your favorites)" : "词语已添加到您的错题本中 (Word added to your favorites)",
      duration: 2000,
    });
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.play();
    }
  };

  const playTextToSpeech = (text: string) => {
    if (isMuted) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = volume;
    utterance.rate = playbackRate;
    
    if (selectedVoice) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleImageHover = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget) {
      e.currentTarget.classList.add('animate-wave');
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.classList.remove('animate-wave');
        }
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleStar} 
                className="text-yellow-400 hover:text-yellow-500 transition-colors"
              >
                {isStarred ? <Star className="h-6 w-6" /> : <StarOff className="h-6 w-6" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isStarred ? "从错题本中移除 (Remove from favorites)" : "添加到错题本 (Add to favorites)"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">拼音 (Pinyin)</span>
            <Switch 
              checked={showPinyin} 
              onCheckedChange={setShowPinyin} 
              className="scale-75" // Using className with scale instead of size prop
            />
          </div>
        </div>
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-4xl font-bold mb-2">{word.chinese}</h2>
        {showPinyin && <p className="text-primary mb-4">{word.pinyin}</p>}
        
        <div className="flex justify-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => playTextToSpeech(word.chinese)}
            disabled={isMuted}
            className={`hover:bg-gray-100 ${isPlaying ? 'text-primary' : 'text-gray-500'}`}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="mb-4 px-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>0.7x</span>
            <span>{playbackRate.toFixed(1)}x</span>
            <span>1.3x</span>
          </div>
          <Slider 
            value={[playbackRate]} 
            min={0.7} 
            max={1.3} 
            step={0.1} 
          />
        </div>

        <audio ref={audioRef} src="/audio-placeholder.mp3" />
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-2">{word.meaning}</p>
      </div>

      <div className="flex justify-center mb-6">
        <img 
          src={word.image} 
          alt={word.chinese} 
          className="rounded-lg object-cover w-full max-w-md h-48"
          onMouseEnter={handleImageHover}
        />
      </div>
    </div>
  );
};

export default WordCard;
