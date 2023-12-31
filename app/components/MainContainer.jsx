'use client'
import './MainContainer.css'
import { FormPage } from "./FormPage"
import { LanguageChoice } from "./LanguageChoice"
import { SuccessPage } from './SuccessPage'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
// const socket = io('http://10.0.0.4:5001')
const socket = io('https://puzzled-ritzy-achillobator.glitch.me')

export const MainContainer = () => {
    const [vision, setVision] = useState('language choice')
    const [choosenLang, setChoosenLang] = useState('')
    const [anim, setAnim] = useState('')


    return (
        <div className={`container ${choosenLang === 'rus' ? 'rus' : 'eng'} ${anim}`}>
            {vision === 'language choice' ? <LanguageChoice socket={socket} setChooseLang={setChoosenLang} setVision={setVision} /> : vision === 'form' ? <FormPage socket={socket} lang={choosenLang} setVision={setVision} setAnimContainer={setAnim} /> : <SuccessPage socket={socket} setAnimContainer={setAnim} lang={choosenLang} />}
        </div>
    )
}