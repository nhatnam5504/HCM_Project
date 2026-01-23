import {
  Question,
  MatchingQuestion,
  MultipleChoiceQuestion,
  PathQuestion,
  ImageMatchQuestion,
  BackupQuestion,
} from '../types/meono';

// ===== GHÉP CÂU TRẢ LỜI (GC-1 đến GC-8) =====
const matchingQuestions: MatchingQuestion[] = [
  {
    id: 'GC-1',
    type: 'GHEP_CAU',
    title: 'Pháp – Báo chí',
    context: '🇫🇷 Pháp – Báo chí',
    actions: ['Viết báo', 'Diễn thuyết', 'Im lặng'],
    goals: ['Thức tỉnh dư luận tiến bộ', 'Tránh xung đột', 'Tìm sự ủng hộ cá nhân'],
    results: ['Đấu tranh cho quyền lợi dân tộc', 'Được chú ý cá nhân', 'Tránh bị theo dõi'],
    correctAnswer: {
      action: 'Viết báo',
      goal: 'Thức tỉnh dư luận tiến bộ',
      result: 'Đấu tranh cho quyền lợi dân tộc',
    },
  },
  {
    id: 'GC-2',
    type: 'GHEP_CAU',
    title: 'Anh – Lao động',
    context: '🇬🇧 Anh – Lao động',
    actions: ['Chuẩn bị công cụ đầy đủ', 'Làm việc qua loa', 'Chỉ làm việc được giao'],
    goals: ['Hoàn thành công việc chính xác', 'Tiết kiệm thời gian', 'Tránh trách nhiệm'],
    results: ['Được tin cậy, rèn kỷ luật', 'Dễ sai sót', 'Bị nhắc nhở'],
    correctAnswer: {
      action: 'Chuẩn bị công cụ đầy đủ',
      goal: 'Hoàn thành công việc chính xác',
      result: 'Được tin cậy, rèn kỷ luật',
    },
  },
  {
    id: 'GC-3',
    type: 'GHEP_CAU',
    title: 'Pháp – Tổ chức',
    context: '🇫🇷 Pháp – Tổ chức',
    actions: ['Tham gia tổ chức tiến bộ', 'Hoạt động riêng lẻ', 'Đấu tranh bạo lực'],
    goals: ['Học hỏi, kết nối lực lượng', 'Nổi bật cá nhân', 'Gây áp lực nhanh'],
    results: ['Từng bước truyền bá tư tưởng', 'Bị cô lập', 'Không phù hợp bối cảnh'],
    correctAnswer: {
      action: 'Tham gia tổ chức tiến bộ',
      goal: 'Học hỏi, kết nối lực lượng',
      result: 'Từng bước truyền bá tư tưởng',
    },
  },
  {
    id: 'GC-4',
    type: 'GHEP_CAU',
    title: 'Anh – Kỷ luật',
    context: '🇬🇧 Anh – Kỷ luật',
    actions: ['Làm việc đúng giờ', 'Linh hoạt giờ giấc', 'Đến sớm nhưng chuẩn bị sơ sài'],
    goals: ['Giữ kỷ luật cá nhân', 'Thoải mái', 'Tạo ấn tượng'],
    results: ['Rèn tác phong công nghiệp', 'Thiếu ổn định', 'Dễ sai sót'],
    correctAnswer: {
      action: 'Làm việc đúng giờ',
      goal: 'Giữ kỷ luật cá nhân',
      result: 'Rèn tác phong công nghiệp',
    },
  },
  {
    id: 'GC-5',
    type: 'GHEP_CAU',
    title: 'Pháp – Ngòi bút',
    context: '🇫🇷 Pháp – Ngòi bút',
    actions: ['Gửi "Yêu sách của nhân dân An Nam"', 'Phản đối công khai', 'Chờ đợi cơ hội'],
    goals: ['Đưa vấn đề Việt Nam ra quốc tế', 'Thu hút truyền thông', 'Tránh gây chú ý'],
    results: ['Gây tiếng vang chính trị', 'Bị đàn áp', 'Không có kết quả'],
    correctAnswer: {
      action: 'Gửi "Yêu sách của nhân dân An Nam"',
      goal: 'Đưa vấn đề Việt Nam ra quốc tế',
      result: 'Gây tiếng vang chính trị',
    },
  },
  {
    id: 'GC-6',
    type: 'GHEP_CAU',
    title: 'Quốc tế – Lý luận',
    context: '🌍 Quốc tế – Lý luận',
    actions: ['Học chủ nghĩa Mác–Lênin', 'Tự nghiên cứu riêng', 'Theo phong trào'],
    goals: ['Tìm con đường giải phóng dân tộc', 'Nâng cao học vấn', 'Hòa nhập cộng đồng'],
    results: ['Xác định hướng đi đúng đắn', 'Kiến thức lý thuyết suông', 'Không có định hướng rõ'],
    correctAnswer: {
      action: 'Học chủ nghĩa Mác–Lênin',
      goal: 'Tìm con đường giải phóng dân tộc',
      result: 'Xác định hướng đi đúng đắn',
    },
  },
  {
    id: 'GC-7',
    type: 'GHEP_CAU',
    title: 'Anh – Chuẩn bị',
    context: '🇬🇧 Anh – Chuẩn bị',
    actions: ['Quan sát cách làm việc phương Tây', 'Chỉ tập trung lao động', 'Xa lánh môi trường'],
    goals: ['Học tác phong tổ chức', 'Kiếm tiền nhanh', 'Giữ bản sắc'],
    results: ['Chuẩn bị cho hoạt động lâu dài', 'Thiếu kỹ năng mềm', 'Không hòa nhập'],
    correctAnswer: {
      action: 'Quan sát cách làm việc phương Tây',
      goal: 'Học tác phong tổ chức',
      result: 'Chuẩn bị cho hoạt động lâu dài',
    },
  },
  {
    id: 'GC-8',
    type: 'GHEP_CAU',
    title: 'Tổng hợp – Tự rèn',
    context: '🌍 Tổng hợp',
    actions: ['Rèn kỷ luật cá nhân', 'Làm theo số đông', 'Chờ cơ hội đến'],
    goals: ['Tự hoàn thiện bản thân', 'Được công nhận', 'An toàn'],
    results: ['Nền tảng cho việc lớn', 'Không phát triển', 'Bỏ lỡ thời cơ'],
    correctAnswer: {
      action: 'Rèn kỷ luật cá nhân',
      goal: 'Tự hoàn thiện bản thân',
      result: 'Nền tảng cho việc lớn',
    },
  },
];

// ===== TRẢ LỜI CÂU HỎI (TL-1 đến TL-8) =====
const multipleChoiceQuestions: MultipleChoiceQuestion[] = [
  {
    id: 'TL-1',
    type: 'TRA_LOI',
    title: 'Anh – Nơi làm việc',
    context: '🇬🇧 Anh',
    questions: [
      {
        question: 'Bác Hồ làm việc tại đâu khi ở Anh?',
        options: ['Nhà máy', 'Khách sạn Carlton', 'Trường học'],
        correctIndex: 1,
      },
      {
        question: 'Điều nổi bật Bác rèn luyện được là gì?',
        options: ['Kỹ năng nghề', 'Kỷ luật lao động', 'Quan hệ xã hội'],
        correctIndex: 1,
      },
      {
        question: 'Nếu thiếu công cụ trước ca làm, Bác sẽ?',
        options: ['Vào làm tạm', 'Chuẩn bị đầy đủ rồi mới làm', 'Mượn sau'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-2',
    type: 'TRA_LOI',
    title: 'Anh – Lao động',
    context: '🇬🇧 Anh',
    questions: [
      {
        question: 'Bác lao động ở Anh để làm gì?',
        options: ['Kiếm tiền gửi về', 'Kiếm sống và rèn luyện', 'Chờ cơ hội'],
        correctIndex: 1,
      },
      {
        question: 'Điều Bác học được từ môi trường đó?',
        options: ['Cách kiếm tiền nhanh', 'Tác phong công nghiệp', 'Kỹ năng nấu ăn'],
        correctIndex: 1,
      },
      {
        question: 'Làm việc nhỏ thì sao?',
        options: ['Làm cho xong', 'Làm cẩn thận như việc lớn', 'Nhờ người khác'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-3',
    type: 'TRA_LOI',
    title: 'Pháp – Báo chí',
    context: '🇫🇷 Pháp',
    questions: [
      {
        question: 'Công cụ đấu tranh chính của Nguyễn Ái Quốc ở Pháp là?',
        options: ['Vũ trang', 'Báo chí', 'Biểu tình'],
        correctIndex: 1,
      },
      {
        question: 'Vì sao chọn báo chí?',
        options: ['An toàn', 'Lan tỏa rộng và lâu dài', 'Dễ viết'],
        correctIndex: 1,
      },
      {
        question: 'Nếu bài viết bị từ chối đăng?',
        options: ['Dừng lại', 'Viết tiếp, tìm kênh khác', 'Chuyển sang diễn thuyết'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-4',
    type: 'TRA_LOI',
    title: 'Pháp – Tổ chức',
    context: '🇫🇷 Pháp',
    questions: [
      {
        question: 'Nguyễn Ái Quốc tham gia tổ chức gì?',
        options: ['Tổ chức phản động', 'Tổ chức tiến bộ, cánh tả', 'Tổ chức tôn giáo'],
        correctIndex: 1,
      },
      {
        question: 'Mục đích chính?',
        options: ['Nổi tiếng', 'Học hỏi và kết nối lực lượng', 'Kiếm tiền'],
        correctIndex: 1,
      },
      {
        question: 'Có nên đấu tranh vũ trang tại Pháp?',
        options: ['Có, hiệu quả cao', 'Không phù hợp bối cảnh', 'Tùy tình hình'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-5',
    type: 'TRA_LOI',
    title: 'Quốc tế – Tiếp cận lý luận',
    context: '🌍 Quốc tế',
    questions: [
      {
        question: 'Bác tiếp cận chủ nghĩa Mác–Lênin ở đâu?',
        options: ['Việt Nam', 'Pháp', 'Qua hoạt động quốc tế'],
        correctIndex: 2,
      },
      {
        question: 'Bác tiếp thu lý luận để làm gì?',
        options: ['Tranh luận', 'Áp dụng cho Việt Nam', 'Học thuật'],
        correctIndex: 1,
      },
      {
        question: 'Khi lý luận không phù hợp thực tế?',
        options: ['Áp dụng nguyên xi', 'Điều chỉnh cho phù hợp', 'Bỏ hoàn toàn'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-6',
    type: 'TRA_LOI',
    title: 'Quốc tế – Lý luận và thực tiễn',
    context: '🌍 Quốc tế',
    questions: [
      {
        question: 'Vì sao Bác coi trọng lý luận?',
        options: ['Để tranh luận', 'Là kim chỉ nam hành động', 'Để nổi tiếng'],
        correctIndex: 1,
      },
      {
        question: 'Lý luận có thay thế thực tiễn không?',
        options: ['Có', 'Không, phải gắn thực tiễn', 'Tùy trường hợp'],
        correctIndex: 1,
      },
      {
        question: 'Học lý luận để tranh luận?',
        options: ['Đúng', 'Không phải mục tiêu chính', 'Phần nào đúng'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-7',
    type: 'TRA_LOI',
    title: 'Pháp – Yêu sách',
    context: '🇫🇷 Pháp',
    questions: [
      {
        question: '"Yêu sách của nhân dân An Nam" gửi tới đâu?',
        options: ['Quốc hội Pháp', 'Hội nghị Versailles (1919)', 'Liên Hiệp Quốc'],
        correctIndex: 1,
      },
      {
        question: 'Ý nghĩa lớn nhất?',
        options: ['Được chấp nhận ngay', 'Đưa VN ra diễn đàn quốc tế', 'Thay đổi chính sách'],
        correctIndex: 1,
      },
      {
        question: 'Có được chấp nhận không?',
        options: ['Có', 'Không, nhưng gây tiếng vang', 'Một phần'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-8',
    type: 'TRA_LOI',
    title: 'Tổng hợp – Giá trị xuyên suốt',
    context: '🌍 Tổng hợp',
    questions: [
      {
        question: 'Giá trị xuyên suốt con đường Bác đi?',
        options: ['Vinh quang cá nhân', 'Giải phóng dân tộc gắn với con người', 'Quyền lực'],
        correctIndex: 1,
      },
      {
        question: 'Bác chọn con đường nhanh hay đúng?',
        options: ['Nhanh', 'Đúng và bền vững', 'Cả hai'],
        correctIndex: 1,
      },
      {
        question: 'Trước khó khăn kéo dài?',
        options: ['Thay đổi hướng', 'Kiên trì, không nóng vội', 'Từ bỏ'],
        correctIndex: 1,
      },
    ],
  },
];

// ===== MÔ PHỎNG ĐƯỜNG BÁC ĐI (MD-1 đến MD-8) =====
const pathQuestions: PathQuestion[] = [
  {
    id: 'MD-1',
    type: 'MO_PHONG',
    title: 'Anh – Quá trình rèn luyện',
    context: '🇬🇧 Anh',
    allCards: [
      'Lao động',
      'Quan sát xã hội',
      'Rèn kỷ luật cá nhân',
      'Đấu tranh công khai', // nhiễu
      'Biểu tình', // nhiễu
    ],
    correctSequence: ['Lao động', 'Quan sát xã hội', 'Rèn kỷ luật cá nhân'],
  },
  {
    id: 'MD-2',
    type: 'MO_PHONG',
    title: 'Anh – Chuẩn bị lâu dài',
    context: '🇬🇧 Anh',
    allCards: [
      'Lao động',
      'Rèn tác phong',
      'Chuẩn bị lâu dài',
      'Đấu tranh công khai', // nhiễu
      'Thành lập tổ chức', // nhiễu
    ],
    correctSequence: ['Lao động', 'Rèn tác phong', 'Chuẩn bị lâu dài'],
  },
  {
    id: 'MD-3',
    type: 'MO_PHONG',
    title: 'Pháp – Con đường hoàn chỉnh',
    context: '🇫🇷 Pháp',
    allCards: [
      'Lao động hòa nhập',
      'Tham gia tổ chức',
      'Viết báo',
      'Gửi yêu sách',
      'Truyền bá tư tưởng',
      'Đấu tranh vũ trang', // nhiễu
      'Thành lập chính quyền', // nhiễu
    ],
    correctSequence: [
      'Lao động hòa nhập',
      'Tham gia tổ chức',
      'Viết báo',
      'Gửi yêu sách',
      'Truyền bá tư tưởng',
    ],
  },
  {
    id: 'MD-4',
    type: 'MO_PHONG',
    title: 'Pháp – Đấu tranh tư tưởng',
    context: '🇫🇷 Pháp',
    allCards: [
      'Viết báo',
      'Đấu tranh tư tưởng',
      'Kết nối lực lượng',
      'Thành lập chính quyền', // nhiễu
      'Khởi nghĩa', // nhiễu
    ],
    correctSequence: ['Viết báo', 'Đấu tranh tư tưởng', 'Kết nối lực lượng'],
  },
  {
    id: 'MD-5',
    type: 'MO_PHONG',
    title: 'Quốc tế – Tiếp thu lý luận',
    context: '🌍 Quốc tế',
    allCards: [
      'Học lý luận',
      'Chọn lọc',
      'Vận dụng cho Việt Nam',
      'Áp dụng nguyên xi', // nhiễu
      'Bỏ qua thực tiễn', // nhiễu
    ],
    correctSequence: ['Học lý luận', 'Chọn lọc', 'Vận dụng cho Việt Nam'],
  },
  {
    id: 'MD-6',
    type: 'MO_PHONG',
    title: 'Quốc tế – Lý luận gắn thực tiễn',
    context: '🌍 Quốc tế',
    allCards: [
      'Lý luận',
      'Thực tiễn',
      'Truyền bá',
      'Chỉ học thuật', // nhiễu
      'Bỏ qua thực tiễn', // nhiễu
    ],
    correctSequence: ['Lý luận', 'Thực tiễn', 'Truyền bá'],
  },
  {
    id: 'MD-7',
    type: 'MO_PHONG',
    title: 'Tổng hợp – Tự rèn luyện',
    context: '🌍 Tổng hợp',
    allCards: [
      'Rèn bản thân',
      'Học hỏi',
      'Hoạt động cách mạng',
      'Chờ cơ hội', // nhiễu
      'Theo số đông', // nhiễu
    ],
    correctSequence: ['Rèn bản thân', 'Học hỏi', 'Hoạt động cách mạng'],
  },
  {
    id: 'MD-8',
    type: 'MO_PHONG',
    title: 'Tổng hợp – Hành động đúng thời điểm',
    context: '🌍 Tổng hợp',
    allCards: [
      'Chuẩn bị lực lượng',
      'Đấu tranh tư tưởng',
      'Hành động đúng thời điểm',
      'Đấu tranh vũ trang sớm', // nhiễu
      'Nóng vội', // nhiễu
    ],
    correctSequence: ['Chuẩn bị lực lượng', 'Đấu tranh tư tưởng', 'Hành động đúng thời điểm'],
  },
];

// ===== GHÉP THẺ VỚI HÌNH ẢNH (HA-1 đến HA-8) =====
const imageMatchQuestions: ImageMatchQuestion[] = [
  {
    id: 'HA-1',
    type: 'GHEP_HINH',
    title: 'Anh – Kỷ luật',
    context: '🇬🇧 Anh',
    pairs: [
      { image: '⏰', label: 'Đồng hồ', meaning: 'Kỷ luật thời gian', isCorrect: true },
      { image: '🧰', label: 'Công cụ', meaning: 'Tôn trọng lao động', isCorrect: true },
      { image: '👔', label: 'Đồng phục', meaning: 'Kỷ luật tổ chức', isCorrect: true },
      { image: '📋', label: 'Danh sách công việc', meaning: 'Lập kế hoạch', isCorrect: true },
      { image: '💎', label: 'Đồ xa xỉ', meaning: 'Hưởng thụ', isCorrect: false },
      { image: '🎩', label: 'Sang trọng', meaning: 'Phô trương', isCorrect: false },
      { image: '🍷', label: 'Rượu', meaning: 'Tiêu khiển', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
  {
    id: 'HA-2',
    type: 'GHEP_HINH',
    title: 'Anh – Môi trường rèn luyện',
    context: '🇬🇧 Anh',
    pairs: [
      { image: '🏨', label: 'Khách sạn Carlton', meaning: 'Môi trường rèn luyện', isCorrect: true },
      { image: '👨‍🍳', label: 'Phụ bếp', meaning: 'Lao động chân chính', isCorrect: true },
      { image: '🤝', label: 'Hợp tác', meaning: 'Học hỏi từ đồng nghiệp', isCorrect: true },
      { image: '📚', label: 'Quan sát', meaning: 'Học cách làm việc', isCorrect: true },
      { image: '💎', label: 'Xa xỉ', meaning: 'Hưởng thụ', isCorrect: false },
      { image: '🎰', label: 'Cờ bạc', meaning: 'Tiêu khiển', isCorrect: false },
      { image: '🎪', label: 'Giải trí', meaning: 'Lãng phí thời gian', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
  {
    id: 'HA-3',
    type: 'GHEP_HINH',
    title: 'Pháp – Đấu tranh tư tưởng',
    context: '🇫🇷 Pháp',
    pairs: [
      { image: '📰', label: 'Báo chí', meaning: 'Đấu tranh tư tưởng', isCorrect: true },
      { image: '✍️', label: 'Bút viết', meaning: 'Vũ khí của trí thức', isCorrect: true },
      { image: '📢', label: 'Diễn đàn', meaning: 'Lan tỏa tư tưởng', isCorrect: true },
      { image: '🌐', label: 'Quốc tế', meaning: 'Tầm nhìn toàn cầu', isCorrect: true },
      { image: '🔫', label: 'Vũ khí', meaning: 'Bạo lực', isCorrect: false },
      { image: '💣', label: 'Bom', meaning: 'Khủng bố', isCorrect: false },
      { image: '⚔️', label: 'Gươm', meaning: 'Chiến tranh', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
  {
    id: 'HA-4',
    type: 'GHEP_HINH',
    title: 'Pháp – Yêu sách',
    context: '🇫🇷 Pháp',
    pairs: [
      { image: '📄', label: 'Yêu sách', meaning: 'Đưa VN ra quốc tế', isCorrect: true },
      { image: '🌍', label: 'Thế giới', meaning: 'Tầm nhìn quốc tế', isCorrect: true },
      { image: '🤝', label: 'Đàm phán', meaning: 'Đấu tranh hòa bình', isCorrect: true },
      { image: '📢', label: 'Tiếng nói', meaning: 'Quyền lợi dân tộc', isCorrect: true },
      { image: '🏆', label: 'Danh hiệu', meaning: 'Vinh quang cá nhân', isCorrect: false },
      { image: '👑', label: 'Vương miện', meaning: 'Quyền lực', isCorrect: false },
      { image: '💎', label: 'Vàng bạc', meaning: 'Vật chất', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
  {
    id: 'HA-5',
    type: 'GHEP_HINH',
    title: 'Quốc tế – Kim chỉ nam',
    context: '🌍 Quốc tế',
    pairs: [
      { image: '📘', label: 'Sách lý luận', meaning: 'Kim chỉ nam hành động', isCorrect: true },
      { image: '🧭', label: 'La bàn', meaning: 'Định hướng', isCorrect: true },
      { image: '💡', label: 'Ánh sáng', meaning: 'Soi đường', isCorrect: true },
      { image: '🎯', label: 'Mục tiêu', meaning: 'Con đường đúng đắn', isCorrect: true },
      { image: '🎖️', label: 'Danh vọng', meaning: 'Vinh quang cá nhân', isCorrect: false },
      { image: '💰', label: 'Tiền bạc', meaning: 'Vật chất', isCorrect: false },
      { image: '👑', label: 'Quyền lực', meaning: 'Thống trị', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
  {
    id: 'HA-6',
    type: 'GHEP_HINH',
    title: 'Quốc tế – Tư duy toàn cầu',
    context: '🌍 Quốc tế',
    pairs: [
      { image: '🌍', label: 'Bản đồ thế giới', meaning: 'Tư duy quốc tế', isCorrect: true },
      { image: '✈️', label: 'Máy bay', meaning: 'Hành trình tìm đường', isCorrect: true },
      { image: '🤝', label: 'Đoàn kết', meaning: 'Liên kết quốc tế', isCorrect: true },
      { image: '📚', label: 'Học hỏi', meaning: 'Tiếp thu tinh hoa', isCorrect: true },
      { image: '🏠', label: 'An phận', meaning: 'Ở yên một chỗ', isCorrect: false },
      { image: '🛋️', label: 'Thoải mái', meaning: 'Hưởng thụ', isCorrect: false },
      { image: '🚪', label: 'Đóng cửa', meaning: 'Tự cô lập', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
  {
    id: 'HA-7',
    type: 'GHEP_HINH',
    title: 'Tổng hợp – Đấu tranh bằng trí tuệ',
    context: '🌍 Tổng hợp',
    pairs: [
      { image: '✍️', label: 'Bút', meaning: 'Đấu tranh bằng trí tuệ', isCorrect: true },
      { image: '📚', label: 'Sách vở', meaning: 'Tri thức', isCorrect: true },
      { image: '💭', label: 'Tư duy', meaning: 'Suy nghĩ sâu sắc', isCorrect: true },
      { image: '🎓', label: 'Học tập', meaning: 'Nâng cao hiểu biết', isCorrect: true },
      { image: '⚔️', label: 'Gươm', meaning: 'Bạo lực', isCorrect: false },
      { image: '🗡️', label: 'Kiếm', meaning: 'Chiến tranh', isCorrect: false },
      { image: '💣', label: 'Bom', meaning: 'Khủng bố', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
  {
    id: 'HA-8',
    type: 'GHEP_HINH',
    title: 'Tổng hợp – Hành trang giản dị',
    context: '🌍 Tổng hợp',
    pairs: [
      { image: '🎒', label: 'Hành trang giản dị', meaning: 'Chuẩn bị lâu dài', isCorrect: true },
      { image: '👣', label: 'Dấu chân', meaning: 'Hành trình gian khổ', isCorrect: true },
      { image: '💪', label: 'Kiên trì', meaning: 'Ý chí bền bỉ', isCorrect: true },
      { image: '🌟', label: 'Mục tiêu', meaning: 'Lý tưởng cao cả', isCorrect: true },
      { image: '🎩', label: 'Hưởng thụ', meaning: 'Xa hoa', isCorrect: false },
      { image: '💼', label: 'Cặp da sang', meaning: 'Phô trương', isCorrect: false },
      { image: '💎', label: 'Đồ xa xỉ', meaning: 'Vật chất', isCorrect: false },
    ],
    correctPairsCount: 4,
  },
];

// Tất cả câu hỏi
export const allQuestions: Question[] = [
  ...matchingQuestions,
  ...multipleChoiceQuestions,
  ...pathQuestions,
  ...imageMatchQuestions,
];

// Câu hỏi backup
export const backupQuestions: BackupQuestion[] = [
  {
    question:
      'Theo tư tưởng Hồ Chí Minh, điều gì quan trọng nhất khi áp dụng lý luận vào thực tiễn?',
    options: [
      'Áp dụng nguyên xi không thay đổi',
      'Sáng tạo, điều chỉnh cho phù hợp hoàn cảnh',
      'Chờ điều kiện hoàn hảo mới áp dụng',
    ],
    correctIndex: 1,
    explanation:
      'Bác luôn nhấn mạnh: "Dĩ bất biến, ứng vạn biến" - giữ vững nguyên tắc nhưng linh hoạt trong phương pháp.',
  },
  {
    question:
      'Trong tư tưởng Hồ Chí Minh, "biết đủ" và "biết dừng" thể hiện đức tính gì?',
    options: [
      'Thiếu tham vọng',
      'Liêm khiết, không tham lam',
      'Sợ thất bại',
    ],
    correctIndex: 1,
    explanation:
      'Bác sống giản dị, không tham lam, luôn biết đủ - đây là nền tảng đạo đức cách mạng.',
  },
  {
    question:
      'Vì sao Bác chọn con đường "đi vòng" qua nhiều nước thay vì đấu tranh trực tiếp ngay?',
    options: [
      'Vì sợ nguy hiểm',
      'Vì cần chuẩn bị kỹ lưỡng, tìm con đường đúng',
      'Vì không có cơ hội ở Việt Nam',
    ],
    correctIndex: 1,
    explanation:
      'Bác hiểu rằng: cách mạng cần chuẩn bị, không thể nóng vội. Đi vòng để tìm con đường đúng đắn nhất.',
  },
];

// Hàm lấy câu hỏi ngẫu nhiên theo chữ cái (A-Z hoặc nhiều hơn)
export function getQuestionsWithLetters(): { letter: string; question: Question }[] {
  // Shuffle all questions
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);

  // Assign letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return shuffled.slice(0, Math.min(letters.length, shuffled.length)).map((q, i) => ({
    letter: letters[i],
    question: q,
  }));
}

// Hàm lấy câu backup ngẫu nhiên
export function getRandomBackupQuestion(): BackupQuestion {
  return backupQuestions[Math.floor(Math.random() * backupQuestions.length)];
}
