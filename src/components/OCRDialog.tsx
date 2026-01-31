import { useState, useRef, ChangeEvent } from 'react';
import { X, Upload, Copy, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface OCRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Coze 配置 - 从环境变量读取
const COZE_CONFIG = {
  apiKey: import.meta.env.VITE_COZE_API_KEY || '',
  botId: import.meta.env.VITE_COZE_BOT_ID_OCR || '',
  baseUrl: import.meta.env.VITE_COZE_BASE_URL || 'https://api.coze.cn',
};

export function OCRDialog({ open, onOpenChange }: OCRDialogProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
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
    return data.data.id; // 返回 file_id
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

    const response = await fetch(`${COZE_CONFIG.baseUrl}/v3/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COZE_CONFIG.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('识别请求失败');
    }

    const data = await response.json();
    console.log('OCRDialog - 识别 API 返回:', data);

    // 轮询获取结果
    if (data.data?.conversation_id && data.data?.id) {
      return await pollResult(data.data.conversation_id, data.data.id);
    }

    console.error('OCRDialog - 无法解析 API 响应:', data);
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
      // 1. 上传文件到 Coze
      toast.info('正在上传图片...');
      const fileId = await uploadToCoze(image);

      // 2. 调用 Bot 识别
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
    setImagePreview('');
    setResult('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 border-2 border-neutral-200 dark:border-neutral-800">
        <DialogHeader className="p-6 border-b-2 border-neutral-200 dark:border-neutral-800">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">// OCR 图片文字识别</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 min-h-[500px]">
          {/* 左侧：上传区域 */}
          <div className="p-6 border-r-2 border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg font-bold mb-4">上传图片</h3>

            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-12 text-center hover:border-primary transition-colors cursor-pointer"
              >
                <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-500 mb-2">点击或拖拽图片到这里</p>
                <p className="text-xs text-neutral-400">支持 JPG、PNG 格式，最大 5MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-neutral-200 dark:border-neutral-800 p-4">
                  <img
                    src={imagePreview}
                    alt="预览"
                    className="max-h-48 mx-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500 truncate max-w-[200px]">{image.name}</span>
                  <span className="text-neutral-400">{(image.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full border-2 border-neutral-300 dark:border-neutral-700"
                >
                  重新选择
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button
              onClick={handleRecognize}
              disabled={!image || isLoading}
              className="w-full mt-6 h-12 text-base font-bold bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  识别中...
                </>
              ) : (
                '开始识别'
              )}
            </Button>
          </div>

          {/* 右侧：结果区域 */}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">识别结果</h3>

            {!result && !isLoading && (
              <div className="h-[400px] border-2 border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-neutral-400">
                <ImageIcon className="w-12 h-12 mb-4" />
                <p>等待上传图片...</p>
              </div>
            )}

            {isLoading && !result && (
              <div className="h-[400px] border-2 border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center text-neutral-500">
                <Loader2 className="w-12 h-12 mb-4 animate-spin" />
                <p>正在识别图片文字...</p>
                <p className="text-sm text-neutral-400 mt-2">这可能需要几秒钟</p>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={result}
                    readOnly
                    className="w-full h-[350px] p-4 border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 resize-none focus:outline-none text-foreground"
                  />
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 border-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        复制
                      </>
                    )}
                  </Button>
                </div>
                <Button
                  onClick={handleRecognize}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-2 border-neutral-300 dark:border-neutral-700"
                >
                  重新识别
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
