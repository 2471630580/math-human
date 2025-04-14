import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2, Mic, BookOpen, Edit3, Gamepad2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  const learningModules = [
    {
      title: "记词语",
      description: "通过听力学习中文词汇和发音",
      icon: <Volume2 className="h-8 w-8 text-white" />,
      path: "/vocabulary",
      color: "bg-primary"
    },
    {
      title: "口语",
      description: "练习中文口语对话和发音",
      icon: <Mic className="h-8 w-8 text-white" />,
      path: "/speak",
      color: "bg-blue-600"
    },
    {
      title: "听力",
      description: "听懂中文对话和短文",
      icon: <Volume2 className="h-8 w-8 text-white" />,
      path: "/listening",
      color: "bg-blue-700"
    },
    {
      title: "写作",
      description: "练习中文写作和表达",
      icon: <Edit3 className="h-8 w-8 text-white" />,
      path: "/writing",
      color: "bg-blue-800"
    },
    {
      title: "阅读",
      description: "阅读并理解中文文章",
      icon: <BookOpen className="h-8 w-8 text-white" />,
      path: "/reading",
      color: "bg-blue-900"
    },
    {
      title: "游戏",
      description: "通过有趣的游戏学习中文",
      icon: <Gamepad2 className="w-6 h-6" />,
      href: "/game",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">欢迎使用 Chinese Learner</h1>
          <p className="text-lg text-gray-600 mb-8">为外国人打造的中文学习平台</p>
          
          <div className="mb-8">
            <div className="bg-secondary rounded-lg p-4 inline-block">
              <div className="text-sm text-gray-600 mb-2">今日学习进度</div>
              <div className="progress-bar w-64">
                <div className="progress-value" style={{ width: '30%' }}></div>
              </div>
              <div className="text-sm text-primary mt-2">已完成 3/10 个词语</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.map((module, index) => (
            <Link 
              key={index} 
              to={module.path} 
              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <div className={`${module.color} p-6 flex justify-center`}>
                <div className="rounded-full bg-white/20 p-4">
                  {module.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  {module.title}
                </h3>
                <p className="text-gray-600">{module.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">您的学习统计</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-gray-600">本周学习天数</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">24</div>
              <div className="text-sm text-gray-600">已学习词汇</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary">85%</div>
              <div className="text-sm text-gray-600">正确率</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
