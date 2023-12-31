import Image from "next/image"

import localFont from 'next/font/local'

const CirceBold = localFont({ src: '../fonts/circe_bold.ttf' })

export const BigRedButton = ({ lang, onSubmit, disabled }) => {

    return (
        <button disabled={disabled} className={`${CirceBold.className} bigButton ${onSubmit && 'active'}`} onClick={onSubmit}>
            <h2 className={`button-text`}>{onSubmit ? (lang === 'rus' ? 'Отправить письмо ' : 'Send a letter ') : (lang = 'rus' ? 'Мы получили ваше письмо ' : 'We recieved your letter ')}</h2>
            <Image
                src={onSubmit ? "/Arrow.svg" : "/V.svg"}
                alt={onSubmit ? "/arrow" : "succses"}
                width={14}
                height={14}
            />
        </button>
    )
}