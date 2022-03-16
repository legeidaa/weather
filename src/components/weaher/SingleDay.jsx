import React from "react";

const Hour = (props) => {
    const url = props.hour.weather[0].icon.slice(0, 2),
        timestamp = new Date(props.hour.dt * 1000)



    return (
        <div className="day__hour">
            <time className="day__hour-time">{timestamp.getHours()}:00</time>
            <img className="day__hour-icon" src={props.state.icons[url]} alt="Погода" />
            <p className="day__hour-condition"> {props.hour.weather[0].description}</p>
            <p className="day__hour-temp">{Math.round(props.hour.main.temp)}&#xb0;</p>
            
        </div>
    )
}

function SingleDay(props) {
    console.log(props.day);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        timestamp = new Date(props.day[0].dt * 1000),
        month = timestamp.getMonth(),
        date = timestamp.getDate(),
        weekDay = timestamp.getDay()
    return (
        <div className="day__wrapper">
            <div className="day__data">
                <h2 className="day__data-date">{date} {months[month]}</h2>
                <h3 className="day__data-day">{weekDays[weekDay]}</h3>
            </div>
            {
                props.day.map((hour, i) => {
                    return <Hour key={i} hour={hour} state={props.state} />
                })
            }
        </div>
    )
}

export default SingleDay