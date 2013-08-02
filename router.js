/*

  Router.js - by Alberto Sarullo

  https://github.com/albertosarullo/Router.js

*/

/* global location */
/* exported Router */

var Router = (function Router() {

	'use strict';

	var app,
		interval,
		callback,
		oldHash = '/Router.js',
		routes = [ {controller: 'home', route: ''} ];

	app = {
		init: function init(routesArray) {
			routes = routesArray || [];
			interval = setInterval(function checkAddressChanged() {
				// console.log(location.hash, oldHash);
				if (location.hash !== oldHash) {
					onChangeLocation(location.hash, oldHash);
					oldHash = location.hash;
				}
			}, 250);
			return app;
		},
		deinit: function deinit() {
			clearInterval(interval);
			return app;
		},
		onChange: function onChange(callbackFunction) {
			callback = callbackFunction;
			// onChangeLocation(location.hash, oldHash);
			return app;
		},
		go: function go(controller, params) {
			//callback(controller, params);

			var i,
				route,
				findedParams,
				paramsNumber,
				param,
				tempRoute;

			// todo: find route that match params, and construct url
			for (i = 0; i < routes.length; i = i + 1) {
				if (routes[i].controller === controller) {
					route = routes[i].route;
					findedParams = 0;
					paramsNumber = 0;
					for (param in params) {
						if (params.hasOwnProperty(param)) {
							paramsNumber = paramsNumber + 1;
							if (route.indexOf(':' + param) !== -1) {
								findedParams = findedParams + 1;
							}
						}
					}

					if (findedParams === paramsNumber) {
						tempRoute = route;
						for (param in params) {
							if (params.hasOwnProperty(param)) {
								tempRoute = tempRoute.replace(':' + param, params[param]);
							}
						}
						callback(controller, params);
						location.hash = tempRoute;
					}
				}
			}
		}
	};

	function onChangeLocation(hash) {

		var i,
			route,
			matcher,
			matchResult,
			routeEvent,
			j,
			names;

		for (i = 0; i < routes.length; i = i + 1) {
			route = routes[i].route;
			matcher = new RegExp(route.replace(/:[^\s/]+/g, '([\%àéèìòù\.\\w\\s+]+)'));
			if (matcher.test(hash)) {
				matchResult = hash.match(matcher);
				//routeEvent = document.createEvent("Event");
				//routeEvent.initEvent("RouteChanged", true, true);
				routeEvent = {
					params: {},
					controller: routes[i].controller
				};

				if (matchResult) {
					matchResult.shift();
					names = route.match(/:(\w+)/ig);
					for (j = 0; j < matchResult.length; j = j + 1) {
						routeEvent.params[names[j].substr(1)] = matchResult[j];
					}
				}
				// document.dispatchEvent(routeEvent);
				if (callback) {
					callback(routeEvent.controller, routeEvent.params);
				}

				break;
			}
		}
	}

	return app;
}());
