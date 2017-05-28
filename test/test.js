'use strict'

var finder = require('..')
var test = require('tape')
var ndarray = require('ndarray')



test('baseline', function (t) {
    t.ok(finder, 'lib exists')

    t.throws(function () {
        finder(new ndarray([], [5]), [0], [0])
    }, 'throw on bad shape')

    t.throws(function () {
        finder(new ndarray([], [5, 5]), [0], [0, 0])
    }, 'throw on bad node size')

    t.throws(function () {
        finder(new ndarray([], [5, 5]), [0, 0], [0])
    }, 'throw on bad node size')

    t.doesNotThrow(function () {
        finder(new ndarray([], [5, 5]), [0, 0], [0, 0])
    }, 'runs on legal inputs')

    var arr = ndarray(new Int8Array(9), [3, 3])

    t.end()
})


test('sanity', function (t) {
    var path, arr

    arr = new ndarray(new Int8Array(9), [3, 3])
    arr.set(1, 1, 1000)
    t.doesNotThrow(function () {
        path = finder(arr, [0, 0], [2, 2])
    }, 'runs in 2D')
    t.ok(path.length > 0, 'returns path in 2d')
    t.ok(path.length === 5, 'sane path in 2d')
    t.ok(arrEquals(path[0], [0, 0]), 'sane path in 2d')
    t.ok(arrEquals(path[4], [2, 2]), 'sane path in 2d')
    t.ok(!arrEquals(path[2], [1, 1]), 'sane path in 2d')

    arr = new ndarray(new Int8Array(27), [3, 3, 3])
    arr.set(1, 1, 1, 1000)
    t.doesNotThrow(function () {
        path = finder(arr, [0, 0, 0], [2, 2, 2])
    }, 'runs in 3D')
    t.ok(path.length > 0, 'returns path in 3d')
    t.ok(path.length === 7, 'sane path in 3d')
    t.ok(arrEquals(path[0], [0, 0, 0]), 'sane path in 3d')
    t.ok(arrEquals(path[6], [2, 2, 2]), 'sane path in 3d')
    t.ok(!arrEquals(path[3], [1, 1, 1]), 'sane path in 3d')

    t.end()
})




test('correctness', function (t) {

    var arr = new ndarray(new Int8Array(9), [3, 3])
    //   0 2 0
    //   0 0 2
    //   2 0 0
    arr.set(1, 0, 2)
    arr.set(2, 1, 2)
    arr.set(0, 2, 2)
    var path = finder(arr, [0, 0], [2, 2])

    t.ok(path.length > 0, 'returns path in 2d')
    t.ok(path.length === 5, 'correct path in 2d')
    t.ok(arrEquals(path[0], [0, 0]), 'correct path in 2d')
    t.ok(arrEquals(path[1], [0, 1]), 'correct path in 2d')
    t.ok(arrEquals(path[2], [1, 1]), 'correct path in 2d')
    t.ok(arrEquals(path[3], [1, 2]), 'correct path in 2d')
    t.ok(arrEquals(path[4], [2, 2]), 'correct path in 2d')

    t.end()
})



test('prefer diagonal option', function (t) {
    var arr = new ndarray([
        0, 0, 0, 0, 
        0, 0, 0, 0, 
        0, 0, 0, 0, 
        0, 0, 0, 0, 
    ], [4, 4])
    var path = finder(arr, [0, 0], [3, 3], true)
    t.ok(path.length === 7, 'diagonal option worked')
    t.ok(arrEquals(path[2], [1, 1]), 'diagonal path correct')
    t.ok(arrEquals(path[4], [2, 2]), 'diagonal path correct')
    t.end()
})


test('cost function option', function (t) {
    var arr = new ndarray([
        0, 0, 5, 0, 
        0, 0, 0, 0, 
        0, 0, 0, 0, 
        0, 0, 6, 0, 
    ], [4, 4])
    var costFn = function (value) {
        if (value === 0) return 10
        if (value === 6) return 1
        if (value === 5) return 1
        return 100
    }
    var path = finder(arr, [0, 0], [3, 3], true, costFn)
    t.ok(path.length === 7, 'custom cost worked')
    t.ok(arrEquals(path[2], [0, 2]), 'custom cost correct')
    t.ok(arrEquals(path[5], [3, 2]), 'custom cost correct')
    t.end()
})



function arrEquals(a, b) {
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
    return true
}




