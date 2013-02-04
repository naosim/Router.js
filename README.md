Router.js
=========

Routing Micro Framework event based without dependencies

Usage:

```javascript
Router.init([
  {controller: 'test', route: '/test/:name/:surname'},
  {controller: 'home', route: ''}
]);

document.addEventListener('RouteChanged', function(event) {
	console.log(event.controller, event.params);
}

```

Follow the example, with url '#/test/Alberto/Sarullo' the event will incapsulate two parameters:

```javascript
event.controller will be: 'test'
event.params will be: {
  'name':    'Alberto', 
  'surname': 'Sarullo'
 }
```
