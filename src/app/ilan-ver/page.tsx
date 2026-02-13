'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FileText, MapPin, Phone, Type, AlignLeft, ChevronDown, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Kocaeli', 'Mersin', 'Diyarbakır', 'Eskişehir', 'Samsun', 'Trabzon', 'Muğla', 'Denizli'];

export default function CreateListingPage() {
    const router = useRouter();
    const [form, setForm] = useState({ title: '', description: '', phone: '', city: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.title || !form.description || !form.phone || !form.city) { setError('Lütfen tüm alanları doldurun.'); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 pt-20">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="text-center max-w-md">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-[#181818] mb-3">İlanınız Başarıyla Gönderildi!</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">İlanınız admin onayından geçtikten sonra yayına alınacaktır. Bu süreç genellikle 24 saat içinde tamamlanır.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => router.push('/')} className="btn-primary">Ana Sayfaya Dön <ArrowRight size={18} /></motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setSuccess(false); setForm({ title: '', description: '', phone: '', city: '' }); }} className="btn-secondary">Yeni İlan Ver</motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--wincoi-gray-50)] pt-24 sm:pt-28 pb-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1E8E3E] to-[#34D058] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1E8E3E]/20"><FileText size={24} className="text-white" /></div>
                    <h1 className="text-3xl font-bold text-[#181818] mb-2">İlan Ver</h1>
                    <p className="text-gray-500">İlanınızı oluşturun, onay sonrası yayına alınsın.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
                    <AlertTriangle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div><p className="text-amber-800 text-sm font-semibold">Önemli Bilgi</p><p className="text-amber-700 text-sm mt-1">İlanınız doğrudan yayına düşmez. Admin tarafından onaylandıktan sonra ana sayfada görünür.</p></div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 border border-red-100">{error}</motion.div>}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2"><Type size={14} className="inline mr-1.5" />Başlık</label>
                            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="İlan başlığını yazın..." className="input-field" maxLength={100} />
                            <p className="text-gray-400 text-xs mt-1.5">{form.title.length}/100 karakter</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2"><AlignLeft size={14} className="inline mr-1.5" />Açıklama</label>
                            <textarea name="description" value={form.description} onChange={handleChange} placeholder="İlan detaylarını yazın..." rows={5} className="input-field resize-none" maxLength={1000} />
                            <p className="text-gray-400 text-xs mt-1.5">{form.description.length}/1000 karakter</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2"><Phone size={14} className="inline mr-1.5" />Telefon</label>
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="05XX XXX XX XX" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2"><MapPin size={14} className="inline mr-1.5" />Şehir</label>
                                <div className="relative">
                                    <select name="city" value={form.city} onChange={handleChange} className="input-field appearance-none pr-10 cursor-pointer">
                                        <option value="">Şehir seçin...</option>
                                        {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={loading} className="btn-primary w-full !rounded-xl !py-4 !text-base disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>İlanı Gönder <ArrowRight size={18} /></>}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
