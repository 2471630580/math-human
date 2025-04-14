import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Settings } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="mb-6 flex items-center">
        <Settings className="h-6 w-6 text-primary mr-2" />
        <h1 className="text-2xl font-bold">设置</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">语言偏好</h2>
          <div className="flex items-center space-x-2">
            <Switch id="show-pinyin" />
            <Label htmlFor="show-pinyin">显示拼音</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="show-english" />
            <Label htmlFor="show-english">显示英文翻译</Label>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">界面语言</h2>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择语言" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="zh">中文</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">个人资料</h2>
          <div className="text-gray-500">
            <p>用户名：user123</p>
            <p>学习时长：0小时</p>
            <p>掌握词语：0个</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage; 