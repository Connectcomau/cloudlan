var template = require('./template');
require('./helpers');
var render, unselect_dc, select_dc, select_port, select_ports, gen_id, add_port, set_selections, link_ports, unlink_port;

var ports = [
	{ id: '00001', dc: '66', connected: { id: '00002', speed: 1000 } },
	{ id: '00002', dc: '459', connected: { id: '00001', speed: 1000 } },
	{ id: '00003', dc: '66', connected: null },
	{ id: '00004', dc: '66', connected: null },
	{ id: '00005', dc: '459', connected: null },
	{ id: '00006', dc: '459', connected: { id: '00008', speed: 10000 } },
	{ id: '00007', dc: '459', connected: null },
	{ id: '00008', dc: '1175', connected: { id: '00006', speed: 10000 } }
];

var selected_dc = '66';
var selected_ports = [];
var existing_link = false;

var mouseover_port = function(e) {
	var id = $(e.target).data('id');
	var port = select_port(id);
	if (port.connected) {
		$('.dc_list .port[data-id="' + id + '"]').addClass('highlight');
		$('.dc_list .port[data-id="' + port.connected.id + '"]').addClass('highlight');
	}
};

var mouseleave_port = function(e) {
	$('.dc_list .port').removeClass('highlight');
};

function render() {
	$('.dc_list').remove();
	$('.dc_info').remove();
	$('.port_select').remove();

	//generate a dc list based on ports
	var dcs = {};
	ports.forEach(function(p) { dcs[p.dc] = true; });

	var dc_list = Object.keys(dcs).map(function(d) { 
		return { 
			dc: window.dc[d], 
			ports: select_ports(d, ports) 
		};
	});

	$(document.body).append(
		template('dc_list')({ dcs: dc_list })
	);

	$('.dc_list .port').hover(mouseover_port, mouseleave_port);
	$('.dc_list .port').click(function(e) {
		var id = $(e.target).data('id');
		var port = select_port(id);
		existing_link = false;
		if (port.connected) {
			selected_ports.length = 0;
			existing_link = port.connected.speed;
			set_selections(null, port.connected.id);
		}
		set_selections(null, port.id);
	});

	$('.dc_list .dc .heading').click(function(e) {
		var id = $(e.target).closest('.dc').data('id');
		if (id) {
			set_selections(id, null);
		}
	});

	if (selected_dc) select_dc(selected_dc);

	if (selected_ports.length) {
		$(document.body).append(
			template('port_select')({selected: selected_ports, existing: existing_link})
		);

		$('.port_select .remove_link').click(function(e) {
			var port = $(e.target).data('port');
			unlink_port(port);
		});

		$('.port_select .link_ports').click(function(e) {
			var speed = Number($(e.target).data('speed'));
			link_ports(speed);
		});
	}

}

function unselect_dc() {
	$('.dc_select select').val(-1);
	selected_dc = null;
	render();
}

function unlink_port(port) {
	console.log('unlink', port);
	var p1 = select_port(port);
	var p2 = null;
	if (p1 && p1.connected) p2 = select_port(p1.connected.id);
	if (p1 && p2) {
		p1.connected = null;
		p2.connected = null;
	}
	else {
		console.error('port connections seem broken', p1, p2);
	}

	set_selections(null, null);
}

function link_ports(speed) {
	var p1, p2;

	if (selected_ports.length === 2) {
		p1 = select_port(selected_ports[0].id);
		p2 = select_port(selected_ports[1].id);
	}

	if (p1 && p2) {
		p1.connected = { id: p2.id, speed: speed };
		p2.connected = { id: p1.id, speed: speed };
	}
	else {
		console.error('trying to link broken shit', selected_ports);
	}

	set_selections(null, null);
}

function set_selections(dc, port) {
	selected_dc = dc;
	if (port && selected_ports.length > 1) selected_ports.length = 0;
	if (port && ! (selected_ports[0] && selected_ports[0].id === port)) {
		var s = {
			id: port,
			dcname: window.dc[select_port(port).dc][0]
		};
		selected_ports.push(s);
	}
	if ( ! port) {
		selected_ports.length = 0;
	}

	render();
}

function select_dc(id) {
	id = ''+id;
	if ( ! window.dc[id]) {
		console.log('no dc', id);
		return;
	}
	var ll = window.dc[id][1].split(' ').reverse();
	window.map.setView(ll, 18);

	selected_dc = id;

	var dc = {
		dc: window.dc[selected_dc],
		ports: select_ports(selected_dc, ports)
	};

	$(document.body).append(
		template('dc_info')(dc)
	);

	$('.dc_info .add_button').click({id: selected_dc}, function(e) {
		add_port(e.data.id);
		render();
	});
}

function select_port(id) {
	for (var p in ports) {
		if (ports[p].id === id) return ports[p];
	}
}

function select_ports(dc, ports) {
	var list = [];
	ports.forEach(function(p) {
		if (p.dc === dc) list.push(p);
	});
	return list;
}

function gen_id() {
	return ("00000" + (Math.random()*Math.pow(36,5) << 0).toString(36)).substr(-5);
}

function add_port(dc) {
	console.log('adding port to', window.dc[dc][0]);
	ports.push({
		id: gen_id(),
		dc: dc
	});
}

function setup() {
	L.Icon.Default.imagePath = 'dist/css/images/';
	window.dc = require('./data_centres');

	var map = L.map('map', {zoomControl: false}).setView([-28.78691808542021,132.20947265625], 5);
	L.control.zoom({position: 'topright'}).addTo(map);
	// 114373
	L.tileLayer('http://{s}.tile.cloudmade.com/165f18ece0fa479bbef53adf88b7a9fc/997/256/{z}/{x}/{y}.png', {
		attribution: 'OpenStreetMap &amp; CloudMade',
		maxZoom: 18
	}).addTo(map);	
	window.map = map;

	map.on('movestart', set_selections);
	
	Object.keys(window.dc).forEach(function(k) {
		//var ll = window.dc[k][1].split(' ').reverse();
		//var icon = L.divIcon({className: 'fa fa-3x fa-building-o'});
		//L.marker(ll, {icon: icon}).addTo(map);

		var style = function(feature) {
			return {
				color: '#3498db',
				opacity: 1,
				fillOpacity: 1
			};
		};
		var feature_bind = function(feature, layer) {
			layer.on('click', function(e) {
				set_selections(feature.dc_id);
			});
		};
		L.geoJson(window.dc[k][2], {style: style, onEachFeature: feature_bind}).addTo(map);
	});

	$(document.body).append(
		template('dc_select')({ dc: Object.keys(window.dc).map(function(k){ return window.dc[k]; }) })
	);

	$('.dc_select select').change(function(e) {
		set_selections($(e.target).val(), null);
	}).selectpicker({
		style: 'btn-inverse',
		menuStyle: 'dropdown-inverse'
	});

	render();
}

module.exports = {
	go_go: function() {
		$(document).ready(setup);
	}
};

