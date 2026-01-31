import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ArrowLeft, Download, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// 声明 markmap 全局变量
declare global {
  interface Window {
    d3: any;
    markmap: any;
  }
}

const MindMap = () => {
  const [isDark, setIsDark] = useState(true);
  const [input, setInput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [markdown, setMarkdown] = useState('# 我的灵感\n');
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('正在初始化...');
  const svgRef = useRef<SVGSVGElement>(null);
  const markmapRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  // 加载 markmap 脚本 - 优化为并行加载
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`加载失败: ${src}`));
        document.head.appendChild(script);
      });
    };

    const initMarkmap = async () => {
      try {
        const scripts = [
          { src: 'https://cdn.jsdelivr.net/npm/d3@7', name: 'D3.js' },
          { src: 'https://cdn.jsdelivr.net/npm/markmap-lib@0.15.4', name: 'Markmap 核心库' },
          { src: 'https://cdn.jsdelivr.net/npm/markmap-view@0.15.4', name: 'Markmap 视图' }
        ];

        // 并行加载，显示进度
        for (let i = 0; i < scripts.length; i++) {
          setLoadingStep(`正在加载 ${scripts[i].name}...`);
          setLoadingProgress(((i + 1) / scripts.length) * 80);
          await loadScript(scripts[i].src);
        }

        setLoadingStep('正在初始化思维导图...');
        setLoadingProgress(90);

        // 等待 DOM 渲染 SVG 元素
        await new Promise(resolve => setTimeout(resolve, 200));

        if (!window.markmap) {
          throw new Error('Markmap 库未正确加载');
        }

        if (!svgRef.current) {
          throw new Error('SVG 元素未找到');
        }

        const { Transformer, Markmap } = window.markmap;
        transformerRef.current = new Transformer();
        markmapRef.current = Markmap.create(svgRef.current, {
          duration: 500,
          nodeMinHeight: 30,
          spacingVertical: 10,
          spacingHorizontal: 80,
          autoFit: true,
          color: (node: any) => {
            const colors = isDark
              ? ['hsl(var(--primary))', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
              : ['hsl(var(--primary))', '#059669', '#D97706', '#DC2626', '#7C3AED'];
            return colors[node.depth % colors.length];
          }
        });

        // 加载本地数据
        const saved = localStorage.getItem('mindmapData');
        if (saved) {
          setMarkdown(saved);
          renderMindmap(saved);
        } else {
          renderMindmap('# 我的灵感\n');
        }

        setScriptsLoaded(true);
        setLoadingProgress(100);
      } catch (error) {
        console.error('加载 markmap 失败:', error);
        setLoadingStep('加载失败');
        toast.error('思维导图库加载失败，请刷新重试');
      }
    };

    initMarkmap();

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy?.();
      }
    };
  }, []);

  // 主题切换
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // 重新渲染以更新颜色
    if (scriptsLoaded && markdown) {
      renderMindmap(markdown);
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const renderMindmap = (md: string) => {
    if (!transformerRef.current || !markmapRef.current) return;
    try {
      const { root } = transformerRef.current.transform(md);
      markmapRef.current.setData(root);
      markmapRef.current.fit();
    } catch (error) {
      console.error('渲染失败:', error);
    }
  };

  // 简化的分类逻辑（不调用 API，使用关键词匹配）
  const classifyInsight = (insight: string) => {
    const keywords: Record<string, string[]> = {
      '产品功能': ['功能', '需求', '特性', '模块', '页面', '按钮', '表单', '产品'],
      '技术探索': ['技术', '框架', '库', 'API', '算法', '性能', '优化', '代码'],
      '待开发清单': ['开发', '实现', '做', '添加', '创建', '设计', '计划'],
      '想法灵感': ['想法', '灵感', '思考', '创意', '点子', '思路'],
      '学习笔记': ['学习', '笔记', '教程', '文档', '阅读', '总结'],
      '生活记录': ['生活', '日常', '日记', '心情', '感悟']
    };

    let bestCategory = '想法灵感';
    let maxMatches = 0;

    for (const [category, words] of Object.entries(keywords)) {
      const matches = words.filter(word => insight.includes(word)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestCategory = category;
      }
    }

    const refinedText = insight.length > 20 ? insight.substring(0, 20) + '...' : insight;

    return {
      category_path: [bestCategory],
      refined_text: refinedText,
      original_text: insight
    };
  };

  const insertInsightToMarkdown = (md: string, result: any) => {
    const { category_path, refined_text } = result;
    const lines = md.split('\n');
    const newLine = `- ${refined_text}`;
    const categoryHeader = `## ${category_path[0]}`;
    let insertIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === categoryHeader) {
        insertIndex = i + 1;
        while (insertIndex < lines.length && lines[insertIndex].startsWith('-')) {
          insertIndex++;
        }
        break;
      }
    }

    if (insertIndex === -1) {
      lines.push('');
      lines.push(categoryHeader);
      lines.push(newLine);
    } else {
      lines.splice(insertIndex, 0, newLine);
    }

    return lines.join('\n');
  };

  const handleAddInsight = async () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.warning('请输入灵感内容');
      return;
    }
    if (trimmed.length > 500) {
      toast.warning('灵感内容不能超过 500 字');
      return;
    }

    setIsLoading(true);

    try {
      const result = classifyInsight(trimmed);
      const newMarkdown = insertInsightToMarkdown(markdown, result);

      setMarkdown(newMarkdown);
      renderMindmap(newMarkdown);
      localStorage.setItem('mindmapData', newMarkdown);

      toast.success(`已添加到 ${result.category_path[0]}`);
      setInput('');
      setCharCount(0);
    } catch (error) {
      toast.error('添加失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `我的灵感_${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('导出成功');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleAddInsight();
    }
    if (e.key === 'Escape') {
      setInput('');
      setCharCount(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setCharCount(value.length);
  };

  return (
    <div className="min-h-screen bg-background transition-colors flex flex-col h-screen overflow-hidden">
      {/* 导航栏 */}
      <nav className="border-b-2 border-neutral-200 dark:border-neutral-800 p-4 bg-background transition-colors flex-shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 mono text-sm text-neutral-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </a>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">灵感转思维导图</h1>
            <span className="mono text-xs text-neutral-400">AI 自动分类整理</span>
          </div>
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

      {/* 输入区域 */}
      <div className="border-b-2 border-neutral-200 dark:border-neutral-800 bg-background p-6 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="输入你的灵感...（支持多行，Ctrl+Enter 提交）"
                className="w-full px-4 py-3 border-2 border-neutral-300 dark:border-neutral-700 bg-background text-foreground rounded-none resize-none transition focus:border-primary focus:outline-none"
                rows={2}
                disabled={!scriptsLoaded}
              />
              <p className={`mt-2 text-sm mono ${charCount > 500 ? 'text-red-500' : 'text-neutral-500'}`}>
                {charCount}/500 字
              </p>
            </div>
            <button
              onClick={handleAddInsight}
              disabled={isLoading || !scriptsLoaded}
              className="px-6 py-3 border-2 border-primary bg-primary text-primary-foreground font-bold uppercase hover:bg-transparent hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isLoading ? 'AI 分析中...' : '添加灵感'}
            </button>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            提示：输入灵感后，AI 会自动归类整理到思维导图中
          </p>
        </div>
      </div>

      {/* 思维导图展示区域 */}
      <div className="flex-1 overflow-hidden bg-background relative min-h-0">
        {/* SVG 容器 - 始终渲染 */}
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{ cursor: 'grab' }}
        />

        {/* 加载遮罩 */}
        {!scriptsLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neutral-500 text-lg mb-2">{loadingStep}</p>
              <div className="w-48 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-neutral-400 text-sm mt-2">{loadingProgress}%</p>
              <p className="text-neutral-500 text-xs mt-4">首次加载需要几秒钟，请稍候...</p>
            </div>
          </div>
        )}

        {/* 导出按钮 */}
        {scriptsLoaded && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-background text-foreground hover:border-primary hover:text-primary transition-all text-sm font-bold"
            >
              <Download className="w-4 h-4" />
              导出 Markdown
            </button>
          </div>
        )}

        {/* 空状态提示 */}
        {scriptsLoaded && markdown === '# 我的灵感\n' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-12">
              <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-500 text-lg">还没有灵感</p>
              <p className="text-neutral-400 text-sm mt-2">在上方输入你的第一条灵感吧</p>
            </div>
          </div>
        )}

        {/* 操作提示 */}
        {scriptsLoaded && (
          <div className="absolute bottom-4 left-4 text-xs text-neutral-400 mono">
            拖拽移动 · 滚轮缩放 · 点击展开/收起
          </div>
        )}
      </div>
    </div>
  );
};

export default MindMap;
