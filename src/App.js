
import WeekContainer from './components/WeekContainer';
import React from 'react';
import './App.css';
import Clock from './components/Clock';
import LoginControl from './components/LoginControl';
import NameForm from './components/NameForm';
import Calculator from './components/Calculator';
import FilterableProductTable from './components/Products';
import WeatherContainer from './components/weaher/Weather';


//http://studyjavascript.blogspot.com/2019/08/react-5.html

  
const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

function App() {
	return (
		<div className="App">
			{/* <WeekContainer someProps="sampletext" />
			<Clock />
			<LoginControl />
			<NameForm />
			<Calculator/>
			<FilterableProductTable products={PRODUCTS} /> */}

			<WeatherContainer/>
		</div>
	);
}

export default App;
