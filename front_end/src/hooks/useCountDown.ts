import { useEffect, useState } from "react";

const convertCountDownValues = (countDown: number) => {
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};


const useCountDown = (fromDate: string, toDate: string) => {
    const toDateMilliSeconds = new Date(toDate).getTime()
    // CountDown Interval
    const [countDown, setCountDown] = useState(
        toDateMilliSeconds - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(toDateMilliSeconds - new Date().getTime())
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [toDateMilliSeconds])

    return [...convertCountDownValues(countDown), countDown]
}

export default useCountDown