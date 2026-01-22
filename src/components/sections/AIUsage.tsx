import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AITool {
    name: string;
    purpose: string;
    prompt: string;
    output: string;
    humanEdit: string;
    verification: string;
}

const AIUsage: React.FC = () => {
    const [expandedTool, setExpandedTool] = useState<number | null>(null);

    const aiTools: AITool[] = [
        {
            name: 'ChatGPT-4 (OpenAI)',
            purpose: 'Nghiên cứu nội dung lịch sử về hành trình tìm đường cứu nước',
            prompt: 'Phân tích chi tiết hành trình 30 năm tìm đường cứu nước của Chủ tịch Hồ Chí Minh từ 1911-1941, các mốc quan trọng và ý nghĩa lịch sử',
            output: 'AI cung cấp outline các giai đoạn: Ra đi 1911, Bôn ba 1911-1917, Giác ngộ 1917-1920, Chuẩn bị 1921-1929, Thành lập Đảng 1930, Trở về 1941',
            humanEdit: 'Đối chiếu với giáo trình Lịch sử Đảng CSVN, bổ sung ngày tháng chính xác (5/6/1911, 3/2/1930, 28/1/1941), điều chỉnh ngôn ngữ trang trọng phù hợp chủ đề',
            verification: 'Giáo trình Lịch sử Đảng CSVN (NXB Chính trị Quốc gia), Hồ Chí Minh Toàn tập, Nghị quyết các Đại hội Đảng'
        },
        {
            name: 'GitHub Copilot',
            purpose: 'Hỗ trợ code React components và animations cho website',
            prompt: 'Tạo Hero section với GSAP animations, Timeline component với Framer Motion cho website lịch sử',
            output: 'Code template React với animations cơ bản cho timeline, cards, hero section',
            humanEdit: 'Tùy chỉnh màu sắc theo theme đỏ-vàng (cờ Việt Nam), thiết kế 6 section theo các giai đoạn lịch sử, điều chỉnh responsive design',
            verification: 'Test thực tế trên browser, kiểm tra performance, responsive trên mobile/tablet/desktop'
        },
        {
            name: 'Claude (Anthropic)',
            purpose: 'Thiết kế câu hỏi quiz và kiểm tra nội dung lịch sử',
            prompt: 'Tạo câu hỏi trắc nghiệm về hành trình tìm đường cứu nước của Bác Hồ, từ 1911 đến 1941 với giải thích chi tiết',
            output: 'Bộ câu hỏi với 4 lựa chọn, đáp án và giải thích về các mốc lịch sử quan trọng',
            humanEdit: 'Đối chiếu đáp án với tài liệu chính thống, điều chỉnh độ khó phù hợp học sinh sinh viên, thêm context và trích dẫn',
            verification: 'Cross-check với Hồ Chí Minh Toàn tập, Văn kiện Đảng, Giáo trình chính thống'
        },
        {
            name: 'Cursor AI',
            purpose: 'Hỗ trợ debug code và tối ưu hóa hiệu suất website',
            prompt: 'Tối ưu hóa React components, sửa lỗi TypeScript, cải thiện animations performance',
            output: 'Suggestions về code optimization, bug fixes, performance improvements',
            humanEdit: 'Review từng suggestion, chỉ áp dụng những thay đổi phù hợp với thiết kế tổng thể, đảm bảo không ảnh hưởng đến UX',
            verification: 'Lighthouse performance audit, manual testing trên các trình duyệt khác nhau'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-20"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
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
                        className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        🤖 Minh Bạch AI
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            AI Hỗ Trợ
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Sử dụng AI có trách nhiệm, minh bạch và liêm chính học thuật trong việc xây dựng website về hành trình tìm đường cứu nước của Bác Hồ
                    </p>
                </motion.div>

                {/* 4 Pillars */}
                <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                    {[
                        { icon: '📋', title: 'Minh Bạch', desc: 'Liệt kê đầy đủ công cụ & prompt', color: 'from-blue-500 to-blue-600' },
                        { icon: '✅', title: 'Có Trách Nhiệm', desc: 'Kiểm chứng bằng nguồn chính thống', color: 'from-green-500 to-green-600' },
                        { icon: '🎨', title: 'Sáng Tạo', desc: 'AI hỗ trợ, không thay thế', color: 'from-yellow-500 to-yellow-600' },
                        { icon: '🎓', title: 'Liêm Chính', desc: 'Cam kết học thuật rõ ràng', color: 'from-red-500 to-red-600' }
                    ].map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`bg-gradient-to-br ${pillar.color} rounded-2xl shadow-xl p-6 text-white text-center`}
                        >
                            <motion.div
                                className="text-5xl mb-4"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                            >
                                {pillar.icon}
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                            <p className="text-sm opacity-90">{pillar.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* AI Tools Detail */}
                <div className="max-w-5xl mx-auto space-y-6 mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Chi Tiết Sử Dụng AI
                    </h3>

                    {aiTools.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden"
                        >
                            <motion.button
                                onClick={() => setExpandedTool(expandedTool === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all"
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="text-3xl"
                                        animate={{ rotate: expandedTool === index ? 180 : 0 }}
                                    >
                                        {expandedTool === index ? '🔽' : '▶️'}
                                    </motion.div>
                                    <div className="text-left">
                                        <h4 className="text-xl font-bold text-gray-900">{tool.name}</h4>
                                        <p className="text-sm text-gray-600">{tool.purpose}</p>
                                    </div>
                                </div>
                                <motion.div
                                    className="text-2xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                >
                                    🤖
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {expandedTool === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-6"
                                    >
                                        <div className="space-y-4 pt-4 border-t-2 border-gray-100">
                                            <div className="bg-blue-50 rounded-xl p-4">
                                                <h5 className="font-bold text-blue-900 mb-2">📝 Prompt:</h5>
                                                <p className="text-gray-700 italic">"{tool.prompt}"</p>
                                            </div>

                                            <div className="bg-green-50 rounded-xl p-4">
                                                <h5 className="font-bold text-green-900 mb-2">🤖 AI Output:</h5>
                                                <p className="text-gray-700">{tool.output}</p>
                                            </div>

                                            <div className="bg-yellow-50 rounded-xl p-4">
                                                <h5 className="font-bold text-yellow-900 mb-2">✏️ Chỉnh Sửa Của Sinh Viên:</h5>
                                                <p className="text-gray-700">{tool.humanEdit}</p>
                                            </div>

                                            <div className="bg-purple-50 rounded-xl p-4">
                                                <h5 className="font-bold text-purple-900 mb-2">✅ Nguồn Kiểm Chứng:</h5>
                                                <p className="text-gray-700">{tool.verification}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Academic Integrity Commitment */}
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-gradient-to-br from-red-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
                        <div className="flex items-start gap-6 mb-6">
                            <motion.div
                                className="text-6xl"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                📜
                            </motion.div>
                            <div>
                                <h3 className="text-3xl font-bold mb-4">Cam Kết Liêm Chính Học Thuật</h3>
                            </div>
                        </div>

                        <div className="space-y-4 text-lg">
                            <motion.div
                                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-2xl">✓</span>
                                <p>Chúng tôi cam kết <strong>không để AI làm thay hoàn toàn</strong> sản phẩm này.</p>
                            </motion.div>

                            <motion.div
                                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-2xl">✓</span>
                                <p>Chúng tôi đã <strong>kiểm chứng mọi thông tin lịch sử</strong> với giáo trình chính thống và tài liệu của Đảng về Chủ tịch Hồ Chí Minh.</p>
                            </motion.div>

                            <motion.div
                                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-2xl">✓</span>
                                <p>Chúng tôi <strong>chịu trách nhiệm hoàn toàn</strong> về nội dung học thuật trong sản phẩm.</p>
                            </motion.div>

                            <motion.div
                                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
                                whileHover={{ scale: 1.02 }}
                            >
                                <span className="text-2xl">✓</span>
                                <p>AI chỉ đóng vai trò <strong>hỗ trợ công cụ</strong> (code, animations, layout), không thay thế tư duy phản biện và nghiên cứu lịch sử.</p>
                            </motion.div>
                        </div>

                        {/* Team Members */}
                        <motion.div
                            className="mt-8 p-6 bg-white text-gray-900 rounded-xl"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h4 className="text-xl font-bold mb-4 text-center text-red-600">👥 Thành Viên Nhóm</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-3 bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl">
                                    <div className="text-3xl mb-2">👨‍💻</div>
                                    <p className="font-bold text-gray-900">Nhật Nam</p>
                                </div>
                                <div className="text-center p-3 bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl">
                                    <div className="text-3xl mb-2">👨‍💻</div>
                                    <p className="font-bold text-gray-900">Thành Tâm</p>
                                </div>
                                <div className="text-center p-3 bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl">
                                    <div className="text-3xl mb-2">👨‍💻</div>
                                    <p className="font-bold text-gray-900">Thanh Trường</p>
                                </div>
                                <div className="text-center p-3 bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl">
                                    <div className="text-3xl mb-2">👩‍💻</div>
                                    <p className="font-bold text-gray-900">Anh Thư</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold text-gray-700">Chủ đề: Hành Trình 30 Năm Tìm Đường Cứu Nước của Chủ Tịch Hồ Chí Minh (1911-1941)</p>
                                <p className="text-sm text-gray-500 mt-2">Ngày cam kết: 22/01/2026</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AIUsage;
