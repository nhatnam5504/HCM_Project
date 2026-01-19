import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { sendMessageToGemini } from '../../services/geminiService';

interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
    timestamp: Date;
}

const FloatingChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '0',
            role: 'model',
            content: 'Xin chào! 👋 Tôi là **VietInnov-Spark Assistant** - trợ lý học tập chuyên về công cuộc đổi mới và cải cách kinh tế Việt Nam.\n\n📚 Tôi sẽ trả lời dựa trên **Chương 3** của giáo trình Lịch sử Đảng CSVN 2021.\n\n💡 Hãy hỏi tôi về:\n- Cải cách giá-lương-tiền 1985 và thất bại của nó\n- Tại sao phải chuyển sang Đổi mới toàn diện?\n- Bài học từ quá trình này\n- Các quyết định chiến lược của Đảng',
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            // Chuẩn bị lịch sử hội thoại cho Gemini
            const conversationHistory = messages.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            }));

            const response = await sendMessageToGemini(input, conversationHistory as any);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                content: response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
            setError(errorMessage);
            console.error('Chat error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-28 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-2xl hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="Mở trợ lý Đổi mới"
                    >
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT04EX6fn9FNc0mSlFroeMEEgG5IqVRC9yDWQ&s"
                            alt="VietInnov Spark"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-8 right-8 w-96 h-[600px] rounded-2xl shadow-2xl overflow-hidden bg-white z-50 flex flex-col"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 20 }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MessageCircle size={24} />
                                <div>
                                    <h3 className="font-bold text-lg">VietInnov-Spark</h3>
                                    <p className="text-xs opacity-90">Trợ lý Lịch sử Đổi mới</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="hover:bg-white/20 p-2 rounded-lg transition"
                                    title={isMinimized ? 'Mở rộng' : 'Thu gọn'}
                                >
                                    {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsMinimized(false);
                                    }}
                                    className="hover:bg-white/20 p-2 rounded-lg transition"
                                    title="Đóng"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs px-4 py-3 rounded-lg user-select-text select-text ${message.role === 'user'
                                                    ? 'bg-red-500 text-white rounded-br-none'
                                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap break-words">
                                                    {message.content.split('\n').map((line, i) => (
                                                        <React.Fragment key={i}>
                                                            {line.includes('**') ? (
                                                                <>
                                                                    {line.split(/(\*\*.*?\*\*)/).map((part, j) => (
                                                                        part.startsWith('**') ? (
                                                                            <strong key={j}>{part.slice(2, -2)}</strong>
                                                                        ) : (
                                                                            <span key={j}>{part}</span>
                                                                        )
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                line
                                                            )}
                                                            {i < line.length - 1 && <br />}
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-200 rounded-bl-none flex items-center gap-2">
                                                <Loader size={16} className="animate-spin" />
                                                <span className="text-sm">Đang xử lý...</span>
                                            </div>
                                        </motion.div>
                                    )}

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-center"
                                        >
                                            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-200">
                                                ⚠️ {error}
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="border-t border-gray-200 p-4 bg-white">
                                    <div className="flex gap-2">
                                        <textarea
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Hỏi về Đổi mới Việt Nam..."
                                            rows={2}
                                            disabled={isLoading}
                                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none disabled:bg-gray-100 text-sm text-gray-900 placeholder-gray-500 bg-white"
                                        />
                                        <motion.button
                                            onClick={handleSendMessage}
                                            disabled={isLoading || !input.trim()}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all h-fit"
                                        >
                                            <Send size={20} />
                                        </motion.button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingChatBot;
