# ndarray-pathfinder

A* pathfinding through an [ndarray](https://github.com/scijs/ndarray) of cost values

### Installation:

```shell
npm install --save ndarray-pathfinder
```

### Usage:

```js
var finder = require('ndarray-pathfinder')

// array through which to pathfinding
var arr = new ndarray([], [5, 5])

// values in array are assumed to be path costs
arr.set(1, 1, 1000)
arr.set(2, 1, 1000)
arr.set(3, 1, 1000)

// start/end nodes
var start = [0, 0]
var goal = [3, 3]

// returns path as array of nodes
var path = finder(arr, start, goal)
console.log(path)
// [ [0,0], [0,1], ...
```

### By:

Andy Hall. MIT license.
