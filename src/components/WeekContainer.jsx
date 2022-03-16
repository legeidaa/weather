import React from 'react';
import Card from './Card'
import Clock from './Clock';

const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=Kiev&lang=ru&units=metric&APPID=a9a3a62789de80865407c0452e9d1c27";

let dat = null

class WeekContainer extends React.Component {
    state = {
        days: [],
    }

    componentDidMount = () => {
        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                dat = data
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                this.setState({ days: dailyData })
                
            })
    }

    formatCards = () => {
        return this.state.days.map((day, index) => <Card day={day} key={index} />)
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
                <h5 className="display-5 text-muted">New York, US</h5>
                <div className="row justify-content-center">

                    {this.formatCards()}
                    {this.props.someProps}


                </div>
            </div>
        )
    }
}

export default WeekContainer