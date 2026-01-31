import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft, Sparkles, FolderOpen, Lightbulb, Search, Wand2, Calendar, Zap } from 'lucide-react';
import { productLinks } from '../../config/links';

const Shiguang = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // 功能特性数据
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: '资源智能收集',
      desc: '粘贴链接自动识别标题内容，支持图片、文档、网页一键保存，AI 自动提取关键信息'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: '灵感随时记录',
      desc: '语音输入快速捕捉想法，支持位置标记，不错过任何一个灵感瞬间'
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: '多维分类管理',
      desc: '无限层级文件夹 + 多标签系统，拖拽整理，支持 AND 多标签组合筛选'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: '每日运势抽签',
      desc: 'AI 根据生辰生成专属日签，图文结合，为每一天增添仪式感'
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: '全局极速搜索',
      desc: '名称、标签、笔记、内容全文检索，秒级定位所需资料'
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: '智能AI分类',
      desc: '自动识别资源类型，智能归类整理，告别杂乱文件夹'
    }
  ];

  // 使用场景
  const useCases = [
    '网页资料收藏与后续阅读',
    '设计灵感/创意想法管理',
    '个人知识库搭建',
    '日常信息碎片化整理'
  ];

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* 导航栏 */}
      <nav className="border-b-2 border-neutral-200 dark:border-neutral-800 p-4 bg-background transition-colors">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 mono text-sm text-neutral-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </a>
          <a href="/" className="mono text-xl font-bold text-primary">LEE'S ONLINE</a>
          <button
            onClick={toggleTheme}
            className="border-2 border-neutral-700 bg-background px-4 py-2 mono text-sm font-bold hover:border-primary transition-all"
            aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
          >
            {isDark ? (
              <span className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                浅色
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                深色
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 产品英雄区 */}
      <section className="border-b-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <p className="mono text-primary text-sm mb-4">// PRODUCT</p>

          {/* 大标题区域 */}
          <div className="max-w-4xl">
            <h1 className="text-7xl md:text-8xl font-bold uppercase text-foreground mb-6 tracking-tight">
              拾<span className="text-primary">光</span>
            </h1>
            <p className="text-2xl md:text-3xl text-neutral-500 dark:text-neutral-400 mb-4">
              智能资料存储系统
            </p>
            <p className="text-lg text-neutral-400 dark:text-neutral-600 mb-12 border-l-4 border-primary pl-6">
              让每一个灵感都有归属
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-wrap gap-4">
              <a
                href={productLinks.shiguang}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-primary bg-primary text-primary-foreground px-8 py-4 font-bold uppercase shadow-brutal shadow-brutal-blue hover:shadow-brutal-lg hover:bg-transparent hover:text-primary transition-all"
              >
                立即使用
              </a>
              <a
                href="#features"
                className="inline-block border-2 border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 px-8 py-4 font-bold uppercase hover:border-primary hover:text-primary transition-all"
              >
                了解更多
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section id="features" className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <span className="mono text-primary text-sm">// FEATURES</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">功能特性</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border-2 border-neutral-200 dark:border-neutral-800 p-8 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
              >
                <div className="w-14 h-14 border-2 border-neutral-300 dark:border-neutral-700 mb-6 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all text-foreground">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用场景 */}
      <section className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <span className="mono text-primary text-sm">// USE CASES</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">使用场景</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-neutral-50 dark:bg-transparent"
              >
                <div className="w-10 h-10 border-2 border-primary flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-lg text-foreground font-medium">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 更新日志 */}
      <section className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <span className="mono text-primary text-sm">// CHANGELOG</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">更新日志</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          <div className="border-2 border-neutral-200 dark:border-neutral-800 bg-background p-2">
            <iframe
              src="https://pcn6dg6krayk.feishu.cn/docx/R6YEdtX8JoImvJxd6kwc1irhn9b?from=from_copylink"
              className="w-full h-[600px] border-0"
              title="拾光更新日志"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
          <p className="text-center text-neutral-400 dark:text-neutral-600 mt-4 text-sm">
            如果文档加载失败，请
            <a
              href="https://pcn6dg6krayk.feishu.cn/docx/R6YEdtX8JoImvJxd6kwc1irhn9b?from=from_copylink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              点击这里查看
            </a>
          </p>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-24 bg-background transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            准备好开始整理你的
            <span className="text-primary">灵感</span>
            了吗？
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-12 text-lg">
            立即使用拾光，让每一个想法都有归属
          </p>
          <a
            href={productLinks.shiguang}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-primary bg-primary text-primary-foreground px-12 py-5 font-bold uppercase text-lg shadow-brutal shadow-brutal-blue hover:shadow-brutal-lg hover:bg-transparent hover:text-primary transition-all"
          >
            开始使用拾光 →
          </a>
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-12 border-t-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="/" className="mono text-lg font-bold text-primary">LEE'S ONLINE</a>
            <p className="mono text-xs text-neutral-400 dark:text-neutral-600">
              © 2025 拾光 TimePick. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shiguang;
