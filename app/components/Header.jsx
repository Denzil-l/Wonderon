import Image from "next/image"
import { useRouter } from "next/navigation"
import localFont from 'next/font/local'

const Circe = localFont({ src: '../fonts/circe.ttf' })

export const Header = ({ lang, setAnim, socket }) => {
    const router = useRouter()

    const Navigation = () => {
        socket.disconnect()
        setAnim('disappear')
        setTimeout(() => {
            router.push('/stories');
        }, 1000)
    }

    return (
        <header className="header">
            <button className={`${Circe.className} stories-link`} type="button" onClick={() => Navigation()}>
                {lang === 'rus' ? 'Истории' : 'Stories'}
            </button>
            <Image
                src="/story-icon.svg"
                alt="story icon"
                width={18}
                height={18}
            />
        </header>
    )
}
