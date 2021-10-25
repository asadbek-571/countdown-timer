import {useEffect, useRef, useState} from "react";
import volume from "../icons/volume (1).png";
import './style.css'
import useSound from "use-sound";
import audio from "../audio/Squid Game OST - Pink Soldiers_[mp3mob.net].mp3";

const Timer = (props) => {

    const [hour, setHour] = useState("00")
    const [minute, setMinute] = useState("00")
    const [second, setSecond] = useState("00")

    let interval = useRef()

    const startTime = () => {
        const countdownDate = new Date((new Date().getMonth() + 1) + ' ' + (new Date().getDate()) + ', 2021 ' + props.getHour + ':' + props.getMinute + ':' + props.getSecond).getTime()

        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = countdownDate - now
            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(distance % (1000 * 60) / 1000)
            if (distance < 0) {
                clearInterval(interval.current)
            } else {
                setHour(hours > 9 ? hours : '0' + hours)
                setMinute(minutes > 9 ? minutes : '0' + minutes)
                setSecond((seconds > 9 ? seconds : '0' + seconds))
            }
        }, 1000)
    }


    useEffect(() => {
        startTime(props)
        return () => {
            clearInterval(interval.current)
        }
    })

    let interval2 = setInterval(() => {

        if (props.soundImg === volume) {
            if (props.disabled) {
                console.log(props.second)
                console.log(props.hour)
                if (hour === '00' && minute === '00' && second === '00') {
                    playActive()
                    clearInterval(interval2)
                }
            }
        }
    }, 1000);

    const [playActive] = useSound(
        props.soundImg === volume?audio:'',
        {volume: 0.25}
    );
    return (
        <div>
            <h1 style={{display: props.display}}>{hour}:{minute}:{second}</h1>
        </div>
    )
}
export default Timer