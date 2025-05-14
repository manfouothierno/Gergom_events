import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {getHeaderServiceMenuItems} from "@/lib/services";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Gergom Events | Expert Matériel Événementiel en PACA',
    description: 'Location et installation de matériel événementiel pour les professionnels, institutions et particuliers en région PACA. Sonorisation, éclairage, vidéo, structures et animations.',
}

export default async function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const headerServiceMenuItems = await getHeaderServiceMenuItems();
    console.log(headerServiceMenuItems);
    return (
        <html lang="fr">
            <body className={inter.className}>
                <Header serviceMenuItems={headerServiceMenuItems} />
                    <main>{children}</main>
                <Footer />
            </body>
        </html>
    )
}