'use client'
import { useState } from "react"
import { RedButton } from "./RedButton"


export const LanguageChoice = ({ setChooseLang, setVision }) => {
    const [anim, setAnim] = useState('appear')
    return (
        <div className={`${anim} languages`}>
            <RedButton lang={'eng'} setChooseLang={setChooseLang} setVision={setVision} setAnim={setAnim} />
            <RedButton lang={'rus'} setChooseLang={setChooseLang} setVision={setVision} setAnim={setAnim} />
        </div>
    )
}