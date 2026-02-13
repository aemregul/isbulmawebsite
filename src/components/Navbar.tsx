'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, PlusCircle } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simüle: localStorage'dan login durumu kontrol
  useEffect(() => {
    const user = localStorage.getItem('wincoi_user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('wincoi_user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const isHeroPage = pathname === '/';

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'glass-dark shadow-lg'
          : isHeroPage
            ? 'bg-transparent'
            : 'bg-white shadow-sm'
          }`}
        style={{
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-0.5"
              >
                <span className={`text-lg sm:text-xl font-black tracking-tight transition-colors duration-300 ${!isScrolled && isHeroPage ? 'text-white' : 'text-gray-900'
                  }`}>
                  kolay
                </span>
                <span className="bg-[#1E8E3E] text-white text-lg sm:text-xl font-black px-2 py-0.5 rounded-lg tracking-tight">
                  iş buluyorum
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-300 ${pathname === link.href
                    ? isScrolled || !isHeroPage
                      ? 'text-[#1E8E3E] bg-[#ECFDF5]'
                      : 'text-white bg-white/20'
                    : isScrolled || !isHeroPage
                      ? 'text-gray-600 hover:text-[#1E8E3E] hover:bg-[#ECFDF5]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="w-px h-8 bg-gray-200 mx-2" />

              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Link href="/ilan-ver">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
                    >
                      <PlusCircle size={16} />
                      İlan Ver
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className={`p-2.5 rounded-lg transition-colors ${isScrolled || !isHeroPage
                      ? 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <LogOut size={18} />
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/giris">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${isScrolled || !isHeroPage
                        ? 'text-[#1E8E3E] hover:bg-[#ECFDF5]'
                        : 'text-white hover:bg-white/10'
                        }`}
                    >
                      Giriş Yap
                    </motion.button>
                  </Link>
                  <Link href="/kayit">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
                    >
                      Kayıt Ol
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled || !isHeroPage
                ? 'text-[#1E8E3E]'
                : 'text-white'
                }`}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl"
            >
              <div className="p-6 pt-20">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${pathname === link.href
                        ? 'text-[#1E8E3E] bg-[#ECFDF5]'
                        : 'text-gray-600 hover:text-[#1E8E3E] hover:bg-[#ECFDF5]'
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <hr className="my-3 border-gray-100" />

                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/ilan-ver"
                        onClick={() => setIsMobileOpen(false)}
                        className="btn-primary !rounded-xl text-center"
                      >
                        <PlusCircle size={18} />
                        İlan Ver
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-3 rounded-xl text-base font-medium text-red-500 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut size={18} />
                        Çıkış Yap
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/giris"
                        onClick={() => setIsMobileOpen(false)}
                        className="px-4 py-3 rounded-xl text-base font-medium text-[#1E8E3E] hover:bg-[#ECFDF5] text-center"
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        href="/kayit"
                        onClick={() => setIsMobileOpen(false)}
                        className="btn-primary !rounded-xl text-center"
                      >
                        Kayıt Ol
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
