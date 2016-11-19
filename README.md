# ndarray-pathfinder

A* pathfinding through an [ndarray](https://github.com/scijs/ndarray) of cost values.

### Installation:

```shell
npm install --save ndarray-pathfinder
```

### Usage:

```js
var finder = require('ndarray-pathfinder')

// array through which to pathfinding
var arr = new ndarray(new Float32Array(25), [5, 5])

// barriers
arr.set(1, 1, 100)
arr.set(2, 1, 100)
arr.set(3, 1, 100)

// start/end nodes
var start = [0, 0]
var goal = [3, 3]

// returns path as array of nodes
var path = finder(arr, start, goal)
console.log(path)
// [ [0,0], [0,1], ...
```

### Notes:

 * Orthogonal (l1) moves only for now
 * Cost of each move is assumed to be 1 + the ndarray value at the destination
 * Should work in any dimension (2D or above)

### By:

Andy Hall. MIT license.
