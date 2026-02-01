import { useState, useEffect } from 'react';
import { Moon, Sun, ArrowLeft, Search, Sparkles, Zap, Target, BookOpen, TrendingUp, Filter } from 'lucide-react';
import { productLinks } from '../../config/links';

const SkillSearch = () => {
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
      icon: <Search className="w-6 h-6" />,
      title: '智能技能搜索',
      desc: '基于 AI 的智能搜索引擎，输入需求即可找到最适合的 AI 技能和使用方法'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: '精选技能库',
      desc: '汇集 Claude、ChatGPT、Midjourney 等主流 AI 工具的高质量技能提示词'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: '场景化分类',
      desc: '按写作、编程、设计、数据分析等场景分类，快速定位所需技能'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '详细使用教程',
      desc: '每个技能都配有详细的使用说明和示例，零基础也能快速上手'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: '热门技能排行',
      desc: '实时展示最受欢迎和使用频率最高的技能，紧跟 AI 应用趋势'
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: '多维度筛选',
      desc: '支持按工具类型、难度等级、应用场景等多维度筛选技能'
    }
  ];

  // 使用场景
  const useCases = [
    '快速找到解决具体问题的 AI 技能',
    '学习如何更好地使用 AI 工具',
    '发现提升工作效率的新技能',
    '构建个人 AI 技能知识库'
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
            <h1 className="text-6xl md:text-7xl font-bold uppercase text-foreground mb-6 tracking-tight">
              Skill <span className="text-primary">Search</span>
            </h1>
            <p className="text-2xl md:text-3xl text-neutral-500 dark:text-neutral-400 mb-4">
              AI 技能搜索平台
            </p>
            <p className="text-lg text-neutral-400 dark:text-neutral-600 mb-12 border-l-4 border-primary pl-6">
              快速发现、学习并掌握实用的 AI 技能，让 AI 成为你的超级助手
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-wrap gap-4">
              <a
                href={productLinks.skillSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-primary bg-primary text-primary-foreground px-8 py-4 font-bold uppercase shadow-brutal shadow-brutal-blue hover:shadow-brutal-lg hover:bg-transparent hover:text-primary transition-all"
              >
                立即体验
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

      {/* 技术栈 / 相关信息 */}
      <section className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-16">
            <span className="mono text-primary text-sm">// TECH STACK</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">技术栈</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'React', desc: '前端框架' },
              { name: 'TypeScript', desc: '类型安全' },
              { name: 'Tailwind CSS', desc: '样式系统' },
              { name: 'Vercel', desc: '部署平台' }
            ].map((tech, index) => (
              <div
                key={index}
                className="border-2 border-neutral-200 dark:border-neutral-800 p-6 text-center hover:border-primary transition-all bg-background"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">{tech.name}</h3>
                <p className="text-sm text-neutral-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-24 bg-background transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            准备好探索更多
            <span className="text-primary">AI 技能</span>
            了吗？
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-12 text-lg">
            立即使用 Skill Search，发现让 AI 更强大的秘诀
          </p>
          <a
            href={productLinks.skillSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-primary bg-primary text-primary-foreground px-12 py-5 font-bold uppercase text-lg shadow-brutal shadow-brutal-blue hover:shadow-brutal-lg hover:bg-transparent hover:text-primary transition-all"
          >
            开始使用 Skill Search →
          </a>
        </div>
      </section>

      {/* 底部 */}
      <footer className="py-12 border-t-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="/" className="mono text-lg font-bold text-primary">LEE'S ONLINE</a>
            <p className="mono text-xs text-neutral-400 dark:text-neutral-600">
              © 2025 Skill Search. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillSearch;
