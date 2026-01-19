import React from 'react';
import { motion } from 'framer-motion';

interface ModernChallenge {
    id: number;
    icon: string;
    title: string;
    description: string;
    examples: string[];
}

const ModernContext: React.FC = () => {
    const challenges: ModernChallenge[] = [
        {
            id: 1,
            icon: '🤖',
            title: 'Cách Mạng Công Nghiệp 4.0',
            description: 'Việt Nam đẩy mạnh chuyển đổi số, phát triển AI, IoT và công nghệ cao',
            examples: [
                'Make in Vietnam - Sản xuất sản phẩm công nghệ nội địa',
                'Chính phủ điện tử - Digital Government 2025',
                'Startup công nghệ - Unicorn như VNG, VNPay'
            ]
        },
        {
            id: 2,
            icon: '🌱',
            title: 'Phát Triển Bền Vững',
            description: 'Cam kết Net Zero 2050, kinh tế xanh và bảo vệ môi trường',
            examples: [
                'Năng lượng tái tạo - 15-20% năm 2030',
                'Kinh tế tuần hoàn - Giảm rác thải nhựa',
                'Nông nghiệp công nghệ cao'
            ]
        },
        {
            id: 3,
            icon: '🌏',
            title: 'Hội Nhập Sâu Rộng',
            description: 'Việt Nam tham gia CPTPP, EVFTA, RCEP và nhiều FTA khác',
            examples: [
                'Xuất khẩu vượt 350 tỷ USD/năm',
                'Điểm đến hấp dẫn cho FDI toàn cầu',
                'Trung tâm sản xuất công nghệ châu Á'
            ]
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-teal-300 rounded-full filter blur-3xl opacity-20"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        🚀 Tính Cập Nhật
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Việt Nam <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Hiện Đại</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Gắn kết bài học đổi mới với bối cảnh kinh tế - xã hội - chính trị hiện nay
                    </p>
                </motion.div>

                {/* Challenges Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                    {challenges.map((challenge, index) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all"
                        >
                            <motion.div
                                className="text-6xl mb-6"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                            >
                                {challenge.icon}
                            </motion.div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{challenge.title}</h3>
                            <p className="text-gray-600 mb-6">{challenge.description}</p>

                            <div className="space-y-3">
                                {challenge.examples.map((example, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false }}
                                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-teal-600 font-bold">✓</span>
                                        <span className="text-sm text-gray-700">{example}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Case Study */}
                <motion.div
                    className="max-w-5xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
                        <div className="flex items-start gap-6 mb-8">
                            <motion.div
                                className="text-6xl"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                📖
                            </motion.div>
                            <div>
                                <h3 className="text-3xl font-bold mb-4">Case Study: Đại Dịch COVID-19</h3>
                                <p className="text-xl leading-relaxed mb-6">
                                    Việt Nam đã vận dụng tinh thần đổi mới và sáng tạo để ứng phó linh hoạt với đại dịch:
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: 'Chuyển Đổi Số Nhanh',
                                    items: ['Họp trực tuyến', 'Làm việc từ xa', 'Dịch vụ công trực tuyến']
                                },
                                {
                                    title: 'Kinh Tế Số Bùng Nổ',
                                    items: ['E-commerce tăng 30%', 'Fintech phát triển', 'Giao hàng công nghệ']
                                },
                                {
                                    title: 'Chính Sách Linh Hoạt',
                                    items: ['Hỗ trợ doanh nghiệp', 'An sinh xã hội', 'Vaccine "ngoại giao"']
                                },
                                {
                                    title: 'Sản Xuất Vaccine',
                                    items: ['Nanocovax', 'Covivac', 'Hợp tác quốc tế']
                                }
                            ].map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                                >
                                    <h4 className="text-xl font-bold mb-4">{section.title}</h4>
                                    <ul className="space-y-2">
                                        {section.items.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <span className="text-yellow-400">▸</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="mt-8 p-6 bg-white/20 backdrop-blur-sm rounded-xl"
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="text-lg font-semibold">
                                💡 <strong>Bài học:</strong> Tinh thần đổi mới, sáng tạo và dám nghĩ dám làm của Đại hội VI
                                vẫn là kim chỉ nam cho Việt Nam trong mọi hoàn cảnh!
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ModernContext;
