'use client'
import { useState } from "react"
import { Form } from "./Form"
import { Header } from "./Header"

export const FormPage = ({ lang, setVision, setAnimContainer, socket }) => {
    const [anim, setAnim] = useState('appear')

    return (
        <div className={`${anim} form-page`}>
            <Header socket={socket} lang={lang} setAnim={setAnimContainer} />
            <Form socket={socket} lang={lang} setVision={setVision} setAnim={setAnim} />
        </div>
    )
}