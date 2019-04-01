import request, { Response } from 'request'; // I hate myself everytime I type this
import sha1 from 'sha1';
require('dotenv').config();
interface WeatherUpdate {
	location: string; // i.e. "Vanderbilt University"
	weather: string; // the format specified in the README
	lat: String;
	lon: String;
	name: string | undefined; // your name - use this from process.env
}

interface DarkSky {}

interface OpenStreet {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
	icon: string;
}

interface Slack {
	sha1: string;
}

const email: String | undefined = process.env.EMAIL;
const apiKey: String | undefined = process.env.DARK_SKY_TOKEN;
const place = 'Vanderbilt University';
// remember to use process.env to get your email

const callbacks = (
	location: string,
	slackUsername: string,
	callback: (body: any) => void
): void => {
	let url = `https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${email}`;
	let lat: String = '',
		lon: String = '';
	request(
		// this is just the first call to request. You'll need multiple
		url,
		(error: Error, response: Response, body: OpenStreet[]): void => {
			if (error) {
				console.log(error);
			} else {
				lat = body[0].lat;
				lon = body[0].lon;
			}
		}
	);
	url = `https://api.darksky.net/forecast/${apiKey}/${lat},${lon}`;
	let json: DarkSky[] = [];
	request(
		url,
		(error: Error, response: Response, body: string): void => {
			if (error) {
				console.log(error);
			} else {
				json = JSON.parse(body);
			}
		}
	);
	let data: WeatherUpdate = {
		location: location,
		weather: `It's ${json.currently.summary} and it's ${json.currently.temperature} degrees.`,
		lat: lat,
		lon: lon,
		name: process.env.NAME,
	};
	url = `https://send-to-slack-nfp4cc31q.now.sh/?user=C9S0DF3BR&data=${data}`;
	let slackJson: Slack;
	request(
		url,
		(error: Error, response: Response, body: string): void => {
			if (error) {
				console.log(error);
			} else {
				slackJson = JSON.parse(body);
			}
		}
	);
	console.log(JSON.stringify(slackJson.sha1) === sha1(data);
};

// change Promise<object> to Promise<TheTypeThatYouAreMaking> for both functions
const promises = (location: string, slackUsername: string): Promise<object> => {
	// use fetch
};
export const asyncAwait = async (location: string, slackUsername: string): Promise<object> => {
	// use fetch
};

// all the console.logs should log what the send-to-slack API returns
callbacks('Vanderbilt University', 'D44FTVCHJ', body => {
	console.log(body);
}); // feel free to change the place. It'll be more interesting if everyone's not doing the same place.
promises('Vanderbilt University', 'D44FTVCHJ').then(data => console.log(data));

(async () => {
	console.log(await asyncAwait('Vanderbilt University', 'D44FTVCHJ'));
})();
