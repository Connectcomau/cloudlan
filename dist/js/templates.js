this["JST"] = this["JST"] || {};

this["JST"]["lib/templates/dc_info.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"dc_info\">\n	<div class=\"content\">\n		<i class=\"fa fa-cloud\"></i> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dc)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n		<br>\n		<i class=\"fa fa-square-o\"></i> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ports)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ports\n		<br>\n		<i class=\"fa fa-square\"></i> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.connected || (depth0 && depth0.connected)),stack1 ? stack1.call(depth0, (depth0 && depth0.ports), options) : helperMissing.call(depth0, "connected", (depth0 && depth0.ports), options)))
    + " links\n	</div>\n	<div class=\"add_button\">Add a port</div>\n</div>\n";
  return buffer;
  });

this["JST"]["lib/templates/dc_list.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n	<div class=\"dc\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dc)),stack1 == null || stack1 === false ? stack1 : stack1[3])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		<div class=\"heading\"><i class=\"fa fa-cloud\"></i> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dc)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		<div class=\"dc_ports\">\n			&nbsp;\n			";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.ports), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n			";
  stack2 = helpers.unless.call(depth0, (depth0 && depth0.ports), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n		</div>\n	</div>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.connected), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<i class=\"fa fa-square port\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></i>\n				";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<i class=\"fa fa-square-o port\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"></i>\n				";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n				No ports.\n			";
  }

  buffer += "<div class=\"dc_list\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.dcs), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["JST"]["lib/templates/dc_select.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0[3])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n		";
  return buffer;
  }

  buffer += "<div class=\"dc_select\">\n	<select name=\"dc_select\" data-size=\"15\">\n		<option value=\"-1\" selected>Select a Data Centre</option>\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.dc), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</select>\n</div>\n";
  return buffer;
  });

this["JST"]["lib/templates/port_select.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n			<i class=\"fa fa-square-o\"></i> "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.selected)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.dcname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			<br>\n			";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.existing), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n				";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.speed || (depth0 && depth0.speed)),stack1 ? stack1.call(depth0, (depth0 && depth0.existing), options) : helperMissing.call(depth0, "speed", (depth0 && depth0.existing), options)))
    + " Link\n			";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n				<div class=\"btn-toolbar\">\n					<div class=\"btn-group\">\n						<div class=\"btn btn-primary link_ports\" data-speed=\"100\">100M</div>\n						<div class=\"btn btn-primary link_ports\" data-speed=\"1000\">1G</div>\n						<div class=\"btn btn-primary link_ports\" data-speed=\"10000\">10G</div>\n					</div>\n				</div>\n			";
  }

function program6(depth0,data) {
  
  
  return "\n			Select a port to connect to\n		";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.existing), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<div class=\"remove_link\" data-port=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.selected)),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Remove Link</div>\n		";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n			<div class=\"add_link\">Select speed to Link</div>\n		";
  }

  buffer += "<div class=\"port_select\">\n	<div class=\"content\">\n		<i class=\"fa fa-square-o\"></i> "
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.selected)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.dcname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " \n		<br>\n		";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.selected)),stack1 == null || stack1 === false ? stack1 : stack1[1]), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n	</div>\n	";
  stack2 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.selected)),stack1 == null || stack1 === false ? stack1 : stack1[1]), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["JST"]["lib/templates/test.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"entry\">\n	<h1>";
  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.title); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h1>\n	<div class=\"body\">\n		";
  if (stack1 = helpers.body) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.body); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n	</div>\n</div>\n";
  return buffer;
  });