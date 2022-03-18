import React from "react";




class Today extends React.Component {
    showDirection = () => {
        let degrees = this.props.weatherNow.wind.deg
        let directions = ['cевер', 'cеверо-восток', 'восток', 'юго-восток', 'юг', 'юго-Запад', 'запад', 'северо-запад'];

        degrees = degrees * 8 / 360
        degrees = Math.round(degrees)
        degrees = (degrees + 8) % 8

        return (directions[degrees])
    }

    render() {
        const url = this.props.weatherNow.weather[0].icon.slice(0, 2)
        console.log(this.props.weatherNow);
        return (
            <div className="today">
                <h1>Погода в Москве</h1>

                <div className="today__wrapper">
                    <div className="today__weather">
                        <img className="today__weather-icon" src={this.props.icons[url]} alt="Погода" />
                        <div>{this.props.weatherNow.weather[0].description}</div>
                    </div>
                    <div className="today__temperature">
                        <div>Температура сейчас: {this.props.weatherNow.main.temp}&#xb0;</div>
                        <div>Ощущается как: {this.props.weatherNow.main.feels_like}&#xb0;</div>
                    </div>
                    <div className="today__wind">
                        <div>Скорость ветра: {this.props.weatherNow.wind.speed} м/с</div>
                        <div>Направление ветра: на {this.showDirection()}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today