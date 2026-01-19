import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

const HistoryTimeline: React.FC = () => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(timelineRef, { once: false });

    const events: TimelineEvent[] = [
        {
            year: '1975',
            title: 'Thống Nhất Đất Nước',
            description: 'Hoàn thành sự nghiệp thống nhất đất nước, bước vào giai đoạn quá độ lên chủ nghĩa xã hội trên phạm vi cả nước.',
            icon: '🇻🇳',
            color: 'from-red-500 to-red-700',
        },
        {
            year: '1976',
            title: 'Đại Hội IV',
            description: 'Đề ra đường lối xây dựng chủ nghĩa xã hội ở miền Bắc và hoàn thành cách mạng dân tộc dân chủ nhân dân ở miền Nam.',
            icon: '📜',
            color: 'from-yellow-500 to-yellow-700',
        },
        {
            year: '1982',
            title: 'Đại Hội V',
            description: 'Xác định nhiệm vụ xây dựng và bảo vệ Tổ quốc xã hội chủ nghĩa. Bắt đầu nhận thức về cải cách kinh tế.',
            icon: '⚙️',
            color: 'from-orange-500 to-orange-700',
        },
        {
            year: '1985',
            title: 'Cải Cách Giá-Lương-Tiền',
            description: 'Cuộc cải cách "xương máu" đầu tiên nhằm khắc phục lạm phát và tái cơ cấu nền kinh tế. Là tiền đề quan trọng cho đổi mới.',
            icon: '💰',
            color: 'from-purple-500 to-purple-700',
        },
        {
            year: '1986',
            title: 'Đại Hội VI - Đổi Mới Toàn Diện',
            description: 'Bước ngoặt lịch sử! Đảng quyết định đổi mới toàn diện, chuyển sang nền kinh tế thị trường định hướng xã hội chủ nghĩa.',
            icon: '🚀',
            color: 'from-red-600 to-yellow-600',
        },
        {
            year: '1991',
            title: 'Đại Hội VII',
            description: 'Tiếp tục đẩy mạnh đổi mới, mở cửa hội nhập, phát triển nền kinh tế nhiều thành phần.',
            icon: '🌏',
            color: 'from-blue-500 to-blue-700',
        },
        {
            year: '2006',
            title: 'Gia Nhập WTO',
            description: 'Việt Nam chính thức trở thành thành viên thứ 150 của Tổ chức Thương mại Thế giới.',
            icon: '🌐',
            color: 'from-green-500 to-green-700',
        },
        {
            year: '2018',
            title: 'Hội Nhập Sâu Rộng',
            description: 'Việt Nam đã ký kết hơn 15 FTA, trở thành điểm sáng về tăng trưởng kinh tế trong khu vực.',
            icon: '📈',
            color: 'from-teal-500 to-teal-700',
        },
    ];

    useEffect(() => {
        // Timeline line animation is handled by CSS and Framer Motion
        // No need for GSAP here as we're using Framer Motion for animations
        return () => { };
    }, []);

    return (
        <section ref={timelineRef} className="py-20 bg-gradient-to-b from-white to-red-50">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Hành Trình Lịch Sử
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Timeline <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">Đổi Mới</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Từ khủng hoảng đến thịnh vượng - Hành trình vượt khó của dân tộc Việt Nam
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Center Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 via-yellow-500 to-green-500 timeline-line origin-top" />

                    {/* Events */}
                    <div className="space-y-16">
                        {events.map((event, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <motion.div
                                    key={event.year}
                                    className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    {/* Content Card */}
                                    <motion.div
                                        className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl transition-all">
                                            <motion.div
                                                className={`inline-block px-4 py-2 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-bold mb-3`}
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                            >
                                                {event.year}
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                            <p className="text-gray-600">{event.description}</p>
                                        </div>
                                    </motion.div>

                                    {/* Icon Circle */}
                                    <motion.div
                                        className="absolute left-1/2 transform -translate-x-1/2 z-10"
                                        whileHover={{ scale: 1.3, rotate: 360 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                    >
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center text-3xl shadow-lg border-4 border-white`}>
                                            {event.icon}
                                        </div>
                                    </motion.div>

                                    {/* Empty space for layout */}
                                    <div className="w-5/12" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                    >
                        Tìm Hiểu Chi Tiết →
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default HistoryTimeline;
