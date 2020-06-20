const dataDiv = document.querySelector('#wData');
const loc = document.querySelector('#locationInput');

getWeather.addEventListener('submit', (e) => {

	dataDiv.innerHTML = `<h2>Loading....</h2>`;

	e.preventDefault();
	fetch(`./weather?location=${loc.value}`)
		.then((resp) => resp.json().then((data) => {
			if (data.error) {
				return dataDiv.innerHTML = `<p>${data.error}</p>`
			}
			dataDiv.innerHTML = `
				<p>The weather report for <span id="location">${data.Location}</span> is as follows:</p>
				<ul>
					<h5>Longtitude</h5>
					<p>${data.Longtitude}</p>
					<h5>Latitude</h5>
					<p>${data.Latitude}</p>
					<h5>Temperature</h5>
					<p>${data.Temperature}</p>
					<h5>Weather Condition</h5>
					<p>${data['Weather Condition']}</p>
				</ul>
			`;
		}));

});