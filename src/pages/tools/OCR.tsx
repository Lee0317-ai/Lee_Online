import { useState } from 'react';
import { Moon, Sun, ArrowLeft, Upload, Copy, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Coze 配置 - 从环境变量读取
const COZE_CONFIG = {
  apiKey: import.meta.env.VITE_COZE_API_KEY || '',
  botId: import.meta.env.VITE_COZE_BOT_ID_OCR || '',
  baseUrl: import.meta.env.VITE_COZE_BASE_URL || 'https://api.coze.cn',
};

const OCR = () => {
  const [isDark, setIsDark] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  // 主题切换
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast.error('请上传图片文件');
      return;
    }

    // 验证文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片大小不能超过 5MB');
      return;
    }

    setImage(file);
    setResult('');

    // 生成预览
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 拖拽处理
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('请上传图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('图片大小不能超过 5MB');
      return;
    }

    setImage(file);
    setResult('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 上传文件到 Coze
  const uploadToCoze = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${COZE_CONFIG.baseUrl}/v1/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_CONFIG.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('上传失败:', errorData);
      throw new Error(errorData.msg || '文件上传失败');
    }

    const data = await response.json();
    return data.data.id;
  };

  // 调用 Coze Bot 识别图片
  const recognizeImage = async (fileId: string): Promise<string> => {
    const requestBody = {
      bot_id: COZE_CONFIG.botId,
      user_id: 'user_' + Date.now(),
      stream: false,
      additional_messages: [{
        role: 'user',
        content: JSON.stringify([
          {
            type: 'text',
            text: '请识别这张图片中的所有文字内容，只返回识别出的文字，不要添加任何解释。'
          },
          {
            type: 'image',
            file_id: fileId
          }
        ]),
        content_type: 'object_string'
      }]
    };

    console.log('请求体:', requestBody);

    const response = await fetch(`${COZE_CONFIG.baseUrl}/v3/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('识别请求失败:', response.status, errorText);
      throw new Error('识别请求失败');
    }

    const data = await response.json();
    console.log('识别 API 返回:', data);

    if (data.data?.conversation_id && data.data?.id) {
      return await pollResult(data.data.conversation_id, data.data.id);
    }

    // 如果返回的结构不同，尝试直接从响应中获取结果
    if (data.data?.messages && data.data.messages.length > 0) {
      const lastMessage = data.data.messages[data.data.messages.length - 1];
      if (lastMessage.content) {
        return lastMessage.content;
      }
    }

    console.error('无法解析 API 响应:', data);
    throw new Error('获取识别结果失败');
  };

  // 轮询获取结果
  const pollResult = async (conversationId: string, chatId: string): Promise<string> => {
    let retries = 0;
    const maxRetries = 30;

    while (retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch(
        `${COZE_CONFIG.baseUrl}/v3/chat/message/list?conversation_id=${conversationId}&chat_id=${chatId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${COZE_CONFIG.apiKey}`,
          },
        }
      );

      if (!response.ok) continue;

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const assistantMsg = data.data.find((msg: any) => msg.role === 'assistant');
        if (assistantMsg && assistantMsg.content) {
          return assistantMsg.content;
        }
      }

      retries++;
    }

    throw new Error('识别超时，请重试');
  };

  // 开始识别
  const handleRecognize = async () => {
    if (!image) {
      toast.error('请先上传图片');
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      toast.info('正在上传图片...');
      const fileId = await uploadToCoze(image);

      toast.info('正在识别文字...');
      const text = await recognizeImage(fileId);

      setResult(text);
      toast.success('识别完成');
    } catch (error: any) {
      console.error('OCR 失败:', error);
      toast.error(error.message || '识别失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 复制结果
  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success('已复制到剪贴板');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('复制失败');
    }
  };

  // 重置
  const handleReset = () => {
    setImage(null);
    setImagePreview(null);
    setResult('');
  };

  return (
    <div className="min-h-screen bg-background transition-colors flex flex-col">
      {/* 导航栏 */}
      <nav className="border-b-2 border-neutral-200 dark:border-neutral-800 p-4 bg-background transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 mono text-sm text-neutral-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </a>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">图片文字识别</h1>
            <span className="mono text-xs text-neutral-400">OCR 识别图片内容</span>
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

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* 左侧：上传区域 */}
        <div className="flex-1 p-8 border-b-2 md:border-b-0 md:border-r-2 border-neutral-200 dark:border-neutral-800">
          <h2 className="text-2xl font-bold mb-6">上传图片</h2>

          {!image ? (
            <div
              onClick={() => document.getElementById('file-input')?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-16 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <Upload className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-500 text-lg mb-2">点击或拖拽图片到这里</p>
              <p className="text-sm text-neutral-400">支持 JPG、PNG 格式，最大 5MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-neutral-200 dark:border-neutral-800 p-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="预览"
                    className="max-h-64 mx-auto object-contain"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center text-neutral-400">
                    加载中...
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500 truncate max-w-[300px]">{image.name}</span>
                <span className="text-neutral-400">{(image.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              <button
                onClick={handleReset}
                className="w-full px-6 py-3 border-2 border-neutral-300 dark:border-neutral-700 font-bold uppercase hover:border-primary hover:text-primary transition-all"
              >
                重新选择
              </button>
            </div>
          )}

          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={handleRecognize}
            disabled={!image || isLoading}
            className="w-full mt-6 px-6 py-4 border-2 border-primary bg-primary text-primary-foreground font-bold uppercase hover:bg-transparent hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                识别中...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                开始识别
              </>
            )}
          </button>
        </div>

        {/* 右侧：结果区域 */}
        <div className="flex-1 p-8 bg-neutral-50 dark:bg-neutral-900/30">
          <h2 className="text-2xl font-bold mb-6">识别结果</h2>

          {!result && !isLoading && (
            <div className="h-[400px] border-2 border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-neutral-400">
              <ImageIcon className="w-16 h-16 mb-4" />
              <p className="text-lg">等待上传图片...</p>
            </div>
          )}

          {isLoading && !result && (
            <div className="h-[400px] border-2 border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-neutral-500">
              <Loader2 className="w-16 h-16 mb-4 animate-spin" />
              <p className="text-lg">正在识别图片文字...</p>
              <p className="text-sm text-neutral-400 mt-2">这可能需要几秒钟</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={result}
                  readOnly
                  className="w-full h-[400px] p-4 border-2 border-neutral-200 dark:border-neutral-800 bg-background text-foreground resize-none focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 px-4 py-2 border-2 border-neutral-300 dark:border-neutral-700 bg-background text-foreground hover:border-primary hover:text-primary transition-all font-bold text-sm flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      复制
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={handleRecognize}
                disabled={isLoading}
                className="w-full px-6 py-3 border-2 border-neutral-300 dark:border-neutral-700 font-bold uppercase hover:border-primary hover:text-primary transition-all disabled:opacity-50"
              >
                重新识别
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OCR;
