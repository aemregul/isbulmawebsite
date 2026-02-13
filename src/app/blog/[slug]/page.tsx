'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowLeft, BookOpen } from 'lucide-react';

const mockBlogs: Record<string, { title: string; content: string; createdAt: string }> = {
    'gencler-icin-is-arama-stratejileri': {
        title: 'Gençler İçin İş Arama Stratejileri',
        createdAt: '2026-02-10T08:00:00Z',
        content: `İş arayışı her yaşta zorlayıcı olabilir, ancak doğru stratejilerle süreci çok daha verimli hale getirebilirsiniz.\n\n## CV Hazırlama\n\nProfesyonel bir CV, iş arayışınızın en önemli aracıdır. CV'nizi hazırlarken şunlara dikkat edin:\n\n- **Net ve öz olun**: CV'niz bir sayfayı geçmemelidir\n- **Anahtar kelimeleri kullanın**: İş ilanındaki anahtar kelimeleri CV'nizde de kullanın\n- **Başarılarınızı ölçülebilir şekilde ifade edin**: "Satışları %20 artırdım" gibi\n\n## Mülakat Teknikleri\n\nMülakat öncesi hazırlık çok önemlidir:\n\n1. Şirket hakkında araştırma yapın\n2. Sık sorulan sorulara hazırlıklı olun\n3. STAR metodunu kullanın (Durum, Görev, Eylem, Sonuç)\n\n## Networking\n\nBağlantılarınız kariyer yolculuğunuzda en önemli varlığınızdır. LinkedIn profilinizi güncel tutun ve sektörel etkinliklere katılın.\n\nUnutmayın, her "hayır" sizi bir "evet"e yaklaştırır!`,
    },
    'part-time-calismanin-avantajlari': {
        title: 'Part-time Çalışmanın Avantajları',
        createdAt: '2026-02-08T12:00:00Z',
        content: `Üniversite öğrencileri için part-time çalışmak, hem maddi kazanç sağlar hem de kariyer gelişimine katkıda bulunur.\n\n## Maddi Avantajlar\n\nPart-time çalışma ile öğrenim sürecinizde maddi bağımsızlığınızı kazanabilirsiniz. Harçlık ihtiyacınızı karşılayabilir, hatta birikim yapabilirsiniz.\n\n## Deneyim Kazanma\n\nMezun olduktan sonra iş ararken en önemli kriter deneyimdir. Part-time çalışma ile:\n\n- İş disiplini kazanırsınız\n- Takım çalışması deneyimi edinirsiniz\n- Sektörel bilgi birikiminiz artar\n\n## Zaman Yönetimi\n\nPart-time çalışmak, zaman yönetimi becerilerinizi geliştirir. Bu beceri hayatınızın her alanında size avantaj sağlayacaktır.`,
    },
    'freelance-dunyasina-giris-rehberi': {
        title: 'Freelance Dünyasına Giriş Rehberi',
        createdAt: '2026-02-05T15:30:00Z',
        content: `Freelance çalışma, özgürlük ve esneklik arayanlar için mükemmel bir kariyer yoludur.\n\n## Nereden Başlamalı?\n\n1. **Becerilerinizi belirleyin**: Hangi alanlarda hizmet verebileceğinizi netleştirin\n2. **Portföy oluşturun**: Önceki çalışmalarınızı sergileyin\n3. **Platform seçin**: Upwork, Fiverr, Freelancer gibi platformlarda profil oluşturun\n\n## Fiyatlandırma\n\nDoğru fiyatlandırma freelance başarının anahtarıdır. Piyasa araştırması yaparak rekabetçi fiyatlar belirleyin.\n\n## Müşteri Yönetimi\n\n- Net iletişim kurun\n- Teslim tarihlerine uyun\n- Geri bildirime açık olun\n- Profesyonel ilişkiler sürdürün`,
    },
    'dijital-beceriler-kariyer-firsatlari': {
        title: 'Dijital Beceriler ve Kariyer Fırsatları',
        createdAt: '2026-02-02T09:00:00Z',
        content: `Dijital beceriler, 2026 iş piyasasında en çok aranan yetkinlikler arasında yer almaktadır.\n\n## Öne Çıkan Dijital Beceriler\n\n- **Programlama**: Python, JavaScript, React\n- **Veri Analizi**: Excel, SQL, Power BI\n- **Dijital Pazarlama**: SEO, sosyal medya yönetimi\n- **UI/UX Tasarım**: Figma, Adobe XD\n\n## Nasıl Öğrenebilirsiniz?\n\nÇevrimiçi platformlar sayesinde bu becerileri ücretsiz veya uygun fiyatlarla öğrenebilirsiniz. Coursera, Udemy ve YouTube harika kaynaklar sunar.`,
    },
    'etkili-cv-nasil-hazirlanir': {
        title: 'Etkili CV Nasıl Hazırlanır?',
        createdAt: '2026-01-28T11:00:00Z',
        content: `CV, iş başvurularında ilk izlenimi oluşturan en kritik dokümandır.\n\n## CV Yapısı\n\n1. **Kişisel Bilgiler**: İsim, telefon, e-posta\n2. **Özet**: 2-3 cümlelik profesyonel özet\n3. **Deneyim**: En güncel deneyimden başlayarak\n4. **Eğitim**: Üniversite ve ilgili sertifikalar\n5. **Beceriler**: Teknik ve soft beceriler\n\n## Sık Yapılan Hatalar\n\n- Çok uzun CV (1 sayfayı geçmemeli)\n- Yazım hataları\n- Güncel olmayan bilgiler\n- Fotoğraf kullanmama (Türkiye'de beklenir)`,
    },
    'mulakat-sorularina-hazirlama-ipuclari': {
        title: 'Mülakat Sorularına Hazırlanma İpuçları',
        createdAt: '2026-01-25T14:00:00Z',
        content: `İş mülakatları stresli olabilir, ancak doğru hazırlık ile kendinize güvenle girebilirsiniz.\n\n## En Sık Sorulan Sorular\n\n1. **Kendinizi tanıtır mısınız?** - 2 dakikalık profesyonel hikayenizi hazırlayın\n2. **Neden bu şirkette çalışmak istiyorsunuz?** - Şirket araştırması yapın\n3. **Güçlü ve zayıf yönleriniz neler?** - Dürüst ama stratejik olun\n\n## Genel İpuçları\n\n- Zamanında gidin (10 dakika erken ideal)\n- Profesyonel giyinin\n- Sorular sorun (bu, ilginizi gösterir)\n- Teşekkür e-postası gönderin`,
    },
};

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const blog = mockBlogs[slug];

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <div className="w-20 h-20 bg-[#ECFDF5] rounded-2xl flex items-center justify-center mx-auto mb-4"><BookOpen size={32} className="text-[#1E8E3E]" /></div>
                    <h2 className="text-2xl font-bold text-[#181818] mb-2">Blog Yazısı Bulunamadı</h2>
                    <p className="text-gray-500 mb-6">Aradığınız içerik mevcut değil.</p>
                    <Link href="/blog" className="btn-primary">Bloga Dön</Link>
                </div>
            </div>
        );
    }

    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="min-h-screen bg-[var(--wincoi-gray-50)] pt-24 sm:pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Link href="/blog" className="inline-flex items-center gap-2 text-[#1E8E3E] font-semibold text-sm mb-8 hover:gap-3 transition-all">
                        <ArrowLeft size={16} /> Tüm Yazılar
                    </Link>

                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="h-48 sm:h-64 bg-gradient-to-br from-[#1E8E3E] to-[#34D058] flex items-center justify-center p-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center leading-snug">{blog.title}</h1>
                        </div>
                        <div className="p-6 sm:p-10">
                            <div className="flex items-center gap-2 text-gray-400 text-sm mb-8"><Calendar size={15} /><span>{formatDate(blog.createdAt)}</span></div>
                            <div className="prose prose-lg max-w-none prose-headings:text-[#181818] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-[#181818]">
                                {blog.content.split('\n').map((line, i) => {
                                    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-[#181818] mt-8 mb-4">{line.replace('## ', '')}</h2>;
                                    if (line.startsWith('- **')) {
                                        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
                                        return match ? <li key={i} className="text-gray-600 mb-2 ml-4 list-disc"><strong className="text-[#181818]">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}</li> : <p key={i}>{line}</p>;
                                    }
                                    if (line.match(/^\d+\. \*\*/)) {
                                        const match = line.match(/^\d+\.\s*\*\*(.+?)\*\*\s*[-–]?\s*(.*)/);
                                        return match ? <li key={i} className="text-gray-600 mb-2 ml-4 list-decimal"><strong className="text-[#181818]">{match[1]}</strong>{match[2] ? ` - ${match[2]}` : ''}</li> : <p key={i}>{line}</p>;
                                    }
                                    if (line.startsWith('- ')) return <li key={i} className="text-gray-600 mb-2 ml-4 list-disc">{line.replace('- ', '')}</li>;
                                    if (line.trim() === '') return <br key={i} />;
                                    return <p key={i} className="text-gray-600 leading-relaxed mb-4">{line}</p>;
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
