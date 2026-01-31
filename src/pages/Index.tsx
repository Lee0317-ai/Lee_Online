import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import ProgressBar from '../components/ProgressBar';
import AILearning from '../components/AILearning';
import AINews from '../components/AINews';
import FixedNav from '../components/FixedNav';
import BackToTop from '../components/BackToTop';
import { productLinks, recommendedToolLinks, resourceLinks } from '../config/links';

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // 滚动位置保持：恢复滚动位置
  useEffect(() => {
    // 从 sessionStorage 读取保存的滚动位置
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition, 10);
      if (!isNaN(scrollY) && scrollY > 0) {
        // 延迟执行，确保页面已渲染
        setTimeout(() => {
          window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
        }, 0);
      }
    }
  }, []);

  // 滚动位置保持：记录滚动位置
  useEffect(() => {
    const handleScroll = () => {
      // 记录当前滚动位置到 sessionStorage
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };

    // 监听滚动事件（使用 passive 优化性能）
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen">
      {/* 滚动进度条 */}
      <ProgressBar />

      {/* 固定导航 */}
      <FixedNav />

      {/* 返回顶部按钮 */}
      <BackToTop />

      {/* 主题切换按钮 */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 border-2 border-neutral-700 bg-background px-4 py-2 mono text-sm font-bold hover:border-primary transition-all"
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

      {/* 导航 */}
      <nav className="border-b-2 border-neutral-200 dark:border-neutral-800 p-4 bg-background transition-colors" aria-label="主导航">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <a href="/" className="mono text-xl font-bold text-primary">LEE'S ONLINE</a>
        </div>
      </nav>

      {/* 首屏 */}
      <section id="hero" className="min-h-[80vh] flex flex-col justify-center border-b-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-16 w-full">
          {/* 上半部分：左右分栏 */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* 左边：个人简介 */}
            <div>
              <p className="mono text-primary text-sm mb-4">// 独立开发者</p>
              <div className="w-32 h-32 border-4 border-primary shadow-brutal shadow-brutal-blue mb-8 flex items-center justify-center hover:shadow-brutal-lg transition-all" aria-hidden="true">
                <span className="text-5xl font-bold text-primary">L</span>
              </div>
              <h1 className="text-6xl font-bold uppercase leading-none mb-6 text-foreground">
                HI,
                <br />
                我是{' '}
                <span className="text-primary" style={{ textShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}>
                  LEE
                </span>
              </h1>
              <p className="text-xl text-neutral-500 dark:text-neutral-400 border-l-4 border-primary pl-6 mb-8 leading-relaxed">
                用代码解决生活中的小麻烦
                <br />
                一个工具一个工具地做下去
              </p>
              <a
                href="#work"
                className="inline-block border-2 border-primary text-primary px-8 py-4 font-bold uppercase shadow-brutal shadow-brutal-blue hover:shadow-brutal-lg hover:bg-primary hover:text-primary-foreground transition-all"
              >
                看看我做了什么 ↓
              </a>
            </div>

            {/* 右边：关于 Lee 时间线 */}
            <div>
              <p className="mono text-primary text-sm mb-2">// ABOUT LEE</p>
              <h2 className="text-3xl font-bold uppercase text-foreground mb-8">关于我</h2>

              {/* 时间线 */}
              <div className="relative space-y-8">
                {/* 2025 · 初 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary"></div>
                  <span className="mono text-xs text-primary font-bold uppercase tracking-wider">2025 · 初</span>
                  <div className="mt-2 space-y-2">
                    <p className="text-lg font-bold leading-relaxed text-foreground">那个夜晚，我第一次和 AI 对话</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">屏幕上的字，像一道光 / 我意识到，世界已经不一样了</p>
                  </div>
                </div>

                {/* 2025 · 6月 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary"></div>
                  <span className="mono text-xs text-primary font-bold uppercase tracking-wider">2025 · 6月</span>
                  <div className="mt-2 space-y-2">
                    <p className="text-base leading-relaxed text-neutral-500 dark:text-neutral-400">沉浸其中，无法自拔</p>
                    <p className="text-base font-medium leading-relaxed text-foreground">深深震撼，深深焦虑</p>
                    <p className="text-sm font-bold leading-relaxed text-foreground">AI 奔跑太快 / 我怕被时代抛下</p>
                  </div>
                </div>

                {/* 现在 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary"></div>
                  <span className="mono text-xs text-primary font-bold uppercase tracking-wider">现在</span>
                  <div className="mt-2 space-y-2">
                    <p className="text-base leading-relaxed text-neutral-500 dark:text-neutral-400">迷雾散去，答案浮现</p>
                    <p className="text-lg font-bold leading-relaxed text-foreground">AI 不会取代我们</p>
                    <p className="text-base font-medium leading-relaxed text-foreground">它会让真正会用它的人，变得无可替代</p>
                    <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 mt-3">
                      <p className="text-base font-bold text-foreground">我是 Lee，一个程序员</p>
                      <p className="text-primary mono text-sm mt-1">用代码 + AI，写下自己的序章</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 下半部分：最新动态 */}
          <div className="border-t-2 border-neutral-200 dark:border-neutral-800 pt-12">
            <p className="mono text-xs uppercase mb-6 text-neutral-500">// 最新动态</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href={productLinks.shiguang}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-neutral-200 dark:border-neutral-700 p-4 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground group-hover:text-primary transition-colors">拾光</span>
                  <span className="mono text-xs text-primary">LIVE</span>
                </div>
              </a>
              <a href="#" className="border-2 border-neutral-200 dark:border-neutral-700 p-4 hover:border-brutal-amber hover:bg-brutal-amber/5 transition-all group">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground group-hover:text-brutal-amber transition-colors">写小说系统</span>
                  <span className="mono text-xs text-brutal-amber">WIP</span>
                </div>
              </a>
              <a href="#" className="border-2 border-neutral-200 dark:border-neutral-700 p-4 hover:border-brutal-cyan hover:bg-brutal-cyan/5 transition-all group">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground group-hover:text-brutal-cyan transition-colors">提示词库</span>
                  <span className="mono text-xs text-brutal-cyan">UPDATING</span>
                </div>
              </a>
              <a href="#" className="border-2 border-neutral-200 dark:border-neutral-700 p-4 hover:border-brutal-purple hover:bg-brutal-purple/5 transition-all group">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground group-hover:text-brutal-purple transition-colors">Skill 技能库</span>
                  <span className="mono text-xs text-brutal-purple">RESOURCE</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI 学习板块 */}
      <AILearning />

      {/* 产品区 */}
      <section id="work" className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <span className="mono text-primary text-sm">01</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">我的产品</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
            <a href="#" className="mono text-sm text-neutral-500 hover:text-primary transition-colors">
              查看全部 →
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <a
              href="/products/shiguang"
              className="block border-2 border-neutral-200 dark:border-neutral-700 p-8 hover:border-primary shadow-brutal shadow-brutal-blue hover:shadow-brutal-lg transition-all group bg-neutral-50 dark:bg-neutral-900/50 relative"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="mono text-xs px-3 py-1 border border-primary text-primary">产品</span>
                <span className="mono text-xs text-neutral-400 dark:text-neutral-600">2025</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                拾光
              </h3>
              <p className="text-neutral-500 mb-8">资料存储系统，帮你轻松管理和检索个人知识库</p>
              <div className="flex gap-4">
                <span className="border-2 border-primary bg-primary text-primary-foreground px-6 py-2 font-bold uppercase text-sm group-hover:bg-transparent group-hover:text-primary transition-all">
                  查看详情
                </span>
              </div>
            </a>

            <a href="#" className="block border-2 border-neutral-200 dark:border-neutral-700 p-8 hover:border-brutal-amber shadow-brutal shadow-brutal-amber hover:shadow-brutal-lg transition-all group bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex justify-between items-start mb-6">
                <span className="mono text-xs px-3 py-1 border border-brutal-amber text-brutal-amber">开发中</span>
                <span className="mono text-xs text-neutral-400 dark:text-neutral-600">2026</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-brutal-amber transition-colors">
                写小说系统
              </h3>
              <p className="text-neutral-500 mb-8">一句话介绍这个产品，解决什么问题，给谁用</p>
              <div className="flex gap-4">
                <span className="border-2 border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600 px-6 py-2 font-bold uppercase text-sm cursor-not-allowed">
                  敬请期待
                </span>
                <a href="#" className="mono text-sm text-neutral-500 hover:text-brutal-amber transition-colors py-2">
                  了解更多 →
                </a>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 小工具区 */}
      <section id="tools" className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <span className="mono text-primary text-sm">02</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">小工具</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
            <a href="#" className="mono text-sm text-neutral-500 hover:text-primary transition-colors">
              查看全部 →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 工具1: 灵感转思维导图 */}
            <a
              href="/tools/mindmap"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-10 h-10 border-2 border-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              >
                <span className="text-sm font-bold">脑</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">灵感转导图</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-2">AI自动分类整理</p>
            </a>

            {/* 工具2: OCR图片文字解析 */}
            <a
              href="/ocr.html"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background text-left block"
            >
              <div className="w-10 h-10 border-2 border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-3 group-hover:border-primary transition-all"
              >
                <span className="text-sm font-bold text-neutral-400 group-hover:text-primary">字</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">图片转文字</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-2">OCR识别图片内容</p>
            </a>

            {/* 工具3: 微信红包封面（占位） */}
            <button
              onClick={() => toast.info('红包封面功能开发中，敬请期待')}
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-brutal-amber hover:bg-brutal-amber/5 transition-all group bg-background text-left"
            >
              <div className="w-10 h-10 border-2 border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-3 group-hover:border-brutal-amber transition-all"
              >
                <span className="text-sm font-bold text-neutral-400">🧧</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-brutal-amber transition-colors">红包封面</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-2">制作微信红包封面</p>
            </button>

            {/* 工具4: 文档校对（占位） */}
            <button
              onClick={() => toast.info('文档校对功能开发中，敬请期待')}
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-brutal-purple hover:bg-brutal-purple/5 transition-all group bg-background text-left"
            >
              <div className="w-10 h-10 border-2 border-neutral-300 dark:border-neutral-700 flex items-center justify-center mb-3 group-hover:border-brutal-purple transition-all"
              >
                <span className="text-sm font-bold text-neutral-400">✓</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-brutal-purple transition-colors">文档校对</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-2">AI检查错别字语法</p>
            </button>
          </div>
        </div>
      </section>

      {/* 资源库 */}
      <section id="resources" className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <span className="mono text-primary text-sm">03</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">资源库</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 提示词库 */}
            <a
              href={resourceLinks.prompts.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-700 p-8 hover:border-brutal-cyan hover:bg-brutal-cyan/5 shadow-brutal shadow-brutal-cyan hover:shadow-brutal-lg transition-all group bg-neutral-50 dark:bg-transparent"
              aria-label="进入提示词库"
            >
              <span className="mono text-xs text-brutal-cyan">// PROMPTS</span>
              <div className="flex items-center gap-2 mt-4 mb-2">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-brutal-cyan transition-colors">
                  提示词库
                </h3>
                <span className="mono text-xs px-2 py-0.5 bg-brutal-cyan/10 text-brutal-cyan">{resourceLinks.prompts.name}</span>
              </div>
              <p className="text-neutral-500">收集整理的优质提示词，持续更新中</p>
              <p className="mono text-sm text-brutal-cyan mt-6">进入 →</p>
            </a>

            {/* Skill技能库 */}
            <a
              href="https://skills.sh/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-700 p-8 hover:border-brutal-purple hover:bg-brutal-purple/5 shadow-brutal shadow-brutal-purple hover:shadow-brutal-lg transition-all group bg-neutral-50 dark:bg-transparent text-left block"
              aria-label="进入Skill技能库"
            >
              <span className="mono text-xs text-brutal-purple">// SKILLS</span>
              <h3 className="text-2xl font-bold mt-4 mb-2 text-foreground group-hover:text-brutal-purple transition-colors">
                Skill 技能库
              </h3>
              <p className="text-neutral-500">实用的技能集合，提升效率</p>
              <p className="mono text-sm text-brutal-purple mt-6">进入 →</p>
            </a>
          </div>
        </div>
      </section>

      {/* 推荐工具 */}
      <section id="recommended" className="py-24 border-b-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <span className="mono text-primary text-sm">04</span>
            <h2 className="text-3xl font-bold uppercase text-foreground">推荐工具</h2>
            <div className="flex-1 h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
          </div>

          {/* 分类标签 */}
          <div className="flex gap-2 mb-8 flex-wrap">
            <button className="mono text-sm px-4 py-2 border-2 border-primary bg-primary text-primary-foreground font-bold cursor-pointer">
              开发工具
            </button>
            <button className="mono text-sm px-4 py-2 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-primary hover:text-primary transition-all cursor-pointer">
              AI工具
            </button>
            <button className="mono text-sm px-4 py-2 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-primary hover:text-primary transition-all cursor-pointer">
              效率工具
            </button>
            <button className="mono text-sm px-4 py-2 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-500 hover:border-primary hover:text-primary transition-all cursor-pointer">
              设计工具
            </button>
          </div>

          {/* 工具卡片 - 两行，7个工具 + 更多 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 1. Claude Code CLI */}
            <a
              href={recommendedToolLinks.claudeCode}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-700 mb-4 flex items-center justify-center group-hover:border-primary transition-colors" aria-hidden="true">
                <span className="text-xl text-foreground">CC</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">Claude Code</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-1">CLI 开发工具</p>
            </a>

            {/* 2. Codex CLI */}
            <a
              href={recommendedToolLinks.codex}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-700 mb-4 flex items-center justify-center group-hover:border-primary transition-colors" aria-hidden="true">
                <span className="text-xl text-foreground">Cx</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">Codex</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-1">CLI 开发工具</p>
            </a>

            {/* 3. Enter.pro */}
            <a
              href={recommendedToolLinks.enter}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-700 mb-4 flex items-center justify-center group-hover:border-primary transition-colors" aria-hidden="true">
                <span className="text-xl text-foreground">En</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">Enter.pro</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-1">低代码平台</p>
            </a>

            {/* 4. GitHub */}
            <a
              href={recommendedToolLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-700 mb-4 flex items-center justify-center group-hover:border-primary transition-colors" aria-hidden="true">
                <span className="text-xl text-foreground">GH</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">GitHub</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-1">代码管理平台</p>
            </a>

            {/* 5. Cursor IDE */}
            <a
              href={recommendedToolLinks.cursor}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-700 mb-4 flex items-center justify-center group-hover:border-primary transition-colors" aria-hidden="true">
                <span className="text-xl text-foreground">Cu</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">Cursor</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-1">IDE 工具</p>
            </a>

            {/* 6. Trae IDE */}
            <a
              href={recommendedToolLinks.trae}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-700 mb-4 flex items-center justify-center group-hover:border-primary transition-colors" aria-hidden="true">
                <span className="text-xl text-foreground">Tr</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">Trae</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-1">IDE 工具</p>
            </a>

            {/* 7. Codebuddy IDE */}
            <a
              href={recommendedToolLinks.codebuddy}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary hover:bg-primary/5 transition-all group bg-background"
            >
              <div className="w-12 h-12 border-2 border-neutral-300 dark:border-neutral-700 mb-4 flex items-center justify-center group-hover:border-primary transition-colors" aria-hidden="true">
                <span className="text-xl text-foreground">Cb</span>
              </div>
              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">Codebuddy</h4>
              <p className="mono text-xs text-neutral-500 dark:text-neutral-600 mt-1">IDE 工具</p>
            </a>

            {/* 8. 更多 */}
            <a
              href="#"
              className="border-2 border-neutral-200 dark:border-neutral-800 p-6 hover:border-primary transition-all group flex items-center justify-center bg-background"
            >
              <span className="mono text-neutral-500 group-hover:text-primary transition-colors">更多 →</span>
            </a>
          </div>
        </div>
      </section>

      {/* AI资讯 */}
      <AINews />

      {/* 底部 */}
      <footer id="about" className="py-20 bg-background transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左侧：微信二维码 */}
            <div className="border-2 border-neutral-200 dark:border-neutral-800 p-8 text-center bg-neutral-50 dark:bg-transparent">
              <p className="mono text-sm text-neutral-500 mb-6">// 微信</p>
              <div className="w-48 h-48 border-2 border-neutral-300 dark:border-neutral-700 mx-auto mb-4 flex items-center justify-center">
                <img
                  src="/wechat-qrcode.png"
                  alt="微信二维码"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-neutral-500">这是我的微信，有需要可以一起交流~</p>
            </div>

            {/* 右侧：联系方式 */}
            <div>
              <p className="mono text-sm text-neutral-500 mb-6">// 联系方式</p>
              <div className="space-y-4 text-neutral-500">
                <p>
                  邮箱：<span className="text-foreground">287796033@qq.com</span>
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <p className="mono text-xs text-neutral-400 dark:text-neutral-600">© 2025 LEE'S ONLINE</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
