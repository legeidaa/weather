import React from "react";

let arg


class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    func1 = () => {
        console.log('значение this:', this);
    }
    func2() {
        console.log('значение this:', this);
    }
    func3(arg) {
        console.log('значение this:', this);
    }


    render() {
        return (
            <div>
                <h2 onClick={this.func1}>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
                <h2 onClick={() => this.func2()}>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
                <h2 onClick={this.func3.bind(this, arg)}>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

export default Clock