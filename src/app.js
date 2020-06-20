const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;


// Path Configurations
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Handlebars setup
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Static dir setup
app.use(express.static(publicDir));


app.get('', (req, res) => {
	res.render('index', {
		page: 'Home',
		title: 'Welcome to this Weather App',
		subtitle: 'The revolutionary weather app.',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		page: 'About',
		title: 'Welcome to the About page',
		subtitle: 'What is this weather app?',
		message: 'This is a simple weather app build with NodeJS. This application uses data from mapbox.com and weatherstack.com',
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		page: 'Help',
		title: 'Welcome to the Help page',
		message: 'JavaScript is bae <3',
	});
});

app.get('/weather', (req, res) => {

	if(!req.query.location) {
		return res.send({
			error: 'Please provide a location.',
		});
	}

	geocode(req.query.location, (err, {Longtitude, Latitude, Location} = {}) => {
		if (err) {
			return res.send({error: err});	
		}
		forecast(Longtitude, Latitude, (err, {Temperature, Description}) => {
			if (err) {
				return res.send({error: err});
			}
			res.send({
				Location,
				Longtitude,
				Latitude,
				Temperature,
				'Weather Condition': Description,
			});
		});

	});
});

app.get('/help/*', (req, res) => {
	res.render("default-404", {
		page: '404 - Help',
		title: "404",
		message: 'Oh no! This help article does not exist!',
	});
});

app.get('*', (req, res) => {
	res.render("default-404", {
		page: '404',
		title: "404",
		message: 'Oh no! This page does not exist!',
	});
});

app.listen(port, () =>{
	console.log(`Server is up on port ${port}.`);
});