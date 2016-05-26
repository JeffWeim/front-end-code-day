/**
 * Dynamit Code Day Dribbble Feed
 * @author ?
 */

// Dribbble API info
const API_ENDPOINT = 'https://api.dribbble.com/v1/shots/';

// API token provided in-person
const API_TOKEN = '?&access_token=ecd14a026fc90619e066e99d7b3d998017895c3f21e2ad5788d379a61db37591';

// DOM nodes
const DOM = {

	// main container
	mainContainer: document.querySelector('[role="main"]'),

	// button to hook click event into
	button: document.querySelector('#load-shots'),

	// container for the templated HTML
	feedContainer: document.querySelector('#dribbble-feed')

};


/**
 * Return a templated feed.
 * Handlebars is already included (via webpack handlebars-loader); just pass data through.
 * @param {object} data Context for template
 * @return {string} Templated HTML
 */
function templateFeed(data) {

	// import the template
	// note: if you update the template, you must recompile (hit save on main.js) to see changes
	const template = require('../../templates/components/feed');

	// template using data; return a string of HTML
	return template({ items: data });

}

function processData(data) {
	let feedTemplate = null;
	let event = new Event('feed:TemplateProcessed');
	let feedContainer = DOM.feedContainer;

	feedTemplate = templateFeed(data);

	feedContainer.innerHTML = feedTemplate;

	document.dispatchEvent(event);
}

function getData() {
	$.ajax({
		method: 'GET',
		url: API_ENDPOINT + API_TOKEN,
		dataType: 'json'
	})

	.done(processData);
}

function updateView() {
	let searchButton = DOM.button;

	searchButton.classList.add('hide');
}


function eventListeners() {
	let button = DOM.button;

	button.addEventListener('click', getData);
	document.addEventListener('feed:TemplateProcessed', updateView);
}

eventListeners();
