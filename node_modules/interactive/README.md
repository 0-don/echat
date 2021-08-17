interactive
=============

A simple togglable interactive mode for node.js.

Start interactive mode from anywhere in your code!
Interact with your global objects and evaluate new pieces. Use arrow keys to navigate through commands you ran, even in previous sessions!

**Install**

```
npm install interactive
```

**Please note that it switches stdin to rawMode, so if you have any listeners on it, it's best to close them first.**

**Exports**

There are two functions available:

* ```start([name]);```
    * Starts interactive mode
    * If name is specified it's printed at the beginning of interactive session
* ```stop();```
    * Stops interactive mode

**Special options**

Have an complicated object you need to set up often? Bored of repeating code?

Try ```:l <filename>``` to run a code snippet from a file!
Filename can be either relative to your project root or absolute.

To quit type ```:q```

**Example usage:**

test.js
```javascript
console.log('this is output from test.js');
a = 7;
```
yourscript.js
```javascript
var interactive = require('interactive');
interactive.start('Point 1');

//Interactive mode started at: Point 1
//> a = 5
//5
//> :l test.js
//this is output from test.js
//undefined
//> a
//7
//> :q
//Interactive mode off
```


Licensed under MIT license. Copyright (c) 2014 Adam Paszke