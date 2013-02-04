Router.js
=========

Micro Routing Framework event based without dependencies

Usage:

```javascript
document.addEventListener('RouteChanged', function(e) {
	console.log(e.section, e.params);
}

Router.init([
  {controller: 'test', route: '/test/:param1/:param2'},
  {controller: 'home', route: ''}
]);
```
