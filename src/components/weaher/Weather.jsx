import React from "react";
import SingleDay from "./SingleDay";
import DayCard from "./DayCard";
import weather01 from 'icons/weather/01.svg'
import weather02 from 'icons/weather/02.svg'
import weather03 from 'icons/weather/03.svg'
import weather04 from 'icons/weather/04.svg'
import weather09 from 'icons/weather/09.svg'
import weather10 from 'icons/weather/10.svg'
import weather11 from 'icons/weather/11.svg'
import weather13 from 'icons/weather/13.svg'
import weather50 from 'icons/weather/50.svg'
import Today from "./Today";



class WeatherContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherNow: {},
            list: [],
            activeDay: 0,
            isLoading: true,
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
        const weatherNowUrl = "https://api.openweathermap.org/data/2.5/weather?q=Moscow&lang=ru&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27"
        const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Moscow&lang=ru&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27"

        Promise.all([
            fetch(weatherNowUrl).then(r => r.json()),
            fetch(weatherURL).then(r => r.json()),
        ])
            .then(data => {

                let obj = []

                data[1].list.forEach(e => {
                    obj.push(e)
                })

                this.setState({
                    weatherNow: data[0],
                    list: obj,
                    isLoading: false,
                })

                console.log(this.state);
            })

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

        const sortedDays = days.sort(function (a, b) {
            return a[0].dt - b[0].dt;
        })

        return sortedDays
    }


    showDay = (index) => {
        this.setState({ activeDay: index })
    }


    render() {
        console.log(this.state.list);
        return (
            <>
            <div className={`preloader ${this.state.isLoading ? "" : "loaded"}`}></div>
            {
                this.state.isLoading === false && <div className="container">
                <div className="days">
                    {
                        //slice ограничивает вывод на четыре дня вперед
                        this.getDays().slice(0, 5).map((day, i) => {

                            return <DayCard index={i} key={i} day={day} showDay={this.showDay} state={this.state} />
                        })
                    }
                </div>

                <div className="day">
                    { <Today weatherNow={this.state.weatherNow} icons={this.state.icons} />}

                    {this.getDays().map((day, i) => {
                        return i === this.state.activeDay && <SingleDay index={i} key={i} day={day} state={this.state} />
                    })}
                </div>
            </div>
            }
            </>
            
        )
    }
}

export default WeatherContainer