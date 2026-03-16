import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Be Vietnam Pro với cấu hình đầy đủ cho tiếng Việt
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese'],        // BẮT BUỘC - load đầy đủ bộ dấu
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam',   // CSS variable cho Tailwind
  display: 'swap',                  // Hiển thị text ngay khi đang load font
  preload: true,                   // Load font trước khi render
  fallback: [                       // Fallback chain từ gần đến xa
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
})

export const metadata: Metadata = {
  title: 'Chủ Nghĩa Xã Hội Khoa Học - FPT University',
  description: 'Học tập về liên minh giai cấp và kinh tế tư nhân ở Việt Nam',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
