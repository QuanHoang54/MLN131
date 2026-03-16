"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { generateQuiz, questionsBank } from "./questions"
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
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FileText,
  Film,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ==================== DATA ====================
const lessonsData = [
  {
    part: "PHẦN I",
    title: "CƠ CẤU XÃ HỘI - GIAI CẤP TRONG THỜI KỲ QUÁ ĐỘ LÊN CHỦ NGHĨA XÃ HỘI",
    sections: [
      {
        heading: "1. Khái niệm và vị trí của cơ cấu xã hội - giai cấp trong cơ cấu xã hội",
        subsections: [
          {
            subheading: "1.1. Khái niệm cơ cấu xã hội và cơ cấu xã hội - giai cấp",
            imageDual: [
              { src: "/cocauxahoi.png", alt: "Hình người 3D xếp hình" },
              { src: "/5lop.png", alt: "Sơ đồ 5 thành phần cơ cấu xã hội" }
            ],
            imageCenter: "/giai-cap-la-gi_0906142048.jpeg",
            imageCaption: "Minh họa phân tầng giai cấp trong xã hội",
            definitions: [
              { term: "Cơ cấu xã hội", description: "Là những cộng đồng người cùng toàn bộ những mối quan hệ xã hội của các cộng đồng ấy tạo nên. Xã hội không phải là một khối đồng nhất mà bao gồm nhiều thành phần cấu tạo thành như: Cơ cấu dân cư, cơ cấu nghề nghiệp, cơ cấu dân tộc, cơ cấu tôn giáo và cơ cấu giai cấp." },
              { term: "Cơ cấu xã hội - giai cấp", description: "Là hệ thống các giai cấp, tầng lớp xã hội tồn tại khách quan trong một chế độ xã hội nhất định. Hệ thống này được hình thành thông qua những mối quan hệ cốt lõi: Sở hữu tư liệu sản xuất, Tổ chức quản lý quá trình sản xuất, Địa vị chính trị - xã hội giữa các giai cấp, tầng lớp." }
            ]
          },
          {
            subheading: "1.2. Vị trí của cơ cấu xã hội - giai cấp",
            intro: "Trong hệ thống các loại hình cơ cấu xã hội (dân tộc, tôn giáo, nghề nghiệp...), cơ cấu xã hội - giai cấp có vị trí quan trọng hàng đầu và chi phối các loại hình khác. Có 4 lý do giải thích cho vị trí trung tâm này:",
            reasons: [
              "Thứ nhất: Nó liên quan trực tiếp đến các đảng phái chính trị và quyền lực nhà nước; liên quan đến quyền sở hữu tư liệu sản xuất, tổ chức lao động và phân phối thu nhập (những yếu tố mang tính sống còn của một quốc gia).",
              "Thứ hai: Sự biến đổi của cơ cấu xã hội - giai cấp tất yếu sẽ kéo theo sự biến đổi của các cơ cấu xã hội khác, từ đó làm biến đổi toàn bộ bức tranh cơ cấu xã hội.",
              "Thứ ba: Ở chiều ngược lại, các cơ cấu xã hội khác cũng có vai trò tác động trở lại, làm phong phú hoặc phức tạp thêm cơ cấu xã hội - giai cấp.",
              "Thứ tư: Đây là căn cứ cơ bản nhất để Đảng và Nhà nước xây dựng các chính sách phát triển kinh tế, văn hóa, xã hội cho từng giai đoạn lịch sử cụ thể."
            ]
          }
        ]
      },
      {
        heading: "2. Sự biến đổi có tính quy luật của cơ cấu xã hội - giai cấp trong thời kỳ quá độ",
        intro: "Trong thời kỳ quá độ, cơ cấu xã hội - giai cấp không hề đứng im mà vận động theo 3 quy luật cốt lõi sau:",
        laws: [
          { title: "Quy luật 1: Cơ cấu xã hội - giai cấp biến đổi gắn liền và bị quy định bởi cơ cấu kinh tế", description: "Phương thức sản xuất và cơ cấu kinh tế như thế nào thì cơ cấu giai cấp sẽ như thế đó. Khi nền kinh tế thay đổi (từ bao cấp sang thị trường, thay đổi cơ cấu ngành nghề), hình thức phân phối thay đổi, tất yếu sẽ làm hệ thống các giai cấp biến đổi theo. Kinh tế chính là 'cái gốc' sinh ra 'nhánh' giai cấp." },
          { title: "Quy luật 2: Cơ cấu xã hội - giai cấp biến đổi phức tạp, đa dạng, làm xuất hiện các tầng lớp xã hội mới", description: "Bước vào thời kỳ quá độ, chúng ta phát triển một nền kinh tế nhiều thành phần, nhiều ngành nghề đa dạng. Hệ quả tất yếu là xã hội không chỉ còn gói gọn trong các giai cấp truyền thống mà sinh ra nhiều giai cấp, nhiều tầng lớp, nhóm người khác nhau (Ví dụ điển hình nhất là sự xuất hiện của tầng lớp doanh nhân, tiểu chủ...)." },
          { title: "Quy luật 3: Biến đổi trong mối quan hệ vừa đấu tranh, vừa liên minh, từng bước xóa bỏ bất bình đẳng xã hội dẫn đến sự xích lại gần nhau", description: "Sự đa dạng của các giai tầng tạo ra những khác biệt nhất định về lợi ích. Do đó, giữa họ luôn tồn tại mối quan hệ song song: vừa đấu tranh để giải quyết những mâu thuẫn lợi ích cục bộ, vừa phải liên minh, hợp tác với nhau để phát triển đất nước. Mục tiêu cuối cùng của sự biến đổi này là từng bước xóa bỏ sự phân hóa, bất bình đẳng, đưa các giai cấp tiến tới xích lại gần nhau, tạo nên sức mạnh đại đoàn kết." }
        ]
      }
    ]
  },
  {
    part: "PHẦN II",
    title: "LIÊN MINH GIAI CẤP, TẦNG LỚP TRONG THỜI KỲ QUÁ ĐỘ LÊN CHỦ NGHĨA XÃ HỘI",
    sections: [
      {
        heading: "1. Khái niệm liên minh giai cấp, tầng lớp",
        content: "Liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội là sự liên kết, hợp tác, hỗ trợ nhau giữa các giai cấp, tầng lớp xã hội nhằm thực hiện nhu cầu và lợi ích của các chủ thể trong khối liên minh, đồng thời tạo động lực thực hiện thắng lợi mục tiêu của chủ nghĩa xã hội."
      },
      {
        heading: "2. Tính tất yếu của khối liên minh (Xét trên 2 góc độ)",
        intro: "Sự liên minh này không phải là một ý muốn chủ quan mà là một đòi hỏi tất yếu khách quan trên cả phương diện chính trị và kinh tế:",
        aspects: [
          {
            title: "2.1. Xét từ góc độ chính trị:",
            points: [
              "Tập hợp lực lượng: Liên minh nhằm tập hợp lực lượng tiến hành cách mạng xã hội chủ nghĩa, từ đó phát huy sức mạnh tổng hợp để cải tạo xã hội cũ, xây dựng xã hội mới.",
              "Xây dựng nền tảng: Việc liên minh giúp tạo nền tảng cơ sở xã hội vững chắc của chế độ, là cơ sở để thực hiện đoàn kết toàn dân.",
              "Đảm bảo vai trò lãnh đạo: Khối liên minh này bắt buộc phải do Đảng Cộng sản lãnh đạo để giữ vững định hướng xã hội chủ nghĩa."
            ]
          },
          {
            title: "2.2. Xét từ góc độ kinh tế (Góc độ quyết định nhất):",
            points: [
              "Sự gắn kết của các lĩnh vực: Ở mỗi quốc gia, các lĩnh vực kinh tế (công nghiệp, nông nghiệp, khoa học công nghệ...) luôn phải gắn chặt với nhau, do đó các chủ thể đại diện cho các lĩnh vực này tất yếu phải liên minh với nhau.",
              "Thỏa mãn lợi ích chung: Quá trình xây dựng chủ nghĩa xã hội phải chú ý thỏa mãn nhu cầu, lợi ích của công nhân, nông dân, trí thức và các tầng lớp nhân dân lao động, đặc biệt là lợi ích kinh tế.",
              "Xây dựng cơ sở vật chất: Khối liên minh xuất phát từ chính nhu cầu xây dựng nền tảng vật chất - kỹ thuật cần thiết cho chủ nghĩa xã hội."
            ]
          }
        ],
        allianceImages: [
          { src: "/congnghiep.png"},
          { src: "/nongnghiep.png"},
          { src: "/fpt.png"}
        ]
      },
      {
        heading: "3. Tầm quan trọng của liên minh giai cấp, tầng lớp",
        importancePoints: [
          "Liên minh giữa giai cấp công nhân với giai cấp nông dân và tầng lớp trí thức là điều kiện đảm bảo vai trò lãnh đạo của giai cấp công nhân, đồng thời là điều kiện quyết định thắng lợi trong cuộc đấu tranh giành chính quyền cũng như công cuộc cải tạo và xây dựng xã hội mới.",
          "Việc hình thành khối liên minh không chỉ mang ý nghĩa chính trị mà còn xuất phát từ chính nhu cầu và lợi ích kinh tế của họ. Chính vì vậy, các chủ thể của các lĩnh vực công nghiệp, nông nghiệp, dịch vụ, khoa học và công nghệ tất yếu phải gắn bó, liên minh chặt chẽ với nhau để cùng thực hiện những nhu cầu và lợi ích kinh tế chung.",
          "Dưới sự lãnh đạo của Đảng Cộng sản, giai cấp công nhân phải liên minh với giai cấp nông dân và các tầng lớp nhân dân lao động để tạo ra sức mạnh tổng hợp đảm bảo cho thắng lợi của cuộc cách mạng xã hội chủ nghĩa."
        ]
      }
    ]
  },
  {
    part: "PHẦN III",
    title: "CƠ CẤU XÃ HỘI - GIAI CẤP VÀ LIÊN MINH TRONG THỜI KỲ QUÁ ĐỘ Ở VIỆT NAM",
    sections: [
      {
        heading: "1. Đặc điểm cơ cấu xã hội - giai cấp ở Việt Nam",
        features: [
          { title: "Sự biến đổi gắn liền với cơ cấu kinh tế", description: "Chuyển từ kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng XHCN làm thay đổi sâu sắc vị trí, vai trò của các giai tầng." },
          { title: "Tính đa dạng và đan xen", description: "Tồn tại nhiều thành phần kinh tế dẫn đến sự đa dạng trong các tầng lớp xã hội; các giai tầng vừa hợp tác, vừa đấu tranh trong nội bộ khối đại đoàn kết." },
          { title: "Sự biến đổi trong nội bộ từng giai cấp, tầng lớp", description: "Xuất hiện nhiều nhóm xã hội mới, đặc biệt là sự phát triển mạnh mẽ của đội ngũ doanh nhân." }
        ]
      },
      {
        heading: "2. Các giai cấp, tầng lớp trong cơ cấu xã hội Việt Nam hiện nay",
        imageAfterClasses: "/phan3.png",
        classes: [
          { name: "Giai cấp công nhân", description: "Lực lượng đi đầu, nắm quyền lãnh đạo cách mạng thông qua Đảng Cộng sản; nòng cốt trong khối liên minh.", color: "bg-blue-50 border-l-blue-500" },
          { name: "Giai cấp nông dân", description: "Lực lượng đông đảo, có vị trí chiến lược trong sự nghiệp phát triển nông nghiệp và nông thôn mới.", color: "bg-green-50 border-l-green-500" },
          { name: "Đội ngũ trí thức", description: "Lực lượng lao động sáng tạo đặc biệt quan trọng trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế.", color: "bg-purple-50 border-l-purple-500" },
          { name: "Đội ngũ doanh nhân", description: "Điểm nhấn thực tiễn. Tầng lớp đang phát triển nhanh, có vai trò quan trọng trong việc huy động nguồn lực, tạo việc làm và đóng góp cho sự tăng trưởng bền vững của đất nước.", color: "bg-amber-50 border-l-amber-500" },
          { name: "Các tầng lớp khác", description: "Phụ nữ, thanh niên, cựu chiến binh, người cao tuổi và các cộng đồng tôn giáo, dân tộc.", color: "bg-gray-50 border-l-gray-500" }
        ]
      },
      {
        heading: "3. Nội dung của liên minh giai cấp, tầng lớp ở Việt Nam",
        allianceContent: [
          { title: "Nội dung Chính trị", description: "Giữ vững bản chất giai cấp công nhân của Nhà nước, tăng cường sự lãnh đạo của Đảng để bảo vệ chế độ và lợi ích của nhân dân lao động.", icon: "political" },
          { title: "Nội dung Kinh tế", description: "Đẩy mạnh hợp tác giữa các ngành công nghiệp – nông nghiệp – khoa học công nghệ; thực hiện các mô hình liên kết (như liên kết '4 nhà') để nâng cao năng suất và đời sống.", icon: "economic" },
          { title: "Nội dung Văn hóa - Xã hội", description: "Xây dựng nền văn hóa tiên tiến; nâng cao dân trí; thực hiện tốt các chính sách an sinh và công bằng xã hội.", icon: "cultural" }
        ]
      },
      {
        heading: "4. Năm phương hướng cơ bản để xây dựng cơ cấu xã hội - giai cấp và tăng cường liên minh",
        intro: "Đây là lộ trình cụ thể để hiện thực hóa khối liên minh trong thực tế:",
        directions: [
          { number: 1, content: "Đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước; giải quyết tốt mối quan hệ giữa tăng trưởng kinh tế với đảm bảo tiến bộ, công bằng xã hội. Trọng tâm là chuyển dịch cơ cấu ngành nghề tích cực, tạo môi trường cho các giai tầng cùng phát triển." },
          { number: 2, content: "Xây dựng và thực hiện hệ thống chính sách xã hội tổng thể đối với từng giai tầng: Chăm lo đời sống và trình độ cho Công nhân. Phát huy vai trò chủ thể của Nông dân. Trọng dụng và phát triển đội ngũ Trí thức. Tạo cơ chế, môi trường thuận lợi cho đội ngũ Doanh nhân phát triển mạnh mẽ về cả số lượng và chất lượng. Đảm bảo quyền lợi cho phụ nữ, thanh niên và các tầng lớp khác." },
          { number: 3, content: "Tạo sự đồng thuận và phát huy tinh thần đoàn kết thống nhất. Phải làm cho các giai tầng hiểu rõ lợi ích chung của dân tộc luôn thống nhất với lợi ích riêng của từng giai cấp." },
          { number: 4, content: "Hoàn thiện thể chế kinh tế thị trường định hướng xã hội chủ nghĩa và đẩy mạnh phát triển khoa học - công nghệ. Đây là công cụ để điều tiết hài hòa lợi ích giữa các bên trong khối liên minh." },
          { number: 5, content: "Đổi mới hoạt động của Đảng, Nhà nước, Mặt trận Tổ quốc. Nâng cao vai trò lãnh đạo của Đảng; xây dựng Nhà nước phục vụ, kiến tạo; phát huy sức mạnh tổng hợp của toàn dân thông qua Mặt trận Tổ quốc." }
        ]
      }
    ]
  },
  {
    part: "PHẦN IV",
    title: "GIẢI QUYẾT VẤN ĐỀ - SỰ XUẤT HIỆN CỦA KINH TẾ TƯ NHÂN CÓ LÀM PHÁ VỠ LIÊN MINH TRUYỀN THỐNG?",
    sections: [
      {
        heading: "1. Sự bùng nổ của kinh tế tư nhân và tầng lớp doanh nhân",
        features: [
          { title: "Bối cảnh", description: "Chuyển đổi sang nền kinh tế thị trường định hướng XHCN." },
          { title: "Quy luật", description: "Sự thay đổi cơ cấu kinh tế -> Tất yếu làm biến đổi cơ cấu xã hội - giai cấp." },
          { title: "Thực tiễn", description: "Xuất hiện đội ngũ doanh nhân; Kinh tế tư nhân trở thành 'một động lực quan trọng của nền kinh tế'." }
        ]
      },
      {
        heading: "2. Sự đề cao kinh tế tư nhân có MÂU THUẪN với lý luận Mác - Lênin không?",
        answer: {
          conclusion: "Khẳng định: Hoàn toàn KHÔNG mâu thuẫn.",
          bases: [
            { title: "Cơ sở 1 (Tính khách quan)", content: "Tôn trọng quy luật Cơ sở hạ tầng quyết định kiến trúc thượng tầng." },
            { title: "Cơ sở 2 (Tính lịch sử)", content: "Phù hợp với tính đan xen phức tạp của thời kỳ quá độ." },
            { title: "Cơ sở 3 (Tính nguyên tắc)", content: "Phù hợp với mục tiêu Liên minh về kinh tế của V.I.Lênin trong thời kỳ xây dựng đất nước." }
          ]
        }
      },
      {
        heading: "3. Điểm kế thừa và Sự sáng tạo đặc thù của Việt Nam",
        inheritance: {
          title: "SỰ KẾ THỪA (Giữ vững nguyên tắc)",
          points: [
            "Liên minh Công - Nông - Trí thức vẫn là nền tảng cốt lõi của hệ thống chính trị.",
            "Đảng Cộng sản (đội tiên phong của giai cấp công nhân) giữ vững vai trò lãnh đạo tuyệt đối."
          ]
        },
        innovation: {
          title: "SỰ SÁNG TẠO ĐẶC THÙ (Phát triển lý luận)",
          points: [
            "Mở rộng nội hàm liên minh: Chuyển trọng tâm từ đấu tranh chính trị sang hợp tác kinh tế (Liên kết 4 nhà).",
            "Chuyển hóa mâu thuẫn thành động lực phát triển.",
            "Đồng nhất lợi ích: Lợi ích hợp pháp của doanh nhân thống nhất với mục tiêu 'Dân giàu, nước mạnh'."
          ]
        }
      }
    ]
  },
]

const SECRET_PASSWORD = "08/09/2006"

// ==================== FLASHCARD DATA ====================
const flashcardData = [
  { front: "Cơ cấu xã hội là gì?", back: "Là những cộng đồng người cùng toàn bộ những mối quan hệ xã hội của các cộng đồng ấy tạo nên." },
  { front: "Cơ cấu xã hội - giai cấp được hình thành dựa trên những mối quan hệ cốt lõi nào?", back: "Sở hữu tư liệu sản xuất, tổ chức quản lý sản xuất, và địa vị chính trị - xã hội." },
  { front: "Loại hình cơ cấu xã hội nào giữ vị trí quan trọng hàng đầu và chi phối các loại hình khác?", back: "Cơ cấu xã hội - giai cấp." },
  { front: "Yếu tố nào là 'cái gốc' quyết định sự biến đổi của cơ cấu xã hội - giai cấp trong thời kỳ quá độ?", back: "Cơ cấu kinh tế." },
  { front: "Sự xuất hiện của tầng lớp doanh nhân, tiểu chủ trong thời kỳ quá độ thể hiện quy luật gì?", back: "Quy luật cơ cấu xã hội - giai cấp biến đổi phức tạp, đa dạng." },
  { front: "Mục tiêu cuối cùng của sự biến đổi cơ cấu xã hội - giai cấp là gì?", back: "Xóa bỏ sự phân hóa, bất bình đẳng, đưa các giai cấp xích lại gần nhau." },
  { front: "Liên minh giai cấp, tầng lớp được thực hiện nhằm mục đích gì?", back: "Thực hiện nhu cầu, lợi ích chung và tạo động lực thực hiện thắng lợi mục tiêu của CNXH." },
  { front: "Trong tính tất yếu của khối liên minh, góc độ nào mang tính quyết định nhất?", back: "Góc độ kinh tế." },
  { front: "Khối liên minh giai cấp bắt buộc phải do lực lượng nào lãnh đạo? Vì sao?", back: "Do Đảng Cộng sản lãnh đạo, để giữ vững định hướng xã hội chủ nghĩa." },
  { front: "Đặc điểm nổi bật của cơ cấu xã hội - giai cấp ở Việt Nam hiện nay là gì?", back: "Tính đa dạng và đan xen (do tồn tại nhiều thành phần kinh tế)." },
  { front: "Lực lượng nào là nòng cốt trong khối liên minh ở Việt Nam?", back: "Giai cấp công nhân." },
  { front: "Đội ngũ nào có vị trí chiến lược trong sự nghiệp phát triển nông nghiệp và nông thôn mới?", back: "Giai cấp nông dân." },
  { front: "Đội ngũ nào được xem là lực lượng lao động sáng tạo đặc biệt quan trọng trong quá trình CNH, HĐH?", back: "Đội ngũ trí thức." },
  { front: "Tầng lớp nào đang đóng vai trò quan trọng trong việc huy động nguồn lực và tạo việc làm ở nước ta hiện nay?", back: "Đội ngũ doanh nhân." },
  { front: "Nội dung nào của liên minh giai cấp, tầng lớp ở Việt Nam là cơ bản và quyết định nhất?", back: "Nội dung Kinh tế (ví dụ: thực hiện liên kết '4 nhà')." },
  { front: "Công cụ chủ yếu để điều tiết hài hòa lợi ích giữa các giai tầng ở nước ta là gì?", back: "Thể chế kinh tế thị trường định hướng XHCN và khoa học - công nghệ." },
  { front: "Sự xuất hiện và đề cao kinh tế tư nhân ở nước ta có mâu thuẫn với lý luận Mác - Lênin không?", back: "Hoàn toàn KHÔNG mâu thuẫn. (Tuân theo quy luật Cơ sở hạ tầng quyết định kiến trúc thượng tầng)." },
  { front: "Điểm KẾ THỪA cốt lõi trong lý luận về liên minh ở Việt Nam hiện nay là gì?", back: "Liên minh Công - Nông - Trí thức vẫn là nền tảng cốt lõi của hệ thống chính trị." },
  { front: "Sự SÁNG TẠO đặc thù của Việt Nam về nội hàm liên minh là gì?", back: "Chuyển trọng tâm từ đấu tranh chính trị sang hợp tác kinh tế, đồng nhất lợi ích doanh nhân với mục tiêu quốc gia." },
]

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
    { id: "flashcard", label: "Ôn tập", icon: Bookmark },
    { id: "appendix", label: "Phụ lục", icon: FileText },
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
  return (
    <div className="space-y-8">
      {lesson.sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="space-y-4">
          {/* Section Heading */}
          <h4 className="text-lg font-bold text-red-800 border-b-2 border-red-200 pb-2">
            {section.heading}
          </h4>

          {/* Content based on section type */}
          {"subsections" in section && section.subsections && (
            <div className="space-y-6">
              {section.subsections.map((sub, subIdx) => (
                <div key={subIdx} className="space-y-3">
                  <h5 className="font-semibold text-gray-800">{sub.subheading}</h5>
                  {/* Ảnh 2 cột - hiển thị ngay dưới tiêu đề 1.1 */}
                  {"imageDual" in sub && sub.imageDual && (
                    <div className="flex flex-col md:flex-row gap-6 my-4">
                      {sub.imageDual.map((img, idx) => (
                        <div key={idx} className="flex-1 bg-white rounded-lg shadow-lg p-3">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-auto object-contain rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {"definitions" in sub && sub.definitions && (
                    <div className="space-y-3">
                      {sub.definitions.map((def, defIdx) => (
                        <div key={defIdx} className="bg-blue-50 border-l-4 border-l-blue-500 rounded-r-xl p-4">
                          <h6 className="font-bold text-blue-800 mb-2">{def.term}</h6>
                          <p className="text-blue-700 text-sm leading-relaxed">{def.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Ảnh center (tháp giai cấp) */}
                  {"imageCenter" in sub && sub.imageCenter && (
                    <figure className="w-4/5 mx-auto mt-6">
                      <img
                        src={sub.imageCenter}
                        alt="Minh họa"
                        className="w-full rounded-lg shadow-lg"
                      />
                      {"imageCaption" in sub && sub.imageCaption && (
                        <figcaption className="text-center text-gray-600 text-sm mt-2 italic">
                          {sub.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {"intro" in sub && sub.intro && (
                    <p className="text-gray-700 leading-relaxed">{sub.intro}</p>
                  )}
                  {"reasons" in sub && sub.reasons && (
                    <div className="space-y-2">
                      {sub.reasons.map((reason, reasonIdx) => (
                        <div key={reasonIdx} className="flex items-start gap-3 bg-amber-50 rounded-lg p-3">
                          <span className="w-6 h-6 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                            {reasonIdx + 1}
                          </span>
                          <p className="text-amber-900 text-sm leading-relaxed">{reason}</p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

          {"intro" in section && section.intro && (
            <p className="text-gray-700 leading-relaxed">{section.intro}</p>
          )}

          {"laws" in section && section.laws && (
            <div className="space-y-4">
              {section.laws.map((law, lawIdx) => (
                <div key={lawIdx} className="bg-gradient-to-r from-red-50 to-amber-50 border-l-4 border-l-red-500 rounded-r-xl p-4">
                  <h5 className="font-bold text-red-800 mb-2">{law.title}</h5>
                  <p className="text-gray-700 text-sm leading-relaxed">{law.description}</p>
                </div>
              ))}
            </div>
          )}

          {"content" in section && typeof section.content === "string" && (
            <div className="bg-emerald-50 border-l-4 border-l-emerald-500 rounded-r-xl p-4">
              <p className="text-emerald-800 leading-relaxed">{section.content}</p>
            </div>
          )}

          {"aspects" in section && section.aspects && (
            <div className="space-y-4">
              {section.aspects.map((aspect, aspectIdx) => (
                <div key={aspectIdx} className="space-y-3">
                  <h5 className="font-semibold text-gray-800 bg-gray-100 px-3 py-2 rounded-lg">{aspect.title}</h5>
                  <div className="space-y-2 pl-4">
                    {aspect.points.map((point, pointIdx) => (
                      <div key={pointIdx} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ảnh minh họa Liên minh Công - Nông - Trí thức - hiển thị sau section 2, trước section 3 */}
          {"allianceImages" in section && (section as any).allianceImages && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
              {(section as any).allianceImages.map((img: any, imgIdx: number) => (
                <div key={imgIdx} className="group text-center">
                  <div className="relative h-52 overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-3 font-bold text-gray-800">{img.caption}</p>
                </div>
              ))}
            </div>
          )}

          {"importancePoints" in section && section.importancePoints && (
            <div className="space-y-3">
              {section.importancePoints.map((point, pointIdx) => (
                <div key={pointIdx} className="bg-purple-50 border-l-4 border-l-purple-500 rounded-r-xl p-4">
                  <p className="text-purple-800 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          )}

          {"features" in section && section.features && (
            <div className="space-y-3">
              {section.features.map((feature, featureIdx) => (
                <div key={featureIdx} className="bg-blue-50 border-l-4 border-l-blue-500 rounded-r-xl p-4">
                  <h5 className="font-bold text-blue-800 mb-1">{feature.title}</h5>
                  <p className="text-blue-700 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {"classes" in section && section.classes && (
            <div className="space-y-3">
              {section.classes.map((cls, clsIdx) => (
                <div key={clsIdx} className={cn("border-l-4 rounded-r-xl p-4", cls.color)}>
                  <h5 className="font-bold text-gray-800 mb-1">{cls.name}</h5>
                  <p className="text-gray-700 text-sm leading-relaxed">{cls.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Ảnh phan3.png - hiển thị sau khối "Các tầng lớp khác" */}
          {"imageAfterClasses" in section && section.imageAfterClasses && (
            <div className="my-8">
              <img
                src={section.imageAfterClasses}
                alt="Minh họa phân tầng giai cấp"
                className="w-full max-w-4xl mx-auto rounded-xl shadow-lg"
              />
            </div>
          )}

          {"allianceContent" in section && (section as any).allianceContent && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(section as any).allianceContent.map((item: any, itemIdx: number) => (
                <div key={itemIdx} className={cn(
                  "rounded-xl p-4 text-center",
                  item.icon === "political" ? "bg-red-50" :
                  item.icon === "economic" ? "bg-emerald-50" : "bg-purple-50"
                )}>
                  <h5 className={cn(
                    "font-bold mb-2 text-sm",
                    item.icon === "political" ? "text-red-800" :
                    item.icon === "economic" ? "text-emerald-800" : "text-purple-800"
                  )}>{item.title}</h5>
                  <p className={cn(
                    "text-xs leading-relaxed",
                    item.icon === "political" ? "text-red-700" :
                    item.icon === "economic" ? "text-emerald-700" : "text-purple-700"
                  )}>{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {"directions" in section && section.directions && (
            <div className="space-y-3">
              {section.directions.map((dir) => (
                <div key={dir.number} className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-4">
                  <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    {dir.number}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">{dir.content}</p>
                </div>
              ))}
            </div>
          )}

          {"context" in section && (section as any).context && (
            <div className="space-y-2">
              {(section as any).context.map((item: string, itemIdx: number) => (
                <div key={itemIdx} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3">
                  <span className="text-red-500">•</span>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          )}

          {"answer" in section && section.answer && (
            <div className="space-y-4">
              <div className="bg-emerald-100 border-2 border-emerald-500 rounded-xl p-4 text-center">
                <p className="text-emerald-800 font-bold text-lg">{section.answer.conclusion}</p>
              </div>
              <div className="space-y-3">
                {section.answer.bases.map((base, baseIdx) => (
                  <div key={baseIdx} className="bg-blue-50 border-l-4 border-l-blue-500 rounded-r-xl p-4">
                    <h5 className="font-bold text-blue-800 mb-1">{base.title}</h5>
                    <p className="text-blue-700 text-sm">{base.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {"inheritance" in section && section.inheritance && "innovation" in section && section.innovation && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-4">
                <h5 className="font-bold text-red-800 mb-3 text-center">{section.inheritance.title}</h5>
                <ul className="space-y-2">
                  {section.inheritance.points.map((point, pointIdx) => (
                    <li key={pointIdx} className="text-red-700 text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <h5 className="font-bold text-emerald-800 mb-3 text-center">{section.innovation.title}</h5>
                <ul className="space-y-2">
                  {section.innovation.points.map((point, pointIdx) => (
                    <li key={pointIdx} className="text-emerald-700 text-sm flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
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
              {/* Animated gradient text effect */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight uppercase drop-shadow-lg">
                <div className="mb-2 bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent animate-pulse">
                  LIÊN MINH CÔNG – NÔNG – TRÍ THỨC
                </div>
                <div className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                  VÀ KINH TẾ TƯ NHÂN: KẾ THỪA HAY THAY ĐỔI?
                </div>
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty drop-shadow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Tìm hiểu về cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam
              </p>
              {/* Enhanced button with glow effect */}
              <button
                onClick={() => setActiveTab("library")}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-red-900 font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-amber-500/50 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative z-10">Bắt đầu khám phá</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Course Overview Section - 4 Cards with Glassmorphism */}
          <section className="py-16 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Title with animated underline */}
              <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white drop-shadow-lg relative inline-block w-full">
                <span className="relative z-10">NỘI DUNG CHÍNH CỦA CHỦ ĐỀ</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"></span>
              </h3>

              {/* 4 Cards Grid with staggered animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1: Cơ cấu xã hội - giai cấp */}
                <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/30 flex items-center justify-center flex-shrink-0 border border-blue-400/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Layers className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">Cơ cấu xã hội - giai cấp</h4>
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                        Khái niệm, vị trí và 3 quy luật biến đổi tất yếu của cơ cấu xã hội - giai cấp gắn liền với sự chuyển dịch kinh tế trong thời kỳ quá độ.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Lý luận về Liên minh giai cấp */}
                <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/30 flex items-center justify-center flex-shrink-0 border border-emerald-400/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Handshake className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-200 transition-colors">Lý luận về Liên minh giai cấp</h4>
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                        Tính tất yếu khách quan của khối liên minh trên cả hai phương diện chính trị (giành chính quyền) và kinh tế (xây dựng đất nước).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3: Thực tiễn tại Việt Nam */}
                <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/30 flex items-center justify-center flex-shrink-0 border border-amber-400/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">Thực tiễn tại Việt Nam</h4>
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                        Đặc điểm đa dạng, đan xen của các giai tầng (Công - Nông - Trí thức - Doanh nhân) và 5 phương hướng củng cố khối đại đoàn kết.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 4: Kinh tế tư nhân - Kế thừa & Sáng tạo */}
                <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/30 flex items-center justify-center flex-shrink-0 border border-purple-400/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <TrendingUp className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">Kinh tế tư nhân - Kế thừa & Sáng tạo</h4>
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
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
                  <button onClick={() => handleNavigation("flashcard")} className="text-gray-200 hover:text-yellow-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-4 h-4" /> Ôn tập
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation("appendix")} className="text-gray-200 hover:text-yellow-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-4 h-4" /> Phụ lục
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation("minigame")} className="text-gray-200 hover:text-yellow-400 flex items-center gap-2 transition-colors">
                    <ArrowRight className="w-4 h-4" /> Minigame
                  </button>
                </li>
                <li>
                  <a href="https://youtu.be/1wK79HXe1kY" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-yellow-400 flex items-center gap-2 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    Video Bài Giảng
                  </a>
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
                <button onClick={() => handleNavigation("flashcard")} className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  <Layers className="w-5 h-5" /> ÔN TẬP KIẾN THỨC
                </button>
                <button onClick={() => handleNavigation("appendix")} className="w-full bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" /> XEM PHỤ LỤC AI
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
    <div className="relative w-full min-h-screen bg-[url('/On-tap-mon-chu-nghia-Mac-–-Lenin-1-1024x558.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-sm"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white/15 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Animated title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 drop-shadow-lg animate-fade-in-up">
          Nội dung bài giảng
        </h2>

        {/* Scroll Instruction with enhanced animation */}
        <div className="text-center mb-12">
          <p className="text-white/80 mb-2 animate-pulse">Hãy cuộn trang từ từ xuống dưới</p>
          <ChevronDown className="w-8 h-8 text-white/60 mx-auto animate-bounce" />
        </div>

        <div className="space-y-16">
          {lessonsData.map((lesson, index) => (
            <ScrollBlock key={index} index={index}>
              <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
                {/* Part Header with animated gradient */}
                <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="inline-block bg-amber-400 text-red-900 text-xs font-bold px-3 py-1 rounded-full mb-2 hover:scale-110 transition-transform">
                    {lesson.part}
                  </span>
                  <h3 className="text-white font-bold text-xl leading-tight group-hover:text-amber-200 transition-colors">{lesson.title}</h3>
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
  )
}

// ==================== FLASHCARD TAB ====================
function FlashcardTab() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 50

  const currentCard = flashcardData[currentIndex]
  const progress = `${currentIndex + 1}/${flashcardData.length}`

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const goToNext = () => {
    if (currentIndex < flashcardData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrev()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === " " || e.key === "Enter") handleFlip()
  }, [currentIndex])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) goToNext()
    if (isRightSwipe) goToPrev()
  }

  return (
    <div className="min-h-screen bg-[url('/quizlet.jpg')] bg-cover bg-center bg-fixed py-8 px-4 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header with animated effects */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
            Ôn tập kiến thức
          </h2>
          <p className="text-gray-200 animate-pulse" style={{ animationDuration: '2s' }}>Click vào thẻ để lật • Kéo hoặc dùng nút để chuyển</p>
        </div>

        {/* Enhanced Progress bar */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/30 flex items-center gap-3">
            <span className="text-white font-bold text-lg">{currentIndex + 1}</span>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / flashcardData.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-white/80 font-medium">{flashcardData.length}</span>
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="relative w-full max-w-lg mx-auto h-80 sm:h-96 cursor-pointer perspective-1000"
          onClick={handleFlip}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 bg-white rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                Câu hỏi
              </div>
              <p className="text-lg sm:text-xl font-semibold text-gray-800 text-center leading-relaxed">
                {currentCard.front}
              </p>
              <p className="text-gray-400 text-sm mt-6">(Click để xem đáp án)</p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                Trả lời
              </div>
              <p className="text-base sm:text-lg text-gray-800 text-center leading-relaxed">
                {currentCard.back}
              </p>
              <p className="text-gray-400 text-sm mt-6">(Click để quay lại)</p>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-md border group ${
              currentIndex === 0
                ? "bg-white/20 text-white/40 border-white/20 cursor-not-allowed"
                : "bg-white/20 text-white border-white/40 hover:bg-white/30 hover:scale-105"
            }`}
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại</span>
          </button>

          {/* Animated dots */}
          <div className="flex gap-2">
            {flashcardData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx)
                  setIsFlipped(false)
                }}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-emerald-400 w-8 shadow-lg shadow-emerald-500/50"
                    : "bg-white/40 hover:bg-white/60 w-3 hover:w-4"
                }`}
                style={{ height: '12px' }}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex === flashcardData.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all backdrop-blur-md border group ${
              currentIndex === flashcardData.length - 1
                ? "bg-white/20 text-white/40 border-white/20 cursor-not-allowed"
                : "bg-emerald-500/60 text-white border-emerald-400/50 hover:bg-emerald-500/80 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30"
            }`}
          >
            <span>Tiếp theo</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ==================== APPENDIX TAB (AI USAGE) ====================
function AppendixTab() {
  return (
    <div className="min-h-screen bg-[url('/backai.avif')] bg-cover bg-center bg-fixed py-8 px-4 relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none"></div>

      {/* Floating AI particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-amber-400/25 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-emerald-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header with animated glow */}
        <div className="text-center">
          <div className="inline-block">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 animate-pulse" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              Phụ lục - AI Usage
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto animate-pulse"></div>
          </div>
          <p className="text-white/80 mt-2">Báo cáo minh bạch liêm chính học thuật</p>
        </div>

        {/* Phần 1: Lời cam kết */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 sm:p-8 group hover:shadow-2xl transition-all duration-500" style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-700 transition-colors">1. Lời cam kết liêm chính học thuật</h3>
          </div>
          <blockquote className="border-l-4 border-red-500 pl-6 py-2 bg-red-50 rounded-r-lg group-hover:bg-red-100 transition-colors">
            <p className="text-gray-800 text-lg leading-relaxed italic">
              "Nhóm thực hiện dự án cam kết: Trí tuệ nhân tạo (AI) chỉ đóng vai trò công cụ hỗ trợ (lên ý tưởng sơ đồ, khởi tạo mã nguồn, soạn ngân hàng câu hỏi). AI không thay thế hoàn toàn năng lực tư duy và quá trình làm việc của sinh viên. Toàn bộ nội dung và mã nguồn cuối cùng đều đã được sinh viên trực tiếp kiểm duyệt, đối chiếu và tinh chỉnh."
            </p>
          </blockquote>
        </div>

        {/* Phần 2: Mô hình làm việc */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 sm:p-8 group hover:shadow-2xl transition-all duration-500" style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">2. Mô hình làm việc và Vai trò (Workflow)</h3>
          </div>

          {/* Workflow Diagram - Horizontal Sequential Layout */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-2">
            {/* Step 1: Sinh viên */}
            <div className="flex-1 w-full">
              <div className="bg-amber-50/90 backdrop-blur-sm rounded-xl p-4 text-center border border-amber-200 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 group/card">
                <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-300">
                  <span className="text-white font-bold">SV</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover/card:text-amber-700 transition-colors">Người dùng (Sinh viên)</h4>
                <p className="text-sm text-gray-600 group-hover/card:text-gray-800 transition-colors">Lên ý tưởng kịch bản, cung cấp tài liệu gốc, định hướng sản phẩm và chịu trách nhiệm kiểm duyệt cuối cùng.</p>
              </div>
            </div>

            {/* Arrow 1 */}
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0 flex-shrink-0 animate-pulse" />

            {/* Step 2: Gemini AI */}
            <div className="flex-1 w-full">
              <div className="bg-purple-50/90 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-200 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 group/card">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-300">
                  <span className="text-white font-bold">G</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover/card:text-purple-700 transition-colors">Gemini AI</h4>
                <p className="text-sm text-gray-600 group-hover/card:text-gray-800 transition-colors">Cố vấn nội dung & Kiến trúc sư. Mô phỏng ý tưởng, tóm tắt tài liệu, biên soạn nội dung.</p>
              </div>
            </div>

            {/* Arrow 2 */}
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0 flex-shrink-0 animate-pulse" />

            {/* Step 3: Claude AI */}
            <div className="flex-1 w-full">
              <div className="bg-cyan-50/90 backdrop-blur-sm rounded-xl p-4 text-center border border-cyan-200 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group/card">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-300">
                  <span className="text-white font-bold">C</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover/card:text-cyan-700 transition-colors">Claude AI</h4>
                <p className="text-sm text-gray-600 group-hover/card:text-gray-800 transition-colors">Lập trình viên. Thực hiện hóa ý tưởng, viết mã nguồn React/Next.js theo prompt.</p>
              </div>
            </div>

            {/* Arrow 3 */}
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0 flex-shrink-0 animate-pulse" />

            {/* Step 4: NotebookLM */}
            <div className="flex-1 w-full">
              <div className="bg-orange-50/90 backdrop-blur-sm rounded-xl p-4 text-center border border-orange-200 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 group/card">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-300">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover/card:text-orange-700 transition-colors">NotebookLM</h4>
                <p className="text-sm text-gray-600 group-hover/card:text-gray-800 transition-colors">Sản xuất Media. Phân tích tài liệu gốc, tự động tạo Audio/Video podcast thảo luận bài học.</p>
              </div>
            </div>

            {/* Arrow 4 */}
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0 flex-shrink-0 animate-pulse" />

            {/* Step 5: Nguồn kiểm chứng */}
            <div className="flex-1 w-full">
              <div className="bg-green-50/90 backdrop-blur-sm rounded-xl p-4 text-center border border-green-200 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 group/card">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-300">
                  <span className="text-white font-bold">Ref</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover/card:text-green-700 transition-colors">Nguồn kiểm chứng</h4>
                <p className="text-sm text-gray-600 group-hover/card:text-gray-800 transition-colors">Dữ liệu gốc và chân lý đối chiếu. Kiểm tra lại đáp án theo giáo trình.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phần 3: Bảng minh bạch AI */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 sm:p-8 group hover:shadow-2xl transition-all duration-500" style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Star className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">3. Bảng minh bạch sử dụng AI (AI Usage Tracker)</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                  <th className="border border-gray-200/50 px-4 py-3 text-left font-bold text-gray-800">Tính năng</th>
                  <th className="border border-gray-200/50 px-4 py-3 text-left font-bold text-gray-800">Công cụ AI</th>
                  <th className="border border-gray-200/50 px-4 py-3 text-left font-bold text-gray-800">Mục đích & Prompt chính</th>
                  <th className="border border-gray-200/50 px-4 py-3 text-left font-bold text-gray-800">Sinh viên tự chỉnh sửa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-emerald-50/50 transition-colors duration-300">
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-700 font-medium">
                    Minigame Mở rương kho báu
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600">
                    <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium mr-1">Gemini</span>
                    <span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-medium">Claude</span>
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm">
                    "Tạo 20 câu hỏi trắc nghiệm từ nội dung Cơ cấu xã hội, viết code random câu hỏi"
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm">
                    Tích hợp logic game over, kiểm tra lại đáp án theo giáo trình.
                  </td>
                </tr>
                <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 transition-all duration-300">
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-700 font-medium">
                    Flashcard Ôn tập
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600">
                    <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium mr-1">Gemini</span>
                    <span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-medium">Claude</span>
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm">
                    "Chuyển đổi lý thuyết Liên minh Công-Nông thành 19 thẻ flashcard dạng lật 3D"
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm">
                    Tinh chỉnh CSS cho vừa màn hình điện thoại, rút gọn chữ trên thẻ.
                  </td>
                </tr>
                <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 transition-all duration-300">
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-700 font-medium">
                    Cấu trúc UI/UX Trang chủ
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600">
                    <span className="inline-block bg-cyan-100 text-cyan-700 px-2 py-1 rounded text-xs font-medium">Claude</span>
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm">
                    "Tạo bố cục chia cột cho phần định nghĩa, chèn ảnh 5 lớp xã hội"
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm">
                    Thay đổi màu sắc theo bộ nhận diện của trường.
                  </td>
                </tr>
                <tr className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-cyan-50 transition-all duration-300">
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-700 font-medium">
                    Video Podcast/Tóm tắt bài học
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600">
                    <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">NotebookLM</span>
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm italic">
                    Sử dụng tính năng Audio Overview phân tích tài liệu để tạo file âm thanh thảo luận bài học.
                  </td>
                  <td className="border border-gray-200/50 px-4 py-3 text-gray-600 text-sm bg-blue-50/30">
                    Chỉnh sửa audio, ghép hình ảnh slide minh họa, thêm vietsub và biên tập thành video.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Phần 4: Nguồn tài liệu */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 p-6 sm:p-8 group hover:shadow-2xl transition-all duration-500" style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">4. Nguồn tài liệu kiểm chứng</h3>
          </div>
          <div className="bg-indigo-50/90 backdrop-blur-sm rounded-xl p-6 border border-indigo-200 group-hover:bg-indigo-100 transition-colors">
            <p className="text-gray-700 leading-relaxed">
              Tất cả thông tin do AI sinh ra (đặc biệt là nội dung lý luận và câu hỏi trắc nghiệm) đều được sinh viên đối chiếu 100% với tài liệu chính thống:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-start gap-2 group/item">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                <span>Giáo trình <strong>Chủ nghĩa xã hội khoa học</strong> (Dành cho bậc đại học - Không chuyên lý luận chính trị) - Xuất bản năm 2019.</span>
              </li>
              <li className="flex items-start gap-2 group/item">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                <span>Các slide bài giảng của giảng viên phụ trách môn học.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-white/80 text-sm py-4">
          <p className="animate-pulse">© 2026 - Dự án học tập môn MLN131 - Chủ nghĩa xã hội khoa học</p>
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

  // Tạo quiz ngẫu nhiên từ ngân hàng 20 câu
  const [quizData] = useState(() => generateQuiz(questionsBank, 10))

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
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/60 via-transparent to-red-900/60 pointer-events-none"></div>
        <div className="max-w-lg mx-auto relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-shake" style={{ animationDuration: '0.5s' }}>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 mb-4 animate-bounce">THẤT BẠI!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              {lossReason === "quiz"
                ? "Bạn đã trả lời sai quá 3 câu quiz!"
                : "Bạn đã đoán sai mật mã 3 lần!"}
            </p>
            <p className="text-gray-500 mb-8">
              Thời gian: <span className="font-bold text-amber-600">{formatTime(timer)}</span>
            </p>
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
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
        {/* Celebration overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-transparent to-amber-900/40 pointer-events-none"></div>
        <div className="max-w-lg mx-auto relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-bounce-in" style={{ animationDuration: '0.8s' }}>
            {/* Rương kho báu đã mở */}
            <div className="mb-6 relative">
              <img
                src="/ruong1.png"
                alt="Rương Kho Báu Đã Mở"
                className="w-48 h-36 object-contain mx-auto animate-bounce"
                style={{ animationDuration: '2s' }}
              />
              {/* Sparkle effects */}
              <div className="absolute top-0 left-1/4 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute top-4 right-1/4 w-3 h-3 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
            </div>

            <h2 className="text-3xl font-bold text-amber-600 mb-6 animate-pulse">
              MỞ KHÓA THÀNH CÔNG!
            </h2>

            {/* Logo FPT University */}
            <div className="inline-block mb-6 relative">
              <img
                src="/FPT_Education_logo.svg.png"
                alt="FPT University"
                className="w-64 h-64 object-contain mx-auto hover:scale-110 transition-transform duration-500"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine"></div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-4 mb-6 border border-orange-200">
              <p className="text-orange-800 font-medium">
                Bí mật được hé lộ: <strong className="text-amber-600">08/09/2006</strong> chính là ngày
                thành lập trường Đại học FPT!
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700">
                Thời gian hoàn thành: <strong className="text-emerald-600">{mins} phút {secs} giây</strong>
              </p>
            </div>

            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
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
        {activeTab === "flashcard" && <FlashcardTab />}
        {activeTab === "appendix" && <AppendixTab />}
        {activeTab === "minigame" && <MinigameTab />}
      </main>
    </div>
  )
}
