import localFont from 'next/font/local'
import './globals.css'

const CirceBold = localFont({ src: './fonts/circe_bold.ttf' })

export const metadata = {
  title: 'WonderOn!',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/christmas-tree.png" />
      </head>
      <body className={`${CirceBold.className}`}>
        <div className="wrapper">
          {children}
        </div>
      </body>
    </html>
  )
}
