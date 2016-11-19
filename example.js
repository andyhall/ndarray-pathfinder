'use strict'

var finder = require('.')
var ndarray = require('ndarray')


// array through which to pathfinding
var size = 15
var arr = new ndarray(new Int8Array(size*size), [size, size])

// values in array are assumed to be path costs
for (var k=0; k<5; k++) arr.set(k+5, 10-k, 100)

// start/end nodes
var start = [2, 2]
var goal = [12, 13]

// returns path as array of nodes
var path = finder(arr, start, goal, true)

// print results
var res = new ndarray([], [size, size])
for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
        var val = arr.get(i, j)
        res.set(i, j, (val === 0) ? '.' : '*')
    }
}
for (var node of path) res.set(node[0], node[1], '-')

console.log('Results:')
for (var i2 = 0; i2 < size; i2++) {
    var s = ''
    for (var j2 = 0; j2 < size; j2++) {
        s += res.get(i2, j2)
    }
    console.log(s)
}


