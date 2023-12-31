import Image from "next/image"


export const StoryHeader = () => {
    return (
        <header className="story-header">
            <img className="story-icon" src="/miracleIconRus.png" alt="miracle" />
            <img className="story-icon" src="/miracleIconEng.png" alt="miracle" />
        </header>
    )
}