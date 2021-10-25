import './style.scss'
import logo from "../../icons/dev.svg";
import volume from "../../icons/volume (1).png";
import mute from "../../icons/mute (1).png";
import audio from "../../audio/Squid Game OST - Pink Soldiers_[mp3mob.net].mp3"
import Timer from "../Timer";
import {useRef, useState} from "react";
import useSound from "use-sound";



const Index = (props) => {

    let interval = useRef()

    const [data, setData] = useState({
        soundImg: volume,
        countDisplay: ''
    })
    let [disabled,setDisabled]=useState(false)
    const [hour, setHour] = useState("00")
    const [minute, setMinute] = useState("00")
    const [second, setSecond] = useState("00")

    const onStartClicked = () => {
        if (hour > 0 || minute > 0 || second > 0) {
            data.countDisplay = 'none'
            setData({...data, countDisplay: data.countDisplay})
            setDisabled(disabled=true)
        }
    }

    const [playActive] = useSound(
        audio,
        {volume: 0.25}
    );

    const onSoundClicked = () => {
        setData({...data, soundImg: data.soundImg === volume ? mute : volume})
    }

    const onClearClicked=()=>{
        const hourId=document.getElementById('hour')
        const minuteId=document.getElementById('minute')
        const secondId=document.getElementById('second')

        hourId.value=''
        minuteId.value=''
        secondId.value=''
        setDisabled(disabled=false)
        data.countDisplay = ''
        setData({...data, countDisplay: data.countDisplay})
        setHour('00')
        setMinute('00')
        setSecond('00')

    }

    return (
        <div className={'wrapper'}>
            <div className="left">
                <div className={'imgBox'}>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="buttonBox">
                        <button disabled={disabled} onClick={onStartClicked}>Start</button>
                        <button onClick={onSoundClicked}><img src={data.soundImg} alt="sound"/></button>
                        <button onClick={onClearClicked}>Clear</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className={'timerBox'}>
                    <div className="inputBox" style={{display: data.countDisplay}}>
                        <input type="number"
                               onChange={(e) => {
                                   const value = e.target.value
                                   if (value > 23) {
                                       e.target.value = 23
                                   }
                                   setHour( e.target.value)
                               }} min={'0'} placeholder={'Hour'} max={'23'} id={'hour'}/>
                    </div>
                    <div className="inputBox" style={{display: data.countDisplay}}>
                        <input type="number"
                               onChange={(e) => {
                                   const value = e.target.value
                                   if (value > 59) {
                                       e.target.value = 59
                                   }
                                   setMinute( e.target.value)
                               }} min={'0'} placeholder={'Minute'} max={'59'} id={'minute'}/>
                    </div>
                    <div className="inputBox" style={{display: data.countDisplay}}>
                        <input type="number"
                               onChange={(e) => {
                                   const value = e.target.value
                                   if (value > 59) {
                                       e.target.value = 59
                                   }
                                   setSecond( e.target.value)
                               }} min={'0'} placeholder={'Second'} max={'59'} id={'second'}/>
                    </div>
                    <div className="countBox">
                        <Timer soundImg={data.soundImg} disabled={disabled} display={disabled ? '' : 'none'} getHour={hour}
                               getMinute={minute} getSecond={second}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
