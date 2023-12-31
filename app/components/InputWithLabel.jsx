import localFont from 'next/font/local'

const Circe = localFont({ src: '../fonts/circe.ttf' })



export const InputWithLabel = ({ value, title, type, bigSize, onChange }) => {

    return (
        <div className="inplab">
            <label htmlFor={title}>{title}</label>
            {!bigSize ? <input className={Circe.className} maxLength={type === 'text' ? 20 : 40} onChange={(event) => onChange(event.target.value)} value={value} type={type} name={title} /> : null}
        </div>
    )
}