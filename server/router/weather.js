const express = require('express');
const router = express.Router();
const Axios =require("axios")


const getDaysWeather = (list) => {
	let result = [];

	list.map((day, index) => {
		if (index%8 === 0){
			// console.log(day.dt_txt)
			let temp={}
			temp.temp_max=day.main.temp_max;
			temp.temp_min=day.main.temp_min;
			temp.pressure=day.main.pressure
			temp.speed=day.wind.speed 
			temp.humidity=day.main.humidity 
			temp.temp=day.main.temp
			temp.date=new Date(day.dt_txt)
			temp.weather=day.weather[0]
			result.push(temp);

		}
		
	});
	return result;
}
router.route('/').get(async(req, res) => {
	
	const lat = req.query.lat;
	const long = req.query.long;
	const APIKEY="52e635d515f603126f9f17a31554fc92"
    // console.log("helloo")

	// Get weather from lat and long
	const {data}=await Axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${APIKEY}`)
		// .then(response => response.json())
	
	console.log(data.list)
    res.send(getDaysWeather(data.list));
});

module.exports = {
	weatherRoutes:router
}