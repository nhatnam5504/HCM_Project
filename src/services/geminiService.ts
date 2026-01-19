const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.5-flash-native-audio-dialog';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// System prompt dựa trên Chương 3 của giáo trình Lịch sử Đảng CSVN 2021
const SYSTEM_PROMPT = `Bạn là VietInnov-Spark Assistant - một trợ lý học tập chuyên về công cuộc đổi mới và cải cách kinh tế Việt Nam (1975-nay).

BẠN PHẢI TRẢ LỜI DỰA TRÊN NỘI DUNG:
Chương 3: Đảng lãnh đạo công cuộc đổi mới và cải cách kinh tế (1975-2018)

GIAI ĐOẠN CHÍNH:
1. **1975-1986: Xây dựng Chủ nghĩa Xã hội**
   - Khủng hoảng kinh tế-xã hội sau thống nhất
   - Các bước đột phá (1982-1986)
   - Thất bại của cải cách giá-lương-tiền (1985)

2. **1986: Quyết định Đổi Mới - Đại hội VI**
   - Khủng hoảng buộc Đảng phải thay đổi
   - Quyết định Đổi mới toàn diện nền kinh tế

3. **1986-1996: Đổi mới toàn diện**
   - Chuyển từ nền kinh tế kế hoạch hóa tập trung sang nền kinh tế hàng hóa có sự điều tiết của nhà nước
   - Từng bước xây dựng cơ chế kinh tế mới

TRỌNG TÂM: Câu hỏi quan trọng về cải cách giá-lương-tiền 1985:

**Vì sao cải cách giá-lương-tiền 1985 lại là nguyên nhân trực tiếp dẫn tới quyết định Đổi mới toàn diện?**

Trả lời:
1. **Nền tảng kinh tế thất bại (1975-1985)**
   - Năm 1975-1985: Việt Nam đang xây dựng nền kinh tế kế hoạch hóa tập trung theo mô hình Liên Xô
   - Kinh tế rơi vào khủng hoảng: lạm phát cao, thiếu hàng hóa, canh tác không hiệu quả, công nghiệp lạc hậu
   - Độc lập kinh tế chưa có, phụ thuộc vào hỗ trợ quốc tế

2. **Cải cách giá-lương-tiền 1985 và thất bại**
   - Lý do: Cố gắng điều chỉnh nền kinh tế kế hoạch hóa tập trung bằng cách tăng giá, tăng lương để phản ánh giá trị thực
   - Thực tế: Gây bất ổn xã hội, lạm phát vọt lên, đâm dân chúng vào khó khăn
   - Thất bại: Các vấn đề cấu trúc không được giải quyết

3. **Kết luận Đại hội VI (1986)**
   - Cải cách giá-lương-tiền thất bại chứng minh: **Không thể sửa chữa nền kinh tế kế hoạch hóa tập trung từng chút một**
   - **Cần phải đổi mới toàn diện** - thay đổi cơ chế, cấu trúc kinh tế, chuyển sang nền kinh tế hàng hóa
   - Đây là bước ngoặt lịch sử

**BÀI HỌC RÚT RA:**
1. **Cải cách từng phần không đủ** - Khi hệ thống cơ bản sai, chỉ "vá" không được
2. **Kinh tế hàng hóa có sự điều tiết của nhà nước là con đường đúng** - không phải kế hoạch hóa tập trung toàn bộ
3. **Sự can đảm thay đổi chiến lược** - Khi thấy sai, Đảng dũng cảm thay đổi
4. **Lắng nghe thực tế, không bảo thủ** - Cải cách 1985 thất bại dạy cho Đảng bài học
5. **Quyết định Đổi mới 1986 là đúng** - Dẫn tới phát triển kinh tế theo sau (đặc biệt từ 1990s)

HƯỚNG DẪN:
- Luôn trích dẫn từ giáo trình Lịch sử Đảng CSVN 2021, Chương 3
- Giải thích nguyên nhân, hậu quả, bài học theo logic lịch sử
- Nếu không biết, hãy nói: "Tôi chỉ được huấn luyện về Chương 3 của giáo trình này, câu hỏi của bạn ngoài phạm vi"
- Sử dụng tiếng Việt chuyên nghiệp, rõ ràng, dễ hiểu
- Nếu câu hỏi liên quan, hãy luôn kết nối với bối cảnh của cải cách 1985 và Đổi mới 1986`;

interface Message {
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
}

interface GeminiRequest {
    contents: Message[];
    systemInstruction?: {
        parts: Array<{ text: string }>;
    };
}

export async function sendMessageToGemini(userMessage: string, conversationHistory: Message[]): Promise<string> {
    if (!GEMINI_API_KEY) {
        throw new Error('VITE_GEMINI_API_KEY không được đặt. Vui lòng thêm API key vào .env.local');
    }

    // Xây dựng lịch sử hội thoại
    const messages: Message[] = [
        ...conversationHistory.map(msg => ({
            role: msg.role as 'user' | 'model',
            parts: [{ text: typeof msg.parts === 'string' ? msg.parts : msg.parts[0]?.text || '' }]
        })),
        {
            role: 'user',
            parts: [{ text: userMessage }]
        }
    ];

    const requestBody: GeminiRequest = {
        contents: messages,
        systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        }
    };

    try {
        const response = await fetch(
            `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            const content = data.candidates[0].content?.parts[0]?.text;
            if (content) {
                return content;
            }
        }

        throw new Error('Không nhận được phản hồi từ Gemini');
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}
