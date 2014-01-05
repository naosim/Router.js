Router.js
=========

Routing Micro Framework ( < 1KB minified ) without dependencies

Usage:

```javascript
Router.init([
  {controller: 'test', route: '/test/:name/:surname'},
  {controller: 'test2', route: '/test2/:name', callback: function(){/* do something */}},
  {controller: 'home', route: ''}
]).onChange(function(controller, params) {
	
});


```

Follow the example, with url '#/test/Alberto/Sarullo' the event will incapsulate two parameters:

```javascript
controller will be: 'test'
params will be: {
  'name':    'Alberto', 
  'surname': 'Sarullo'
 }
```


## License

MIT or WTFPL
