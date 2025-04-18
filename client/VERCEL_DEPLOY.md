# 将LibreChat前端部署到Vercel的指南

本指南将帮助你将LibreChat的前端部分单独部署到Vercel，同时指向你已经部署好的后端服务。

## 准备工作

1. 确保你已经有一个运行中的LibreChat后端服务，并记下其URL
2. 创建一个Vercel账号（如果还没有）
3. 安装Git并熟悉基本操作

## 部署步骤

### 1. 准备前端部署文件

克隆LibreChat仓库，并进入client目录：

```bash
git clone https://github.com/danny-avila/LibreChat.git
cd LibreChat/client
```

### 2. 配置vercel.json

编辑client目录下的vercel.json文件，将API重定向到你的后端服务：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://你的后端域名/api/:path*"
    },
    {
      "source": "/oauth/:path*",
      "destination": "https://你的后端域名/oauth/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

请将"你的后端域名"替换为你已部署的LibreChat后端服务的实际URL。

### 3. 配置环境变量

在Vercel项目的环境变量设置中，添加必要的环境变量。至少需要设置以下环境变量：

- `VITE_API_HOST`: 你的后端API地址（如果使用rewrites可以留空）
- `VITE_APP_TITLE`: 应用的标题（可选）
- 其他你希望配置的前端环境变量

### 4. 部署到Vercel

有两种方式部署到Vercel：

#### 方式一：使用Vercel CLI

1. 安装Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 在client目录下登录Vercel并部署：
   ```bash
   vercel login
   vercel
   ```

3. 按照提示操作，配置项目名称和团队等信息。

#### 方式二：使用Vercel网页界面

1. 将修改后的代码推送到GitHub、GitLab或Bitbucket仓库
2. 在Vercel控制台中导入该项目
3. 配置构建设置：
   - 指定`client`目录作为根目录
   - 构建命令：`npm run build`
   - 输出目录：`dist`
4. 完成部署

### 5. 验证部署

部署完成后，Vercel会提供一个域名。访问该域名，确认前端是否正常工作，以及是否能正确连接到后端服务。

## 常见问题

### 跨域问题

如果遇到跨域问题，请确保：

1. 后端服务已经配置了正确的CORS设置，允许来自Vercel域名的请求
2. vercel.json中的rewrites配置正确

### 环境变量问题

确保所有需要的环境变量都已正确设置。在Vercel控制台的Environment Variables部分进行设置。

### 构建失败

如果构建失败，请检查：

1. 项目依赖是否完整
2. 构建命令是否正确
3. Vercel日志以识别具体错误

## 自定义域名

部署成功后，你可以在Vercel项目设置中添加自定义域名，让你的LibreChat前端使用更专业的URL。

---

如果在部署过程中遇到任何问题，请查阅[Vercel官方文档](https://vercel.com/docs)或在[LibreChat GitHub仓库](https://github.com/danny-avila/LibreChat)中提问。 