import './style.scss'
import logo from "../../icons/dev.svg";
import volume from "../../icons/volume (1).png";
import mute from "../../icons/mute (1).png";
import Timer from "../Timer";
import { useRef, useState} from "react";

const Index = (props) => {


    const [data, setData] = useState({
        soundImg: volume,
        countDisplay: '',
        disabled:false
    })
    const [hour, setHour] = useState("00")
    const [minute, setMinute] = useState("00")
    const [second, setSecond] = useState("00")

    console.log(data.disabled)

    const onStartClicked = () => {
        if (hour > 0 || minute > 0 || second > 0) {
            data.countDisplay = 'none'
            data.disabled=true
            setData({...data, countDisplay: data.countDisplay})
            setData({...data,disabled:data.disabled})
            console.log(data.disabled )

        }
    }


    const onSoundClicked = () => {
        setData({...data, soundImg: data.soundImg === volume ? mute : volume})
    }

    const onClearClicked = () => {
        const hourId = document.getElementById('hour')
        const minuteId = document.getElementById('minute')
        const secondId = document.getElementById('second')

        hourId.value = ''
        minuteId.value = ''
        secondId.value = ''
        data.disabled=false
        setData({...data,disabled:data.disabled})
        data.countDisplay = ''
        setData({...data, countDisplay: data.countDisplay})
        setHour('00')
        setMinute('00')
        setSecond('00')

    }

    const sec=useRef()
    return (
        <div className={'wrapper'}>
            <div className="left">
                <div className={'imgBox'}>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div className="buttonBox">
                        <button disabled={data.disabled} onClick={onStartClicked}>Start</button>
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
                                   const addedHour = new Date()
                                   addedHour.setHours((+e.target.value+new Date().getHours()))
                                   setHour(addedHour.getHours())
                                   setHour(addedHour.getHours())
                               }} min={'0'} placeholder={'Hour'} max={'23'} id={'hour'}/>
                    </div>
                    <div className="inputBox" style={{display: data.countDisplay}}>
                        <input type="number"
                               onChange={(e) => {
                                   const value = e.target.value
                                   if (value > 59) {
                                       e.target.value = 59
                                   }
                                   const addedMinute = new Date()
                                   console.log(typeof +e.target.value)
                                   addedMinute.setMinutes((+e.target.value + new Date().getMinutes()))
                                   setMinute(addedMinute.getMinutes())
                               }} min={'0'} placeholder={'Minute'} max={'59'} id={'minute'}/>
                    </div>

                    <div className="inputBox" style={{display: data.countDisplay}}>
                        <input type="number" ref={sec}
                               onChange={(e) => {
                                   const value = e.target.value
                                   if (value > 59) {
                                       e.target.value = 59
                                   }
                                   const addedSecond = new Date()
                                   addedSecond.setSeconds((+e.target.value + new Date().getSeconds()))
                                   setSecond(addedSecond.getSeconds())
                               }} min={'0'} placeholder={'Second'} max={'59'} id={'second'}/>
                    </div>
                    <div className="countBox">
                        <Timer soundImg={data.soundImg} disabled={data.disabled} display={data.disabled ? '' : 'none'}
                               getHour={hour==='00'?new Date().getHours():hour}
                               getMinute={minute==='00'?new Date().getMinutes():minute}
                               getSecond={second==='00'?new Date().getSeconds():second}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
