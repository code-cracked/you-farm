const express = require('express');
const router = express.Router();
const fetch = require('fetch');
//import {fetch} from "node-fetch";

const getDaysWeather = (list) => {
	let result = [];
	list.map((day, index) => {
		if (index%8 === 0)
		result.push(day.weather.main);
	});
	return result;
}
router.route('/').get((req, res) => {
	// Get lat and long from body
	const lat = req.query.lat;
	const long = req.query.long;

    // console.log("helloo")

	// Get weather from lat and long
	fetch.fetchUrl(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=52e635d515f603126f9f17a31554fc92&cnt=40`,(error,meta,body) => {res.json(JSON.parse(body.toString()).list)})
		// .then(response => response.json())
		// .then(data => {
		// 	res.json(getDaysWeather(data.list))
		// })

    // res.send("hello");
});

module.exports = {
	weatherRoutes:router
}