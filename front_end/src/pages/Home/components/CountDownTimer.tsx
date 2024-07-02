import React from 'react'
import useCountDown from '@/hooks/useCountDown'
import "./CountDownTimer.scss"

interface DateTimeDisplayProps {
    value: number
    type: string
    isDanger: boolean
}

const DateTimeDisplay = ({ value, type, isDanger }: DateTimeDisplayProps) => {
    return (
        <div className={isDanger ? "countdown-danger" : "countdown"}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

interface ShowCounterInterface {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const ShowCounter = ({ days, hours, minutes, seconds }: ShowCounterInterface) => {
    return (
        <div className="flash-sale-header">
            <img
                src="https://res.cloudinary.com/dupep1afe/image/upload/v1650097975/fb1088de81e42c4e538967ec12cb5caa_qksblh.png"
                width={150}
                className='mr-4'
            />
            <div className="show-counter">
                <a
                    href="/"
                    target="_blank"
                    className="countdown-link hover:!text-main-orange-color"
                >
                    <DateTimeDisplay
                        value={days}
                        type={"Ngày"}
                        isDanger={days <= 3}
                    />
                    <p>:</p>
                    <DateTimeDisplay value={hours} type={"Giờ"} isDanger={false} />
                    <p>:</p>
                    <DateTimeDisplay value={minutes} type={"Phút"} isDanger={false} />
                    <p>:</p>
                    <DateTimeDisplay
                        value={seconds}
                        type={"Giây"}
                        isDanger={false}
                    />
                </a>
            </div>
        </div>
    )
};

interface CountDownTimerProps {
    fromDate: string
    toDate: string
}
const CountDownTimer = ({ fromDate, toDate }: CountDownTimerProps) => {
    const [days, hours, minutes, seconds, countdown] = useCountDown(fromDate, toDate)
    const fromDateMilliSeconds = new Date(fromDate).getTime()
    const nowMilliSeconds = new Date().getTime()

    if (countdown < 0 || nowMilliSeconds < fromDateMilliSeconds) return <></>
    else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        )
    }
}

export default CountDownTimer