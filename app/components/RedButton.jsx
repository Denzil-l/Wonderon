'use client'
export const RedButton = ({ setBackground, lang, setChooseLang, setVision, setAnim }) => {
    const onClick = () => {
        setChooseLang(lang)
        setAnim('disappear')
        setTimeout(() => {
            setVision('form')
        }, 500)
    }
    return (
        <div className="redButton" onClick={onClick}>{lang.toUpperCase()}</div>
    )
}