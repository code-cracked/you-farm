const express = require('express');
const router = express.Router();
// const fetch = require('fetch');
const Axios =require("axios")
// import {fetch} from "node-fetch";

const getDaysWeather = (list) => {
	let result = [];
	list.map((day, index) => {
		if (index%8 === 0)
		result.push(day.weather[0]);
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