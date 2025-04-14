import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>今日学习进度 (Today's Progress)</span>
        <span>{current}/{total} 词 (words)</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-600 mt-1">
        还需学习 (Still need to learn) {total - current} 个词语 (words)
      </div>
    </div>
  );
};

export default ProgressBar;
