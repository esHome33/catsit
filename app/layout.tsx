"use client";

import { AppBar, Avatar, Container, IconButton, Toolbar, Typography, Button } from '@mui/material'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple Catsitter WebApp',
  description: 'Webapp for cat sitters and cat owners',
  icons: "/favicon.ico",
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
  const router = useRouter();
  const goto = (where: string) => {
    router.push(where);
  };
  return (
    <html lang="fr">
      <body className={inter.className  }>
        <main>
          <AppBar>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => goto("/")}
                >
                  <Avatar alt="Menu" src="/logo.png" />
                </IconButton>
                <Button
                  sx={{ mr: 2, backgroundColor:"green",color:"white" }}
                  onClick={() => goto("catsitter")}
                >
                  <Typography>CatSitter</Typography>
                </Button>
                <Button
                  sx={{ mr: 2, backgroundColor: "blue", color: "white" }}
                  onClick={() => goto("owner")}
                >
                  <Typography>Proprietaire</Typography>
                </Button>
              </Toolbar>
            </Container>
          </AppBar>
          <div className='mt-20 flex'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
