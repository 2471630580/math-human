
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Book, ChevronDown, Settings, Volume2, BookOpen, Mic, Edit3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Book className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl hidden sm:block">Chinese Learner 学中文</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/vocabulary" className="nav-item">
              <Book className="h-5 w-5 text-primary" />
              <span>记词语</span>
            </Link>
            <Link to="/speak" className="nav-item">
              <Mic className="h-5 w-5 text-primary" />
              <span>口语</span>
            </Link>
            <Link to="/listening" className="nav-item">
              <Volume2 className="h-5 w-5 text-primary" />
              <span>听力</span>
            </Link>
            <Link to="/writing" className="nav-item">
              <Edit3 className="h-5 w-5 text-primary" />
              <span>写作</span>
            </Link>
            <Link to="/reading" className="nav-item">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>阅读</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="nav-item">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>设置</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <span>我的错题本</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>语言偏好</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>个人资料</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link to="/vocabulary" className="block nav-item" onClick={toggleMenu}>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                <span>记词语</span>
              </div>
            </Link>
            <Link to="/speak" className="block nav-item" onClick={toggleMenu}>
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                <span>口语</span>
              </div>
            </Link>
            <Link to="/listening" className="block nav-item" onClick={toggleMenu}>
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                <span>听力</span>
              </div>
            </Link>
            <Link to="/writing" className="block nav-item" onClick={toggleMenu}>
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-primary" />
                <span>写作</span>
              </div>
            </Link>
            <Link to="/reading" className="block nav-item" onClick={toggleMenu}>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>阅读</span>
              </div>
            </Link>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link to="/mistakes" className="block nav-item" onClick={toggleMenu}>
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  <span>我的错题本</span>
                </div>
              </Link>
              <Link to="/settings" className="block nav-item" onClick={toggleMenu}>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>设置</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
