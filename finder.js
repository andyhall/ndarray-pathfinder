'use strict'

var Finder = require('abstract-pathfinder')

module.exports = findPath


/*
 *  Entry point - check inputs and pass to implementation 
*/

function findPath(arr, start, goal, preferDiagonal, costFcn) {
    var dims = arr.shape.length
    if (dims < 2) throw 'Cannot pathfind in fewer than two dimensions'
    if (start.length !== dims) throw 'Start vector must have same dimensions as ndarray'
    if (goal.length !== dims) throw 'Goal vector must have same dimensions as ndarray'
    // could do more here but meh.
    var diag = !!preferDiagonal
    var cfn = costFcn || defaultCostFcn
    return finder_impl(arr, dims, arr.shape, start, goal, diag, cfn)
}


function defaultCostFcn(value) {
    if (value < 0) return -1
    return +value + 1
}


function finder_impl(arr, dims, shape, start, goal, diagonal, costFcn) {
    // set up abstract solver
    var finder = new Finder()

    finder.nodeToPrimitive = function (a) {
        return arr.index.apply(arr, a)
    }

    finder.getMovementCost = function (a, b) {
        var val = arr.get.apply(arr, b)
        return costFcn(val)
    }

    function heuristic(a, b) {
        var manhattan = 0
        for (var i = 0; i < dims; i++) {
            manhattan += Math.abs(a[i] - b[i])
        }
        return manhattan
    }

    function heuristicDiagonal(a, b) {
        var scale = 1
        var manhattan = 0, crow = 0
        for (var i = 0; i < dims; i++) {
            var dx = a[i] - b[i]
            manhattan += Math.abs(dx)
            crow += dx * dx
            scale *= shape[i]
        }
        crow = Math.sqrt(crow)
        return manhattan + crow / scale
    }

    finder.getHeuristic = diagonal ? heuristicDiagonal : heuristic

    finder.getNeighbors = function (a) {
        var ret = []
        for (var i = 0; i < dims; i++) {
            if (a[i] > 0) {
                var b = a.slice()
                b[i]--
                ret.push(b)
            }
            if (a[i] < shape[i] - 1) {
                var c = a.slice()
                c[i]++
                ret.push(c)
            }
        }
        return ret
    }

    return finder.findPath(start, goal)
}



