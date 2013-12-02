Handlebars.registerHelper('connected', function(ports) {
	var connected = 0;
	ports.forEach(function(p) {
		if (p.connected) connected++;
	});
	return connected;
});

Handlebars.registerHelper('speed', function(speed) {
	speed = Number(speed);
	if (speed < 1000) return speed + 'M';
	else return (speed / 1000) + 'G';
});

