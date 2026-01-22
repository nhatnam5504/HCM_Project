// Data cho game "Theo Dấu Chân Bác"

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
  bgImage: string;
  bgGradient: string;
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
  blanks: { id: string; answer: string }[];
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
  wrongChoiceMessage: string; // Message when picking wrong weight
};

export type BalanceWeight = {
  id: string;
  text: string;
  icon: string;
  belongsTo: 'left' | 'right';
  isCorrect: boolean; // true = should be placed, false = trap/wrong choice
  explanation?: string; // Why this choice is right/wrong
};

export type Reward = {
  id: string;
  name: string;
  icon: string;
  message: string;
  color: string;
};

// ==================== GAME STAGES ====================

export const gameStages: GameStage[] = [
  // CHẶNG 1: HOA KỲ
  {
    id: 'usa',
    country: 'USA',
    countryVi: 'Hoa Kỳ',
    flag: '🇺🇸',
    period: '1912–1913',
    theme: 'Observation & Independent Thinking',
    themeVi: 'Quan sát thực tế & Tư duy độc lập',
    symbol: '📔',
    symbolName: 'Cuốn sổ tay',
    bgImage: '',
    bgGradient: 'from-blue-900 via-red-800 to-blue-900',
    scenarios: [
      {
        id: 'usa-a',
        type: 'multiple-choice',
        intro: 'Khi đến New York, Nguyễn Tất Thành đã nhìn thấy Tượng Nữ Thần Tự Do. Trong khi nhiều người choáng ngợp trước sự vĩ đại của nó, Người lại có suy nghĩ khác.',
        question: 'Theo bạn, đâu là góc nhìn phản ánh đúng tư duy của Người lúc đó?',
        options: [
          { id: 'a', text: 'Ngưỡng mộ kỹ thuật xây dựng vĩ đại của người Mỹ.', isCorrect: false },
          { id: 'b', text: 'Ánh sáng tự do trên đầu tượng tỏa chiếu muôn nơi.', isCorrect: false },
          { id: 'c', text: 'Ánh sáng trên đầu tượng không soi rọi đến những khu ổ chuột tối tăm ngay dưới chân nó.', isCorrect: true },
        ],
        message: '💡 Tư duy độc lập là không chấp nhận những vẻ hào nhoáng bên ngoài, mà phải nhìn thấu nỗi khổ của con người thực tế.',
      },
      {
        id: 'usa-b',
        type: 'categorize',
        intro: 'Xã hội Mỹ lúc bấy giờ vô cùng phồn hoa nhưng cũng đầy rẫy bất công. Hãy giúp phân loại những gì Người đã quan sát vào cuốn sổ tay.',
        question: 'Phân loại các thẻ sau vào hai cột: "Bề ngoài hào nhoáng" và "Sự thật xã hội".',
        categories: [
          { id: 'appearance', name: '✨ Bề ngoài hào nhoáng', items: ['Tòa nhà chọc trời', 'Ánh điện rực rỡ', 'Xe cộ tấp nập'] },
          { id: 'reality', name: '💔 Sự thật xã hội', items: ['Phân biệt chủng tộc', 'Người thất nghiệp', 'Khu ổ chuột Harlem'] },
        ],
        message: '📚 Tri thức chân chính bắt nguồn từ việc quan sát thực tiễn và nhận ra bản chất đằng sau các hiện tượng.',
      },
    ],
  },

  // CHẶNG 2: ANH
  {
    id: 'uk',
    country: 'UK',
    countryVi: 'Anh',
    flag: '🇬🇧',
    period: '1913–1917',
    theme: 'Labor Discipline & Preparation',
    themeVi: 'Kỷ luật lao động & Sự chuẩn bị',
    symbol: '🧱',
    symbolName: 'Viên gạch hồng',
    bgImage: '',
    bgGradient: 'from-red-900 via-gray-800 to-blue-900',
    scenarios: [
      {
        id: 'uk-a',
        type: 'ordering',
        intro: 'Để kiếm sống và hoạt động, Người phải làm những công việc chân tay vất vả như cào tuyết, đốt lò, phụ bếp. Dù vậy, Người luôn làm việc có kế hoạch.',
        question: 'Hãy sắp xếp trình tự một buổi làm việc của Bác.',
        orderItems: [
          { id: 1, text: '🔧 Chuẩn bị dụng cụ lao động gọn gàng', correctOrder: 1 },
          { id: 2, text: '⏰ Tập trung làm việc nghiêm túc, đúng giờ', correctOrder: 2 },
          { id: 3, text: '🧹 Dọn dẹp sạch sẽ nơi làm việc sau khi xong', correctOrder: 3 },
          { id: 4, text: '📖 Dành thời gian tự học ngoại ngữ', correctOrder: 4 },
        ],
        message: '⚒️ Dù làm bất cứ công việc gì, kỷ luật và trách nhiệm chính là phẩm chất của người cách mạng.',
      },
      {
        id: 'uk-b',
        type: 'multiple-choice',
        intro: 'Thời gian rảnh rỗi rất ít ỏi. Nếu bạn là Nguyễn Tất Thành ngày ấy, bạn sẽ chọn làm gì sau giờ làm việc mệt nhọc?',
        question: 'Bạn sẽ lựa chọn gì?',
        options: [
          { id: 'a', text: '😴 Đi ngủ ngay để lấy lại sức.', isCorrect: false },
          { id: 'b', text: '🎉 Tụ tập vui chơi giải trí cho quên mệt nhọc.', isCorrect: false },
          { id: 'c', text: '📚 Tiết kiệm tiền mua sách và tự học tiếng Anh.', isCorrect: true },
        ],
        message: '📖 Kiên trì học tập trong mọi hoàn cảnh là chìa khóa để mở cánh cửa tương lai.',
      },
    ],
  },

  // CHẶNG 3: PHÁP
  {
    id: 'france',
    country: 'France',
    countryVi: 'Pháp',
    flag: '🇫🇷',
    period: '1917–1923',
    theme: 'Intellect & Writing as a Weapon',
    themeVi: 'Trí tuệ & Ngòi bút chiến đấu',
    symbol: '🖋️',
    symbolName: 'Cây bút máy',
    bgImage: '',
    bgGradient: 'from-blue-900 via-white/20 to-red-900',
    scenarios: [
      {
        id: 'france-a',
        type: 'multiple-choice',
        intro: 'Tại Pháp, Nguyễn Ái Quốc nhận ra rằng không chỉ súng đạn mới là vũ khí. Người đã chọn một loại vũ khí khác.',
        question: 'Hãy chọn công cụ đấu tranh chính của Người trong giai đoạn này.',
        options: [
          { id: 'a', text: '🔫 Súng và vũ khí', isCorrect: false },
          { id: 'b', text: '💰 Tiền bạc và tài chính', isCorrect: false },
          { id: 'c', text: '🖋️ Cây bút & Tờ báo', isCorrect: true },
        ],
        message: '✍️ Ngòi bút sắc bén của trí tuệ và chính nghĩa có sức mạnh lay chuyển lòng người.',
      },
      {
        id: 'france-b',
        type: 'matching',
        intro: 'Những hoạt động của Người tại Pháp đã đánh dấu những bước chuyển quan trọng.',
        question: 'Ghép tên văn kiện/tờ báo với mục đích của nó.',
        matchPairs: [
          { id: '1', left: '📜 Bản yêu sách của nhân dân An Nam', right: 'Đòi quyền tự quyết và các quyền tự do dân chủ' },
          { id: '2', left: '📰 Báo Người Cùng Khổ (Le Paria)', right: 'Diễn đàn đoàn kết các dân tộc thuộc địa' },
          { id: '3', left: '📕 Bản án chế độ thực dân Pháp', right: 'Tố cáo tội ác của thực dân trước toàn thế giới' },
        ],
        message: '⚔️ Đấu tranh chính trị cần có lý luận sắc bén và mục tiêu rõ ràng.',
      },
    ],
  },

  // CHẶNG 4: LIÊN XÔ
  {
    id: 'ussr',
    country: 'USSR',
    countryVi: 'Liên Xô',
    flag: '🇷🇺',
    period: '1923–1924',
    theme: 'Theory & Practice',
    themeVi: 'Lý luận & Thực tiễn',
    symbol: '📕',
    symbolName: 'Đường Kách Mệnh',
    bgImage: '',
    bgGradient: 'from-red-900 via-red-800 to-yellow-900',
    scenarios: [
      {
        id: 'ussr-a',
        type: 'balance',
        intro: 'Tại Liên Xô, Nguyễn Ái Quốc được đào tạo bài bản về chủ nghĩa Mác - Lênin. Nhưng Người hiểu rằng: lý thuyết mà không có thực hành thì chỉ là "lý luận suông". Chiếc cân tri thức đang nghiêng lệch - hãy giúp Bác tìm ra những hành động ĐÚNG ĐẮN để cân bằng!',
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
      {
        id: 'ussr-b',
        type: 'multiple-choice',
        intro: 'Có nhiều cách để áp dụng một tư tưởng mới vào Việt Nam. Theo bạn, cách nào là cách Bác Hồ đã chọn?',
        question: 'Cách vận dụng tư tưởng của Bác là gì?',
        options: [
          { id: 'a', text: '📋 Sao chép y nguyên cách làm của nước ngoài.', isCorrect: false },
          { id: 'b', text: '🚫 Từ chối mọi cái mới, chỉ giữ cái cũ.', isCorrect: false },
          { id: 'c', text: '🌟 Tiếp thu tinh hoa nhưng vận dụng sáng tạo, phù hợp với văn hóa và con người Việt Nam.', isCorrect: true },
        ],
        message: '💡 Sáng tạo và linh hoạt là yếu tố sống còn của cách mạng.',
      },
    ],
  },

  // CHẶNG 5: VIỆT NAM
  {
    id: 'vietnam',
    country: 'Vietnam',
    countryVi: 'Việt Nam',
    flag: '🇻🇳',
    period: 'Ngày Trở Về & Lãnh Đạo',
    theme: 'Lifestyle & Values',
    themeVi: 'Lối sống & Giá trị',
    symbol: '👡',
    symbolName: 'Đôi dép cao su',
    bgImage: '',
    bgGradient: 'from-red-900 via-yellow-800 to-red-900',
    scenarios: [
      {
        id: 'vietnam-a',
        type: 'categorize',
        intro: 'Khi đã trở thành Chủ tịch nước, Bác vẫn giữ nếp sống vô cùng giản dị. Đứng trước các lựa chọn sinh hoạt hàng ngày, bạn nghĩ Bác sẽ chọn gì?',
        question: 'Chọn vật dụng/lối sống phù hợp với phong cách Hồ Chí Minh.',
        categories: [
          { id: 'hcm-style', name: '⭐ Phong cách Bác Hồ', items: ['🍚 Bữa cơm dưa cà giản dị', '👔 Bộ quần áo kaki sờn màu', '🚶 Đi bộ thăm dân'] },
          { id: 'not-hcm', name: '❌ Không phải phong cách Bác', items: ['🍽️ Bữa tiệc sang trọng', '🤵 Com-lê đắt tiền', '🚗 Xe đưa rước ồn ào'] },
        ],
        message: '🌾 Giản dị không phải là khắc khổ, mà là sự thanh cao, hòa mình vào cuộc sống của nhân dân.',
      },
      {
        id: 'vietnam-b',
        type: 'fill-blank',
        intro: 'Bác luôn quan tâm đến thế hệ tương lai.',
        question: 'Sắp xếp câu nói nổi tiếng của Bác về "Trồng người":',
        fillBlanks: {
          text: '"Vì lợi ích ___ thì phải trồng cây, vì lợi ích ___ thì phải trồng người."',
          blanks: [
            { id: 'blank1', answer: 'mười năm' },
            { id: 'blank2', answer: 'trăm năm' },
          ],
        },
        message: '🌱 Đầu tư cho con người, cho giáo dục là sự đầu tư bền vững nhất cho tương lai đất nước.',
      },
    ],
  },
];

// ==================== REWARDS ====================

export const rewards: Reward[] = [
  {
    id: 'notebook',
    name: 'Cuốn Sổ Tay',
    icon: '📔',
    message: 'Bạn nhận được Cuốn Sổ Tay. Đây là biểu tượng của sự quan sát và tư duy độc lập. Mong bạn luôn giữ thói quen ghi chép, suy ngẫm và không ngừng tự học mỗi ngày.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'pen',
    name: 'Cây Bút Máy',
    icon: '🖋️',
    message: 'Bạn nhận được Cây Bút Máy. Đây là biểu tượng của tri thức và chính nghĩa. Mong bạn hãy dùng kiến thức của mình để làm việc có ích, góp phần xây dựng cộng đồng.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'sandals',
    name: 'Đôi Dép Cao Su',
    icon: '👡',
    message: 'Bạn nhận được Đôi Dép Cao Su. Đây là biểu tượng của sự giản dị và bền bỉ. Mong bạn luôn vững bước, không ngại khó khăn và luôn giữ được sự khiêm tốn trên con đường mình chọn.',
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'mirror',
    name: 'Chiếc Gương Soi',
    icon: '🪞',
    message: 'Bạn nhận được Chiếc Gương Soi. Đây là biểu tượng của sự tự rèn luyện. Mong bạn mỗi ngày đều "tự soi, tự sửa", nhìn lại bản thân để ngày hôm nay tốt hơn ngày hôm qua.',
    color: 'from-purple-400 to-pink-500',
  },
];

// Helper function to get random scenario from a stage
export const getRandomScenario = (stage: GameStage): Scenario => {
  const randomIndex = Math.floor(Math.random() * stage.scenarios.length);
  return stage.scenarios[randomIndex];
};

// Helper function to get random reward
export const getRandomReward = (): Reward => {
  const randomIndex = Math.floor(Math.random() * rewards.length);
  return rewards[randomIndex];
};
