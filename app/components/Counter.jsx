
import localFont from 'next/font/local'

const Circe = localFont({ src: '../fonts/circe.ttf' })


export const Counter = ({ letters, lang }) => {

    return (
        <div className={`${Circe.className} counter`}>{lang === 'rus' ? `Осталось: ${300 - letters.length} букв` : `Left: ${300 - letters.length} letters`}</div>
    )
}