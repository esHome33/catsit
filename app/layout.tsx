import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyToolbar from '@/components/toolbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Catsitter WebApp',
  description: 'Webapp for cat sitters and cat owners',
  icons: { icon: "/favicon.ico", apple:"/apple-icon.png"},
  generator: 'Next.js',
  applicationName: 'CatSitter',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', "Supabase"],
  authors: [{ name: 'Etienne' },],
  colorScheme: 'dark',
  creator: 'ESHome.fr',
  openGraph: {
    title: 'Simple Catsitter WebApp',
    description: 'Check all items to do, then please the cat ... and its owner !',
    images: '/og-image.png',
    type: 'website'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="fr">
      <body className={inter.className} style={{backgroundColor:'whitesmoke', color:'darkslateblue'}}>
        <main>
          <MyToolbar />
          <div className='mt-20 flex'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
