/**
 * next-auth配置选项
 */
export const nextAuthOptions = {
  // 使用JWT策略保存会话
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  // JWT配置
  jwt: {
    // 注意：确保这里使用的密钥与主站相同
    secret: process.env.NEXTAUTH_SECRET || "这个密钥必须与主站uniq.unifai.network相同",
  },
  // 调试模式
  debug: process.env.NODE_ENV === "development",
  // Cookie配置，设置domain以允许跨子域共享
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain: ".unifai.network" // 关键设置：允许在所有*.unifai.network子域中共享cookie
      }
    }
  },
  // 处理回调
  callbacks: {
    // 会话回调 - 确保会话中包含用户ID
    session: ({ session, token }) => {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
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