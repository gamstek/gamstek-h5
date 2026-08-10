import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { fetchPrivacyNotice, loginWithSms, sendSmsCode, logout } from '../api/campus';
import { captchaConfig } from '../data/config';
import { Footer } from './Footer';
import { useToast } from './Toast';

declare global {
  interface Window {
    initAliyunCaptcha?: (config: any) => void;
  }
}

export function CampusLayout() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [pendingAction, setPendingAction] = useState<'login' | 'getCode' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleOpenLogin = () => {
      setIsMenuOpen(true);
    };
    const handleUnauthorized = () => {
      setIsLoggedIn(false);
      setIsMenuOpen(true);
      toast.error('校招登录已过期，请重新登录');
    };
    window.addEventListener('open-login-menu', handleOpenLogin);
    window.addEventListener('campus-unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('open-login-menu', handleOpenLogin);
      window.removeEventListener('campus-unauthorized', handleUnauthorized);
    };
  }, [toast]);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState<{version?: string, title: string, content: string} | null>(null);
  const [isPrivacyLoading, setIsPrivacyLoading] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [captchaInstance, setCaptchaInstance] = useState<any>(null);

  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('campus_token');
    const savedPhone = localStorage.getItem('campus_phone');
    if (token) {
      setIsLoggedIn(true);
      if (savedPhone) setPhone(savedPhone);
    }
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || captchaInstance) return;

    let script = document.getElementById('aliyun-captcha-script-campus') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'aliyun-captcha-script-campus';
      script.src = 'https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js';
      script.async = true;
      script.onload = () => {
        initCaptcha();
      };
      document.head.appendChild(script);
    } else {
      initCaptcha();
    }
  }, [isMenuOpen, captchaInstance]);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const phoneRef = React.useRef(phone);
  useEffect(() => {
    phoneRef.current = phone;
  }, [phone]);

  const executeSendSms = async (captchaVerifyParam?: string) => {
    const currentPhone = phoneRef.current || phone;
    if (!currentPhone) {
      toast.error('请输入手机号');
      return;
    }
    try {
      const res = await sendSmsCode(currentPhone, captchaVerifyParam, privacyNotice?.version || 'V1.0');
      if (res.success) {
        toast.success('验证码已发送，请查收短信');
        setCountdown(60);
      } else {
        toast.error(res.message || '短信验证码发送失败');
      }
    } catch (err) {
      toast.error('网络错误，短信验证码发送失败');
    }
  };

  const initCaptcha = () => {
    if (window.initAliyunCaptcha) {
      window.initAliyunCaptcha({
        SceneId: captchaConfig.sceneId,
        prefix: captchaConfig.prefix,
        mode: captchaConfig.mode,
        element: '#captcha-element-campus',
        
        captchaVerifyCallback: async (captchaVerifyParam: string) => {
          console.log('captchaVerifyParam:', captchaVerifyParam);
          await executeSendSms(captchaVerifyParam);
          return { captchaResult: true, bizResult: true };
        },
        onBizResultCallback: (bizResult: boolean) => {
          if (bizResult) {
            setCaptchaPassed(true);
          }
        },
        getInstance: (instance: any) => {
          console.log('Captcha instance initialized:', instance);
          setCaptchaInstance(instance);
        },
        slideStyle: captchaConfig.slideStyle,
        language: captchaConfig.language,
        region: captchaConfig.region
      });
    }
  };

  const handleOpenPrivacy = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsPrivacyOpen(true);
    
    if (!privacyNotice) {
      setIsPrivacyLoading(true);
      try {
        const data = await fetchPrivacyNotice();
        if (data) {
          setPrivacyNotice(data);
        }
      } catch (error) {
        console.error('Failed to fetch privacy notice:', error);
      } finally {
        setIsPrivacyLoading(false);
      }
    }
  };

  const handleGetCode = () => {
    if (!phone) {
      toast.error('请输入手机号');
      return;
    }
    if (captchaInstance && typeof captchaInstance.show === 'function') {
      // 显示图形/滑块验证码弹窗，用户验证通过后由 SDK 回调 captchaVerifyCallback 触发 executeSendSms(captchaVerifyParam)
      captchaInstance.show();
    } else {
      console.warn('Aliyun Captcha instance not ready, fallback sending directly');
      executeSendSms();
    }
  };

  const handleLogin = async (forceAgreed?: boolean | React.MouseEvent) => {
    if (!phone) {
      toast.error('请输入手机号');
      return;
    }
    if (!code) {
      toast.error('请输入验证码');
      return;
    }

    const isAgreed = typeof forceAgreed === 'boolean' ? forceAgreed : agreed;
    if (!isAgreed) {
      setPendingAction('login');
      handleOpenPrivacy();
      return;
    }
    
    try {
      const data = await loginWithSms(phone, code, isAgreed, privacyNotice?.version || 'V1.0');
      if (data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('campus_token', data.data.token);
        localStorage.setItem('campus_phone', data.data.candidate.phone);
        toast.success('登录成功');
      } else {
        toast.error(data.message || '登录失败');
      }
    } catch (err) {
      toast.error('网络错误，请稍后再试');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
    setIsLoggedIn(false);
    setPhone('');
    setCode('');
    setAgreed(false);
    localStorage.removeItem('campus_token');
    localStorage.removeItem('campus_phone');
  };

  const isJobDetailsPage = location.pathname.includes('/job/');
  const isSubPage = location.pathname.split('/').filter(Boolean).length >= 2;
  
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    setPageTitle(document.title.split(' | ')[0]);
  }, [location.pathname]);

  const isLightMode = isMenuOpen || isScrolled || isJobDetailsPage || isSubPage;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-x-clip font-sans">
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[90] max-w-md mx-auto"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header 
        animate={{ 
          backgroundColor: isLightMode ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0)',
          color: isLightMode ? '#000000' : '#ffffff',
          boxShadow: isScrolled && !isMenuOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none'
        }}
        initial={false}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-[100] flex flex-col h-[76px] justify-center"
      >
        <div className="flex items-center justify-between px-6 relative z-20">
          {isSubPage ? (
            <>
              <button 
                onClick={() => navigate(-1)} 
                className="p-2 -ml-2 text-gray-800 hover:text-gray-900 transition-colors flex items-center"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2]" />
              </button>
              <h1 className="text-[17px] font-medium text-gray-900 absolute left-1/2 -translate-x-1/2 pointer-events-none">
                {pageTitle}
              </h1>
            </>
          ) : (
            <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Logo isLightMode={isLightMode} className="w-[120px]" />
            </Link>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 -mr-2 relative w-10 h-10 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0, opacity: isMenuOpen ? 0 : 1, scale: isMenuOpen ? 0.8 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Menu className="w-7 h-7 stroke-[1.5]" />
            </motion.div>
            <motion.div
              animate={{ rotate: isMenuOpen ? 0 : -90, opacity: isMenuOpen ? 1 : 0, scale: isMenuOpen ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <X className="w-7 h-7 stroke-[1.5]" />
            </motion.div>
          </button>
        </div>

        {/* Nav Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'calc(100dvh - 76px)', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-white overflow-hidden absolute top-full left-0 right-0 border-t border-gray-100 shadow-xl"
            >
              <div className="px-6 h-full overflow-y-auto hide-scrollbar pb-20 flex flex-col">
                {isLoggedIn ? (
                  <div className="flex flex-col">
                    <div className="py-5 border-b border-gray-200 text-[17px] text-gray-900 font-medium">
                      你好，{phone.length >= 11 ? phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : phone || '158****6095'}
                    </div>
                    <Link to="/campus-recruitment" onClick={() => setIsMenuOpen(false)} className="py-5 border-b border-gray-200 text-[17px] text-gray-900">
                      职位
                    </Link>
                    <Link to="/recruitment" onClick={() => setIsMenuOpen(false)} className="py-5 border-b border-gray-200 text-[17px] text-gray-900">
                      社会招聘
                    </Link>
                    <Link to="/campus-recruitment/resume" onClick={() => setIsMenuOpen(false)} className="py-5 border-b border-gray-200 text-[17px] text-gray-900">
                      我的简历
                    </Link>
                    <Link to="/campus-recruitment/records" onClick={() => setIsMenuOpen(false)} className="py-5 border-b border-gray-200 text-[17px] text-gray-900">
                      应聘记录
                    </Link>
                    <button onClick={handleLogout} className="py-5 border-b border-gray-200 text-[17px] text-gray-900 text-left">
                      退出登录
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 mt-12 px-2">
                    <h2 className="text-[22px] font-medium text-center text-gray-900 mb-12">登录</h2>
                    
                    <div className="flex mb-5 border border-gray-300 rounded-[2px] focus-within:border-gray-400 transition-colors">
                      <div className="flex items-center px-4 border-r border-gray-300">
                        <span className="text-[15px] text-gray-800">+86</span>
                        <ChevronDown className="w-4 h-4 ml-1 text-gray-400 stroke-[1.5]" />
                      </div>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="手机号码" 
                        className="flex-1 px-4 py-3.5 outline-none text-[15px] placeholder:text-gray-300 text-gray-900 bg-transparent"
                      />
                    </div>

                    <div className="flex mb-8 border border-gray-300 rounded-[2px] focus-within:border-gray-400 transition-colors overflow-hidden">
                      <input 
                        type="text" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="验证码" 
                        className="flex-1 px-4 py-3.5 outline-none text-[15px] placeholder:text-gray-300 text-gray-900 bg-transparent w-full"
                      />
                      <button 
                        id="get-code-btn-campus"
                        type="button"
                        onClick={() => handleGetCode()} 
                        disabled={!/^\d{11}$/.test(phone) || countdown > 0}
                        className={`px-6 py-3.5 text-[15px] font-medium min-w-[120px] transition-colors whitespace-nowrap ${/^\d{11}$/.test(phone) && countdown === 0 ? 'text-gray-700 bg-gray-200 hover:bg-gray-300' : 'text-gray-400 bg-gray-100 cursor-not-allowed'}`}
                      >
                        {countdown > 0 ? `${countdown}s 后重新获取` : '获取验证码'}
                      </button>
                    </div>

                    <div id="captcha-element-campus"></div>
                    <button 
                      id="campus-login-btn"
                      onClick={() => handleLogin()}
                      disabled={!/^\d{11}$/.test(phone) || code.length !== 6}
                      className={`w-full py-3.5 transition-colors text-white rounded-[2px] text-[16px] font-medium mb-6 ${/^\d{11}$/.test(phone) && code.length === 6 ? 'bg-[#e60012] hover:bg-[#d40010]' : 'bg-[#ec7d8e] cursor-not-allowed'}`}
                    >
                      登 录
                    </button>

                    <div className="text-center text-gray-500 text-[14px] mb-auto">
                      未注册的手机号码验证后将自动创建账号
                    </div>

                    <div className="flex items-center justify-center text-[13px] pb-10 mt-10">
                      <div className="relative flex items-center justify-center mr-2">
                        <input 
                          type="checkbox" 
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          id="privacy" 
                          className="w-4 h-4 appearance-none border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 transition-colors peer cursor-pointer"
                        />
                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <label htmlFor="privacy" className="text-gray-600 cursor-pointer select-none">
                        我已阅读并同意<span onClick={handleOpenPrivacy} className="text-blue-600 hover:underline">应聘投递隐私声明</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      
      {/* Privacy Notice Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsPrivacyOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                <h3 className="text-lg font-medium text-gray-900">
                  {privacyNotice?.title || '隐私声明'}
                </h3>
                <button onClick={() => setIsPrivacyOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto hide-scrollbar flex-1 text-[14px] text-gray-600 leading-relaxed whitespace-pre-wrap">
                {isPrivacyLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="w-6 h-6 border-2 border-[#e60012] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : privacyNotice ? (
                  privacyNotice.content
                ) : (
                  '加载失败，请稍后重试'
                )}
              </div>
              
              <div className="px-6 py-4 border-t border-gray-100 shrink-0">
                <button 
                  onClick={() => {
                    setAgreed(true);
                    setIsPrivacyOpen(false);
                    if (pendingAction === 'login') {
                      handleLogin(true);
                    }
                    setPendingAction(null);
                  }}
                  className="w-full py-3 bg-[#e60012] text-white rounded-full text-[15px] font-medium hover:bg-red-700 transition-colors"
                >
                  同意并继续
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Outlet />
      
      <Footer />
      
      {/* Global styles for hiding scrollbar in Webkit browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}
