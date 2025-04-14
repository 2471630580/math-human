import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import WordCard from '@/components/listening/WordCard';
import ProgressBar from '@/components/listening/ProgressBar';
import NavigationArrows from '@/components/listening/NavigationArrows';
import FunctionBar from '@/components/listening/FunctionBar';
import { Book, Gamepad2 } from 'lucide-react';

// Sample vocabulary data
const vocabularyList = [
  {
    id: 1,
    chinese: '你好',
    pinyin: 'nǐ hǎo',
    meaning: '见面时的礼貌问候',
    meaningExtended: '这是最常用的中文问候语，相当于英语中的"Hello"或"Hi"。可以用于任何场合，无论是正式还是非正式的场合。',
    image: 'https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    chinese: '谢谢',
    pinyin: 'xiè xiè',
    meaning: '表达感谢的词语',
    meaningExtended: '用于表达感谢之情，类似于英语中的"Thank you"。在接受他人帮助、礼物或服务后使用，是基本的礼貌用语。',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    chinese: '再见',
    pinyin: 'zài jiàn',
    meaning: '道别时使用的礼貌用语',
    meaningExtended: '字面意思是"再次见面"，用于分别时表达希望未来还能见面的意愿，相当于英语中的"Goodbye"或"See you again"。',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29vZGJ5ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    chinese: '早上好',
    pinyin: 'zǎo shang hǎo',
    meaning: '早晨问候语',
    meaningExtended: '用于早晨打招呼，通常在上午使用，相当于英语中的"Good morning"。是日常生活中常用的礼貌用语。',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9ybmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    chinese: '对不起',
    pinyin: 'duì bu qǐ',
    meaning: '道歉用语',
    meaningExtended: '用于表达歉意，相当于英语中的"Sorry"或"I apologize"。在做了错事或给别人带来不便时使用。',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBvbG9neXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    chinese: '没关系',
    pinyin: 'méi guān xi',
    meaning: '表示不介意或原谅',
    meaningExtended: '用于回应别人的道歉，表示不介意或原谅对方，相当于英语中的"It\'s okay"或"No problem"。',
    image: 'https://images.unsplash.com/photo-1516589094091-4dabf9d2a654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXRzJTIwb2theXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 7,
    chinese: '我爱你',
    pinyin: 'wǒ ài nǐ',
    meaning: '表达爱意',
    meaningExtended: '用于表达对亲人、爱人或重要的人的爱意，相当于英语中的"I love you"。是表达感情的重要词语。',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG92ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 8,
    chinese: '生日快乐',
    pinyin: 'shēng rì kuài lè',
    meaning: '生日祝福语',
    meaningExtended: '用于祝贺别人生日，相当于英语中的"Happy Birthday"。是庆祝生日时常用的祝福语。',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 9,
    chinese: '新年快乐',
    pinyin: 'xīn nián kuài lè',
    meaning: '新年祝福语',
    meaningExtended: '用于祝贺新年，相当于英语中的"Happy New Year"。在中国农历新年期间广泛使用。',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMG5ldyUyMHllYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 10,
    chinese: '恭喜发财',
    pinyin: 'gōng xǐ fā cái',
    meaning: '新年祝福语，祝愿发财',
    meaningExtended: '字面意思是"恭喜发财"，是中国传统新年最常用的祝福语之一，表达对财富和好运的祝愿。',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbmVzZSUyMG5ldyUyMHllYXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 11,
    chinese: '加油',
    pinyin: 'jiā yóu',
    meaning: '鼓励用语',
    meaningExtended: '字面意思是"加把油"，用于鼓励他人继续努力，相当于英语中的"Come on"或"Keep going"。',
    image: 'https://images.unsplash.com/photo-1516589094091-4dabf9d2a654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tZSUyMG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 12,
    chinese: '真棒',
    pinyin: 'zhēn bàng',
    meaning: '表示赞赏',
    meaningExtended: '用于表达对某人或某事的赞赏，相当于英语中的"Great"或"Awesome"。是表达积极评价的常用词语。',
    image: 'https://images.unsplash.com/photo-1516589094091-4dabf9d2a654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlYXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 13,
    chinese: '太贵了',
    pinyin: 'tài guì le',
    meaning: '表示价格过高',
    meaningExtended: '用于表达对价格的不满，相当于英语中的"It\'s too expensive"。在购物时经常使用。',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXhwZW5zaXZlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 14,
    chinese: '便宜一点',
    pinyin: 'pián yi yī diǎn',
    meaning: '请求降价',
    meaningExtended: '用于请求商家降低价格，相当于英语中的"Can you make it cheaper?"。在讨价还价时常用。',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlYXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 15,
    chinese: '很好吃',
    pinyin: 'hěn hǎo chī',
    meaning: '表示食物美味',
    meaningExtended: '用于表达对食物的赞赏，相当于英语中的"It\'s delicious"或"Very tasty"。在品尝美食时常用。',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 16,
    chinese: '天气真好',
    pinyin: 'tiān qì zhēn hǎo',
    meaning: '表示天气很好',
    meaningExtended: '用于表达对好天气的赞赏，相当于英语中的"The weather is nice"。在谈论天气时常用。',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VubnklMjBkYXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 17,
    chinese: '下雨了',
    pinyin: 'xià yǔ le',
    meaning: '表示正在下雨',
    meaningExtended: '用于描述下雨的天气状况，相当于英语中的"It\'s raining"。在谈论天气时常用。',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 18,
    chinese: '我很累',
    pinyin: 'wǒ hěn lèi',
    meaning: '表示疲惫',
    meaningExtended: '用于表达身体或精神上的疲惫，相当于英语中的"I\'m tired"。在表达身体状况时常用。',
    image: 'https://images.unsplash.com/photo-1516589094091-4dabf9d2a654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlyZWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 19,
    chinese: '我很开心',
    pinyin: 'wǒ hěn kāi xīn',
    meaning: '表示高兴',
    meaningExtended: '用于表达内心的喜悦和快乐，相当于英语中的"I\'m happy"或"I\'m glad"。在表达情绪时常用。',
    image: 'https://images.unsplash.com/photo-1516589094091-4dabf9d2a654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 20,
    chinese: '我很想家',
    pinyin: 'wǒ hěn xiǎng jiā',
    meaning: '表示想家',
    meaningExtended: '用于表达对家乡和家人的思念之情，相当于英语中的"I miss home"或"I\'m homesick"。在表达思乡之情时常用。',
    image: 'https://images.unsplash.com/photo-1516589094091-4dabf9d2a654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXNpY2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  }
];

const ListenPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [learnedWords, setLearnedWords] = useState<number[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && currentIndex < vocabularyList.length - 1) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentIndex < vocabularyList.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleKnowWord = () => {
    if (!learnedWords.includes(currentIndex)) {
      setLearnedWords([...learnedWords, currentIndex]);
    }
    if (currentIndex < vocabularyList.length - 1) {
      handleNext();
    }
  };

  const handleDontKnowWord = () => {
    // 不认识的词语不增加进度，也不自动跳转
  };

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Book className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-2xl font-bold">Chinese Learner 学中文</h1>
          <p className="text-sm text-gray-500 ml-2">(Learn Chinese)</p>
        </div>
        <button
          onClick={() => navigate('/game')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Gamepad2 className="h-5 w-5" />
          <span>去实践</span>
        </button>
      </div>

      <FunctionBar />

      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <WordCard word={vocabularyList[currentIndex]} />
      </div>

      <div className="my-8">
        <ProgressBar current={learnedWords.length} total={vocabularyList.length} />
        <p className="text-sm text-gray-500 text-center mt-2">
          学习进度 (Learning Progress): {learnedWords.length}/{vocabularyList.length}
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handleKnowWord}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          我认识
          <span className="block text-xs">(I Know)</span>
        </button>
        <button
          onClick={handleDontKnowWord}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          我不认识
          <span className="block text-xs">(I Don't Know)</span>
        </button>
      </div>

      <NavigationArrows 
        onPrevious={handlePrevious}
        onNext={handleNext}
        isFirst={currentIndex === 0}
        isLast={currentIndex === vocabularyList.length - 1}
      />
    </MainLayout>
  );
};

export default ListenPage;
