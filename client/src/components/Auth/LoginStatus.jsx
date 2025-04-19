import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const LoginStatus = () => {
  const { data: session, status } = useSession();
  const [showDetails, setShowDetails] = useState(false);
  const [redirectCounter, setRedirectCounter] = useState(null);
  
  useEffect(() => {
    // 检测未登录状态并倒计时跳转
    if (status === 'unauthenticated') {
      setRedirectCounter(5); // 设置5秒倒计时
    }
  }, [status]);

  // 处理倒计时跳转逻辑
  useEffect(() => {
    let timer;
    if (redirectCounter !== null && redirectCounter > 0) {
      timer = setTimeout(() => {
        setRedirectCounter(redirectCounter - 1);
      }, 1000);
    } else if (redirectCounter === 0) {
      // 跳转到主站首页
      console.log('跳转到主站首页');
      // window.location.href = 'https://uniq.unifai.network';
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [redirectCounter]);

  // 立即跳转到主站
  const redirectToLogin = () => {
    // window.location.href = 'https://uniq.unifai.network';
    console.log('跳转到主站登录');
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const getStatusIcon = () => {
    if (status === 'loading') return '⏳';
    if (status === 'authenticated') return '✅';
    return '❌';
  };

  const getStatusColor = () => {
    if (status === 'loading') return 'bg-gray-800';
    if (status === 'authenticated') return 'bg-green-700';
    return 'bg-red-700';
  };

  return (
    <div className={`fixed top-4 left-4 z-[1001] ${getStatusColor()} text-white p-4 rounded-lg shadow-lg transition-all duration-300 max-w-md`}>
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleDetails}>
        <div className="flex items-center">
          <span className="text-xl mr-2">{getStatusIcon()}</span>
          <span className="font-bold">登录状态: {status === 'authenticated' ? '已登录' : status === 'loading' ? '加载中' : '未登录'}</span>
        </div>
        <span className="ml-4">{showDetails ? '▲' : '▼'}</span>
      </div>
      
      {showDetails && (
        <div className="mt-4 border-t border-white/20 pt-3">
          {status === 'authenticated' && session ? (
            <>
              <div className="mb-2">
                <p className="text-sm opacity-80">用户名</p>
                <p className="font-semibold">{session?.user?.name || '未知'}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm opacity-80">邮箱</p>
                <p className="font-semibold">{session?.user?.email || '未知'}</p>
              </div>
            </>
          ) : status === 'loading' ? (
            <p className="italic">正在获取登录信息...</p>
          ) : (
            <div>
              <p>您当前未登录</p>
              <p className="mt-2 text-sm opacity-70">请先前往主站 uniq.unifai.network 登录</p>
              {redirectCounter !== null && (
                <p className="text-amber-300 mt-2">
                  将在 {redirectCounter} 秒后自动跳转到主站...
                </p>
              )}
              <button 
                onClick={redirectToLogin}
                className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium"
              >
                立即前往主站
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginStatus; 