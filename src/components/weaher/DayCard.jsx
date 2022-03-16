import React from "react"


const majorityElement = function (nums) {
    let arr = []
    const set = new Set()

    nums.forEach((element, idx) => {
        if (set.has(element)) {
            return
        } else {
            set.add(element)
        }
        let tempArr = nums.filter(item => item === element)

        if (tempArr.length > arr.length) arr = tempArr
    });

    return arr[0]
};

//переделать все в сттейт с хуками
// вычисление средней погоды сделать одной функуцией
function DayCard(props) {

    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        weather = [],
        icons = [],
        timestamp = new Date(props.day[0].dt * 1000),
        month = timestamp.getMonth(),
        date = timestamp.getDate(),
        weekDay = timestamp.getDay()


    let minTemp = 1000
    let maxTemp = -1000

    props.day.forEach(hour => {
        if (hour.main.temp_min < minTemp) minTemp = hour.main.temp_min
        if (hour.main.temp_max > maxTemp) maxTemp = hour.main.temp_max

        weather.push(hour.weather[0].description)
        icons.push(hour.weather[0].icon)
    })

    const iconId = majorityElement(icons).slice(0, 2)


    return (
        <div className="days__card" data-index={props.index} onClick={e => props.showDay(props.index)}>
            <div className="days__card-column">
                <h2 className="days__card-date">{date} {months[month]}</h2>
                <h3 className="days__card-day">{weekDays[weekDay]}</h3>
            </div>
            <div className="days__card-column days__card-temperature">
                <div className="days__card-temperature-max">{Math.round(maxTemp)}&#xb0;</div>
                <div className="days__card-temperature-min">{Math.round(minTemp)}&#xb0;</div>
            </div>
            <div className="days__card-column days__card-column_wide">
                <img className="days__card-icon" src={props.state.icons[iconId]} alt="Погода" />
                <p className="days__card-condition">{majorityElement(weather)}</p>
            </div>
        </div>
    )
}

export default DayCard