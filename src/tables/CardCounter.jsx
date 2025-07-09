import React, { useState, useEffect } from 'react'

export default function CardCounter({ fecha, hora }) {

    const startDate = new Date(`${fecha.split('/')[1]}/${fecha.split('/')[0]}/${fecha.split('/')[2]} ${hora}`);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    useEffect(() => {
        const interval = setInterval(() => {
            let current = new Date();
            let diff = Math.abs(current - startDate);
            setDays(Math.floor((diff / 1000/ 86400)));
            setHours(Math.floor((diff / 1000/ 3600) % 24));
            setMinutes(Math.floor((diff / 1000 / 60) % 60));
            setSeconds(Math.floor((diff / 1000) % 60));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {(days > 0) && `${days.toString()}d`} {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </>
    )
}