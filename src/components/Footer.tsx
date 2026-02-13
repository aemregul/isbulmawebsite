'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="bg-[#181818] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Image
                                    src="/logo.png"
                                    alt="Wincoi"
                                    width={120}
                                    height={35}
                                    className="h-8 w-auto"
                                    style={{ filter: 'brightness(0) invert(1)' }}
                                />
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                Gençler ile işverenleri buluşturarak istihdamı artıran, yeni nesil iş platformu.
                            </p>
                        </motion.div>
                    </div>

                    {/* Hızlı Linkler */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-semibold text-base mb-4">Hızlı Linkler</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/ilan-ver" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        İlan Ver
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* İletişim */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="font-semibold text-base mb-4">Hesap</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/giris" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        Giriş Yap
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kayit" className="text-gray-400 hover:text-white text-sm transition-colors">
                                        Kayıt Ol
                                    </Link>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Wincoi. Tüm hakları saklıdır.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                            Gizlilik Politikası
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                            Kullanım Şartları
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
