import type { AuthOptions } from 'next-auth';
import type { Session } from 'next-auth';

// 扩展Session类型以包含user.id
interface ExtendedSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  }
}

export const authOptions: AuthOptions = {
  // 提供者数组为空，因为我们使用的是JWT而不是OAuth
  providers: [],
  
  // 使用JWT策略保存会话
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  
  // cookies配置
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        domain: ".unifai.network"  // 允许所有子域访问
      }
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        domain: ".unifai.network"
      }
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        domain: ".unifai.network"
      }
    }
  },
  
  // JWT配置
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  
  // 调试模式
  debug: process.env.NEXTAUTH_DEBUG === "true",
  
  // 处理回调
  callbacks: {
    // 会话回调 - 确保会话中包含用户ID
    session: ({ session, token }) => {
      const extendedSession = session as ExtendedSession;
      if (token?.sub && extendedSession?.user) {
        extendedSession.user.id = token.sub as string;
      }
      return extendedSession;
    },
    // JWT回调 - 可以在这里自定义token
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  }
}; 