/**
 * VietInnov-Spark Backend Server
 * 
 * A complete Express server for handling chat requests with Google Gemini API
 * 
 * Usage:
 * 1. Install dependencies: npm install express cors dotenv @google/generative-ai
 * 2. Create .env file with GOOGLE_API_KEY
 * 3. Run: npx ts-node server.ts
 * 
 * OR if using JavaScript:
 * Replace "import" with "require" and remove TypeScript types
 */

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Note: You'll need to install @google/generative-ai
// npm install @google/generative-ai
let GoogleGenerativeAI: any;
try {
    GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;
} catch {
    console.warn('⚠️ @google/generative-ai not installed. Install with: npm install @google/generative-ai');
}

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Gemini API
let model: any = null;

function initializeGemini() {
    try {
        if (!GoogleGenerativeAI) {
            console.error('❌ GoogleGenerativeAI not available. Install with: npm install @google/generative-ai');
            return false;
        }

        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            console.error('❌ GOOGLE_API_KEY not found in environment variables');
            console.error('   Create a .env file with: GOOGLE_API_KEY=your_key_here');
            return false;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-2.5-flash for optimal performance with advanced reasoning
        model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        console.log('✅ Gemini API initialized successfully (gemini-2.5-flash)');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize Gemini API:', error);
        return false;
    }
}

// ============================================================================
// CHAPTER 3 CONTENT (Default fallback)
// ============================================================================

const CHAPTER_3_CONTENT = `
CHƯƠNG 3: ĐẢNG LÃnh ĐẠO CÔNG CUỘC ĐỔI MỚI VÀ CẢI CÁCH KINH TẾ 1975-2018

3.1 GIAI ĐOẠN 1975-1986: XÂY DỰNG CHỦ NGHĨA XÃ HỘI VÀ BẢO VỆ TỔ QUỐC

Sau chiến thắng 30/4/1975, Đảng Cộng sản Việt Nam tiến hành công cuộc cải cách sâu rộng nhằm xây dựng chủ nghĩa xã hội trên toàn lãnh thổ Việt Nam. Tuy nhiên, trong quá trình thực hiện, đất nước phải đối mặt với những khó khăn và thách thức lớn lao.

NHỮNG KHỦNG HOẢNG TRONG GIAI ĐOẠN 1975-1986:
- Nền kinh tế chưa phát triển, sản xuất hàng hóa thấp
- Lạm phát tăng cao, tiền mệnh nhanh chóng mất giá
- Bản lạc sản xuất nông nghiệp bị suy giảm
- Thiếu hụt nhiều hàng hóa thiết yếu
- Tình hình xã hội bất ổn định

3.1.1 VẤN ĐỀ ĐẶT RA - NHỮNG KHÓ KHĂN ĐẦU TIÊN

Ngay sau tổng giải phóng, đất nước phải giải quyết các vấn đề về:
- Hợp nhất kinh tế - kỹ thuật giữa Bắc và Nam
- Khôi phục sản xuất bị hư hại bởi chiến tranh
- Thực hiện chính sách tính tiền mệnh mới
- Cải cách ruộng đất ở miền Nam

3.1.2 ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN THỨ V (1982) VÀ CÁC BƯỚC ĐỘT PHÁ 1982-1986

Đại hội V (tháng 3/1982) đánh dấu sự điểm lại kế hoạch và xác định các hướng đột phá mới:

QUYẾT ĐỊNH CHÍNH:
1. Nhận ra những sai lầm trong lập kế hoạch kinh tế
2. Thừa nhận cần phải cải cách cơ chế quản lý kinh tế
3. Tăng quyền tự chủ và sáng tạo cho các doanh nghiệp
4. Phát triển nông nghiệp - cơ sở của nền kinh tế

CÁC BƯỚC ĐỘT PHÁ 1982-1986:
- Thực hiện hệ thống khoán sản phẩm trong nông nghiệp
- Khuyến khích kinh tế hợp tác, sản xuất riêng lẻ
- Mở rộng tự do buôn bán nông sản
- Bắt đầu áp dụng cơ chế thị trường vào một số lĩnh vực

CẢI CẢ CÁCH GIÁ-LƯƠNG-TIỀN THÁNG 4/1985:

Đây là một trong những quyết định quan trọng nhưng có hậu quả nặng nề:

MỤC ĐÍCH:
- Cân bằng ngân sách nhà nước
- Giảm lạm phát và ổn định tiền tệ
- Phục hồi sản xuất kinh tế

NỘI DUNG:
- Tăng giá các mặt hàng lên gấp 5-10 lần
- Tăng lương lao động từ 30-50%
- Tăng mệnh giá tiền tệ
- Thực hiện trong thời gian rất ngắn (5 lần tăng trong một tháng)

KẾT QUẢ:
❌ THẤT BẠI HOÀN TOÀN:
- Lạm phát tăng vọt 453%
- Tiền mệnh Đồng tiếp tục mất giá
- Chi phí sống tăng vượt quá khả năng chịu đựng của nhân dân
- Sản xuất giảm, kinh tế rơi vào tình trạng bế tắc
- Xã hội bất ổn, dân cư tìm cách sơ tán

BÀI HỌC TỪ CẢI CẢ CÁCH GIÁ-LƯƠNG-TIỀN:
1. Không thể cải cách một cách bất chợt, quá nhanh
2. Cần phải cân nhắc kỹ lưỡng tác động xã hội
3. Phải có sự đồng thuận rộng rãi từ nhân dân
4. Phải kết hợp các biện pháp kỹ thuật với chính sách xã hội
5. Cần phải từng bước thực hiện, theo dõi kết quả

3.2 GIAI ĐOẠN TỪ 1986: CÔNG CUỘC ĐỔI MỚI, CÔNG NGHIỆP HÓA, HIỆN ĐẠI HÓA VÀ HỘI NHẬP

3.2.1 ĐỔI MỚI TOÀN DIỆN, ĐƯA ĐẤT NƯỚC RA KHỎI KHỦNG HOẢNG KINH TẾ-XÃ HỘI 1986-1996

ĐẠI HỘI VI (THÁNG 12/1986) - BƯỚC NGOẶT LỊCH SỬ

Sau thất bại của cải cách giá-lương-tiền 1985 và tình hình kinh tế-xã hội ngày càng xấu đi, Đảng Cộng sản Việt Nam tổ chức Đại hội VI.

QUYẾT ĐỊNH LỊCH SỬ:
- Ra Nghị quyết Đổi mới toàn diện nền kinh tế
- Chuyển từ nền kinh tế kế hoạch hóa sang kinh tế thị trường định hướng xã hội chủ nghĩa
- Mở cửa đối ngoại - hội nhập kinh tế quốc tế

NỘI DUNG CHÍNH CỦA CÔNG CUỘC ĐỔI MỚI:

1. CẢI CÁCH KINH TẾ TOÀN DIỆN:
   - Xóa bỏ hệ thống kế hoạch hóa tập trung
   - Phát triển cơ chế thị trường
   - Khôi phục kinh tế tư nhân (với một số hạn chế)
   - Thực hiện khoán sản phẩm trong các ngành

2. CẢI CÁCH TÀI CHÍNH - TIỀN TỆ:
   - Phát hành tiền tệ mới
   - Thực hiện chính sách tiền tệ ổn định
   - Kiểm soát lạm phát

3. CHÍNH SÁCH MỞ CỬA ĐỐI NGOẠI:
   - Mở cửa thương mại quốc tế
   - Khuyến khích đầu tư nước ngoài
   - Tham gia các tổ chức quốc tế

4. PHÁT TRIỂN NÔNG NGHIỆP:
   - Thực hiện chính sách khôi phục sản xuất nông nghiệp
   - Bãi bỏ tập thể hóa bắt buộc
   - Khuyến khích sản xuất độc lập

5. XÃ HỘI HÓA CÁC DỊCH VỤ:
   - Khuyến khích phát triển giáo dục, y tế tư nhân
   - Tham gia đóng góp của xã hội dân sự

KẾT QUẢ CÔNG CUỘC ĐỔI MỚI 1986-1996:

✅ THÀNH TỰU LỚN:

Kinh tế:
- Tăng trưởng GDP bình quân 6-7% hàng năm
- Từ nước nhập khẩu lương thực trở thành nước xuất khẩu
- Lạm phát được đưa dưới kiểm soát
- Thu nhập bình quân đầu người tăng

Xã hội:
- Đời sống nhân dân từng bước nâng cao
- Tỷ lệ đói nghèo giảm
- Cơ sở hạ tầng được cải thiện

Đối ngoại:
- Bình thường hóa quan hệ ngoại giao (1995)
- Tham gia ASEAN (1995)
- Nhập khẩu nước ngoài tăng
- Việt Nam trở thành điểm đầu tư hấp dẫn

BÀI HỌC RÚT RA:

1. ĐỔI MỚI CẦN TOÀN DIỆN:
   - Không thể chỉ cải cách từng phần
   - Cần phải cải cách kinh tế, chính trị, xã hội đồng thời

2. PHẢI ĐI TỪ THỰC TẾ:
   - Hiểu rõ tình hình thực tế của đất nước
   - Không áp dụng mô hình của nước khác một cách máy móc

3. CẦN SỰ ĐỒng THUẬN XÃ HỘI:
   - Lắng nghe tiếng nói của nhân dân
   - Thực hiện những điều chỉnh cần thiết

4. PHẢI TỪNG BƯỚC THỰC HIỆN:
   - Không thể cải cách quá nhanh
   - Cần theo dõi kết quả, điều chỉnh chính sách

5. KẾT HỢP LẠI HỢP LÝ GIỮA KỀ HOẠCH VÀ THỊ TRƯỜNG:
   - Không phủ nhận hoàn toàn vai trò của kế hoạch
   - Kết hợp hợp lý cơ chế kế hoạch và thị trường`;

// ============================================================================
// SYSTEM PROMPT
// ============================================================================

const SYSTEM_PROMPT = `Bạn là VietInnov-Spark Assistant, một trợ lý học tập thông minh chuyên giải đáp các vấn đề về công cuộc đổi mới và cải cách kinh tế Việt Nam từ năm 1975 đến nay.

🎯 NGUYÊN TẮC TRẢ LỜI:

1️⃣ LUÔN trả lời dựa trên **Chương 3** của giáo trình Lịch sử Đảng CSVN 2021

2️⃣ Ưu tiên các phần:
   - 3.1: Đảng lãnh đạo xây dựng XHCN 1975-1986
   - 3.1.2: Đại hội V và bước đột phá 1982-1986
   - 3.2: Lãnh đạo công cuộc Đổi mới từ 1986
   - 3.2.1: Đổi mới toàn diện 1986-1996

3️⃣ **KHI CÂU HỎI VỀ "CẢI CẢ CÁCH GIÁ-LƯƠNG-TIỀN":**
   - Phân tích VÌ SAO là nguyên nhân dẫn tới Đổi mới
   - Giải thích HẬU QUẢ kinh tế-xã hội
   - Rút ra BÀI HỌC kinh nghiệm
   - Liên hệ thực tế quản lý kinh tế

4️⃣ **CẤU TRÚC TRẢ LỜI:**
   - **[Tiêu đề rõ ràng]**
   - 🔹 **Bối cảnh:** Giải thích ngắn gọn
   - 🔹 **Ý 1 - Nguyên nhân:** (từ cải cách nếu liên quan)
   - 🔹 **Ý 2 - Hậu quả:** Khủng hoảng cần Đổi mới
   - 🔹 **Ý 3 - Bài học:** Từ lịch sử
   - 🔹 **Kết luận:** Tóm tắt và nhấn mạnh

5️⃣ **QUYẾT TẮC:**
   - Trả lời RÕRÀNG, NGẮN GỌN, LOGIC
   - Dùng VÍ DỤ CỤ THỂ từ tài liệu
   - TRÁNH suy đoán ngoài tài liệu
   - Luôn dẫn chứng từ giáo trình

6️⃣ **NẾU KHÔNG CÓ THÔNG TIN:**
   "Thông tin này chưa được cung cấp trong tài liệu Chương 3."

💡 **MỤC TIÊU:** Giúp hiểu sâu Chương 3, nắm rõ nguyên nhân, hậu quả, bài học của Đổi mới Việt Nam.`;

// ============================================================================
// CHAT ENDPOINT
// ============================================================================

interface ChatRequest {
    message: string;
    conversationHistory?: { role: string; content: string }[];
}

app.post('/api/chat', async (req: Request, res: Response) => {
    try {
        const { message } = req.body as ChatRequest;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Invalid message format' });
        }

        if (!model) {
            return res.status(503).json({
                error: 'Chat service unavailable',
                response: 'Xin lỗi, dịch vụ chat không khả dụng. Vui lòng kiểm tra cấu hình API.'
            });
        }

        // Build full prompt
        const fullPrompt = `${SYSTEM_PROMPT}

=== NỘI DUNG TÀI LIỆU CHƯƠNG 3 ===
${CHAPTER_3_CONTENT}

=== CÂU HỎI CỦA NGƯỜI DÙNG ===
${message}`;

        // Call Gemini API
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const responseText = response.text();

        res.json({
            response: responseText,
            sources: ['Giáo trình Lịch sử Đảng CSVN 2021 - NXB Chính trị Quốc gia, Chương 3']
        });
    } catch (error) {
        console.error('Chat API error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            error: 'Failed to process chat request',
            message: errorMessage,
            response: 'Xin lỗi, có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.'
        });
    }
});

// ============================================================================
// HEALTH CHECK & INFO ENDPOINTS
// ============================================================================

app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'VietInnov-Spark Backend',
        apiStatus: model ? 'Ready' : 'Not configured'
    });
});

app.get('/api/info', (req: Request, res: Response) => {
    res.json({
        name: 'VietInnov-Spark Assistant',
        version: '1.0.0',
        description: 'Learning assistant for Vietnam\'s Reform History (1975-present)',
        focus: 'Chapter 3: Party Leadership in Economic Reform 1975-2018',
        endpoints: {
            chat: 'POST /api/chat',
            health: 'GET /health',
            info: 'GET /api/info'
        }
    });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: {
            POST: ['/api/chat'],
            GET: ['/health', '/api/info']
        }
    });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

const startServer = () => {
    const geminiReady = initializeGemini();

    const server = app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║        🚀 VietInnov-Spark Backend Server Started                  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

📡 Server running on: http://localhost:${PORT}
🔗 API Endpoints:
   - Chat: POST   http://localhost:${PORT}/api/chat
   - Health: GET  http://localhost:${PORT}/health
   - Info: GET    http://localhost:${PORT}/api/info

📚 Ready to answer questions about Vietnam's Reform (1975-present)
${geminiReady ? '✅' : '⚠️'} Gemini API: ${geminiReady ? 'Connected' : 'Not configured - set GOOGLE_API_KEY'}

💡 Frontend proxy configuration:
   Add to vite.config.ts:
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:${PORT}',
         changeOrigin: true
       }
     }
   }
        `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('\n📋 Gracefully shutting down server...');
        server.close(() => {
            console.log('✅ Server closed');
            process.exit(0);
        });
    });
};

startServer();

export { };
