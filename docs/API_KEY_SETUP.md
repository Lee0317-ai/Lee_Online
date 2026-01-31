# API 密钥配置说明

## 已完成的修改

### 1. 环境变量配置
- ✅ 创建了 `.env.example` 文件作为模板
- ✅ 更新了 `.gitignore`，防止 `.env` 文件被提交到 Git
- ✅ 更新了 `OCRDialog.tsx` 使用环境变量读取 API 密钥

### 2. 网站图标（Favicon）
- ✅ 创建了自定义的 SVG favicon（蓝色背景 + 白色 "L" 字母）
- ✅ 更新了 `index.html` 使用新的 favicon

### 3. API 密钥隐藏
- ✅ `OCRDialog.tsx` - 已更新为从环境变量读取
- ✅ `public/ocr.html` - **已删除**（功能已移至 OCRDialog 组件）
- ✅ `Index.tsx` - 已更新为使用 OCRDialog 组件

## ⚠️ 需要你手动完成的步骤

### 步骤 1：创建 `.env` 文件

在项目根目录创建 `.env` 文件，填入你的实际 API 密钥：

```bash
VITE_COZE_API_KEY=你的实际API密钥
VITE_COZE_BOT_ID_OCR=你的OCR机器人ID
VITE_COZE_BASE_URL=https://api.coze.cn
```

**重要**：
- 不要将 `.env` 文件提交到 Git（已添加到 .gitignore）
- 不要分享或公开你的 API 密钥

### 步骤 2：验证配置

1. 确保 `.env` 文件存在于项目根目录
2. 重启开发服务器：`pnpm run dev`
3. 测试 OCR 功能是否正常工作（点击首页的"图片转文字"工具）
4. 检查浏览器控制台是否有 API 密钥相关的错误

## MindMap 工具说明

- ✅ `MindMap.tsx` 目前**没有调用 Coze API**
- ✅ 使用本地关键词匹配进行分类
- ✅ 不需要隐藏 API 密钥（因为没有使用）

## 文件变更列表

### 新增文件
- `.env.example` - 环境变量模板
- `public/favicon.svg` - 自定义网站图标
- `docs/API_KEY_SETUP.md` - 本说明文件

### 修改文件
- `.gitignore` - 添加 `.env` 到忽略列表
- `index.html` - 更新 favicon 引用
- `src/components/OCRDialog.tsx` - 使用环境变量读取 API 密钥
- `src/pages/Index.tsx` - 更新为使用 OCRDialog 组件

### 删除文件
- `public/ocr.html` - 包含硬编码 API 密钥的静态 HTML（已删除）

## 安全建议

1. **永远不要**将包含真实 API 密钥的文件提交到 Git
2. 使用 **环境变量**管理敏感信息
3. 定期 **轮换 API 密钥**
4. 为不同环境（开发/生产）使用不同的 API 密钥
5. 在生产环境考虑使用后端代理隐藏 API 调用

## 部署注意事项

对于 Vercel 等部署平台：

1. 在项目设置中添加环境变量：
   - `VITE_COZE_API_KEY`
   - `VITE_COZE_BOT_ID_OCR`
   - `VITE_COZE_BASE_URL`

2. 确保 `.env` 文件不会被部署

3. ✅ `ocr.html` 已删除，无需担心包含在部署中
