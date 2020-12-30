var vec3_add          = assemblyscript.instance.exports["Vec3#add"];
var vec3_add2         = assemblyscript.instance.exports["Vec3#add2"];
var vec3_clone        = assemblyscript.instance.exports["Vec3#clone"];
var vec3_constructor  = assemblyscript.instance.exports["Vec3#constructor"];
var vec3_copy         = assemblyscript.instance.exports["Vec3#copy"];
var vec3_cross        = assemblyscript.instance.exports["Vec3#cross"];
var vec3_dot          = assemblyscript.instance.exports["Vec3#dot"];
var vec3_equals       = assemblyscript.instance.exports["Vec3#equals"];
var vec3_length       = assemblyscript.instance.exports["Vec3#length"];
var vec3_lengthSq     = assemblyscript.instance.exports["Vec3#lengthSq"];
var vec3_lerp         = assemblyscript.instance.exports["Vec3#lerp"];
var vec3_mul          = assemblyscript.instance.exports["Vec3#mul"];
var vec3_mul2         = assemblyscript.instance.exports["Vec3#mul2"];
var vec3_normalize    = assemblyscript.instance.exports["Vec3#normalize"];
var vec3_project      = assemblyscript.instance.exports["Vec3#project"];
var vec3_scale        = assemblyscript.instance.exports["Vec3#scale"];
var vec3_set          = assemblyscript.instance.exports["Vec3#set"];
var vec3_sub          = assemblyscript.instance.exports["Vec3#sub"];
var vec3_sub2         = assemblyscript.instance.exports["Vec3#sub2"];

/**
 * @class
 */

function Vec3(x, y, z) {
    if (x && x.length === 3) {
        this.ptr = vec3_constructor(
            0,
            x[0],
            x[1],
            x[2]
        );
    } else {
        this.ptr = vec3_constructor(
            0,
            x || 0,
            y || 0,
            z || 0
        );
    }
    this.assignDataView();
}

Vec3.wrap = function (ptr) {
    var tmp = Object.create(Vec3.prototype);
    tmp.ptr = ptr;
    tmp.assignDataView();
    return tmp;
};

Vec3.prototype.assignDataView = function () {
    // #ifdef X32
    this.arr = new Float32Array(assemblyscript.module.exports.memory.buffer, this.ptr, 3);
    // #endif

    // #ifdef X64
    this.arr = new Float64Array(assemblyscript.module.exports.memory.buffer, this.ptr, 3);
    // #endif
};

Vec3.prototype.add = function (rhs) {
    vec3_add(this.ptr, rhs.ptr);
    return this;
};

Vec3.prototype.add2 = function (lhs, rhs) {
    // WASM interop, slow:
    // vec3_add2(this.ptr, lhs.ptr, rhs.ptr);

    // Original, using getters/setters:
    // this.x = lhs.x + rhs.x;
    // this.y = lhs.y + rhs.y;
    // this.z = lhs.z + rhs.z;

    // Original, without using getters/setters:
    var arr_this = this.arr;
    var arr_lhs  = lhs.arr;
    var arr_rhs  = rhs.arr;
    arr_this[0] = arr_lhs[0] + arr_rhs[0];
    arr_this[1] = arr_lhs[1] + arr_rhs[1];
    arr_this[2] = arr_lhs[2] + arr_rhs[2];
    return this;
};

Vec3.prototype.clone = function () {
    var tmp = vec3_clone(this.ptr);
    return Vec3.wrap(tmp);
};

Vec3.prototype.copy = function (rhs) {
    vec3_copy(this.ptr, rhs.ptr);
    return this;
};

Vec3.prototype.cross = function (lhs, rhs) {
    vec3_cross(this.ptr, lhs.ptr, rhs.ptr);
    return this;
};

Vec3.prototype.dot = function (rhs) {
    //return vec3_dot(this.ptr, rhs.ptr);
    //return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
    var a = this.arr;
    var a_r = rhs.arr;
    return a[0] * a_r[0] + a[1] * a_r[1] + a[2] * a_r[2];
};

Vec3.prototype.equals = function (rhs) {
    return !!vec3_equals(this.ptr, rhs.ptr);
};

Vec3.prototype.length = function () {
    //return vec3_length(this.ptr);
    //return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    var a = this.arr;
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
};

Vec3.prototype.lengthSq = function () {
    return vec3_lengthSq(this.ptr);
};

Vec3.prototype.lerp = function (lhs, rhs, alpha) {
    vec3_lerp(this.ptr, lhs.ptr, rhs.ptr, alpha);
    return this;
};

Vec3.prototype.mul = function (rhs) {
    vec3_mul(this.ptr, rhs.ptr);
    return this;
};

Vec3.prototype.mul2 = function (lhs, rhs) {
    vec3_mul2(this.ptr, lhs.ptr, rhs.ptr);
    return this;
};

Vec3.prototype.normalize = function () {
    vec3_normalize(this.ptr);
    return this;
};

Vec3.prototype.project = function (rhs) {
    vec3_project(this.ptr, rhs.ptr);
    return this;
};

Vec3.prototype.scale = function (scalar) {
    vec3_scale(this.ptr, scalar);
    return this;
};

Vec3.prototype.set = function (x, y, z) {
    // WASM Interop:
    // vec3_set(this.ptr, x, y, z);
    // Direct access to memory as faster alternative:
    this.arr[0] = x;
    this.arr[1] = y;
    this.arr[2] = z;
    return this;
};

Vec3.prototype.sub = function (rhs) {
    vec3_sub(this.ptr, rhs.ptr);
    return this;
};

Vec3.prototype.sub2 = function (lhs, rhs) {
    // WASM Interop:
    //vec3_sub2(this.ptr, lhs.ptr, rhs.ptr);
    // Original (getters/setters)
    this.x = lhs.x - rhs.x;
    this.y = lhs.y - rhs.y;
    this.z = lhs.z - rhs.z;
    // Original, without getters/setters    
    var arr_this = this.arr;
    var arr_lhs  = lhs.arr;
    var arr_rhs  = rhs.arr;
    arr_this[0] = arr_lhs[0] - arr_rhs[0];
    arr_this[1] = arr_lhs[1] - arr_rhs[1];
    arr_this[2] = arr_lhs[2] - arr_rhs[2];
    return this;
};

Vec3.prototype.toString = function () {
    return '[' + this.x + ', ' + this.y + ', ' + this.z + ']';
};

Vec3.prototype.toStringFixed = function (n) {
    return '[' + this.x.toFixed(n) + ', ' + this.y.toFixed(n) + ', ' + this.z.toFixed(n) + ']';
};

Object.defineProperty(Vec3.prototype, 'x', {
    get: function () {
        return this.arr[0];
    },
    set: function (newValue) {
        this.arr[0] = newValue;
    }
});

Object.defineProperty(Vec3.prototype, 'y', {
    get: function () {
        return this.arr[1];
    },
    set: function (newValue) {
        this.arr[1] = newValue;
    }
});

Object.defineProperty(Vec3.prototype, 'z', {
    get: function () {
        return this.arr[2];
    },
    set: function (newValue) {
        this.arr[2] = newValue;
    }
});


/**
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.BACK
 * @description A constant vector set to [0, 0, 1].
 */
Object.defineProperty(Vec3, 'BACK', {
    get: (function () {
        var back = new Vec3(0, 0, 1);
        return function () {
            return back;
        };
    }())
});

/**
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.DOWN
 * @description A constant vector set to [0, -1, 0].
 */
Object.defineProperty(Vec3, 'DOWN', {
    get: (function () {
        var down = new Vec3(0, -1, 0);
        return function () {
            return down;
        };
    }())
});

/**
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.FORWARD
 * @description A constant vector set to [0, 0, -1].
 */
Object.defineProperty(Vec3, 'FORWARD', {
    get: (function () {
        var forward = new Vec3(0, 0, -1);
        return function () {
            return forward;
        };
    }())
});

/**
 * @field
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.LEFT
 * @description A constant vector set to [-1, 0, 0].
 */
Object.defineProperty(Vec3, 'LEFT', {
    get: (function () {
        var left = new Vec3(-1, 0, 0);
        return function () {
            return left;
        };
    }())
});

/**
 * @field
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.ONE
 * @description A constant vector set to [1, 1, 1].
 */
Object.defineProperty(Vec3, 'ONE', {
    get: (function () {
        var one = new Vec3(1, 1, 1);
        return function () {
            return one;
        };
    }())
});

/**
 * @field
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.RIGHT
 * @description A constant vector set to [1, 0, 0].
 */
Object.defineProperty(Vec3, 'RIGHT', {
    get: (function () {
        var right = new Vec3(1, 0, 0);
        return function () {
            return right;
        };
    }())
});

/**
 * @field
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.UP
 * @description A constant vector set to [0, 1, 0].
 */
Object.defineProperty(Vec3, 'UP', {
    get: (function () {
        var down = new Vec3(0, 1, 0);
        return function () {
            return down;
        };
    }())
});

/**
 * @field
 * @static
 * @readonly
 * @type Vec3
 * @name Vec3.ZERO
 * @description A constant vector set to [0, 0, 0].
 */
Object.defineProperty(Vec3, 'ZERO', {
    get: (function () {
        var zero = new Vec3(0, 0, 0);
        return function () {
            return zero;
        };
    }())
});

export { Vec3 };