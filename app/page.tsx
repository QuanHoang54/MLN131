"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Home,
  BookOpen,
  Gamepad2,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  MapPin,
  RotateCcw,
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  Heart,
  Star,
  Layers,
  Handshake,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ==================== DATA ====================
const lessonsData = [
  {
    id: 1,
    title: "Phần I: Cơ cấu xã hội - giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội",
    content: {
      sections: [
        {
          title: "1. Khái niệm và vị trí của cơ cấu xã hội - giai cấp",
          items: [
            "Cơ cấu xã hội (Nghĩa rộng): Bao gồm cơ cấu dân cư, nghề nghiệp, dân tộc, tôn giáo và giai cấp",
            "Cơ cấu xã hội - giai cấp (Nghĩa hẹp): Hệ thống các giai cấp, tầng lớp được hình thành qua: Sở hữu TLSX, Tổ chức quản lý sản xuất, Địa vị chính trị - xã hội",
            "Vị trí: Cơ cấu giai cấp có vị trí quan trọng hàng đầu, chi phối các loại hình cơ cấu khác"
          ]
        },
        {
          title: "2. Sự biến đổi có tính quy luật của cơ cấu xã hội - giai cấp",
          items: [
            "Quy luật 1: Cơ cấu giai cấp biến đổi gắn liền với cơ cấu kinh tế - Phương thức sản xuất quyết định cơ cấu giai cấp",
            "Quy luật 2: Biến đổi phức tạp, đa dạng - Xuất hiện các tầng lớp xã hội mới (doanh nhân, tiểu chủ...)",
            "Quy luật 3: Biến đổi trong mối quan hệ vừa đấu tranh, vừa liên minh - Tiến tới xóa bỏ bất bình đẳng, xích lại gần nhau"
          ]
        }
      ]
    }
  },
  {
    id: 2,
    title: "Phần II: Liên minh giai cấp, tầng lớp trong thời kỳ quá độ",
    content: {
      sections: [
        {
          title: "1. Khái niệm liên minh giai cấp, tầng lớp",
          items: [
            "Là sự liên kết, hợp tác, hỗ trợ giữa các giai cấp, tầng lớp nhằm thực hiện nhu cầu và lợi ích chung",
            "Tạo động lực thực hiện thắng lợi mục tiêu của chủ nghĩa xã hội"
          ]
        },
        {
          title: "2. Tính tất yếu của khối liên minh",
          items: [
            "Về Chính trị: Tập hợp lực lượng tiến hành cách mạng XHCN, xây dựng nền tảng cơ sở xã hội vững chắc",
            "Về Kinh tế: Các lĩnh vực kinh tế gắn chặt với nhau, thỏa mãn lợi ích chung, xây dựng cơ sở vật chất"
          ]
        },
        {
          title: "3. Tầm quan trọng của liên minh giai cấp",
          items: [
            "Liên minh Công - Nông - Trí là điều kiện đảm bảo vai trò lãnh đạo của giai cấp công nhân",
            "Là điều kiện quyết định thắng lợi trong đấu tranh giành chính quyền và xây dựng xã hội mới",
            "Dưới sự lãnh đạo của Đảng Cộng sản, tạo sức mạnh tổng hợp đảm bảo thắng lợi cách mạng XHCN"
          ]
        }
      ]
    }
  },
  {
    id: 3,
    title: "Phần III: Cơ cấu xã hội - giai cấp và liên minh ở Việt Nam",
    content: {
      sections: [
        {
          title: "1. Đặc điểm cơ cấu xã hội - giai cấp ở Việt Nam",
          items: [
            "Biến đổi gắn liền với cơ cấu kinh tế: Từ kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng XHCN",
            "Tính đa dạng và đan xen: Nhiều thành phần kinh tế dẫn đến đa dạng tầng lớp; vừa hợp tác, vừa đấu tranh",
            "Sự biến đổi trong nội bộ từng giai cấp: Xuất hiện nhiều nhóm xã hội mới, đặc biệt đội ngũ doanh nhân"
          ]
        },
        {
          title: "2. Các giai cấp, tầng lớp trong cơ cấu xã hội Việt Nam",
          items: [
            "Giai cấp Công nhân: Lực lượng đi đầu, nòng cốt trong khối liên minh",
            "Giai cấp Nông dân: Lực lượng đông đảo, vị trí chiến lược trong phát triển nông nghiệp",
            "Đội ngũ Trí thức: Lực lượng lao động sáng tạo đặc biệt quan trọng trong CNH, HĐH",
            "Đội ngũ Doanh nhân: Phát triển nhanh, huy động nguồn lực, tạo việc làm, đóng góp tăng trưởng"
          ]
        },
        {
          title: "3. Nội dung liên minh ở Việt Nam",
          items: [
            "Chính trị: Giữ vững bản chất giai cấp công nhân, tăng cường lãnh đạo của Đảng",
            "Kinh tế: Đẩy mạnh hợp tác Công - Nông - Khoa học; thực hiện liên kết '4 nhà'",
            "Văn hóa - Xã hội: Xây dựng văn hóa tiên tiến, nâng cao dân trí, thực hiện an sinh xã hội"
          ]
        },
        {
          title: "4. Năm phương hướng cơ bản",
          items: [
            "1. Đẩy mạnh CNH, HĐH; giải quyết tốt mối quan hệ tăng trưởng và công bằng xã hội",
            "2. Xây dựng chính sách xã hội tổng thể cho từng giai tầng",
            "3. Tạo sự đồng thuần, phát huy tinh thần đoàn kết thống nhất",
            "4. Hoàn thiện thể chế KT thị trường định hướng XHCN",
            "5. Đổi mới hoạt động của Đảng, Nhà nước, Mặt trận Tổ quốc"
          ]
        }
      ]
    }
  },
  {
    id: 4,
    title: "Phần IV: Kinh tế tư nhân - Kế thừa hay Thay đổi?",
    content: {
      sections: [
        {
          title: "1. Sự bùng nổ của kinh tế tư nhân và tầng lớp doanh nhân",
          items: [
            "Bối cảnh: Chuyển đổi sang kinh tế thị trường định hướng XHCN",
            "Quy luật: Thay đổi cơ cấu kinh tế -> Biến đổi cơ cấu xã hội - giai cấp",
            "Thực tiễn: Xuất hiện đội ngũ doanh nhân; Kinh tế tư nhân trở thành 'một động lực quan trọng'"
          ]
        },
        {
          title: "2. Kinh tế tư nhân có MÂU THUẪN với lý luận Mác - Lênin?",
          items: [
            "Khẳng định: HOÀN TOÀN KHÔNG mâu thuẫn",
            "Cơ sở 1: Tôn trọng quy luật Cơ sở hạ tầng quyết định kiến trúc thượng tầng",
            "Cơ sở 2: Phù hợp với tính đan xen phức tạp của thời kỳ quá độ",
            "Cơ sở 3: Phù hợp với mục tiêu Liên minh về kinh tế của V.I.Lênin"
          ]
        },
        {
          title: "3. Điểm kế thừa và Sáng tạo đặc thù của Việt Nam",
          items: [
            "KẾ THỪA: Liên minh Công - Nông - Trí thức vẫn là nền tảng; Đảng Cộng sản giữ vai trò lãnh đạo tuyệt đối",
            "SÁNG TẠO: Mở rộng nội hàm liên minh - Chuyển từ đấu tranh chính trị sang hợp tác kinh tế (Liên kết 4 nhà)",
            "SÁNG TẠO: Chuyển hóa mâu thuẫn thành động lực phát triển",
            "SÁNG TẠO: Đồng nhất lợi ích - Lợi ích hợp pháp của doanh nhân thống nhất với mục tiêu 'Dân giàu, nước mạnh'"
          ]
        }
      ]
    }
  },
]

const quizData = [
  {
    id: 1,
    question: "Cơ cấu xã hội - giai cấp hình thành qua quan hệ cốt lõi nào?",
    options: [
      "Quan hệ huyết thống và gia đình",
      "Sở hữu TLSX, Tổ chức quản lý, Địa vị chính trị",
      "Quan hệ văn hóa và giáo dục",
      "Quan hệ ngoại giao quốc tế",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "Trong các loại hình cơ cấu, loại nào chi phối các cơ cấu khác?",
    options: [
      "Cơ cấu dân số",
      "Cơ cấu nghề nghiệp",
      "Cơ cấu xã hội - giai cấp",
      "Cơ cấu lãnh thổ",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "Góc độ nào mang tính quyết định nhất đối với khối liên minh?",
    options: [
      "Góc độ Văn hóa",
      "Góc độ Chính trị",
      "Góc độ Kinh tế",
      "Góc độ Xã hội",
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "Điểm nhấn thực tiễn hiện nay ở VN là sự phát triển của lực lượng nào?",
    options: [
      "Giai cấp nông dân",
      "Đội ngũ doanh nhân",
      "Tầng lớp tiểu thương",
      "Lực lượng vũ trang",
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "Việc đề cao kinh tế tư nhân có mâu thuẫn với lý luận Mác-Lênin không?",
    options: [
      "Có mâu thuẫn hoàn toàn",
      "Có mâu thuẫn một phần",
      "Hoàn toàn KHÔNG mâu thuẫn",
      "Chưa có kết luận",
    ],
    correctIndex: 2,
  },
  {
    id: 6,
    question: "Liên minh công - nông - trí thức là nền tảng của khối nào?",
    options: [
      "Khối kinh tế tư nhân",
      "Khối đại đoàn kết toàn dân tộc",
      "Khối doanh nghiệp nhà nước",
      "Khối hành chính công",
    ],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "Giai cấp nào được xem là lực lượng đi đầu trong CNH-HĐH?",
    options: [
      "Giai cấp nông dân",
      "Đội ngũ trí thức",
      "Giai cấp công nhân",
      "Tầng lớp doanh nhân",
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "Kinh tế nhà nước ở Việt Nam giữ vai trò gì?",
    options: [
      "Vai trò phụ thuộc",
      "Vai trò chủ đạo",
      "Vai trò bổ sung",
      "Vai trò tạm thời",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "Quy luật nào là quan hệ cơ bản, quyết định địa vị giai cấp?",
    options: [
      "Quan hệ phân phối thu nhập",
      "Quan hệ sở hữu tư liệu sản xuất",
      "Quan hệ tổ chức quản lý",
      "Quan hệ văn hóa xã hội",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "Đội ngũ nào là lực lượng mới nổi trong cơ cấu XH Việt Nam?",
    options: [
      "Giai cấp công nhân",
      "Giai cấp nông dân",
      "Đội ngũ trí thức",
      "Đội ngũ doanh nhân",
    ],
    correctIndex: 3,
  },
]

const SECRET_PASSWORD = "08/09/2006"

// ==================== COMPONENTS ====================

function Header({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  const tabs = [
    { id: "home", label: "Trang chủ", icon: Home },
    { id: "library", label: "Bài giảng", icon: BookOpen },
    { id: "minigame", label: "Minigame", icon: Gamepad2 },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-800 to-red-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/fptu.png"
                alt="FPT University"
                className="h-10 w-auto"
              />
              <h1 className="text-white font-bold text-sm sm:text-lg md:text-xl truncate">
                CHỦ NGHĨA XÃ HỘI KHOA HỌC
              </h1>
            </button>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-white text-red-700 shadow-md"
                      : "text-white hover:bg-white/20"
                  )}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

function ScrollBlock({
  children,
  index,
}: {
  children: React.ReactNode
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  )
}

function LessonContent({ lesson }: { lesson: (typeof lessonsData)[0] }) {
  const content = lesson.content as any

  return (
    <div className="space-y-6">
      {content.sections && Array.isArray(content.sections) && (
        <div className="space-y-6">
          {content.sections.map((section: any, idx: number) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-bold text-yellow-300 text-lg border-b border-yellow-500/30 pb-2">
                {section.title}
              </h4>
              <div className="space-y-2">
                {section.items.map((item: string, itemIdx: number) => (
                  <div
                    key={itemIdx}
                    className="bg-black/20 border-l-4 border-l-blue-400 rounded-r-lg p-3"
                  >
                    <p className="text-white/90 text-sm leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

// ==================== TABS ====================

function HomeTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const handleNavigation = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="animate-fade-in-up">
      {/* Full Background Container with Red Overlay - Hero + Highlights + Group Info */}
      <div className="bg-[url('/Tu-tuong-Ho-Chi-Minh-_5-1-1024x641.jpg')] bg-cover bg-center bg-fixed bg-no-repeat min-h-screen">
        <div className="bg-red-950/80">
          {/* Hero Section */}
          <section className="py-20 sm:py-28 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight uppercase drop-shadow-lg">
                <div className="mb-2">LIÊN MINH CÔNG – NÔNG – TRÍ</div>
                <div>VÀ KINH TẾ TƯ NHÂN: KẾ THỪA HAY THAY ĐỔI?</div>
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty drop-shadow">
                Tìm hiểu về cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam
              </p>
              <button
                onClick={() => setActiveTab("library")}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-red-900 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Bắt đầu khám phá
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* Course Overview Section - 4 Cards with Glassmorphism */}
          <section className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Title */}
              <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white drop-shadow-lg">
                NỘI DUNG CHÍNH CỦA CHỦ ĐỀ
              </h3>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1: Cơ cấu xã hội - giai cấp */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center flex-shrink-0 border border-blue-400/30">
                      <Layers className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Cơ cấu xã hội - giai cấp</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Khái niệm, vị trí và 3 quy luật biến đổi tất yếu của cơ cấu xã hội - giai cấp gắn liền với sự chuyển dịch kinh tế trong thời kỳ quá độ.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Lý luận về Liên minh giai cấp */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center flex-shrink-0 border border-emerald-400/30">
                      <Handshake className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Lý luận về Liên minh giai cấp</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Tính tất yếu khách quan của khối liên minh trên cả hai phương diện chính trị (giành chính quyền) và kinh tế (xây dựng đất nước).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Thực tiễn tại Việt Nam */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/30 flex items-center justify-center flex-shrink-0 border border-amber-400/30">
                      <MapPin className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Thực tiễn tại Việt Nam</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Đặc điểm đa dạng, đan xen của các giai tầng (Công - Nông - Trí thức - Doanh nhân) và 5 phương hướng củng cố khối đại đoàn kết.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4: Kinh tế tư nhân - Kế thừa & Sáng tạo */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center flex-shrink-0 border border-purple-400/30">
                      <TrendingUp className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Kinh tế tư nhân - Kế thừa & Sáng tạo</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Sự bùng nổ của doanh nhân không mâu thuẫn với lý luận Mác - Lênin. Việt Nam mở rộng nội hàm liên minh, chuyển mâu thuẫn thành động lực phát triển chung.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-red-950 border-t-4 border-yellow-500 pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 4 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1 - Giới thiệu */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-yellow-500">CHỦ NGHĨA XÃ HỘI KHOA HỌC</h3>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">
                Trang web giáo dục tìm hiểu về Liên minh giai cấp và Kinh tế tư nhân ở Việt Nam, được xây dựng bởi sinh viên FPT University với mục đích học tập và chia sẻ kiến thức.
              </p>
            </div>

            {/* Column 2 - Thông tin nhóm */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 border-b border-yellow-500/50 pb-2">Thông Tin Nhóm</h3>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li><span className="text-yellow-400">Nhóm:</span> Nhóm 6</li>
                <li><span className="text-yellow-400">Lớp:</span> Half2_IA1807</li>
                <li><span className="text-yellow-400">Môn học:</span> MLN131 - Chủ Nghĩa Xã Hội Khoa Học</li>
                <li className="pt-2"><span className="text-yellow-400">Thành viên:</span></li>
                <li className="pl-4">• Nguyễn Văn Cường</li>
                <li className="pl-4">• Nguyễn Hoàng Minh</li>
                <li className="pl-4">• Nguyễn Hoàng Quân</li>
              </ul>
            </div>

            {/* Column 3 - Liên kết */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 border-b border-yellow-500/50 pb-2">Liên Kết</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleNavigation("home")} className="text-gray-200 hover:text-yellow-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-4 h-4" /> Trang Chủ
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation("library")} className="text-gray-200 hover:text-yellow-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-4 h-4" /> Bài Giảng
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation("minigame")} className="text-gray-200 hover:text-yellow-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-4 h-4" /> Minigame
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4 - CTA Buttons */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 border-b border-yellow-500/50 pb-2">Hành Động</h3>
              <div className="space-y-3">
                <button onClick={() => handleNavigation("library")} className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" /> XEM BÀI GIẢNG
                </button>
                <button onClick={() => handleNavigation("minigame")} className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  <Gamepad2 className="w-5 h-5" /> CHƠI MINIGAME
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 - Nhóm 6 - Lớp Half2_IA1807. Được tạo ra với sự tôn trọng và tinh thần học hỏi. Website mang tính chất học tập và nghiên cứu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function LibraryTab() {
  return (
    <div className="relative min-h-screen">
      {/* Background cố định với hiệu ứng parallax */}
      <div
        className="fixed inset-0 bg-[url('/On-tap-mon-chu-nghia-Mac-–-Lenin-1-1024x558.png')] bg-cover bg-center bg-no-repeat z-0"
      />

      {/* Overlay bảo vệ */}
      <div className="relative z-10 bg-red-950/70 min-h-screen">
        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tiêu đề với hiệu ứng glassmorphism */}
            <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Nội dung bài giảng
              </h2>
              <div className="text-center mt-4">
                <p className="text-white/70 mb-2">Hãy cuộn trang từ từ xuống dưới</p>
                <ChevronDown className="w-6 h-6 text-white/50 mx-auto animate-bounce" />
              </div>
            </div>

            <div className="space-y-8">
              {lessonsData.map((lesson, index) => (
                <ScrollBlock key={lesson.id} index={index}>
                  {/* Nội dung với hiệu ứng glassmorphism */}
                  <div className="bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-700 to-red-600 p-5">
                      <h3 className="text-white font-bold text-lg">{lesson.title}</h3>
                    </div>
                    <div className="p-6">
                      <LessonContent lesson={lesson} />
                    </div>
                  </div>
                </ScrollBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

type GameState = "playing" | "won" | "lost"
type LossReason = "quiz" | "password" | null

function MinigameTab() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [wrongQuizAnswers, setWrongQuizAnswers] = useState(0)
  const [wrongPasswordGuesses, setWrongPasswordGuesses] = useState(0)
  const [revealedIndices, setRevealedIndices] = useState<number[]>([])
  const [passwordInput, setPasswordInput] = useState("")
  const [gameState, setGameState] = useState<GameState>("playing")
  const [lossReason, setLossReason] = useState<LossReason>(null)
  const [timer, setTimer] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Timer effect
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  const revealRandomChar = useCallback(() => {
    const unrevealedIndices = SECRET_PASSWORD.split("")
      .map((_, i) => i)
      .filter((i) => !revealedIndices.includes(i))

    if (unrevealedIndices.length > 0) {
      const randomIndex =
        unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)]
      setRevealedIndices((prev) => [...prev, randomIndex])
    }
  }, [revealedIndices])

  const handleAnswer = (index: number) => {
    if (isAnswered || gameState !== "playing") return

    setSelectedAnswer(index)
    setIsAnswered(true)

    const isCorrect = index === quizData[currentQuestion].correctIndex

    if (isCorrect) {
      revealRandomChar()
    } else {
      setTimer((prev) => prev + 10) // Penalty: +10 seconds
      const newWrong = wrongQuizAnswers + 1
      setWrongQuizAnswers(newWrong)
      if (newWrong >= 3) {
        setGameState("lost")
        setLossReason("quiz")
        return
      }
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        setQuizCompleted(true)
      }
    }, 1500)
  }

  const handlePasswordSubmit = () => {
    if (passwordInput === SECRET_PASSWORD) {
      setGameState("won")
    } else {
      const newWrong = wrongPasswordGuesses + 1
      setWrongPasswordGuesses(newWrong)
      if (newWrong >= 3) {
        setGameState("lost")
        setLossReason("password")
      }
      setPasswordInput("")
    }
  }

  const resetGame = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setWrongQuizAnswers(0)
    setWrongPasswordGuesses(0)
    setRevealedIndices([])
    setPasswordInput("")
    setGameState("playing")
    setLossReason(null)
    setTimer(0)
    setQuizCompleted(false)
  }

  // Game Over Screen
  if (gameState === "lost") {
    return (
      <div className="animate-fade-in-up py-8 px-4 bg-[url('/campus-hcm.png')] bg-cover bg-center bg-fixed bg-no-repeat min-h-screen">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">THẤT BẠI!</h2>
            <p className="text-gray-600 mb-6">
              {lossReason === "quiz"
                ? "Bạn đã trả lời sai quá 3 câu quiz!"
                : "Bạn đã đoán sai mật mã 3 lần!"}
            </p>
            <p className="text-gray-500 mb-8">
              Thời gian: {formatTime(timer)}
            </p>
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Chơi lại từ đầu
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Victory Screen
  if (gameState === "won") {
    const mins = Math.floor(timer / 60)
    const secs = timer % 60
    return (
      <div className="animate-fade-in-up py-8 px-4 bg-[url('/campus-hcm.png')] bg-cover bg-center bg-fixed bg-no-repeat min-h-screen">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Rương kho báu đã mở */}
            <div className="mb-6">
              <img
                src="/ruong1.png"
                alt="Rương Kho Báu Đã Mở"
                className="w-48 h-36 object-contain mx-auto"
              />
            </div>

            <h2 className="text-2xl font-bold text-amber-600 mb-6">
              MỞ KHÓA THÀNH CÔNG!
            </h2>

            {/* Logo FPT University */}
            <div className="inline-block mb-6">
              <img
                src="/FPT_Education_logo.svg.png"
                alt="FPT University"
                className="w-64 h-64 object-contain mx-auto"
              />
            </div>

            <div className="bg-orange-100 rounded-xl p-4 mb-6">
              <p className="text-orange-800 font-medium">
                Bí mật được hé lộ: <strong>08/09/2006</strong> chính là ngày
                thành lập trường Đại học FPT!
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <p className="text-gray-700">
                Thời gian hoàn thành: <strong>{mins} phút {secs} giây</strong>
              </p>
            </div>

            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Chơi lại
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Playing State - Split Screen
  const question = quizData[currentQuestion]

  return (
    <div className="animate-fade-in-up py-8 px-4 bg-[url('/fptcam.png')] bg-cover bg-center bg-fixed bg-no-repeat min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
          Giải mã rương kho báu
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Trả lời đúng câu hỏi để mở khóa mật mã bí mật!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT - QUIZ SECTION */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Quiz Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
              <div className="flex items-center justify-between text-white mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-lg">{formatTime(timer)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-300" />
                  <span>Sai: {wrongQuizAnswers}/3</span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="flex items-center gap-1">
                {quizData.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex-1 h-2 rounded-full transition-all duration-300",
                      idx < currentQuestion
                        ? "bg-amber-400"
                        : idx === currentQuestion
                          ? "bg-white"
                          : "bg-white/30"
                    )}
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm mt-2 text-center">
                Câu {currentQuestion + 1} / {quizData.length}
              </p>
            </div>

            {/* Quiz Content */}
            <div className="p-6">
              {!quizCompleted ? (
                <>
                  <h3 className="text-lg font-bold text-gray-800 mb-6 leading-relaxed">
                    {question.question}
                  </h3>

                  <div className="space-y-3">
                    {question.options.map((option, idx) => {
                      const isCorrect = idx === question.correctIndex
                      const isSelected = selectedAnswer === idx

                      let buttonClass =
                        "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3"

                      if (isAnswered) {
                        if (isCorrect) {
                          buttonClass +=
                            " bg-emerald-50 border-emerald-500 text-emerald-800"
                        } else if (isSelected && !isCorrect) {
                          buttonClass += " bg-red-50 border-red-500 text-red-800"
                        } else {
                          buttonClass +=
                            " bg-gray-50 border-gray-200 text-gray-400 opacity-50"
                        }
                      } else {
                        buttonClass +=
                          " bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700"
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          disabled={isAnswered}
                          className={buttonClass}
                        >
                          <span className="w-8 h-8 rounded-full bg-white border-2 border-current flex items-center justify-center font-semibold text-sm shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Hoàn thành Quiz!
                  </h3>
                  <p className="text-gray-600">
                    Hãy nhập mật mã để mở rương kho báu
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - CHEST SECTION */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Chest Image */}
            <div className="p-6 pb-0">
              <img
                src="/ruong2.png"
                alt="Rương Kho Báu"
                className="w-full h-48 object-contain"
              />
            </div>

            {/* Chest Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 text-center">
              <Lock className="w-12 h-12 text-white mx-auto mb-2" />
              <h3 className="text-white font-bold text-lg">Rương Kho Báu</h3>
            </div>

            {/* Chest Content */}
            <div className="p-6">
              {/* Password Slots */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-3 text-center">
                  Mật mã (10 ký tự):
                </p>
                <div className="flex justify-center gap-1 flex-wrap">
                  {SECRET_PASSWORD.split("").map((char, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-9 h-12 rounded-lg flex items-center justify-center text-xl font-bold border-2 transition-all duration-300",
                        revealedIndices.includes(idx)
                          ? "bg-amber-100 border-amber-400 text-amber-800"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                      )}
                    >
                      {revealedIndices.includes(idx) ? char : "?"}
                    </div>
                  ))}
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Nhập mật mã:
                  </label>
                  <input
                    type="text"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="__________"
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-xl font-mono tracking-widest focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  onClick={handlePasswordSubmit}
                  disabled={passwordInput.length !== 10}
                  className={cn(
                    "w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                    passwordInput.length === 10
                      ? "bg-amber-500 hover:bg-amber-600 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <Unlock className="w-5 h-5" />
                  MỞ KHÓA
                </button>

                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm">
                    Sai mật mã: {wrongPasswordGuesses}/3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==================== MAIN APP ====================
export default function PoliticalLearningPlatform() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-16">
        {activeTab === "home" && <HomeTab setActiveTab={setActiveTab} />}
        {activeTab === "library" && <LibraryTab />}
        {activeTab === "minigame" && <MinigameTab />}
      </main>
    </div>
  )
}
