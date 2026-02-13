'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import BlogCard from '@/components/BlogCard';

const mockBlogs = [
    { id: 1, title: 'Gençler İçin İş Arama Stratejileri', slug: 'gencler-icin-is-arama-stratejileri', excerpt: 'İş arayışında olan gençler için etkili stratejiler ve püf noktaları. CV hazırlama, mülakat teknikleri ve networking ipuçları.', content: 'İş arayışı her yaşta zorlayıcı olabilir...', isPublished: true, createdAt: '2026-02-10T08:00:00Z' },
    { id: 2, title: 'Part-time Çalışmanın Avantajları', slug: 'part-time-calismanin-avantajlari', excerpt: 'Üniversite öğrencileri için part-time çalışmanın hem maddi hem de kariyer gelişimi açısından sunduğu fırsatlar.', content: 'Part-time çalışmak öğrenciler için...', isPublished: true, createdAt: '2026-02-08T12:00:00Z' },
    { id: 3, title: 'Freelance Dünyasına Giriş Rehberi', slug: 'freelance-dunyasina-giris-rehberi', excerpt: 'Freelance çalışmaya başlamak isteyenler için kapsamlı bir başlangıç rehberi. Platform seçimi, fiyatlandırma ve müşteri yönetimi.', content: 'Freelance çalışma günümüzde...', isPublished: true, createdAt: '2026-02-05T15:30:00Z' },
    { id: 4, title: 'Dijital Beceriler ve Kariyer Fırsatları', slug: 'dijital-beceriler-kariyer-firsatlari', excerpt: 'Dijital çağda öne çıkan beceriler ve bu becerilerin kariyer fırsatlarına nasıl dönüştürülebileceği hakkında detaylı bilgi.', content: 'Dijital beceriler artık...', isPublished: true, createdAt: '2026-02-02T09:00:00Z' },
    { id: 5, title: 'Etkili CV Nasıl Hazırlanır?', slug: 'etkili-cv-nasil-hazirlanir', excerpt: 'İşverenlerin dikkatini çekecek profesyonel bir CV hazırlamanın adım adım rehberi. Örnekler ve şablonlar.', content: 'CV iş başvurularında...', isPublished: true, createdAt: '2026-01-28T11:00:00Z' },
    { id: 6, title: 'Mülakat Sorularına Hazırlanma İpuçları', slug: 'mulakat-sorularina-hazirlama-ipuclari', excerpt: 'En sık sorulan mülakat soruları ve bu sorulara nasıl etkili cevaplar verebileceğinizi öğrenin.', content: 'İş mülakatları stresli...', isPublished: true, createdAt: '2026-01-25T14:00:00Z' },
];

export default function BlogPage() {
    const publishedBlogs = mockBlogs.filter(b => b.isPublished);

    return (
        <div className="min-h-screen bg-[var(--wincoi-gray-50)] pt-24 sm:pt-28 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1E8E3E] to-[#34D058] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#1E8E3E]/20">
                        <BookOpen size={24} className="text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#181818] mb-3">Blog</h1>
                    <p className="text-gray-500 max-w-lg mx-auto">Kariyer tavsiyeleri, iş dünyası haberleri ve ilham verici içerikler.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publishedBlogs.map((blog, index) => (
                        <BlogCard key={blog.id} title={blog.title} slug={blog.slug} excerpt={blog.excerpt} createdAt={blog.createdAt} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
