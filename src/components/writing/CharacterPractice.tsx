import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { 
  RefreshCcw, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Eraser,
  Undo,
  Redo
} from 'lucide-react';

// 练习字词列表
const PRACTICE_CHARACTERS = [
  {
    character: '永',
    pinyin: 'yǒng',
    meaning: '永远，永久',
    strokes: 5,
    level: '初级',
    description: '"永"字是书法练习中最常用的字之一，包含了基本的笔画组合。'
  },
  {
    character: '福',
    pinyin: 'fú',
    meaning: '幸福，福气',
    strokes: 13,
    level: '中级',
    description: '"福"字结构复杂，是练习复杂笔画的好例子。'
  },
  {
    character: '龍',
    pinyin: 'lóng',
    meaning: '龙',
    strokes: 16,
    level: '高级',
    description: '"龍"字笔画繁多，是练习复杂字的好例子。'
  },
  {
    character: '愛',
    pinyin: 'ài',
    meaning: '爱',
    strokes: 13,
    level: '中级',
    description: '"愛"字结构优美，是练习平衡的好例子。'
  },
  {
    character: '書',
    pinyin: 'shū',
    meaning: '书',
    strokes: 10,
    level: '中级',
    description: '"書"字结构清晰，是练习布局的好例子。'
  },
  {
    character: '道',
    pinyin: 'dào',
    meaning: '道，道路',
    strokes: 12,
    level: '中级',
    description: '"道"字笔画流畅，是练习连贯性的好例子。'
  },
  {
    character: '心',
    pinyin: 'xīn',
    meaning: '心，心脏',
    strokes: 4,
    level: '初级',
    description: '"心"字简单但重要，是练习基本笔画的好例子。'
  },
  {
    character: '水',
    pinyin: 'shuǐ',
    meaning: '水',
    strokes: 4,
    level: '初级',
    description: '"水"字结构简单，是练习基本笔画的好例子。'
  }
];

interface CharacterPracticeProps {
  onScoreUpdate?: (score: number) => void;
}

const CharacterPractice: React.FC<CharacterPracticeProps> = ({ onScoreUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { toast } = useToast();
  
  const currentCharacter = PRACTICE_CHARACTERS[currentCharacterIndex];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布大小
    canvas.width = 400;
    canvas.height = 400;
    
    // 设置背景为白色
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // 绘制横线
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // 绘制竖线
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    
    // 绘制参考字
    ctx.font = '120px SimSun, serif';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentCharacter.character, canvas.width / 2, canvas.height / 2);
    
    // 保存初始状态
    saveState();
  }, [currentCharacterIndex]);
  
  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // 更新历史记录
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    setIsDrawing(true);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 重新绘制网格
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // 绘制横线
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    
    // 绘制竖线
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    
    // 重新绘制参考字
    ctx.font = '120px SimSun, serif';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentCharacter.character, canvas.width / 2, canvas.height / 2);
    
    saveState();
  };
  
  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      setHistoryIndex(historyIndex - 1);
      ctx.putImageData(history[historyIndex - 1], 0, 0);
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      setHistoryIndex(historyIndex + 1);
      ctx.putImageData(history[historyIndex + 1], 0, 0);
    }
  };
  
  const nextCharacter = () => {
    if (currentCharacterIndex < PRACTICE_CHARACTERS.length - 1) {
      setCurrentCharacterIndex(currentCharacterIndex + 1);
      setScore(0);
      if (onScoreUpdate) onScoreUpdate(0);
    } else {
      toast({
        title: "练习完成",
        description: "您已完成所有字词的练习！",
      });
    }
  };
  
  const prevCharacter = () => {
    if (currentCharacterIndex > 0) {
      setCurrentCharacterIndex(currentCharacterIndex - 1);
      setScore(0);
      if (onScoreUpdate) onScoreUpdate(0);
    }
  };
  
  const evaluateWriting = () => {
    // 这里应该调用AI模型来评估书写质量
    // 为了演示，我们使用一个简单的随机分数
    const newScore = Math.floor(Math.random() * 40) + 60; // 60-100之间的随机分数
    setScore(newScore);
    if (onScoreUpdate) onScoreUpdate(newScore);
    
    toast({
      title: "评分完成",
      description: `您的书写得分为 ${newScore} 分`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{currentCharacter.character}</h2>
          <p className="text-gray-500">{currentCharacter.pinyin} - {currentCharacter.meaning}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevCharacter}
            disabled={currentCharacterIndex === 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextCharacter}
            disabled={currentCharacterIndex === PRACTICE_CHARACTERS.length - 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>写字练习</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <canvas
                ref={canvasRef}
                className="border border-gray-300 rounded-md"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              
              <div className="flex items-center space-x-2 w-full">
                <Button variant="outline" size="icon" onClick={undo} disabled={historyIndex <= 0}>
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={redo} disabled={historyIndex >= history.length - 1}>
                  <Redo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={clearCanvas}>
                  <Eraser className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">笔画粗细</div>
                  <Slider 
                    value={[brushSize]} 
                    min={1} 
                    max={20} 
                    step={1} 
                    onValueChange={(value) => setBrushSize(value[0])}
                  />
                </div>
              </div>
              
              <Button className="w-full" onClick={evaluateWriting}>
                <Check className="h-4 w-4 mr-2" />
                评分
              </Button>
              
              {score > 0 && (
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>书写评分</span>
                    <span>{score}分</span>
                  </div>
                  <Progress value={score} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>字词信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">笔画数</h3>
                <p>{currentCharacter.strokes} 笔</p>
              </div>
              <div>
                <h3 className="font-medium">难度</h3>
                <p>{currentCharacter.level}</p>
              </div>
              <div>
                <h3 className="font-medium">练习说明</h3>
                <p>{currentCharacter.description}</p>
              </div>
              <div>
                <h3 className="font-medium">书写技巧</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>注意笔画顺序</li>
                  <li>保持笔画粗细一致</li>
                  <li>注意字的整体结构</li>
                  <li>保持笔画间的平衡</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CharacterPractice; 