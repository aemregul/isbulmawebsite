'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }

        if (form.password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        setLoading(true);

        // Simüle: Gerçek backend entegrasyonu sonra yapılacak
        setTimeout(() => {
            localStorage.setItem(
                'wincoi_user',
                JSON.stringify({
                    name: `${form.firstName} ${form.lastName}`,
                    email: form.email,
                    role: 'user',
                })
            );
            setLoading(false);
            router.push('/');
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20 pb-10" style={{ background: 'linear-gradient(160deg, #0F0E47 0%, #1B1A9E 25%, #2623D2 45%, #116DFF 65%, #1B1A9E 85%, #0A0A1B 100%)' }}>
            {/* Animated blobs */}
            <div className="absolute w-[500px] h-[500px] rounded-full bg-[#5A48F5] opacity-20 blur-[80px] -top-20 -left-40" />
            <div className="absolute w-[600px] h-[600px] rounded-full bg-[#116DFF] opacity-15 blur-[100px] -bottom-40 -right-40" />
            <div className="absolute w-[300px] h-[300px] rounded-full bg-[#3B82F6] opacity-20 blur-[60px] top-1/3 right-1/4" />

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
                            <Image src="/logo.png" alt="Wincoi" width={160} height={48} className="h-10 w-auto brightness-0 invert" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-white mb-1">Kayıt Ol</h1>
                        <p className="text-white/50 text-sm">Hemen ücretsiz hesap oluşturun</p>
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-semibold text-white/70 mb-2">İsim</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        placeholder="Adınız"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/[0.1] focus:border-white/[0.2] transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-white/70 mb-2">Soyisim</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        placeholder="Soyadınız"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/[0.1] focus:border-white/[0.2] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">E-posta</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="ornek@email.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder:text-white/25 focus:outline-none focus:bg-white/[0.1] focus:border-white/[0.2] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white/70 mb-2">Şifre</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="En az 6 karakter"
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
                            className="w-full py-3.5 bg-gradient-to-r from-[#2623D2] to-[#116DFF] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#2623D2]/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed !mt-6"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Kayıt Ol
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-white/40 mt-6">
                        Zaten hesabınız var mı?{' '}
                        <Link
                            href="/giris"
                            className="text-[#818CF8] font-semibold hover:text-white transition-colors"
                        >
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
