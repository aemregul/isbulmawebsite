'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';

interface ListingCardProps {
    title: string;
    description: string;
    city: string;
    phone: string;
    createdAt: string;
    index?: number;
}

export default function ListingCard({
    title,
    description,
    city,
    phone,
    createdAt,
    index = 0,
}: ListingCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            <div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={(e) => {
                    handleMouseLeave();
                    e.currentTarget.style.boxShadow = 'none';
                }}
                className="card-shimmer bg-white rounded-2xl overflow-hidden border border-gray-100/80 flex flex-col h-full group cursor-pointer"
                style={{
                    transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
                    willChange: 'transform',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(30, 142, 62, 0.1), 0 0 0 1px rgba(30, 142, 62, 0.05)';
                }}
            >
                {/* Top accent with glow */}
                <div className="relative h-1">
                    <div className="h-full bg-gradient-to-r from-[#1E8E3E] to-[#34D058]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1E8E3E] to-[#34D058] blur-sm opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-[17px] font-bold text-[#181818] leading-snug line-clamp-2 group-hover:text-[#1E8E3E] transition-colors duration-300">
                            {title}
                        </h3>
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0 shrink-0">
                            <ArrowUpRight size={16} className="text-[#1E8E3E]" />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-3 flex-1">
                        {description}
                    </p>

                    {/* Info badges with stagger */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ECFDF5] text-[#1E8E3E] rounded-full text-xs font-semibold group-hover:bg-[#1E8E3E] group-hover:text-white transition-colors duration-300">
                            <MapPin size={13} />
                            {city}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                            <Phone size={13} />
                            {phone}
                        </span>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-gray-400 text-xs mt-auto">
                        <Clock size={13} />
                        <span>{formatDate(createdAt)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
