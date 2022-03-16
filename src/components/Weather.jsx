import React from "react";
import weather01 from 'icons/weather/01.svg'
import weather02 from 'icons/weather/02.svg'
import weather03 from 'icons/weather/03.svg'
import weather04 from 'icons/weather/04.svg'
import weather09 from 'icons/weather/09.svg'
import weather10 from 'icons/weather/10.svg'
import weather11 from 'icons/weather/11.svg'
import weather13 from 'icons/weather/13.svg'
import weather50 from 'icons/weather/50.svg'


function DayCard(props) {

    const date = new Date(props.day[0].dt * 1000).getDate()

    let minTemp = 1000
    let maxTemp = -1000

    props.day.forEach(hour => {
        if (hour.main.temp_min < minTemp) minTemp = hour.main.temp_min
        if (hour.main.temp_max > maxTemp) maxTemp = hour.main.temp_max
    })
    console.log(props.day)
    return (
        <div data-index={props.index} onClick={e => props.showDay(props.index)} className="days__card">
            <h2>Число - {date}</h2>
            <p>Максимальная температура: {Math.round(maxTemp)}</p>
            <p>Минимальная температура: {Math.round(minTemp)}</p>
        </div>
    )
}

function SingleDay(props) {

    return (
        <div>
            {props.index}
            {
                props.day.map(hour => {
                    let url = hour.weather[0].icon.slice(0,2)
                    console.log(url);
                    return <img src={props.state.icons[url]} alt=""/>
                })
            }
        </div>
    )
}

class WeatherContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            activeDay: 0,
            icons: {
                "01": weather01,
                "02": weather02,
                "03": weather03,
                "04": weather04,
                "09": weather09,
                "10": weather10,
                "11": weather11,
                "13": weather13,
                "50": weather50,
            }
        };
    }

    componentDidMount() {
        // https://api.openweathermap.org/data/2.5/weather?q=Moscow&lang=ru&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27
        const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Paris&lang=eng&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27";

        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                let obj = []

                data.list.forEach(e => {
                    obj.push(e)
                })

                this.setState({
                    list: obj
                })
            })
            .catch(err => console.log(err))
    }

    getDays = () => {

        const daysObj = {}

        this.state.list.forEach(e => {
            const date = new Date(e.dt * 1000).getDay()
            if (typeof daysObj[date] == 'undefined')
                daysObj[date] = [];

            daysObj[date].push(e);
        })

        const days = Object.keys(daysObj).map(function (key) {
            return daysObj[key];
        });
        // console.log(days);

        const sortedDays = days.sort(function (a, b) {
            return a[0].dt - b[0].dt;
        })
        // console.log(days);
        return sortedDays
    }

    showDay = (index) => {
        console.log(index);
        this.setState({ activeDay: index })
    }

    render() {
        return (
            <div className="container">
                <div className="days">
                    {
                        this.getDays().map((day, i) => {

                            return <DayCard index={i} key={i} day={day} showDay={this.showDay} state={this.state}/>
                        })
                    }
                </div>

                <div className="day">
                    {this.getDays().map((day, i) => {
                        return i === this.state.activeDay && <SingleDay index={i} key={i} day={day} state={this.state}/>
                    })}
                </div>
            </div>
        )
    }
}

export default WeatherContainer