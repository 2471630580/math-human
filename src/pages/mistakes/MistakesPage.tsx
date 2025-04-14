import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Book } from 'lucide-react';

const MistakesPage = () => {
  return (
    <MainLayout>
      <div className="mb-6 flex items-center">
        <Book className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-2xl font-bold">错题本</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500 py-8">
          <p>暂无错题记录</p>
          <p className="text-sm mt-2">当你标记词语为"不认识"时，它们会出现在这里</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default MistakesPage; 