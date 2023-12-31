'use client'

import { useEffect, useState } from "react"
import { Counter } from "./Counter"
import { InputWithLabel } from "./InputWithLabel"
import { Lines } from "./Lines"
import { BigRedButton } from "./BigRedButton"
import localFont from 'next/font/local'
import axios from "axios"


const Circe = localFont({ src: '../fonts/circe.ttf' })


export const Form = ({ lang, setVision, setAnim, socket }) => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [disabled, setDisabled] = useState(true)

    const onSubmit = async () => {
        if (name && text) {
            try {
                setDisabled(true)
                setAnim('disappear')
                setTimeout(() => {
                    setVision('success')
                }, 1000)
                socket.emit('new wish', { name, text, lang })
                const response = await axios.post(`/api/data`, { name, email, text, lang });
            } catch (error) {
                setDisabled(false)

                console.error('Error during data submission:', error);
            }
        }
    };

    useEffect(() => {
        console.log(disabled)
        if (name && text) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [name, text])

    return (
        <>
            <form action="#" className="form-container">
                <p className="welcome">{lang === 'rus' ? 'Напишите свои благодарности за 2023 год и пожелания Деду Морозу, а мы поделимся ими на нашей платформе!' : "Write your New Year's gratitude and wishes here, and let's celebrate it together!"}</p>
                <Lines />
                <InputWithLabel onChange={setName} value={name} title={lang === 'rus' ? 'Имя *' : 'Name *'} type={'text'} />
                <InputWithLabel onChange={setEmail} value={email} title={lang === 'rus' ? 'Адрес электронной почты' : 'Email'} type={'email'} />
                <InputWithLabel value={text} title={lang === 'rus' ? 'Текст Письма *' : 'Your Letter *'} type={'text'} bigSize={true} />
                <textarea maxLength={300} className={`${Circe.className} area`} onChange={(event) => setText(event.target.value)} ></textarea>
                <Counter lang={lang} letters={text} />
            </form>
            <BigRedButton disabled={disabled} onSubmit={onSubmit} lang={lang} />
        </>
    )
}