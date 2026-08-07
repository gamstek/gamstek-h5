import { useState, useEffect } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { headerLinks } from '../data/config';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['产品', '服务支持', '关于我们']);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const isLightMode = isMenuOpen || isScrolled;

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[90]"
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
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-[100] flex flex-col h-[76px] justify-center"
      >
        <div className="flex items-center justify-between px-6 relative z-20">
          <Link to="/" className="flex flex-col" onClick={() => setIsMenuOpen(false)}>
            <Logo isLightMode={isLightMode} className="w-[120px]" />
          </Link>
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

        {/* Navigation Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'calc(100dvh - 76px)', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-white overflow-hidden absolute top-full left-0 right-0 border-t border-gray-100 shadow-xl"
            >
              <div className="px-6 h-full overflow-y-auto hide-scrollbar pb-20">
                <div className="flex flex-col">
                  
                  {/* 产品 */}
                  <div className="border-b border-gray-200">
                    <button onClick={() => toggleMenu('产品')} className="w-full flex justify-between items-center py-5 group">
                      <span className="text-[17px] text-gray-900 font-medium">产品</span>
                      <motion.div animate={{ rotate: expandedMenus.includes('产品') ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedMenus.includes('产品') && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pb-6 pt-1 text-base text-gray-500">
                            {headerLinks.products.map((link, idx) => (
                              <Link key={idx} to={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-gray-900 transition-colors">{link.label}</Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* 应用案例 */}
                  <div className="border-b border-gray-200">
                    <Link to="/cases" onClick={() => setIsMenuOpen(false)} className="flex justify-between items-center py-5 group">
                      <span className="text-[17px] text-gray-900 font-medium">应用案例</span>
                    </Link>
                  </div>

                  {/* 服务支持 */}
                  <div className="border-b border-gray-200">
                    <button onClick={() => toggleMenu('服务支持')} className="w-full flex justify-between items-center py-5 group">
                      <span className="text-[17px] text-gray-900 font-medium">服务支持</span>
                      <motion.div animate={{ rotate: expandedMenus.includes('服务支持') ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedMenus.includes('服务支持') && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pb-6 pt-1 text-base text-gray-500">
                            {headerLinks.support.map((link, idx) => (
                              <Link key={idx} to={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-gray-900 transition-colors">{link.label}</Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* 新闻动态 */}
                  <div className="border-b border-gray-200">
                    <Link to="/news" onClick={() => setIsMenuOpen(false)} className="flex justify-between items-center py-5 group">
                      <span className="text-[17px] text-gray-900 font-medium">新闻动态</span>
                    </Link>
                  </div>

                  {/* 关于我们 */}
                  <div className="border-b border-gray-200">
                    <button onClick={() => toggleMenu('关于我们')} className="w-full flex justify-between items-center py-5 group">
                      <span className="text-[17px] text-gray-900 font-medium">关于我们</span>
                      <motion.div animate={{ rotate: expandedMenus.includes('关于我们') ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {expandedMenus.includes('关于我们') && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pb-6 pt-1 text-base text-gray-500">
                            {headerLinks.about.map((link, idx) => (
                              <Link key={idx} to={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-gray-900 transition-colors">{link.label}</Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
