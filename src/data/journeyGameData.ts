// Data cho game "Theo Dấu Chân Bác"
// Hành trình 30 năm tìm đường cứu nước (1911-1941)
// Với storyline liên kết giữa các chặng

export type GameStage = {
  id: string;
  country: string;
  countryVi: string;
  flag: string;
  period: string;
  theme: string;
  themeVi: string;
  symbol: string;
  symbolName: string;
  symbolDescription: string;
  bgImage: string;
  bgGradient: string;
  // Storyline liên kết
  storyIntro: string; // Đoạn mở đầu kể câu chuyện
  storyConnection: string; // Câu chuyện kết nối từ chặng trước
  keyPoints: string[]; // 3 ý chính
  storyConclusion: string; // Kết luận chặng
  practiceHint: string; // Gợi ý rèn luyện
  scenarios: Scenario[];
};

export type Scenario = {
  id: string;
  type: 'multiple-choice' | 'categorize' | 'ordering' | 'fill-blank' | 'matching' | 'balance';
  intro: string;
  question?: string;
  options?: Option[];
  categories?: Category[];
  orderItems?: OrderItem[];
  fillBlanks?: FillBlank;
  matchPairs?: MatchPair[];
  balanceGame?: BalanceGame;
  message: string;
};

export type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Category = {
  id: string;
  name: string;
  items: string[];
};

export type OrderItem = {
  id: number;
  text: string;
  correctOrder: number;
};

export type FillBlank = {
  text: string;
  blanks: { id: string; answer: string; options?: string[] }[];
};

export type MatchPair = {
  id: string;
  left: string;
  right: string;
};

export type BalanceGame = {
  leftSide: {
    name: string;
    description: string;
  };
  rightSide: {
    name: string;
    description: string;
  };
  weights: BalanceWeight[];
  imbalanceMessage: string;
  balanceMessage: string;
  wrongChoiceMessage: string;
};

export type BalanceWeight = {
  id: string;
  text: string;
  icon: string;
  belongsTo: 'left' | 'right';
  isCorrect: boolean;
  explanation?: string;
};

export type Reward = {
  id: string;
  name: string;
  icon: string;
  message: string;
  meaning: string;
  practiceHint: string;
  color: string;
};

// ==================== GAME STAGES ====================

export const gameStages: GameStage[] = [
  // ═══════════════════════════════════════════════════════════════
  // CHẶNG 1: HOA KỲ (1912-1913) | Vật dụng: Sổ tay ghi chép
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'usa',
    country: 'USA',
    countryVi: 'Hoa Kỳ',
    flag: '🇺🇸',
    period: '1912-1913',
    theme: 'Observation & Independent Thinking',
    themeVi: 'Quan sát thực tiễn & Tư duy độc lập',
    symbol: '📔',
    symbolName: 'Sổ tay ghi chép',
    symbolDescription: 'Biểu tượng của việc học từ thực tế và tư duy độc lập',
    bgImage: '',
    bgGradient: 'from-blue-900 via-red-800 to-blue-900',
    
    // STORYLINE
    storyIntro: `Năm 1911, từ bến cảng Nhà Rồng, một chàng thanh niên 21 tuổi tên Nguyễn Tất Thành đã bước lên con tàu Amiral Latouche Tréville, bắt đầu hành trình tìm đường cứu nước.

Những năm 1912-1913, Người tới Hoa Kỳ - một xã hội phát triển nhanh nhưng đồng thời phân hóa mạnh. Trong đời sống lao động và tiếp xúc nhiều tầng lớp, Người quan sát những gì diễn ra sau vẻ ngoài hào nhoáng.

Cuốn sổ tay ghi chép là cách Người lưu giữ nhận xét từ thực tiễn - không để kết luận vội vàng, mà để suy ngẫm và tìm lời giải.`,
    
    storyConnection: '🚢 Đây là chặng khởi đầu của hành trình 30 năm tìm đường cứu nước.',
    
    keyPoints: [
      'Quan sát từ thực tế: thấy, nghe, hỏi và ghi lại',
      'Không dừng ở bề ngoài: từ hiện tượng tìm đến bản chất',
      'Hình thành thói quen tư duy độc lập và phản biện'
    ],
    
    storyConclusion: 'Quan sát không chỉ để biết, mà để hiểu. Từ những ghi chép thực tế, ta học cách nhìn sau bề ngoài và hình thành tư duy độc lập.',
    
    practiceHint: 'Giữ thói quen ghi chép: mỗi tuần 1 trang về điều mình thấy và điều mình rút ra.',
    
    scenarios: [
      // Scenario 1: Multiple choice - Quan sát thực tiễn như Bác
      {
        id: 'usa-mc-1',
        type: 'multiple-choice',
        intro: 'Năm 1912, khi đặt chân đến New York, Nguyễn Tất Thành thấy Tượng Nữ Thần Tự Do sừng sững. Nhiều người ngưỡng mộ, nhưng Người lại ghi trong sổ tay một điều khác...',
        question: 'Bác Hồ đã quan sát và nhận ra điều gì đằng sau vẻ hào nhoáng của nước Mỹ?',
        options: [
          { id: 'a', text: '🗽 Nước Mỹ thật sự là xứ sở tự do, bình đẳng như lời tuyên bố.', isCorrect: false },
          { id: 'b', text: '🏗️ Kỹ thuật xây dựng của Mỹ rất tiên tiến, đáng học hỏi.', isCorrect: false },
          { id: 'c', text: '💔 "Ánh sáng trên đầu Tượng Thần Tự Do không chiếu rọi đến những người da đen đang bị chà đạp" - tự do chỉ dành cho người giàu, người da trắng.', isCorrect: true },
          { id: 'd', text: '🌟 Mỹ là hình mẫu cho Việt Nam noi theo để giành độc lập.', isCorrect: false },
        ],
        message: '💡 Bác Hồ nhìn thấy bản chất: "Tự do" ở Mỹ không dành cho tất cả. Người da đen, người lao động vẫn bị áp bức. Đây là TƯ DUY PHẢN BIỆN - nhìn qua bề ngoài để thấy sự thật!',
      },
      // Scenario 2: Categorize - Những gì Bác quan sát ở Mỹ
      {
        id: 'usa-cat-1',
        type: 'categorize',
        intro: 'Trong thời gian ở Mỹ (1912-1913), Nguyễn Tất Thành đã ghi chép nhiều điều vào sổ tay. Hãy phân biệt đâu là "vẻ bề ngoài" và đâu là "bản chất" mà Người nhận ra.',
        question: 'Phân loại các quan sát của Bác:',
        categories: [
          { 
            id: 'phenomenon', 
            name: '✨ Vẻ bề ngoài (Hiện tượng)', 
            items: [
              'Tòa nhà chọc trời, đường phố sáng đèn suốt đêm',
              'Tuyên ngôn "tất cả mọi người sinh ra đều bình đẳng"',
              'Báo chí tự do, nhiều đảng phái chính trị',
              'Tượng Nữ Thần Tự Do - biểu tượng của nước Mỹ'
            ] 
          },
          { 
            id: 'essence', 
            name: '💔 Bản chất (Thực tế)', 
            items: [
              'Người da đen bị phân biệt, không được vào nhiều nơi công cộng',
              'Công nhân làm việc 12-14 tiếng/ngày với lương rẻ mạt',
              'Ku Klux Klan tấn công, giết hại người da màu mà không bị trừng phạt',
              'Người nghèo, người nhập cư sống trong khu ổ chuột tồi tàn'
            ] 
          },
        ],
        message: '📚 Bác Hồ viết: "Họ tuyên bố bình đẳng nhưng người da đen vẫn bị treo cổ. Họ nói tự do nhưng công nhân vẫn bị bóc lột." Quan sát thực tiễn giúp thấy rõ bản chất!',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CHẶNG 2: ANH (1913-1917) | Vật dụng: Túi dụng cụ
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'uk',
    country: 'UK',
    countryVi: 'Anh',
    flag: '🇬🇧',
    period: '1913-1917',
    theme: 'Labor Discipline & Preparation',
    themeVi: 'Kỷ luật lao động & Sự chuẩn bị',
    symbol: '🧰',
    symbolName: 'Túi dụng cụ',
    symbolDescription: 'Biểu tượng của kỷ luật, chuẩn bị và tôn trọng lao động',
    bgImage: '',
    bgGradient: 'from-red-900 via-gray-800 to-blue-900',
    
    // STORYLINE - Kết nối từ Hoa Kỳ
    storyIntro: `Rời nước Mỹ với cuốn sổ tay đầy những ghi chép và suy tư, Nguyễn Tất Thành tiếp tục hành trình sang nước Anh.

Tại Anh (1913-1917), Người làm nhiều công việc lao động và trải nghiệm cuộc sống của giai cấp công nhân. Từ việc cào tuyết, đốt lò, đến phụ bếp trong khách sạn - mỗi công việc đều đòi hỏi tác phong kỷ luật.

Chiếc túi dụng cụ tuy nhỏ bé, nhưng phản ánh một thái độ: luôn chuẩn bị chu đáo, làm việc có trách nhiệm, và tự rèn mình trong những điều bình thường hằng ngày.`,
    
    storyConnection: '📔 → 🧰 Từ việc QUAN SÁT ở Mỹ, giờ đây Người bắt đầu THỰC HÀNH - rèn luyện bản thân qua lao động.',
    
    keyPoints: [
      'Lao động rèn luyện tác phong kỷ luật và tính tự giác',
      'Chuẩn bị chu đáo giúp chủ động trước khó khăn',
      'Tôn trọng công cụ lao động cũng là tôn trọng giá trị lao động'
    ],
    
    storyConclusion: 'Kỷ luật không đến từ điều to tát, mà từ tác phong hằng ngày. Chuẩn bị chu đáo, làm việc ngăn nắp và đúng giờ giúp ta bền bỉ, tự tin và tôn trọng giá trị lao động.',
    
    practiceHint: 'Trước mỗi buổi học/làm, dành 2 phút kiểm tra: "Đã đủ và gọn chưa?"',
    
    scenarios: [
      // Scenario 1: Ordering - Một ngày làm việc của Bác ở Anh
      {
        id: 'uk-ord-1',
        type: 'ordering',
        intro: 'Tại London (1914-1917), Nguyễn Tất Thành làm phụ bếp tại khách sạn Carlton - một công việc vất vả nhưng Người vẫn tự học tiếng Anh mỗi ngày. Hãy sắp xếp lịch trình một ngày của Bác.',
        question: 'Sắp xếp các hoạt động theo thứ tự HỢP LÝ của một ngày:',
        orderItems: [
          { id: 1, text: '🌅 Dậy sớm, chuẩn bị đồ dùng gọn gàng trước khi đi làm', correctOrder: 1 },
          { id: 2, text: '👨‍🍳 Làm việc chăm chỉ, quan sát và học hỏi từ đầu bếp Escoffier', correctOrder: 2 },
          { id: 3, text: '🧹 Dọn dẹp sạch sẽ vị trí làm việc trước khi về', correctOrder: 3 },
          { id: 4, text: '📖 Tranh thủ thời gian rảnh đọc sách, học từ vựng tiếng Anh', correctOrder: 4 },
          { id: 5, text: '✍️ Ghi chép những điều quan sát được trong ngày vào sổ tay', correctOrder: 5 },
        ],
        message: '⚒️ Đầu bếp Escoffier rất quý Bác vì tính cần cù, sạch sẽ. Ông muốn dạy Bác nấu ăn, nhưng Bác từ chối vì có "mục đích khác lớn hơn". Kỷ luật + Mục tiêu rõ ràng!',
      },
      // Scenario 2: Multiple choice - Lựa chọn của Bác sau giờ làm
      {
        id: 'uk-mc-1',
        type: 'multiple-choice',
        intro: 'Sau ca làm 10-12 tiếng mệt nhọc, các đồng nghiệp rủ Nguyễn Tất Thành đi quán rượu giải trí. Nhưng Người từ chối với lý do gì?',
        question: 'Vì sao Bác Hồ không đi chơi cùng đồng nghiệp sau giờ làm?',
        options: [
          { id: 'a', text: '💰 Vì muốn tiết kiệm tiền gửi về cho gia đình.', isCorrect: false },
          { id: 'b', text: '😴 Vì quá mệt, chỉ muốn ngủ.', isCorrect: false },
          { id: 'c', text: '📚 Vì muốn dùng thời gian đó để tự học tiếng Anh và đọc sách, chuẩn bị cho con đường cứu nước.', isCorrect: true },
          { id: 'd', text: '🤝 Vì không thích giao lưu với người nước ngoài.', isCorrect: false },
        ],
        message: '📖 Bác Hồ nói: "Tôi phải học, vì dân tộc tôi đang đau khổ. Tôi không có thời gian để vui chơi." Kiên trì tự học trong mọi hoàn cảnh là chìa khóa thành công!',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CHẶNG 3: PHÁP (1917-1923) | Vật dụng: Cây bút
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'france',
    country: 'France',
    countryVi: 'Pháp',
    flag: '🇫🇷',
    period: '1917-1923',
    theme: 'Intellect & Writing as a Weapon',
    themeVi: 'Trí tuệ & Ngòi bút chiến đấu',
    symbol: '🖋️',
    symbolName: 'Cây bút',
    symbolDescription: 'Biểu tượng của trí tuệ, báo chí và đấu tranh bằng ngôn từ',
    bgImage: '',
    bgGradient: 'from-blue-900 via-white/20 to-red-900',
    
    // STORYLINE - Kết nối từ Anh
    storyIntro: `Mang theo kỷ luật lao động và khả năng ngôn ngữ được rèn giũa ở Anh, Nguyễn Tất Thành trở lại Pháp năm 1917 - ngay giữa cao trào đấu tranh chính trị sôi sục.

Tại Pháp (1917-1923), Người lấy tên Nguyễn Ái Quốc và bắt đầu hoạt động trong môi trường giao thoa nhiều luồng tư tưởng. Giữa tranh luận và biến động thời cuộc, Người kiên trì sử dụng ngòi bút để lên tiếng cho quyền lợi của nhân dân Việt Nam.

Cây bút không chỉ là công cụ ghi chép, mà là vũ khí của trí tuệ, lòng can đảm và sự chuẩn bị kỹ lưỡng trong đấu tranh bằng ngôn từ.`,
    
    storyConnection: '🧰 → 🖋️ Từ người LAO ĐỘNG ở Anh, giờ đây Người trở thành người CHIẾN SĨ bằng ngòi bút.',
    
    keyPoints: [
      'Báo chí và ngôn từ là con đường đấu tranh có sức lan tỏa mạnh',
      'Đấu tranh cần lý lẽ, chứng cứ, mục tiêu rõ ràng',
      'Từ nhận thức, Người tiến tới hành động tổ chức và đường lối'
    ],
    
    storyConclusion: 'Ngôn từ có sức mạnh khi phục vụ lẽ phải. Đấu tranh cần trí tuệ, chứng cứ và mục tiêu rõ ràng - để tiếng nói của người yếu thế được lắng nghe.',
    
    practiceHint: 'Khi viết một đoạn ý kiến, hãy tự hỏi: viết để làm gì, cho ai, thông điệp chính là gì?',
    
    scenarios: [
      // Scenario 1: Multiple choice - Bản yêu sách 8 điểm
      {
        id: 'france-mc-1',
        type: 'multiple-choice',
        intro: 'Năm 1919, Nguyễn Ái Quốc gửi "Bản yêu sách của nhân dân An Nam" đến Hội nghị Versailles. Đây là lần đầu tiên một người Việt Nam đứng lên đòi quyền lợi cho dân tộc trên diễn đàn quốc tế.',
        question: 'Điểm ĐẶC BIỆT trong cách đấu tranh của Bác tại Pháp là gì?',
        options: [
          { id: 'a', text: '🔫 Kêu gọi khởi nghĩa vũ trang chống Pháp ngay lập tức.', isCorrect: false },
          { id: 'b', text: '🙏 Xin Pháp ban ơn cho người An Nam một số quyền lợi.', isCorrect: false },
          { id: 'c', text: '📜 Đưa ra yêu sách CỤ THỂ, có lý lẽ pháp lý, dựa trên nguyên tắc "dân tộc tự quyết" mà Pháp đã ký.', isCorrect: true },
          { id: 'd', text: '🌍 Kêu gọi các nước khác xâm lược Pháp để trả thù.', isCorrect: false },
        ],
        message: '✍️ Bản yêu sách không "xin ơn" mà ĐÒI QUYỀN - dựa trên chính lời hứa của Pháp về "dân tộc tự quyết". Đấu tranh bằng LÝ LẼ, bằng CHỨNG CỨ!',
      },
      // Scenario 2: Matching - Các tác phẩm của Bác tại Pháp
      {
        id: 'france-match-1',
        type: 'matching',
        intro: 'Tại Pháp, Nguyễn Ái Quốc sáng lập và viết cho nhiều tờ báo, tác phẩm. Mỗi công trình có mục đích riêng.',
        question: 'Ghép ĐÚNG tác phẩm/tờ báo với mục đích của nó:',
        matchPairs: [
          { id: '1', left: '📜 Bản yêu sách của nhân dân An Nam (1919)', right: 'Đòi quyền tự do, bình đẳng cho người Việt trước quốc tế' },
          { id: '2', left: '📰 Báo Le Paria - Người Cùng Khổ (1922)', right: 'Đoàn kết các dân tộc thuộc địa cùng đấu tranh' },
          { id: '3', left: '📕 Bản án chế độ thực dân Pháp (1925)', right: 'Tố cáo tội ác của thực dân Pháp bằng chứng cứ cụ thể' },
          { id: '4', left: '🎭 Vở kịch "Con Rồng Tre" (1922)', right: 'Châm biếm vua Khải Định và chế độ bù nhìn' },
        ],
        message: '⚔️ Bác dùng nhiều hình thức: yêu sách, báo chí, sách, kịch - tất cả đều là VŨ KHÍ của trí tuệ để đấu tranh cho độc lập!',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CHẶNG 4: LIÊN XÔ (1923-1924) | Vật dụng: Cẩm nang lý luận
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'ussr',
    country: 'USSR',
    countryVi: 'Liên Xô',
    flag: '☭',
    period: '1923-1924',
    theme: 'Theory & Practice',
    themeVi: 'Lý luận gắn thực tiễn',
    symbol: '📕',
    symbolName: 'Cẩm nang lý luận',
    symbolDescription: 'Biểu tượng của học tập hệ thống và vận dụng sáng tạo',
    bgImage: '',
    bgGradient: 'from-red-900 via-red-800 to-yellow-900',
    
    // STORYLINE - Kết nối từ Pháp
    storyIntro: `Sau khi tham gia thành lập Đảng Cộng sản Pháp (1920) và hoạt động báo chí sôi nổi, Nguyễn Ái Quốc được cử sang Liên Xô - quê hương của Cách mạng Tháng Mười.

Tại Liên Xô (1923-1924), Người tiếp cận hệ thống lý luận cách mạng được trình bày có cấu trúc và tính khoa học. Việc học tập không dừng ở "biết", mà hướng tới "hiểu" và "vận dụng".

Từ kho lý luận, Người tìm cách kết nối nguyên lý chung với hoàn cảnh cụ thể của Việt Nam: một đất nước thuộc địa cần độc lập, cần tổ chức, cần lực lượng và cần đường lối.`,
    
    storyConnection: '🖋️ → 📕 Từ người CHIẾN SĨ bằng ngòi bút, giờ đây Người trở thành người HỌC TRÒ của lý luận cách mạng.',
    
    keyPoints: [
      'Lý luận là đèn soi đường, nhưng phải gắn với thực tiễn',
      'Học tập cần hệ thống và kỷ luật, tránh học "chớp nhoáng"',
      'Vận dụng sáng tạo theo hoàn cảnh Việt Nam là điều quyết định'
    ],
    
    storyConclusion: 'Học tập lý luận là để mở đường cho hành động. Chọn điều cốt lõi, hiểu cho đúng, và vận dụng sáng tạo - để lý luận trở thành sức mạnh thực tiễn.',
    
    practiceHint: 'Khi học một khái niệm, hãy viết 1 câu: "Nó áp dụng vào việc gì trong học tập/đời sống của mình?"',
    
    scenarios: [
      // Scenario 1: Balance - Cân bằng lý luận và thực tiễn
      {
        id: 'ussr-bal-1',
        type: 'balance',
        intro: 'Tại Liên Xô, Nguyễn Ái Quốc được đào tạo bài bản về chủ nghĩa Mác - Lênin. Nhưng Người hiểu rằng: lý thuyết mà không có thực hành thì chỉ là "lý luận suông".',
        question: '⚠️ CHÚ Ý: Có những "quả cân bẫy" - hành động SAI LẦM! Hãy chọn ĐÚNG các hành động thực tiễn phù hợp.',
        balanceGame: {
          leftSide: {
            name: 'Lý luận',
            description: 'Nghiên cứu lý thuyết Mác-Lênin',
          },
          rightSide: {
            name: 'Thực tiễn',
            description: 'Vận dụng sáng tạo vào thực tế',
          },
          weights: [
            // ĐÚNG - Nên chọn
            { 
              id: 'w1', 
              text: 'Khảo sát thực tế đời sống nhân dân', 
              icon: '🔍', 
              belongsTo: 'right',
              isCorrect: true,
              explanation: 'Bác luôn đi sâu vào quần chúng để hiểu thực tế.'
            },
            { 
              id: 'w2', 
              text: 'Thí điểm mô hình nhỏ trước khi nhân rộng', 
              icon: '🧪', 
              belongsTo: 'right',
              isCorrect: true,
              explanation: 'Làm thử trước, rút kinh nghiệm rồi mới triển khai rộng.'
            },
            { 
              id: 'w3', 
              text: 'Lao động sản xuất cùng quần chúng', 
              icon: '⚒️', 
              belongsTo: 'right',
              isCorrect: true,
              explanation: 'Cán bộ phải gắn bó với nhân dân, không xa rời thực tế.'
            },
            { 
              id: 'w4', 
              text: 'Điều chỉnh lý luận dựa trên kết quả thực tế', 
              icon: '📝', 
              belongsTo: 'right',
              isCorrect: true,
              explanation: 'Thực tiễn là thước đo chân lý, phải biết sửa đổi khi sai.'
            },
            // SAI - Bẫy, không nên chọn
            { 
              id: 'w5', 
              text: 'Sao chép nguyên xi mô hình Liên Xô về Việt Nam', 
              icon: '📋', 
              belongsTo: 'right',
              isCorrect: false,
              explanation: 'Sao chép máy móc không phù hợp với hoàn cảnh Việt Nam!'
            },
            { 
              id: 'w6', 
              text: 'Chỉ cần học thuộc sách vở, không cần thực hành', 
              icon: '📚', 
              belongsTo: 'right',
              isCorrect: false,
              explanation: 'Đây chính là "lý luận suông" mà Bác phê phán!'
            },
            { 
              id: 'w7', 
              text: 'Áp đặt lý thuyết mà không cần kiểm chứng', 
              icon: '⛔', 
              belongsTo: 'right',
              isCorrect: false,
              explanation: 'Áp đặt cứng nhắc sẽ thất bại vì không phù hợp thực tế.'
            },
          ],
          imbalanceMessage: '⚖️ Cân đang mất cân bằng! Hãy chọn các hành động thực tiễn ĐÚNG ĐẮN.',
          balanceMessage: '✨ Xuất sắc! Lý luận và Thực tiễn đã song hành - đó là bí quyết thành công của Bác!',
          wrongChoiceMessage: '❌ Có quả cân SAI! Hãy suy nghĩ lại - đâu mới là thực tiễn đúng đắn?',
        },
        message: '🎓 "Lý luận mà không có thực tiễn là lý luận suông. Thực tiễn mà không có lý luận là thực tiễn mù quáng." - Hồ Chí Minh',
      },
      // Scenario 2: Multiple choice - Bác học và vận dụng tại Liên Xô
      {
        id: 'ussr-mc-1',
        type: 'multiple-choice',
        intro: 'Năm 1923, Nguyễn Ái Quốc đến Liên Xô và học tại Đại học Phương Đông (nơi đào tạo cán bộ cách mạng). Các giảng viên dạy mô hình cách mạng dựa trên giai cấp công nhân thành thị, phù hợp với nước Nga công nghiệp. Nhưng Việt Nam là nước nông nghiệp với 90% dân số là nông dân.',
        question: 'Nguyễn Ái Quốc đã vận dụng lý luận Mác-Lênin như thế nào cho phù hợp với Việt Nam?',
        options: [
          { id: 'a', text: '📋 Áp dụng nguyên xi mô hình Liên Xô: cách mạng do công nhân lãnh đạo, bỏ qua nông dân.', isCorrect: false },
          { id: 'b', text: '🚫 Từ chối học Chủ nghĩa Mác-Lênin vì không phù hợp với Việt Nam.', isCorrect: false },
          { id: 'c', text: '🎯 Giữ nguyên lý cốt lõi (giải phóng dân tộc, đấu tranh giai cấp) nhưng nhấn mạnh vai trò NÔNG DÂN - lực lượng chủ yếu của cách mạng Việt Nam.', isCorrect: true },
          { id: 'd', text: '⏳ Chờ đến khi Việt Nam phát triển công nghiệp như Nga rồi mới làm cách mạng.', isCorrect: false },
        ],
        message: '💡 Bác Hồ nhận ra: Việt Nam cần "cách mạng giải phóng dân tộc" với nông dân làm chủ lực, khác với Nga. Người giữ NGUYÊN LÝ Mác-Lênin nhưng VẬN DỤNG SÁNG TẠO phù hợp hoàn cảnh Việt Nam!',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CHẶNG 5: THỔ NHĨ KỲ (Chặng qua đường) | Vật dụng: Gương tay
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'turkey',
    country: 'Turkey',
    countryVi: 'Thổ Nhĩ Kỳ',
    flag: '🇹🇷',
    period: 'Trên đường đi',
    theme: 'Self-reflection & Resilience',
    themeVi: 'Tự soi - Tự sửa - Bản lĩnh',
    symbol: '🪞',
    symbolName: 'Gương tay',
    symbolDescription: 'Biểu tượng của tự rèn luyện và giữ vững bản lĩnh',
    bgImage: '',
    bgGradient: 'from-red-900 via-orange-800 to-red-900',
    
    // STORYLINE - Kết nối từ Liên Xô
    storyIntro: `Rời Liên Xô với hành trang lý luận vững chắc, Nguyễn Ái Quốc bắt đầu hành trình trở về phương Đông. Con đường không hề dễ dàng - phải đi qua nhiều nước, đối mặt với muôn vàn khó khăn.

Trên những chặng đường dài, không chỉ cần kiên trì mà còn cần tự rèn. Hình ảnh chiếc gương tay là biểu tượng của "tự soi, tự sửa": nhìn lại mình đã làm được gì, còn thiếu gì, và cần giữ vững điều gì để không lung lay trước khó khăn.

Chặng này tập trung vào trải nghiệm phản tư - không "trả lời cho đúng", mà chọn những giá trị muốn giữ lấy cho mình.`,
    
    storyConnection: '📕 → 🪞 Từ người HỌC TRÒ của lý luận, giờ đây Người phải TỰ RÈN MÌNH trên đường trường.',
    
    keyPoints: [
      'Tự rèn luyện là nền tảng của bản lĩnh',
      'Biết tự nhìn lại giúp tiến bộ mỗi ngày',
      'Giữ vững giá trị cốt lõi giúp không lạc hướng'
    ],
    
    storyConclusion: 'Chặng đường dài luôn có lúc mệt mỏi và hoang mang. Chiếc gương tay nhắc ta: biết tự soi, tự sửa và giữ vững giá trị cốt lõi. Tự rèn là nền tảng để làm việc lớn.',
    
    practiceHint: 'Chọn 1 thói quen nhỏ và giữ liên tục 7 ngày (đúng giờ, ghi chép, tiết kiệm...).',
    
    scenarios: [
      // Scenario 1: Multiple choice - Kiên trì trước khó khăn như Bác
      {
        id: 'turkey-mc-1',
        type: 'multiple-choice',
        intro: 'Trên đường từ Liên Xô về phương Đông, Nguyễn Ái Quốc phải đi qua nhiều nước, gặp vô vàn khó khăn: thiếu tiền, bị theo dõi, nhiều lần suýt bị bắt. Có lúc kế hoạch bị trì hoãn hàng tháng trời.',
        question: 'Trước những khó khăn đó, Bác Hồ đã làm gì?',
        options: [
          { id: 'a', text: '😤 Than phiền và trách móc hoàn cảnh không thuận lợi.', isCorrect: false },
          { id: 'b', text: '🔙 Quay lại Liên Xô để chờ thời cơ thuận lợi hơn.', isCorrect: false },
          { id: 'c', text: '🧘 Kiên nhẫn chờ đợi, tận dụng thời gian để nghiên cứu, viết sách và chuẩn bị cho công việc tiếp theo.', isCorrect: true },
          { id: 'd', text: '⚡ Liều lĩnh hành động bất chấp nguy hiểm để về nước nhanh hơn.', isCorrect: false },
        ],
        message: '💪 Bác Hồ viết: "Kiên quyết nhưng không liều lĩnh. Biết chờ đợi nhưng không thụ động." Trong thời gian chờ đợi, Người vẫn học tập và chuẩn bị. Đó là TỰ RÈN!',
      },
      // Scenario 2: Ordering - Quy trình tự phản tỉnh của Bác
      {
        id: 'turkey-ord-1',
        type: 'ordering',
        intro: 'Bác Hồ nổi tiếng với việc "tự soi, tự sửa" - một phương pháp mà Người thực hành suốt đời. Hãy sắp xếp quy trình này theo đúng logic.',
        question: 'Sắp xếp các bước "tự soi, tự sửa" theo thứ tự ĐÚNG:',
        orderItems: [
          { id: 1, text: '🔍 TỰ SOI: Nhìn lại hành động của mình - làm được gì? còn thiếu gì?', correctOrder: 1 },
          { id: 2, text: '📝 NHẬN LỖI: Thành thật thừa nhận điểm yếu, không bao biện', correctOrder: 2 },
          { id: 3, text: '🎯 ĐẶT MỤC TIÊU: Xác định cụ thể điều cần sửa đổi', correctOrder: 3 },
          { id: 4, text: '⚡ HÀNH ĐỘNG: Thực hành thay đổi trong thực tế hàng ngày', correctOrder: 4 },
          { id: 5, text: '🔄 KIỂM TRA: Đánh giá kết quả, điều chỉnh nếu cần', correctOrder: 5 },
        ],
        message: '🌟 Bác Hồ dạy: "Phải tự phê bình và phê bình một cách thành khẩn." Tự rèn không phải tự hành xác, mà là PHƯƠNG PHÁP tiến bộ từng ngày!',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // CHẶNG 6: VIỆT NAM | Vật dụng: Nón lá / Bao lì xì
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'vietnam',
    country: 'Vietnam',
    countryVi: 'Việt Nam',
    flag: '🇻🇳',
    period: 'Sau khi về nước',
    theme: 'Simplicity & Community',
    themeVi: 'Giản dị & Gắn bó nhân dân',
    symbol: '🎋',
    symbolName: 'Nón lá',
    symbolDescription: 'Biểu tượng của sự giản dị, gắn bó nhân dân và tiết kiệm',
    bgImage: '',
    bgGradient: 'from-red-900 via-yellow-700 to-red-900',
    
    // STORYLINE - Kết nối từ Thổ Nhĩ Kỳ
    storyIntro: `Sau 30 năm bôn ba tìm đường cứu nước, Nguyễn Ái Quốc trở về Tổ quốc vào năm 1941, mang theo hành trang quý giá: sổ tay quan sát, túi dụng cụ kỷ luật, cây bút đấu tranh, cẩm nang lý luận và tấm gương tự rèn.

Gắn bó với nhân dân, Chủ tịch Hồ Chí Minh giữ nếp sống thanh bạch và giản dị. Những vật dụng như nón lá hay phong bao giấy không mang giá trị vật chất lớn, nhưng thể hiện phong cách: gần gũi, tiết kiệm, tôn trọng người lao động.

Chặng cuối mời bạn tự hỏi: nếu muốn sống "vì người", mình có thể bắt đầu từ điều gì nhỏ nhất?`,
    
    storyConnection: '🪞 → 🎋 Từ người TỰ RÈN MÌNH, giờ đây Người trở thành tấm gương SỐNG VÌ NHÂN DÂN.',
    
    keyPoints: [
      'Giản dị không phải thiếu thốn, mà là lựa chọn có ý thức',
      'Gắn bó với nhân dân thể hiện qua cách sống và cách ứng xử',
      'Tiết kiệm, chống lãng phí là giá trị thiết thực mọi thời'
    ],
    
    storyConclusion: 'Giản dị, tiết kiệm và gắn bó với nhân dân không phải điều xa xôi. Đó là những lựa chọn nhỏ, lặp lại mỗi ngày - để sống có ích và có ý nghĩa.',
    
    practiceHint: 'Chọn 1 hành động tiết kiệm nhỏ và giữ trong 7 ngày.',
    
    scenarios: [
      // Scenario 1: Categorize - Phong cách giản dị của Bác
      {
        id: 'vietnam-cat-1',
        type: 'categorize',
        intro: 'Khi đã trở thành Chủ tịch nước, Bác Hồ vẫn giữ lối sống vô cùng giản dị. Hãy phân biệt đâu là phong cách sống của Bác và đâu là điều Bác KHÔNG làm.',
        question: 'Phân loại các thói quen/hành vi sau:',
        categories: [
          { 
            id: 'hcm-style', 
            name: '⭐ Phong cách Bác Hồ', 
            items: [
              '🍚 Bữa cơm chỉ có cá kho, rau luộc, dưa cà muối',
              '👔 Mặc bộ kaki sờn vai, đôi dép cao su mòn gót',
              '🏠 Ở nhà sàn nhỏ thay vì Phủ Chủ tịch sang trọng',
              '🚶 Thường xuyên đi bộ thăm dân, vào tận ruộng đồng'
            ] 
          },
          { 
            id: 'not-hcm', 
            name: '❌ KHÔNG phải phong cách Bác', 
            items: [
              '🍽️ Yêu cầu bữa ăn đặc biệt vì là Chủ tịch nước',
              '🤵 Mặc com-lê đắt tiền để thể hiện uy quyền',
              '🚗 Dùng xe riêng có người hầu đi mọi nơi',
              '💎 Nhận quà biếu giá trị từ cấp dưới'
            ] 
          },
        ],
        message: '🌾 Bác nói: "Người ta thường nói: Địa vị càng cao thì càng phải giản dị. Đó là đạo đức cách mạng." Giản dị không phải nghèo khó, mà là LỰA CHỌN có ý thức!',
      },
      // Scenario 2: Fill-blank - Câu nói nổi tiếng của Bác
      {
        id: 'vietnam-fill-1',
        type: 'fill-blank',
        intro: 'Bác Hồ để lại nhiều câu nói bất hủ về việc chăm lo cho thế hệ trẻ - tương lai của đất nước.',
        question: 'Hoàn thành câu nói nổi tiếng của Bác về đầu tư cho tương lai:',
        fillBlanks: {
          text: '"Vì lợi ích ___ thì phải trồng cây, vì lợi ích ___ thì phải trồng người."',
          blanks: [
            { id: 'blank1', answer: 'mười năm', options: ['một năm', 'mười năm', 'trăm năm'] },
            { id: 'blank2', answer: 'trăm năm', options: ['mười năm', 'trăm năm', 'nghìn năm'] },
          ],
        },
        message: '🌱 Bác dạy: Trồng cây cho lợi ích 10 năm, nhưng "trồng người" - giáo dục thế hệ trẻ - mang lại lợi ích CẢ TRĂM NĂM. Đầu tư cho bản thân là đầu tư bền vững nhất!',
      },
    ],
  },
];

// ==================== REWARDS (Quà tặng) ====================

export const rewards: Reward[] = [
  {
    id: 'notebook',
    name: 'Sổ tay ghi chép',
    icon: '📔',
    message: 'Biểu tượng của việc học từ thực tế và tư duy độc lập. Mỗi trang sổ là một bước tự mình quan sát, tự mình hiểu.',
    meaning: 'Ghi chép từ thực tế giúp hình thành cách nhìn sau bề ngoài.',
    practiceHint: 'Mỗi ngày ghi 3 dòng về điều mình học được từ thực tế.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'toolkit',
    name: 'Túi dụng cụ',
    icon: '🧰',
    message: 'Biểu tượng của kỷ luật và sự chuẩn bị. Ngay cả việc sắp xếp gọn gàng cũng rèn tác phong bền bỉ.',
    meaning: 'Tác phong kỷ luật, ngăn nắp là nền tảng của lao động.',
    practiceHint: 'Trước mỗi buổi học/làm, kiểm tra túi đồ: đủ - gọn - đúng.',
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'pen',
    name: 'Cây bút máy',
    icon: '🖋️',
    message: 'Biểu tượng của trí tuệ và sức mạnh ngôn từ. Viết đúng, viết thật, viết có mục tiêu là cách làm việc có trách nhiệm.',
    meaning: 'Ngôn từ có sức mạnh khi phục vụ lẽ phải.',
    practiceHint: 'Tập viết 1 đoạn 5 câu: rõ vấn đề, có lý lẽ, tôn trọng sự thật.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'book',
    name: 'Cẩm nang lý luận',
    icon: '📕',
    message: 'Biểu tượng của học tập hệ thống và vận dụng lý luận vào thực tiễn. Học để làm, không học để nói.',
    meaning: 'Lý luận là đèn soi đường, nhưng giá trị nhất khi vận dụng vào thực tế.',
    practiceHint: 'Học 1 ý, viết 1 ví dụ gần đời sống.',
    color: 'from-red-500 to-red-700',
  },
  {
    id: 'mirror',
    name: 'Gương tay nhỏ',
    icon: '🪞',
    message: 'Biểu tượng của tự soi, tự sửa. Trung thực với mình là bước đầu của tiến bộ bền vững.',
    meaning: 'Tự rèn luyện là nền tảng của bản lĩnh.',
    practiceHint: 'Mỗi tuần chọn 1 điều cần sửa và kiểm tra lại sau 7 ngày.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 'conical-hat',
    name: 'Nón lá',
    icon: '🎋',
    message: 'Biểu tượng của sự giản dị, gắn bó với người lao động và tinh thần vì cộng đồng.',
    meaning: 'Giản dị và gắn bó với nhân dân thể hiện qua cách sống thiết thực.',
    practiceHint: 'Làm 1 việc nhỏ cho tập thể trong tuần này.',
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'red-envelope',
    name: 'Bao lì xì giấy',
    icon: '🧧',
    message: 'Biểu tượng của sự chân thành và tiết kiệm. Giá trị nằm ở tấm lòng, không ở hình thức.',
    meaning: 'Tiết kiệm, chống lãng phí là giá trị thiết thực mọi thời.',
    practiceHint: 'Viết 1 lời chúc/lời cảm ơn chân thành tới một người bạn quý trọng.',
    color: 'from-red-400 to-yellow-500',
  },
];

// ==================== HELPER FUNCTIONS ====================

// Lấy random scenario từ một stage
export const getRandomScenario = (stage: GameStage): Scenario => {
  const randomIndex = Math.floor(Math.random() * stage.scenarios.length);
  return stage.scenarios[randomIndex];
};

// Lấy random reward
export const getRandomReward = (): Reward => {
  const randomIndex = Math.floor(Math.random() * rewards.length);
  return rewards[randomIndex];
};

// Lấy stage theo id
export const getStageById = (id: string): GameStage | undefined => {
  return gameStages.find(stage => stage.id === id);
};

// Lấy storyline connection text
export const getStoryConnection = (stageIndex: number): string => {
  if (stageIndex === 0) return '🚢 Khởi đầu hành trình...';
  
  const stage = gameStages[stageIndex];
  return stage?.storyConnection || '';
};
