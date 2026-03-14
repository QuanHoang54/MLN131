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
  Lightbulb,
  MapPin,
  HelpCircle,
  RotateCcw,
  Lock,
  Unlock,
  AlertTriangle,
  Clock,
  Heart,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ==================== DATA ====================
const lessonsData = [
  {
    id: 1,
    title: "Phần 1: Khái niệm và vị trí của cơ cấu xã hội - giai cấp",
    content: {
      intro:
        "Cơ cấu xã hội - giai cấp là sự phân chia xã hội thành các giai cấp dựa trên vị trí, vai trò trong hệ thống sản xuất xã hội. Đây là loại hình cơ cấu có vị trí quyết định nhất, chi phối các loại hình cơ cấu khác.",
      rules: [
        {
          title: "Quy luật 1: Về quan hệ sở hữu tư liệu sản xuất",
          description:
            "Đây là quan hệ cơ bản, quyết định địa vị của các giai cấp trong xã hội. Giai cấp nào nắm tư liệu sản xuất chủ yếu thì giai cấp đó giữ vai trò thống trị.",
        },
        {
          title: "Quy luật 2: Về quan hệ tổ chức quản lý sản xuất",
          description:
            "Phản ánh vị trí, vai trò của các giai cấp trong việc tổ chức, điều hành quá trình sản xuất và phân phối sản phẩm lao động.",
        },
        {
          title: "Quy luật 3: Về quan hệ phân phối thu nhập",
          description:
            "Là hệ quả trực tiếp của quan hệ sở hữu và tổ chức quản lý, thể hiện mức độ hưởng thụ của các giai cấp từ thành quả lao động xã hội.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Phần 2: Liên minh giai cấp, tầng lớp",
    content: {
      intro:
        "Liên minh giai cấp là sự hợp tác, đoàn kết giữa các giai cấp và tầng lớp trong xã hội vì những mục tiêu chung nhất định.",
      highlights: [
        {
          label: "Tính tất yếu về Chính trị",
          description:
            "Liên minh giai cấp nhằm tập hợp lực lượng, tạo sức mạnh tổng hợp để giành và giữ chính quyền, bảo vệ thành quả cách mạng, xây dựng chế độ mới.",
        },
        {
          label: "Tính tất yếu về Kinh tế",
          description:
            "Liên minh giai cấp là yêu cầu khách quan của quá trình công nghiệp hóa, hiện đại hóa, phát triển kinh tế hàng hóa nhiều thành phần, hội nhập quốc tế.",
        },
      ],
      note: "Trong thời kỳ quá độ lên chủ nghĩa xã hội, liên minh công - nông - trí thức là nền tảng của khối đại đoàn kết toàn dân tộc.",
    },
  },
  {
    id: 3,
    title: "Phần 3: Cơ cấu & Liên minh ở Việt Nam hiện nay",
    content: {
      intro:
        "Cơ cấu xã hội - giai cấp ở Việt Nam đang có những biến đổi sâu sắc trong thời kỳ đổi mới và hội nhập quốc tế.",
      classes: [
        {
          name: "Giai cấp Công nhân",
          description:
            "Là lực lượng đi đầu trong sự nghiệp công nghiệp hóa, hiện đại hóa đất nước. Số lượng và chất lượng ngày càng tăng.",
          color: "bg-blue-50 border-l-blue-500",
        },
        {
          name: "Giai cấp Nông dân",
          description:
            "Là lực lượng to lớn trong công cuộc xây dựng và bảo vệ Tổ quốc, là chủ thể của quá trình phát triển nông nghiệp, nông thôn.",
          color: "bg-green-50 border-l-green-500",
        },
        {
          name: "Đội ngũ Trí thức",
          description:
            "Là lực lượng lao động sáng tạo đặc biệt quan trọng, đóng vai trò then chốt trong phát triển khoa học - công nghệ và văn hóa.",
          color: "bg-purple-50 border-l-purple-500",
        },
        {
          name: "Đội ngũ Doanh nhân",
          description:
            "Là lực lượng mới nổi, đóng vai trò quan trọng trong phát triển kinh tế thị trường định hướng xã hội chủ nghĩa.",
          color: "bg-amber-50 border-l-amber-500",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Phần 4: Kinh tế tư nhân - Kế thừa hay thay đổi?",
    content: {
      intro:
        "Việc phát triển kinh tế tư nhân ở Việt Nam KHÔNG mâu thuẫn với lý luận Mác - Lênin, mà là sự vận dụng sáng tạo vào điều kiện cụ thể của đất nước.",
      inheritance: [
        "Khẳng định vai trò lãnh đạo của Đảng Cộng sản",
        "Duy trì sở hữu toàn dân về đất đai và tài nguyên quan trọng",
        "Kinh tế nhà nước giữ vai trò chủ đạo",
        "Mục tiêu xây dựng xã hội công bằng, dân chủ, văn minh",
      ],
      innovation: [
        "Phát triển kinh tế thị trường định hướng XHCN",
        "Thừa nhận và khuyến khích kinh tế tư nhân là động lực quan trọng",
        "Hội nhập kinh tế quốc tế sâu rộng",
        "Đa dạng hóa hình thức sở hữu và phân phối",
      ],
      conclusion:
        "Đây là sự kế thừa biện chứng: giữ vững những nguyên lý cốt lõi, đồng thời sáng tạo, đổi mới để phù hợp với thực tiễn Việt Nam và xu thế thời đại.",
    },
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
            <img
              src="/fptu.png"
              alt="FPT University"
              className="h-10 w-auto"
            />
            <h1 className="text-white font-bold text-sm sm:text-lg md:text-xl truncate">
              CHỦ NGHĨA XÃ HỘI KHOA HỌC
            </h1>
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

function HomeTab({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="animate-fade-in-up bg-fixed bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/Tu-tuong-Ho-Chi-Minh-_5-1-1024x641.jpg)' }}>
      {/* Red Overlay for full page */}
      <div className="bg-red-900/80 min-h-screen">
        {/* Hero Section */}
        <section className="py-20 sm:py-28 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-tight text-balance uppercase drop-shadow-lg">
              LIÊN MINH CÔNG – NÔNG – TRÍ THỨC TRONG LÝ LUẬN MÁC – LÊNIN VÀ VAI TRÒ CỦA KINH TẾ TƯ NHÂN Ở VIỆT NAM HIỆN NAY – KẾ THỪA HAY THAY ĐỔI?
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


        {/* Highlights Section with Glassmorphism */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
              Nội dung chính
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <HighlightCard
                icon={Lightbulb}
                title="Lý luận cốt lõi"
                description="Tìm hiểu cơ cấu xã hội - giai cấp và các quy luật biến đổi theo quan điểm Mác - Lênin"
                borderColor="border-t-blue-400"
                iconBg="bg-blue-500/30"
                iconColor="text-blue-300"
              />
              <HighlightCard
                icon={MapPin}
                title="Thực tiễn Việt Nam"
                description="Phân tích đặc điểm các giai tầng và mối quan hệ liên minh trong xã hội Việt Nam hiện đại"
                borderColor="border-t-emerald-400"
                iconBg="bg-emerald-500/30"
                iconColor="text-emerald-300"
              />
              <HighlightCard
                icon={HelpCircle}
                title="Giải đáp mâu thuẫn"
                description="Làm rõ vì sao phát triển kinh tế tư nhân không mâu thuẫn với nguyên lý Mác - Lênin"
                borderColor="border-t-amber-400"
                iconBg="bg-amber-500/30"
                iconColor="text-amber-300"
              />
            </div>
          </div>
        </section>

        {/* Group Info Card - Bottom of Home with Glassmorphism */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  THÔNG TIN NHÓM
                </h3>
                <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
                    <p className="text-sm text-white/70 mb-1">Mã Lớp</p>
                    <p className="text-lg font-bold text-white">SP26_MLN131_IA1807</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
                    <p className="text-sm text-white/70 mb-1">Tên Môn</p>
                    <p className="text-lg font-bold text-white">MLN131</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-600/40 to-amber-600/40 rounded-xl p-5 text-center border border-white/10">
                  <p className="text-sm text-white/70 mb-2">Tên Nhóm</p>
                  <p className="text-2xl font-bold text-amber-300">Nhóm 6</p>
                  <p className="text-sm text-white/70 mt-2">Năm 2026</p>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-white/70 mb-3 text-center">Thành Viên</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="px-5 py-2.5 bg-blue-500/30 text-blue-200 rounded-full text-sm font-medium flex items-center gap-2 border border-blue-400/30">
                      <Users className="w-4 h-4" />
                      Nguyễn Văn Cường
                    </span>
                    <span className="px-5 py-2.5 bg-green-500/30 text-green-200 rounded-full text-sm font-medium flex items-center gap-2 border border-green-400/30">
                      <Users className="w-4 h-4" />
                      Nguyễn Hoàng Minh
                    </span>
                    <span className="px-5 py-2.5 bg-purple-500/30 text-purple-200 rounded-full text-sm font-medium flex items-center gap-2 border border-purple-400/30">
                      <Users className="w-4 h-4" />
                      Nguyễn Hoàng Quân
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function HighlightCard({
  icon: Icon,
  title,
  description,
  borderColor,
  iconBg,
  iconColor,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  borderColor: string
  iconBg: string
  iconColor: string
}) {
  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-white/20",
        borderColor
      )}
    >
      <div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
          iconBg
        )}
      >
        <Icon className={cn("w-7 h-7", iconColor)} />
      </div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-white/80 leading-relaxed">{description}</p>
    </div>
  )
}

// ==================== LIBRARY TAB (SCROLLTELLING) ====================

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

function LibraryTab() {
  return (
    <div className="animate-fade-in-up bg-fixed bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: 'url(/tranhcodong_giaoduc_so1-800x445.jpg)' }}>
      {/* Red Overlay */}
      <div className="bg-red-950/85 min-h-screen">
        <div className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
              Nội dung bài giảng
            </h2>

            {/* Scroll Instruction */}
            <div className="text-center mb-12">
              <p className="text-white/70 mb-2">Hãy cuộn trang từ từ xuống dưới</p>
              <ChevronDown className="w-6 h-6 text-white/50 mx-auto animate-bounce" />
            </div>

            <div className="space-y-12">
              {lessonsData.map((lesson, index) => (
                <ScrollBlock key={lesson.id} index={index}>
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

function LessonContent({ lesson }: { lesson: (typeof lessonsData)[0] }) {
  const content = lesson.content

  return (
    <div className="space-y-4">
      <p className="text-white/90 leading-relaxed">{content.intro}</p>

      {"rules" in content && content.rules && (
        <div className="space-y-3">
          {content.rules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-blue-900/30 border-l-4 border-l-blue-400 rounded-r-xl p-4"
            >
              <h5 className="font-bold text-blue-300 mb-1">{rule.title}</h5>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {"highlights" in content && content.highlights && (
        <div className="space-y-3">
          {content.highlights.map((hl, idx) => (
            <div
              key={idx}
              className="bg-emerald-900/30 border-l-4 border-l-emerald-400 rounded-r-xl p-4"
            >
              <h5 className="font-bold text-emerald-300 mb-1">{hl.label}</h5>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                {hl.description}
              </p>
            </div>
          ))}
          {content.note && (
            <div className="bg-amber-900/30 rounded-xl p-4 mt-4 border border-amber-500/30">
              <p className="text-amber-200 text-sm font-medium">{content.note}</p>
            </div>
          )}
        </div>
      )}

      {"classes" in content && content.classes && (
        <div className="space-y-3">
          {content.classes.map((cls, idx) => (
            <div
              key={idx}
              className={cn("border-l-4 rounded-r-xl p-4 bg-black/20", cls.color)}
            >
              <h5 className="font-bold text-white mb-1">{cls.name}</h5>
              <p className="text-white/80 text-sm leading-relaxed">
                {cls.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {"inheritance" in content && content.inheritance && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-900/30 rounded-xl p-4 border border-red-500/30">
            <h5 className="font-bold text-red-300 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-700 rounded-full flex items-center justify-center text-xs text-white">
                1
              </span>
              Điểm kế thừa
            </h5>
            <ul className="space-y-2">
              {content.inheritance.map((item, idx) => (
                <li
                  key={idx}
                  className="text-red-100/80 text-sm flex items-start gap-2"
                >
                  <span className="text-red-400 mt-1">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-900/30 rounded-xl p-4 border border-emerald-500/30">
            <h5 className="font-bold text-emerald-300 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-700 rounded-full flex items-center justify-center text-xs text-white">
                2
              </span>
              Điểm sáng tạo
            </h5>
            <ul className="space-y-2">
              {content.innovation &&
                content.innovation.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-emerald-100/80 text-sm flex items-start gap-2"
                  >
                    <span className="text-emerald-400 mt-1">-</span>
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {"conclusion" in content && content.conclusion && (
        <div className="bg-gradient-to-r from-red-900/40 to-amber-900/40 rounded-xl p-4 mt-4 border border-white/10">
          <p className="text-white font-medium text-sm leading-relaxed">
            {content.conclusion}
          </p>
        </div>
      )}
    </div>
  )
}

// ==================== MINIGAME TAB (TREASURE CHEST) ====================

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
      <div className="animate-fade-in-up py-8 px-4">
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
      <div className="animate-fade-in-up py-8 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Unlock className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-amber-600 mb-6">
              MỞ KHÓA THÀNH CÔNG!
            </h2>

            {/* Polaroid-style image */}
            <div className="inline-block bg-white p-3 pb-12 shadow-lg rotate-1 mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/11/FPT_logo_2010.svg"
                alt="FPT University Logo"
                className="w-48 h-32 object-contain"
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
    <div className="animate-fade-in-up py-8 px-4">
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
