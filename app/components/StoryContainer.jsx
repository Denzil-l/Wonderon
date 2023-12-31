'use client'
import { useEffect, useState } from 'react'
import { Story } from './Story'
import './StoryContainer.css'
import axios from 'axios'
import { io } from 'socket.io-client'
// const socket = io('http://10.0.0.4:5001')
const socket = io('https://puzzled-ritzy-achillobator.glitch.me')


export const StoryContainer = () => {
    const [stories, setStories] = useState([])
    const [dataRecieved, setDataRecieved] = useState(false)
    const [newStories, setNewStories] = useState([])
    const [newStoriesData, setNewStoriesData] = useState([])

    const [storyOne, setStoryOne] = useState()
    const [storyTwo, setStoryTwo] = useState()
    const [storyThree, setStoryThree] = useState()
    const [storyFour, setStoryFour] = useState()
    const [storyOneAnim, setStoryOneAnim] = useState()
    const [storyTwoAnim, setStoryTwoAnim] = useState()
    const [storyThreeAnim, setStoryThreeAnim] = useState()
    const [storyFourAnim, setStoryFourAnim] = useState()

    const [queue, setQueue] = useState([])
    const [start, setStart] = useState(true)




    const getStories = async () => {
        const response = await axios.get('/api/data')
        const array = response.data.stories.map((item, index) => {
            let x = item
            x.index = index + 1
            return (x)
        })
        setStories(array)
        setDataRecieved(true)
    }

    const createQueue = () => {
        const array = [...stories]
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[j]
            array[j] = array[i]
            array[i] = temp
        }

        if (stories.length < 21) {
            setQueue(array)

        } else {
            console.log(array.slice(0, 20))
            setQueue(array.slice(0, 20))
        }


    }

    const updateQueue = (queue) => {
        if (queue.length > 4) {
            const array = queue.slice(4);
            let array1;
            let newQueue = [...array];
            let addStories = [];

            if (newStories.length > 0) {
                console.log(newStories.length)
                console.log(newStories)
                array1 = [...newStories];
                newQueue = [...array];
                let i = 1
                while (newQueue.length < 21 && array1.length > 0) {
                    if (!stories.some((item) => item.index === array1[0].index)) {


                        let story = array1.shift();
                        story.index = stories.length + i;
                        i++
                        newQueue.push(story);
                        addStories.push(story);
                    } else {
                        array1.shift()
                    }
                }
                console.log('array1')
                console.log(array1)
                if (addStories.length > 0) {
                    setStories((prev) => [...prev, ...addStories]);
                }
            } else {
                newQueue = [...array];
            }

            if (newQueue.length < 20) {
                let j = 20 - newQueue.length;
                j = Math.min(j, 4);

                for (let i = 0; i < j; i++) {

                    let duplicate = [...stories]
                    const newArray = duplicate.filter((item) => !newQueue.some(existingItem => existingItem.index === item.index))
                    const index = Math.floor(Math.random() * newArray.length)
                    let story = newArray[index]
                    newQueue.push(story);
                }
            }
            setQueue([...newQueue]);
        } else {
            console.log('newQueue2')
            console.log(newQueue)
            setQueue([...queue]);
        }
    };

    const storyAnimation = (story, setStory, setAnim) => {
        setAnim && setAnim('disappear')
        setTimeout(() => {
            setAnim && setAnim()
            setStory(story)
        }, 1000);
    }

    const checkNewStories = (reload) => {
        if (newStories.length > 0) {

            const array = [...newStories]
            const newQueue = [...queue]
            let addStories = []
            let i = 1
            do {
                let story = array[0]
                story.index = stories.length + i
                newQueue.push(story)
                addStories.push(story)
                array.shift()
                i++
            } while (newQueue.length < 20 && array.length > 0);
            setNewStories([...array])
            setStories((prev) => [...prev, ...addStories])
            setQueue(newQueue)
        } else if (reload) {
            setQueue([...queue])
        }
    }

    // Получение массива из Базы данных
    useEffect(() => {
        getStories()
    }, [])
    // Подписка на сокет событие
    useEffect(() => {
        socket.on('get new wish', (data) => {
            console.log('new story')
            console.log(data)
            setNewStories((prev) => [...prev, data]);
        })
        return () => (
            socket.off('get new wish')
        )
    }, [dataRecieved])
    useEffect(() => {
        if (newStories.length > 0 && queue.length < 5) {
            checkNewStories(true, newStories)
        }

    }, [newStories, queue])
    //Создание Очередни
    useEffect(() => {
        if (dataRecieved) {
            if (stories.length > 0) {
                createQueue()
            }
        }
    }, [dataRecieved])

    useEffect(() => {
        if (queue.length > 4) {

            let timeOutOne
            let timeOutTwo
            let timeOutThree
            let timeOutFour

            storyAnimation(queue[0], setStoryOne, !start && setStoryOneAnim)
            timeOutOne = setTimeout(() => {
                storyAnimation(queue[1], setStoryTwo, !start && setStoryTwoAnim)
            }, 6000)
            timeOutTwo = setTimeout(() => {
                storyAnimation(queue[2], setStoryThree, !start && setStoryThreeAnim)
            }, 12000)
            timeOutThree = setTimeout(() => {
                storyAnimation(queue[3], setStoryFour, !start && setStoryFourAnim)
            }, 18000)

            timeOutFour = setTimeout(() => {
                start && setStart(false)

                updateQueue(queue, newStoriesData)
            }, 30 * 1000);

            return () => {
                if (timeOutOne && timeOutTwo && timeOutThree) {
                    clearTimeout(timeOutOne)
                    clearTimeout(timeOutTwo)
                    clearTimeout(timeOutThree)
                    clearTimeout(timeOutFour)
                }
            }
        } else {
            setStoryOne(queue[0])
            setStoryTwo(queue[1])
            setStoryThree(queue[2])
            setStoryFour(queue[3])
        }
    }, [queue])


    useEffect(() => {

    }, 1000)
    return (
        <div className="story-container">
            <img src="/Hands.png" alt="hands" className="story-hands" />
            <Story story={storyOne} anim={storyOneAnim} />
            <Story story={storyTwo} anim={storyTwoAnim} />
            <Story story={storyThree} anim={storyThreeAnim} />
            <Story story={storyFour} anim={storyFourAnim} />
            <img src="/qr.png" alt="qrcode" className="story-qr" />
        </div>
    )
}