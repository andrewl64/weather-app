const request = require('postman-request');

const forecast = (long, lat, cbf) => {
	const baseWsURL = 'http://api.weatherstack.com/current';
	const apiWsKey = 'ba36211b0daddb6f00657ccf6c6e2cdb';
	const urlWs = `${baseWsURL}?access_key=${apiWsKey}&query=${lat}, ${long}`;

	request({url: urlWs, json: true}, (err, resp, {error, location, current} = {}) => {
		if (err) {
			cbf('Unable to connect to the Weather service.');
		} else if (error) {
			cbf(`Unable to find location for the weather service.`);
		} else {
			cbf(undefined, {
				Location: `${location.name}, ${location.country}`,
				Temperature: current.temperature,
				Description: current.weather_descriptions[0],
			});
		}
	});
}

module.exports = forecast;