
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const NavigationArrows = ({ onPrevious, onNext, isFirst, isLast }: NavigationArrowsProps) => {
  return (
    <div className="flex justify-between w-full max-w-xl mx-auto">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`rounded-full p-3 transition-all ${
          isFirst 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-secondary text-primary hover:bg-primary hover:text-white'
        }`}
        aria-label="Previous word"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      
      <button
        onClick={onNext}
        disabled={isLast}
        className={`rounded-full p-3 transition-all ${
          isLast 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-secondary text-primary hover:bg-primary hover:text-white'
        }`}
        aria-label="Next word"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NavigationArrows;
