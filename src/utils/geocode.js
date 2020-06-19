const request = require('postman-request');

const geocode = (address, cbg) => {
	const baseMbURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
	const locMb = encodeURIComponent(address);
	const apiMbKey = 'pk.eyJ1Ijoic2hpbGxvbmd0aXR1ZGUiLCJhIjoiY2tia3F6NXg2MDVqajJ1cXR2dDA0Y2VidCJ9.ha3AdI3Hr3as64vKKDcxuw';
	const urlMb = `${baseMbURL}/${locMb}.json?access_token=${apiMbKey}&limit=1`;

	request({url: urlMb, json: true}, (err, resp, {features} = {}) => {
		if (err) {
			cbg('Unable to connect to location service.');
		} else if (features.length < 1) {
			cbg('Unable to find location for the map service.');
		} else {
			cbg(undefined, {
				Location: features[0].place_name,
				Longtitude: features[0].center[0],
				Latitude: features[0].center[1],
			});
		}
	});

};

module.exports = geocode;