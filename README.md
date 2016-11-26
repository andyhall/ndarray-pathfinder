# ndarray-pathfinder

A* pathfinding through an [ndarray](https://github.com/scijs/ndarray) of cost values.

Implemented by wrapping ndarray accessors around [abstract-pathfinder](https://github.com/andyhall/abstract-pathfinder).

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

// returns path as array of n-length arrays
var path = finder(arr, start, goal)
// path: [ [0,0], [0,1], ... ]

```

### Optional arguments: 

```js
var preferDiag = true
var costFcn = function(value) {
    if (value < 0) return -1
    return 1 + value
}
var path = finder(arr, start, goal, preferDiagonal, costFcn)
```

 * `preferDiagonal` - a flag that adds a small term to the heuristic to prefer cells closer the goal
 * `costFunction` - a function to convert ndarray values to movement costs

### Notes:

 * Orthogonal (l1) moves only for now
 * Should work in any dimension (2D or above)

### By:

Andy Hall. MIT license.
