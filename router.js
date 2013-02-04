/*

Router.js - by Alberto Sarullo

*/

var Router = function Router() {
	
	var interval,
		oldHash = '',
		routes = [ {controller: 'home', route: ''} ];

	function onChange(hash, oldHash) {

		var i,
			route,
			matcher,
			matchResult,
			routeEvent,
			j,
			names;

		for (i = 0; i < routes.length; i++) {
			route = routes[i].route;
			matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\%àéèìòù\\w\\s+]+)'));
			if (matcher.test(hash)) {
				matchResult = hash.match(matcher);
				routeEvent = document.createEvent("Event");
				routeEvent.initEvent("RouteChanged", true, true);
				routeEvent.params = {};
				routeEvent.controller = routes[i].controller;
				if (matchResult) {
					matchResult.shift();
					names = route.match(/:(\w+)/ig);
					for (j = 0; j < matchResult.length; j++) {
						routeEvent.params[names[j].substr(1)] = matchResult[j];
					}
				}
				document.dispatchEvent(routeEvent);
				break;
			}
		}
	}

	return {
		init: function init(routesArray) {
			routes = routesArray || [];
			interval = setInterval(function checkAddressChanged() {
				if (location.hash !== oldHash) {
					onChange(location.hash, oldHash);
					oldHash = location.hash;
				}
			}, 250);
		},
		deinit: function deinit() {
			clearInterval(interval);
		}
	};
	
}();