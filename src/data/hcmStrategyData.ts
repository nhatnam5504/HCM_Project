import {
  Location,
  Decision,
  GameEvent,
  INITIAL_RESOURCES,
  START_YEAR,
} from '../types/hcmStrategy';

// ===== LOCATIONS DATA =====
export const locations: Location[] = [
  {
    id: 'saigon-marseille',
    name: 'Saigon → Marseille',
    nameVi: 'Sài Gòn → Marseille',
    period: '1911',
    description: 'Khởi đầu hành trình từ Bến Nhà Rồng, làm phụ bếp trên tàu Amiral Latouche-Tréville',
    flag: '🇻🇳',
    bgGradient: 'from-blue-500 to-cyan-500',
    icon: '🚢',
    historicalContext:
      'Ngày 5/6/1911, chàng thanh niên Nguyễn Tất Thành rời Tổ quốc với quyết tâm tìm đường cứu nước. Đây là bước ngoặt đầu tiên trong hành trình 30 năm.',
    requiredKnowledge: 0,
    requiredDecisions: ['work-ship'], // Bắt buộc phải làm phụ bếp trước
    minDecisionsCount: 2, // Phải chọn ít nhất 2 quyết định
    decisions: [
      {
        id: 'work-ship',
        type: 'work',
        title: 'Làm phụ bếp trên tàu',
        description: 'Làm việc chăm chỉ trên tàu để kiếm tiền và học hỏi',
        cost: { health: -8 },
        reward: { money: 35, experience: 8 },
        duration: 0.5,
        historicalSignificance: 'Bác đã làm phụ bếp với tên Văn Ba, học được kỷ luật và tác phong công nghiệp',
        icon: '👨‍🍳',
        isRequired: true, // Quyết định bắt buộc
      },
      {
        id: 'observe-ship',
        type: 'study',
        title: 'Quan sát và học hỏi',
        description: 'Quan sát cách làm việc của thủy thủ, học hỏi kinh nghiệm',
        cost: { time: -0.2 },
        reward: { knowledge: 12, experience: 6 },
        duration: 0.3,
        historicalSignificance: 'Bác luôn quan sát và học hỏi từ mọi người xung quanh',
        icon: '👁️',
        requiredDecisions: ['work-ship'], // Phải làm phụ bếp trước
      },
      {
        id: 'travel-marseille',
        type: 'travel',
        title: 'Đến Marseille',
        description: 'Đến thành phố cảng lớn của Pháp',
        cost: { money: -20 },
        reward: { knowledge: 5 },
        duration: 0.5,
        historicalSignificance: 'Marseille là điểm đến đầu tiên của Bác ở châu Âu',
        icon: '🌊',
        requiredDecisions: ['work-ship'], // Phải làm phụ bếp trước khi đi
      },
    ],
    events: [
      {
        id: 'storm-at-sea',
        title: 'Bão trên biển',
        description: 'Tàu gặp bão lớn, công việc khó khăn hơn',
        effect: { health: -15, experience: 5 },
        probability: 0.3,
        historicalContext: 'Hành trình trên biển đầy gian khổ',
        icon: '⛈️',
        type: 'negative',
      },
    ],
  },
  {
    id: 'french-ports',
    name: 'French Ports & North Africa',
    nameVi: 'Các cảng biển Pháp, Bắc Phi',
    period: '1911-1912',
    description: 'Đi qua nhiều cảng biển, chứng kiến cuộc sống nhân dân thuộc địa',
    flag: '🇫🇷',
    bgGradient: 'from-blue-600 to-indigo-600',
    icon: '🌍',
    historicalContext:
      'Bác đã đi qua Algeria, Tunisia, Congo, Senegal... và nhận ra sự bóc lột của chủ nghĩa thực dân trên toàn thế giới',
    requiredKnowledge: 5,
    requiredDecisions: ['observe-colonies'], // Bắt buộc phải quan sát đời sống thuộc địa
    minDecisionsCount: 2,
    decisions: [
      {
        id: 'work-ports',
        type: 'work',
        title: 'Làm việc tại các cảng',
        description: 'Làm đủ nghề để kiếm sống và học hỏi',
        cost: { health: -15 },
        reward: { money: 40, experience: 10 },
        duration: 1,
        historicalSignificance: 'Bác đã làm nhiều công việc khác nhau để hiểu cuộc sống người lao động',
        icon: '💼',
      },
      {
        id: 'observe-colonies',
        type: 'study',
        title: 'Quan sát đời sống thuộc địa',
        description: 'Nghiên cứu và quan sát cuộc sống nhân dân các nước thuộc địa',
        cost: { time: -0.5 },
        reward: { knowledge: 18, experience: 12 },
        duration: 0.8,
        historicalSignificance: 'Nhận thức quan trọng về bản chất chủ nghĩa thực dân',
        icon: '📚',
        isRequired: true, // Quyết định bắt buộc
      },
      {
        id: 'learn-languages',
        type: 'study',
        title: 'Học ngôn ngữ',
        description: 'Học tiếng Pháp và các ngôn ngữ khác',
        cost: { money: -8, time: -0.3 },
        reward: { knowledge: 14, experience: 3 },
        duration: 0.5,
        historicalSignificance: 'Ngôn ngữ là công cụ quan trọng để giao tiếp và học hỏi',
        icon: '🗣️',
        requiredDecisions: ['observe-colonies'], // Phải quan sát trước khi học ngôn ngữ
      },
    ],
    events: [
      {
        id: 'meet-workers',
        title: 'Gặp gỡ công nhân',
        description: 'Gặp gỡ và trò chuyện với công nhân các nước thuộc địa',
        effect: { knowledge: 10, experience: 5 },
        probability: 0.4,
        historicalContext: 'Bác luôn gần gũi với người lao động',
        icon: '🤝',
        type: 'positive',
      },
    ],
  },
  {
    id: 'usa',
    name: 'United States',
    nameVi: 'Hoa Kỳ',
    period: '1912-1913',
    description: 'Đến New York và Boston, nghiên cứu lịch sử Mỹ và Tuyên ngôn Độc lập',
    flag: '🇺🇸',
    bgGradient: 'from-red-500 to-blue-500',
    icon: '🗽',
    historicalContext:
      'Bác nghiên cứu cách mạng Mỹ nhưng nhận ra: "Dù sao thì cách mạng Mỹ cũng chỉ giải phóng cho một bộ phận dân cư"',
    requiredKnowledge: 15,
    requiredDecisions: ['work-usa', 'study-us-history'], // Bắt buộc phải làm việc và nghiên cứu
    minDecisionsCount: 2,
    decisions: [
      {
        id: 'work-usa',
        type: 'work',
        title: 'Làm đủ nghề ở Mỹ',
        description: 'Làm cào tuyết, bồi bàn, làm vườn, phụ bếp',
        cost: { health: -15 },
        reward: { money: 55, experience: 18 },
        duration: 1,
        historicalSignificance: 'Bác đã làm nhiều công việc để kiếm sống và hiểu xã hội Mỹ',
        icon: '🛠️',
        isRequired: true,
      },
      {
        id: 'study-us-history',
        type: 'study',
        title: 'Nghiên cứu lịch sử Mỹ',
        description: 'Đọc về Tuyên ngôn Độc lập 1776 và cách mạng Mỹ',
        cost: { money: -12, time: -0.5 },
        reward: { knowledge: 22, experience: 5 },
        duration: 0.8,
        historicalSignificance: 'Nghiên cứu sâu về cách mạng tư sản',
        icon: '📖',
        isRequired: true,
        requiredDecisions: ['work-usa'], // Phải làm việc trước
      },
      {
        id: 'observe-discrimination',
        type: 'study',
        title: 'Quan sát phân biệt đối xử',
        description: 'Nhận thấy người da đen và lao động vẫn bị đối xử bất công',
        cost: { time: -0.3 },
        reward: { knowledge: 20, experience: 10 },
        duration: 0.5,
        historicalSignificance: 'Nhận thức về giới hạn của cách mạng tư sản',
        icon: '👁️',
        requiredDecisions: ['study-us-history'], // Phải nghiên cứu trước
      },
    ],
    events: [
      {
        id: 'winter-cold',
        title: 'Mùa đông khắc nghiệt',
        description: 'Thời tiết lạnh giá, công việc cào tuyết vất vả',
        effect: { health: -20, money: 10 },
        probability: 0.5,
        historicalContext: 'Cuộc sống lao động đầy gian khổ',
        icon: '❄️',
        type: 'negative',
      },
    ],
  },
  {
    id: 'england',
    name: 'England',
    nameVi: 'Anh quốc',
    period: '1913-1914',
    description: 'Làm việc tại London, học tác phong công nghiệp và kỷ luật',
    flag: '🇬🇧',
    bgGradient: 'from-red-600 to-blue-600',
    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    historicalContext:
      'Tại khách sạn Carlton, Bác rèn luyện kỷ luật lao động và tác phong công nghiệp. Nhận ra cách mạng tư sản không giải phóng triệt để người lao động',
    requiredKnowledge: 25,
    requiredDecisions: ['work-carlton', 'study-industrial'], // Bắt buộc phải làm việc và học tác phong
    minDecisionsCount: 3, // Phải chọn ít nhất 3 quyết định
    decisions: [
      {
        id: 'work-carlton',
        type: 'work',
        title: 'Làm việc tại khách sạn Carlton',
        description: 'Làm thợ đốt lò, quét tuyết, rửa bát',
        cost: { health: -12 },
        reward: { money: 50, experience: 22 },
        duration: 1,
        historicalSignificance: 'Rèn luyện kỷ luật và tác phong công nghiệp',
        icon: '🏨',
        isRequired: true, // Quyết định bắt buộc
      },
      {
        id: 'study-industrial',
        type: 'study',
        title: 'Học tác phong công nghiệp',
        description: 'Quan sát và học cách làm việc có tổ chức',
        cost: { time: -0.4 },
        reward: { knowledge: 18, experience: 16 },
        duration: 0.6,
        historicalSignificance: 'Chuẩn bị cho hoạt động cách mạng có tổ chức',
        icon: '⚙️',
        isRequired: true, // Quyết định bắt buộc
        requiredDecisions: ['work-carlton'], // Phải làm việc trước
      },
      {
        id: 'read-books-england',
        type: 'study',
        title: 'Đọc sách báo',
        description: 'Đọc nhiều sách báo để nâng cao hiểu biết',
        cost: { money: -8, time: -0.3 },
        reward: { knowledge: 16, experience: 4 },
        duration: 0.5,
        historicalSignificance: 'Tri thức là nền tảng của cách mạng',
        icon: '📰',
        requiredDecisions: ['work-carlton'], // Phải làm việc trước
      },
    ],
    events: [
      {
        id: 'meet-socialists',
        title: 'Gặp gỡ người xã hội',
        description: 'Gặp gỡ những người có tư tưởng tiến bộ',
        effect: { knowledge: 15, experience: 10 },
        probability: 0.3,
        historicalContext: 'Bắt đầu tiếp cận với tư tưởng xã hội',
        icon: '👥',
        type: 'positive',
      },
    ],
  },
  {
    id: 'paris',
    name: 'Paris, France',
    nameVi: 'Paris, Pháp',
    period: '1914-1917',
    description: 'Tham gia Đảng Xã hội Pháp, viết báo, chứng kiến Thế chiến I',
    flag: '🇫🇷',
    bgGradient: 'from-blue-500 to-white',
    icon: '🗼',
    historicalContext:
      'Tại Paris, Bác tham gia hoạt động chính trị, viết báo, và quan trọng nhất là tiếp nhận thông tin về Cách mạng Tháng Mười Nga (1917)',
    requiredKnowledge: 40,
    requiredExperience: 30,
    requiredDecisions: ['join-socialist-party', 'write-newspaper', 'study-russian-revolution'], // Các quyết định bắt buộc
    minDecisionsCount: 4, // Phải chọn tất cả 4 quyết định
    decisions: [
      {
        id: 'join-socialist-party',
        type: 'join',
        title: 'Tham gia Đảng Xã hội Pháp',
        description: 'Tham gia hoạt động chính trị và học hỏi',
        cost: { time: -0.5 },
        reward: { knowledge: 22, experience: 18 },
        duration: 1,
        historicalSignificance: 'Bước đầu tham gia hoạt động chính trị có tổ chức',
        icon: '🎯',
        isRequired: true, // Quyết định bắt buộc
      },
      {
        id: 'write-newspaper',
        type: 'work',
        title: 'Viết báo',
        description: 'Viết bài đấu tranh cho quyền lợi dân tộc',
        cost: { time: -0.4 },
        reward: { knowledge: 18, experience: 22, money: 25 },
        duration: 0.8,
        historicalSignificance: 'Báo chí là vũ khí đấu tranh của Bác',
        icon: '✍️',
        isRequired: true, // Quyết định bắt buộc
        requiredDecisions: ['join-socialist-party'], // Phải tham gia đảng trước
      },
      {
        id: 'study-russian-revolution',
        type: 'study',
        title: 'Nghiên cứu Cách mạng Tháng Mười',
        description: 'Tìm hiểu về Cách mạng Nga 1917',
        cost: { time: -0.6, money: -8 },
        reward: { knowledge: 25, experience: 8 },
        duration: 1,
        historicalSignificance: 'Mở ra con đường cách mạng vô sản',
        icon: '🔴',
        isRequired: true, // Quyết định bắt buộc - rất quan trọng
        requiredDecisions: ['write-newspaper'], // Phải viết báo trước
        minKnowledge: 35, // Cần kiến thức tối thiểu
      },
      {
        id: 'observe-ww1',
        type: 'study',
        title: 'Quan sát Thế chiến I',
        description: 'Chứng kiến và phân tích cuộc chiến tranh đế quốc',
        cost: { time: -0.3 },
        reward: { knowledge: 12, experience: 8 },
        duration: 0.5,
        historicalSignificance: 'Nhận thức về bản chất chiến tranh đế quốc',
        icon: '⚔️',
        requiredDecisions: ['join-socialist-party'], // Phải tham gia đảng trước
      },
    ],
    events: [
      {
        id: 'russian-revolution-news',
        title: 'Tin tức Cách mạng Tháng Mười',
        description: 'Nhận được tin về thắng lợi của Cách mạng Nga',
        effect: { knowledge: 25, experience: 15 },
        probability: 0.6,
        historicalContext: 'Sự kiện quan trọng mở ra hướng đi mới',
        icon: '🌟',
        type: 'positive',
      },
      {
        id: 'ww1-impact',
        title: 'Ảnh hưởng Thế chiến',
        description: 'Cuộc sống khó khăn do chiến tranh',
        effect: { health: -10, money: -15 },
        probability: 0.4,
        historicalContext: 'Chiến tranh ảnh hưởng đến mọi người',
        icon: '💣',
        type: 'negative',
      },
    ],
  },
  {
    id: 'soviet-union',
    name: 'Soviet Union',
    nameVi: 'Liên Xô',
    period: '1923-1924',
    description: 'Đến Liên Xô học tập chủ nghĩa Mác-Lênin và kinh nghiệm cách mạng',
    flag: '🇷🇺',
    bgGradient: 'from-red-600 to-yellow-500',
    icon: '☭',
    historicalContext:
      'Tại Liên Xô, Bác học tập chủ nghĩa Mác-Lênin một cách có hệ thống và vận dụng vào hoàn cảnh Việt Nam',
    requiredKnowledge: 60,
    requiredExperience: 50,
    requiredDecisions: ['study-marxism', 'learn-revolution'], // Bắt buộc phải học Mác-Lênin và kinh nghiệm
    minDecisionsCount: 3, // Phải chọn tất cả 3 quyết định
    decisions: [
      {
        id: 'study-marxism',
        type: 'study',
        title: 'Học chủ nghĩa Mác-Lênin',
        description: 'Nghiên cứu sâu về lý luận cách mạng',
        cost: { time: -1, money: -18 },
        reward: { knowledge: 35, experience: 5 },
        duration: 1.5,
        historicalSignificance: 'Nền tảng lý luận cho cách mạng Việt Nam',
        icon: '📘',
        isRequired: true, // Rất quan trọng
      },
      {
        id: 'learn-revolution',
        type: 'study',
        title: 'Học kinh nghiệm cách mạng',
        description: 'Nghiên cứu cách mạng Nga và cách tổ chức',
        cost: { time: -0.8 },
        reward: { knowledge: 25, experience: 22 },
        duration: 1.2,
        historicalSignificance: 'Học hỏi từ thực tiễn cách mạng thành công',
        icon: '🎓',
        isRequired: true,
        requiredDecisions: ['study-marxism'], // Phải học Mác-Lênin trước
      },
      {
        id: 'join-comintern',
        type: 'join',
        title: 'Tham gia Quốc tế Cộng sản',
        description: 'Tham gia hoạt động quốc tế',
        cost: { time: -0.5 },
        reward: { experience: 25, knowledge: 15 },
        duration: 1,
        historicalSignificance: 'Kết nối với phong trào cách mạng thế giới',
        icon: '🌍',
        requiredDecisions: ['learn-revolution'], // Phải học kinh nghiệm trước
      },
    ],
    events: [
      {
        id: 'meet-lenin',
        title: 'Gặp gỡ các nhà lãnh đạo',
        description: 'Gặp gỡ và học hỏi từ các nhà cách mạng',
        effect: { knowledge: 20, experience: 15 },
        probability: 0.3,
        historicalContext: 'Học hỏi từ những người đi trước',
        icon: '👔',
        type: 'positive',
      },
    ],
  },
  {
    id: 'china',
    name: 'China',
    nameVi: 'Trung Quốc',
    period: '1924-1927',
    description: 'Hoạt động cách mạng tại Trung Quốc, chuẩn bị thành lập Đảng',
    flag: '🇨🇳',
    bgGradient: 'from-red-500 to-yellow-400',
    icon: '🏮',
    historicalContext:
      'Tại Trung Quốc, Bác chuẩn bị các điều kiện để thành lập Đảng Cộng sản Việt Nam',
    requiredKnowledge: 70,
    requiredExperience: 60,
    requiredDecisions: ['organize-revolutionaries', 'train-cadres'], // Bắt buộc phải tổ chức và đào tạo
    minDecisionsCount: 3,
    decisions: [
      {
        id: 'organize-revolutionaries',
        type: 'join',
        title: 'Tổ chức cách mạng',
        description: 'Tập hợp và tổ chức những người yêu nước',
        cost: { time: -1, money: -22 },
        reward: { experience: 30, knowledge: 18 },
        duration: 1.5,
        historicalSignificance: 'Chuẩn bị lực lượng cách mạng',
        icon: '👥',
        isRequired: true,
      },
      {
        id: 'train-cadres',
        type: 'join',
        title: 'Đào tạo cán bộ',
        description: 'Đào tạo những người sẽ lãnh đạo cách mạng',
        cost: { time: -0.8 },
        reward: { experience: 28, knowledge: 20 },
        duration: 1.2,
        historicalSignificance: 'Xây dựng đội ngũ cán bộ',
        icon: '🎓',
        isRequired: true,
        requiredDecisions: ['organize-revolutionaries'], // Phải tổ chức trước
      },
      {
        id: 'study-china-revolution',
        type: 'study',
        title: 'Nghiên cứu cách mạng Trung Quốc',
        description: 'Học hỏi từ cách mạng Trung Quốc',
        cost: { time: -0.5 },
        reward: { knowledge: 20, experience: 5 },
        duration: 0.8,
        historicalSignificance: 'Vận dụng kinh nghiệm quốc tế',
        icon: '📚',
        requiredDecisions: ['organize-revolutionaries'], // Phải tổ chức trước
      },
    ],
    events: [
      {
        id: 'chinese-revolution',
        title: 'Cách mạng Trung Quốc',
        description: 'Chứng kiến cách mạng Trung Quốc',
        effect: { knowledge: 20, experience: 15 },
        probability: 0.4,
        historicalContext: 'Học hỏi từ cách mạng các nước',
        icon: '🔥',
        type: 'positive',
      },
    ],
  },
  {
    id: 'thailand',
    name: 'Thailand',
    nameVi: 'Thái Lan',
    period: '1928-1929',
    description: 'Hoạt động trong cộng đồng người Việt tại Thái Lan',
    flag: '🇹🇭',
    bgGradient: 'from-red-500 to-blue-500',
    icon: '🐘',
    historicalContext:
      'Tại Thái Lan, Bác tiếp tục hoạt động cách mạng và chuẩn bị cho việc thành lập Đảng',
    requiredKnowledge: 75,
    requiredExperience: 65,
    requiredDecisions: ['organize-vietnamese', 'prepare-party'], // Bắt buộc phải tổ chức và chuẩn bị
    minDecisionsCount: 3,
    decisions: [
      {
        id: 'work-thailand',
        type: 'work',
        title: 'Làm việc trong cộng đồng',
        description: 'Làm việc và sống trong cộng đồng người Việt',
        cost: { health: -10 },
        reward: { money: 30, experience: 20 },
        duration: 1,
        historicalSignificance: 'Gần gũi với nhân dân',
        icon: '👨‍🌾',
      },
      {
        id: 'organize-vietnamese',
        type: 'join',
        title: 'Tổ chức người Việt',
        description: 'Tập hợp và giáo dục người Việt tại Thái Lan',
        cost: { time: -0.8 },
        reward: { experience: 28, knowledge: 14 },
        duration: 1.2,
        historicalSignificance: 'Xây dựng lực lượng cách mạng',
        icon: '🤝',
        isRequired: true,
      },
      {
        id: 'prepare-party',
        type: 'join',
        title: 'Chuẩn bị thành lập Đảng',
        description: 'Chuẩn bị các điều kiện để thành lập Đảng',
        cost: { time: -1 },
        reward: { experience: 32, knowledge: 22 },
        duration: 1.5,
        historicalSignificance: 'Bước quan trọng cuối cùng',
        icon: '🎯',
        isRequired: true,
        requiredDecisions: ['organize-vietnamese'], // Phải tổ chức trước
      },
    ],
    events: [
      {
        id: 'party-foundation-ready',
        title: 'Sẵn sàng thành lập Đảng',
        description: 'Đã chuẩn bị đủ điều kiện',
        effect: { experience: 20, knowledge: 15 },
        probability: 0.5,
        historicalContext: 'Mọi thứ đã sẵn sàng',
        icon: '✅',
        type: 'positive',
      },
    ],
  },
  {
    id: 'hongkong',
    name: 'Hong Kong',
    nameVi: 'Hồng Kông',
    period: '1930-1931',
    description: 'Thành lập Đảng Cộng sản Việt Nam và hoạt động cách mạng',
    flag: '🇭🇰',
    bgGradient: 'from-red-500 to-blue-600',
    icon: '🏙️',
    historicalContext:
      'Tại Hồng Kông, Đảng Cộng sản Việt Nam được thành lập (1930), đánh dấu bước ngoặt quan trọng',
    requiredKnowledge: 80,
    requiredExperience: 75,
    requiredDecisions: ['found-party'], // Bắt buộc phải thành lập Đảng
    minDecisionsCount: 2,
    decisions: [
      {
        id: 'found-party',
        type: 'join',
        title: 'Thành lập Đảng',
        description: 'Thành lập Đảng Cộng sản Việt Nam',
        cost: { time: -1, money: -25 },
        reward: { experience: 45, knowledge: 28 },
        duration: 1,
        historicalSignificance: 'Sự kiện lịch sử trọng đại',
        icon: '🎯',
        isRequired: true, // Quyết định quan trọng nhất
      },
      {
        id: 'lead-revolution',
        type: 'join',
        title: 'Lãnh đạo cách mạng',
        description: 'Lãnh đạo phong trào cách mạng',
        cost: { time: -0.8 },
        reward: { experience: 35, knowledge: 22 },
        duration: 1.2,
        historicalSignificance: 'Vai trò lãnh đạo cách mạng',
        icon: '👑',
        requiredDecisions: ['found-party'], // Phải thành lập Đảng trước
      },
      {
        id: 'plan-return',
        type: 'travel',
        title: 'Lập kế hoạch trở về',
        description: 'Chuẩn bị cho việc trở về Tổ quốc',
        cost: { time: -0.5 },
        reward: { knowledge: 20 },
        duration: 0.8,
        historicalSignificance: 'Chuẩn bị trở về lãnh đạo cách mạng',
        icon: '🏠',
        requiredDecisions: ['found-party'], // Phải thành lập Đảng trước
      },
    ],
    events: [
      {
        id: 'party-founded',
        title: 'Đảng được thành lập',
        description: 'Đảng Cộng sản Việt Nam chính thức thành lập',
        effect: { experience: 30, knowledge: 25 },
        probability: 0.7,
        historicalContext: 'Sự kiện lịch sử quan trọng',
        icon: '🎉',
        type: 'positive',
      },
    ],
  },
  {
    id: 'vietnam-return',
    name: 'Return to Vietnam',
    nameVi: 'Trở về Việt Nam',
    period: '1941',
    description: 'Trở về Tổ quốc sau 30 năm bôn ba, lãnh đạo cách mạng',
    flag: '🇻🇳',
    bgGradient: 'from-red-600 to-yellow-500',
    icon: '🏠',
    historicalContext:
      'Sau 30 năm bôn ba tìm đường cứu nước, Bác trở về lãnh đạo cách mạng Việt Nam. Hành trình đã hoàn thành, nhưng cuộc đấu tranh mới chỉ bắt đầu',
    requiredKnowledge: 90,
    requiredExperience: 85,
    requiredDecisions: ['lead-revolution-vietnam', 'unite-people'], // Bắt buộc phải lãnh đạo và đoàn kết
    minDecisionsCount: 2, // Phải chọn cả 2 quyết định
    decisions: [
      {
        id: 'lead-revolution-vietnam',
        type: 'join',
        title: 'Lãnh đạo cách mạng',
        description: 'Lãnh đạo phong trào cách mạng tại Việt Nam',
        cost: { time: -1 },
        reward: { experience: 40, knowledge: 25 },
        duration: 1,
        historicalSignificance: 'Hoàn thành hành trình, bắt đầu sứ mệnh mới',
        icon: '🌟',
        isRequired: true, // Quyết định cuối cùng quan trọng
      },
      {
        id: 'unite-people',
        type: 'join',
        title: 'Đoàn kết nhân dân',
        description: 'Tập hợp và đoàn kết toàn dân',
        cost: { time: -0.8 },
        reward: { experience: 38, knowledge: 20 },
        duration: 1.2,
        historicalSignificance: 'Đoàn kết là sức mạnh',
        icon: '🤝',
        isRequired: true,
        requiredDecisions: ['lead-revolution-vietnam'], // Phải lãnh đạo trước
      },
    ],
    events: [
      {
        id: 'journey-complete',
        title: 'Hoàn thành hành trình',
        description: '30 năm tìm đường cứu nước đã hoàn thành',
        effect: { experience: 50, knowledge: 50 },
        probability: 1.0,
        historicalContext: 'Hành trình vĩ đại đã kết thúc',
        icon: '🏆',
        type: 'positive',
      },
    ],
  },
];

// Helper function to get random event
export function getRandomEvent(location: Location): GameEvent | null {
  if (!location.events || location.events.length === 0) return null;

  const availableEvents = location.events.filter(
    (event) => Math.random() < event.probability
  );

  if (availableEvents.length === 0) return null;

  return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

// Helper function to check if resources are sufficient
export function hasEnoughResources(
  resources: { money: number; health: number; knowledge: number; experience: number },
  cost: { money?: number; health?: number; knowledge?: number; experience?: number }
): boolean {
  if (cost.money && resources.money + cost.money < 0) return false;
  if (cost.health && resources.health + cost.health < 0) return false;
  if (cost.knowledge && resources.knowledge + cost.knowledge < 0) return false;
  if (cost.experience && resources.experience + cost.experience < 0) return false;
  return true;
}

// Helper function to apply resource changes
export function applyResourceChange(
  current: { money: number; health: number; knowledge: number; experience: number; time: number },
  change: { money?: number; health?: number; knowledge?: number; experience?: number; time?: number }
): { money: number; health: number; knowledge: number; experience: number; time: number } {
  return {
    money: Math.max(0, Math.min(1000, current.money + (change.money || 0))),
    health: Math.max(0, Math.min(100, current.health + (change.health || 0))),
    knowledge: Math.max(0, Math.min(100, current.knowledge + (change.knowledge || 0))),
    experience: Math.max(0, Math.min(100, current.experience + (change.experience || 0))),
    time: Math.max(0, current.time + (change.time || 0)),
  };
}
