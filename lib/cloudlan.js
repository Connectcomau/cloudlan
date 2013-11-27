var template = require('./template');

function setup() {
	L.Icon.Default.imagePath = 'dist/css/images/';
	window.dc = require('./data_centres');

	var map = L.map('map').setView([-28.78691808542021,132.20947265625], 5);
	L.tileLayer('http://{s}.tile.cloudmade.com/165f18ece0fa479bbef53adf88b7a9fc/114373/256/{z}/{x}/{y}.png', {
		attribution: 'OpenStreetMap &amp; CloudMade',
		maxZoom: 18
	}).addTo(map);	
	console.log('loaded');
	window.map = map;
	
	Object.keys(window.dc).forEach(function(k) {
		var ll = window.dc[k][1].split(' ').reverse();
		var icon = L.divIcon({className: 'fa fa-3x fa-building-o'});
		L.marker(ll, {icon: icon}).addTo(map);

		//L.geoJson(window.dc[k][2]).addTo(map);
	});

	$(document.body).append(
		template('dc_list')({ dc: Object.keys(window.dc).map(function(k){ return window.dc[k]; }) })
	);

	$('.dc_list .dc').click(function(e) {
		var id = $(e.target).data('id');
		var ll = window.dc[id][1].split(' ').reverse();
		map.setView(ll, 16);
	});

	map.on('viewreset', function(e) {
		console.log('view reset');
	});

}

module.exports = {
	go_go: function() {
		$(document).ready(setup);
	}
};

