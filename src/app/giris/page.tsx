'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }

        setLoading(true);

        // Simüle: Gerçek backend entegrasyonu sonra yapılacak
        setTimeout(() => {
            localStorage.setItem(
                'wincoi_user',
                JSON.stringify({ email, name: 'Kullanıcı', role: 'user' })
            );
            setLoading(false);
            router.push('/');
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20 pb-10" style={{ background: 'linear-gradient(160deg, #0A0F0D 0%, #0D1A14 20%, #0F2318 40%, #0D1A14 60%, #0A1210 80%, #080E0B 100%)' }}>
            {/* Animated blobs */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-[#1E8E3E] opacity-[0.12] blur-[100px] -top-20 -left-40" />
            <div className="absolute w-[600px] h-[600px] rounded-full bg-[#22C55E] opacity-[0.08] blur-[120px] -bottom-40 -right-40" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#34D058] opacity-[0.10] blur-[80px] top-1/3 right-1/4" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="bg-white/[0.08] backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/[0.12] shadow-2xl shadow-black/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.2 }}
                            className="flex items-center justify-center mx-auto mb-4"
                        >
                            <div className="flex items-center gap-0.5 justify-center">
                                <span className="text-white text-2xl font-black tracking-tight">kolay</span>
                                <span className="bg-[#1E8E3E] text-white text-2xl font-black px-2.5 py-1 rounded-lg tracking-tight">iş buluyorum</span>
                            </div>
                        </motion.div>
                        <h1 className="text-2xl font-bold text-white mb-1">Giriş Yap</h1>
                        <p className="text-white/50 text-sm">Hesabınıza giriş yaparak devam edin</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/20 text-red-200 text-sm px-4 py-3 rounded-xl mb-6 border border-red-500/30"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">
                                E-posta
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/[0.1] focus:border-white/[0.2] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">
                                Şifre
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/[0.1] focus:border-white/[0.2] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-[#1E8E3E] to-[#34D058] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#1E8E3E]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Giriş Yap
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-sm text-white/40 mt-6">
                        Hesabınız yok mu?{' '}
                        <Link
                            href="/kayit"
                            className="text-[#6EE7B7] font-semibold hover:text-white transition-colors"
                        >
                            Kayıt Ol
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
