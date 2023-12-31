'use client'
import Link from "next/link"
import { BigRedButton } from "./BigRedButton"
import localFont from 'next/font/local'
import Image from "next/image"
import { Header } from "./Header"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Circe = localFont({ src: '../fonts/circe.ttf' })



export const SuccessPage = ({ lang, setAnimContainer, socket }) => {
    const [anim, setAnim] = useState('appear')
    const router = useRouter()

    const Navigation = () => {
        socket.disconnect()
        setAnimContainer('disappear')
        setTimeout(() => {
            router.push('/stories');
        }, 1000)
    }


    return (
        <>
            <Header lang={lang} setAnim={setAnimContainer} socket={socket} />
            <div className={`${anim} success`}>

                <BigRedButton lang={lang} />
                <div className="small-text">
                    <h2 className={`${Circe.className} thanks`}>{lang === 'rus' ? 'Спасибо за участие!' : 'Thank you for participating!'}</h2>
                    <button className={`${Circe.className} x`} type="button" onClick={() => Navigation()}>{lang === 'rus' ? 'Читать письма' : 'Read letters!'}
                        <Image
                            className="icon"
                            src={"/Arrow.svg"}
                            alt={"/arrow"}
                            width={12}
                            height={12}
                        />
                    </button>
                </div>
            </div>
        </>
    )
}