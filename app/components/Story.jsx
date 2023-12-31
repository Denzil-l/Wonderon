import { useEffect } from "react"



export const Story = ({ story, anim }) => {

    if (anim) {
        return (
            <div className="story disappear">
                <div className="story-small-container">
                    <p className="story-text">{story.text}</p>
                </div>
                <h3 className="story-author">{story.user_name}</h3>

            </div>
        )
    } else if (story) {
        return (
            <div className="story">
                <div className="story-small-container">
                    <p className="story-text">{story.text}</p>
                </div>
                <h3 className="story-author">{story.user_name}</h3>

            </div>
        )
    }

}