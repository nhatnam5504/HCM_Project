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
  {
    id: 'TL-9',
    type: 'TRA_LOI',
    title: 'Quốc tế – Kim chỉ nam',
    context: '🌍 Quốc tế',
    questions: [
      {
        question: '"Kim chỉ nam" cho con đường cứu nước của Nguyễn Ái Quốc là gì?',
        options: ['Chủ nghĩa Tam dân', 'Chủ nghĩa Mác - Lênin', 'Tư tưởng tư sản'],
        correctIndex: 1,
      },
      {
        question: 'Việc tìm ra "kim chỉ nam" có ý nghĩa gì quyết định?',
        options: ['Chấm dứt khủng hoảng về đường lối', 'Được quốc tế viện trợ ngay', 'Thành lập được quân đội'],
        correctIndex: 0,
      },
      {
        question: 'Nguyễn Ái Quốc ví "lý luận" quan trọng như thế nào?',
        options: ['Như vũ khí chiến đấu', 'Như ngọn đèn pha', 'Như cái kim chỉ nam'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'TL-10',
    type: 'TRA_LOI',
    title: 'Anh – Kỷ luật',
    context: '🇬🇧 Anh',
    questions: [
      {
        question: 'Khi làm việc tại Anh, Nguyễn Tất Thành đã rèn luyện được đức tính gì quan trọng?',
        options: ['Sự nóng vội', 'Kỷ luật và đúng giờ', 'Sự thờ ơ'],
        correctIndex: 1,
      },
      {
        question: 'Vì sao Người lại chú trọng đến việc học cách làm việc của người phương Tây?',
        options: ['Để hiểu rõ về xã hội công nghiệp', 'Để kiếm nhiều tiền hơn', 'Để trở thành ông chủ'],
        correctIndex: 0,
      },
      {
        question: 'Thái độ của Người đối với công việc lao động chân tay?',
        options: ['Coi thường', 'Trân trọng và làm việc nghiêm túc', 'Chỉ làm qua loa'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-11',
    type: 'TRA_LOI',
    title: 'Anh – Môi trường rèn luyện',
    context: '🇬🇧 Anh',
    questions: [
      {
        question: 'Công việc tại khách sạn Carlton giúp Người học được điều gì?',
        options: ['Cách tổ chức và quản lý hiện đại', 'Cách nấu ăn ngon', 'Cách trang trí nội thất'],
        correctIndex: 0,
      },
      {
        question: 'Môi trường làm việc tại Anh khác gì so với thuộc địa?',
        options: ['Thoải mái hơn', 'Quy mô công nghiệp và kỷ luật chặt chẽ', 'Ít việc hơn'],
        correctIndex: 1,
      },
      {
        question: 'Người đã tận dụng thời gian ở Anh để làm gì ngoài lao động?',
        options: ['Đi du lịch', 'Học tiếng Anh và tìm hiểu văn hóa', 'Kinh doanh'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-12',
    type: 'TRA_LOI',
    title: 'Pháp – Đấu tranh tư tưởng',
    context: '🇫🇷 Pháp',
    questions: [
      {
        question: '"Vũ khí" sắc bén nhất của Nguyễn Ái Quốc tại Pháp là gì?',
        options: ['Súng đạn', 'Ngòi bút và báo chí', 'Tiền bạc'],
        correctIndex: 1,
      },
      {
        question: 'Tờ báo nào do Người sáng lập tại Pháp?',
        options: ['Thanh Niên', 'Người Cùng Khổ (Le Paria)', 'Tiền Phong'],
        correctIndex: 1,
      },
      {
        question: 'Mục tiêu chính của việc viết báo là gì?',
        options: ['Kiếm nhuận bút', 'Tuyên truyền và thức tỉnh dân tộc', 'Giải trí'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-13',
    type: 'TRA_LOI',
    title: 'Pháp – Yêu sách',
    context: '🇫🇷 Pháp',
    questions: [
      {
        question: '"Yêu sách của nhân dân An Nam" gồm mấy điểm?',
        options: ['6 điểm', '8 điểm', '10 điểm'],
        correctIndex: 1,
      },
      {
        question: 'Bản Yêu sách được gửi đến đâu?',
        options: ['Hội nghị Versailles', 'Quốc hội Mỹ', 'Hội Quốc Liên'],
        correctIndex: 0,
      },
      {
        question: 'Ý nghĩa lớn nhất của bản Yêu sách là gì?',
        options: ['Đòi lại độc lập ngay lập tức', 'Gây tiếng vang lớn và thức tỉnh lòng yêu nước', 'Được Pháp chấp nhận toàn bộ'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-14',
    type: 'TRA_LOI',
    title: 'Quốc tế – Tư duy toàn cầu',
    context: '🌍 Quốc tế',
    questions: [
      {
        question: 'Vì sao Nguyễn Ái Quốc lại đi qua nhiều châu lục?',
        options: ['Đi du lịch', 'Khảo sát và tìm hiểu thực tiễn thế giới', 'Tìm việc làm'],
        correctIndex: 1,
      },
      {
        question: 'Sự kiện nào đánh dấu bước ngoặt tìm thấy con đường cứu nước?',
        options: ['Đến Mỹ', 'Đọc Luận cương của Lênin tại Pháp', 'Đến Anh'],
        correctIndex: 1,
      },
      {
        question: 'Tư duy toàn cầu của Người thể hiện qua điều gì?',
        options: ['Học nhiều ngoại ngữ', 'Đoàn kết với giai cấp vô sản thế giới', 'Cả hai ý trên'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'TL-15',
    type: 'TRA_LOI',
    title: 'Tổng hợp – Đấu tranh trí tuệ',
    context: '🌍 Tổng hợp',
    questions: [
      {
        question: 'Nguyễn Ái Quốc thường sử dụng hình thức nào để đấu tranh ngoại giao?',
        options: ['Gửi thư, yêu sách và tham gia diễn đàn', 'Biểu tình bạo động', 'Thương lượng bí mật'],
        correctIndex: 0,
      },
      {
        question: 'Tại sao Người lại chú trọng việc học luật và ngôn ngữ?',
        options: ['Để có đủ tri thức đấu tranh pháp lý', 'Để dễ xin việc', 'Vì sở thích cá nhân'],
        correctIndex: 0,
      },
      {
        question: 'Sức mạnh của "trí tuệ" trong đấu tranh giải phóng dân tộc là gì?',
        options: ['Dùng tiền mua chuộc', 'Thuyết phục và tranh thủ sự ủng hộ quốc tế', 'Đe dọa đối phương'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'TL-16',
    type: 'TRA_LOI',
    title: 'Tổng hợp – Hành trang',
    context: '🌍 Tổng hợp',
    questions: [
      {
        question: 'Hành trang quý giá nhất của Người khi ra đi tìm đường cứu nước là gì?',
        options: ['Tiền bạc', 'Lòng yêu nước và ý chí kiên định', 'Bản đồ'],
        correctIndex: 1,
      },
      {
        question: 'Phong cách sống của Người trong những năm tháng bôn ba?',
        options: ['Xa hoa, lãng phí', 'Giản dị, tiết kiệm và hòa đồng', 'Khép kín, cô độc'],
        correctIndex: 1,
      },
      {
        question: 'Điều gì giúp Người vượt qua mọi khó khăn thử thách?',
        options: ['Niềm tin vào thắng lợi của cách mạng', 'Sự giúp đỡ của gia đình', 'May mắn'],
        correctIndex: 0,
      },
    ],
  },
];

// ===== MÔ PHỎNG ĐƯỜNG BÁC ĐI (MD-1 đến MD-8) =====
const pathQuestions: PathQuestion[] = [
  {
    id: 'MD-1',
    type: 'MO_PHONG',
    title: 'Anh – Hòa nhập để đổi mới',
    context: '🇬🇧 Anh',
    allCards: [
      'Làm phụ bếp tại Carlton',
      'Học tiếng Anh chuyên sâu',
      'Tham gia Công đoàn Lao động', // nhiễu
      'Quan sát đời sống công nhân',
      'Thấu hiểu bản chất chủ nghĩa tư bản',
      'Rèn tác phong công nghiệp',
      'Tổ chức đình công', // nhiễu
      'Viết báo bằng tiếng Anh', // nhiễu
    ],
    correctSequence: [
      'Làm phụ bếp tại Carlton',
      'Quan sát đời sống công nhân',
      'Rèn tác phong công nghiệp',
      'Học tiếng Anh chuyên sâu',
      'Thấu hiểu bản chất chủ nghĩa tư bản',
    ],
  },
  {
    id: 'MD-2',
    type: 'MO_PHONG',
    title: 'Pháp – Bước ngoặt tư duy',
    context: '🇫🇷 Pháp',
    allCards: [
      'Gia nhập Đảng Xã hội Pháp',
      'Gửi Yêu sách đến Versailles',
      'Đọc Sơ thảo Luận cương Lênin',
      'Biểu tình bạo động', // nhiễu
      'Tìm thấy con đường cứu nước',
      'Thành lập Hội Liên hiệp Thuộc địa',
      'Kêu gọi viện trợ quân sự', // nhiễu
      'Về nước ngay lập tức', // nhiễu
    ],
    correctSequence: [
      'Gia nhập Đảng Xã hội Pháp',
      'Gửi Yêu sách đến Versailles',
      'Đọc Sơ thảo Luận cương Lênin',
      'Tìm thấy con đường cứu nước',
      'Thành lập Hội Liên hiệp Thuộc địa',
    ],
  },
  {
    id: 'MD-3',
    type: 'MO_PHONG',
    title: 'Quốc tế – Vận dụng sáng tạo',
    context: '🌍 Quốc tế',
    allCards: [
      'Nghiên cứu Chủ nghĩa Mác-Lênin',
      'Phân tích tình hình Việt Nam',
      'Sao chép mô hình Xô Viết', // nhiễu
      'Lựa chọn lý luận phù hợp',
      'Kết hợp Độc lập dân tộc & CNXH',
      'Truyền bá về trong nước',
      'Dựa hoàn toàn vào Quốc tế Cộng sản', // nhiễu
    ],
    correctSequence: [
      'Nghiên cứu Chủ nghĩa Mác-Lênin',
      'Phân tích tình hình Việt Nam',
      'Lựa chọn lý luận phù hợp',
      'Kết hợp Độc lập dân tộc & CNXH',
      'Truyền bá về trong nước',
    ],
  },
  {
    id: 'MD-4',
    type: 'MO_PHONG',
    title: 'Hành trình 30 năm',
    context: '🌍 Tổng hợp',
    allCards: [
      'Rời bến Nhà Rồng (1911)',
      'Đi qua nhiều châu lục',
      'Chiến đấu tại Tây Ban Nha', // nhiễu
      'Hoạt động tại Pháp (1917-1923)',
      'Đến Liên Xô (1923)',
      'Hoạt động tại Trung Quốc',
      'Trở về tại Pác Bó (1941)',
      'Lãnh đạo khởi nghĩa ngay', // nhiễu
    ],
    correctSequence: [
      'Rời bến Nhà Rồng (1911)',
      'Đi qua nhiều châu lục',
      'Hoạt động tại Pháp (1917-1923)',
      'Đến Liên Xô (1923)',
      'Hoạt động tại Trung Quốc',
      'Trở về tại Pác Bó (1941)',
    ],
  },
  {
    id: 'MD-5',
    type: 'MO_PHONG',
    title: 'Phương pháp Cách mạng',
    context: '💡 Tư tưởng',
    allCards: [
      'Xây dựng tổ chức cách mạng',
      'Đào tạo cán bộ cốt cán',
      'Mua vũ khí hiện đại', // nhiễu
      'Tuyên truyền giác ngộ quần chúng',
      'Chờ đợi thời cơ chín muồi', // nhiễu (chờ đợi thụ động)
      'Phát động khởi nghĩa từng phần',
      'Tiến tới Tổng khởi nghĩa',
    ],
    correctSequence: [
      'Xây dựng tổ chức cách mạng',
      'Đào tạo cán bộ cốt cán',
      'Tuyên truyền giác ngộ quần chúng',
      'Phát động khởi nghĩa từng phần',
      'Tiến tới Tổng khởi nghĩa',
    ],
  },
  {
    id: 'MD-6',
    type: 'MO_PHONG',
    title: 'Rèn luyện bản lĩnh',
    context: '💪 Cá nhân',
    allCards: [
      'Làm nhiều nghề lao động',
      'Sống cuộc sống xa hoa', // nhiễu
      'Hòa mình vào giai cấp công nhân',
      'Học hỏi văn hóa nhân loại',
      'Giữ vững lòng yêu nước',
      'Tự cô lập để nghiên cứu', // nhiễu
      'Rèn luyện ý chí kiên định',
    ],
    correctSequence: [
      'Làm nhiều nghề lao động',
      'Hòa mình vào giai cấp công nhân',
      'Hold vững lòng yêu nước', // Typo fix: Giữ
      'Học hỏi văn hóa nhân loại',
      'Rèn luyện ý chí kiên định',
    ],
  },
];

// ===== GHÉP THẺ VỚI HÌNH ẢNH (HA-1 đến HA-8) =====
// ===== GHÉP THẺ VỚI HÌNH ẢNH (Đã xóa theo yêu cầu) =====
const imageMatchQuestions: ImageMatchQuestion[] = [];

// Tất cả câu hỏi
export const allQuestions: Question[] = [
  ...matchingQuestions,
  ...multipleChoiceQuestions,
  ...pathQuestions,
  // ...imageMatchQuestions, // Đã xóa
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
