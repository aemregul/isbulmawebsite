'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
    title: string;
    slug: string;
    excerpt: string;
    createdAt: string;
    index?: number;
}

export default function BlogCard({
    title,
    slug,
    excerpt,
    createdAt,
    index = 0,
}: BlogCardProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    // Generate a gradient based on index
    const gradients = [
        'from-[#1E8E3E] to-[#34D058]',
        'from-[#166534] to-[#1E8E3E]',
        'from-[#34D058] to-[#22C55E]',
        'from-[#1E8E3E] to-[#16A34A]',
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-50px' }}
        >
            <Link href={`/blog/${slug}`} className="group block">
                <div className="card-hover bg-white rounded-2xl overflow-hidden border border-gray-100 h-full flex flex-col">
                    {/* Top Gradient Banner */}
                    <div
                        className={`h-32 sm:h-40 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center p-4 sm:p-6`}
                    >
                        <h3 className="text-white text-lg sm:text-xl font-bold text-center leading-snug line-clamp-3">
                            {title}
                        </h3>
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col flex-1">
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3 flex-1">
                            {excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                                <Calendar size={13} />
                                {formatDate(createdAt)}
                            </span>

                            <span className="inline-flex items-center gap-1 text-[#1E8E3E] text-sm font-semibold group-hover:gap-2 transition-all">
                                Devamını Oku
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
