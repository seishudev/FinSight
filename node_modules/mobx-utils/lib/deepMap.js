/**
 * @private
 */
var DeepMapEntry = /** @class */ (function () {
    function DeepMapEntry(base, args, version, versionChecker) {
        Object.defineProperty(this, "base", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: base
        });
        Object.defineProperty(this, "args", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: args
        });
        Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: version
        });
        Object.defineProperty(this, "versionChecker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: versionChecker
        });
        Object.defineProperty(this, "root", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "closest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "closestIdx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        var current = (this.closest = this.root = base);
        var i = 0;
        for (; i < this.args.length - 1; i++) {
            current = current.get(args[i]);
            if (current)
                this.closest = current;
            else
                break;
        }
        this.closestIdx = i;
    }
    Object.defineProperty(DeepMapEntry.prototype, "exists", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.assertCurrentVersion();
            var l = this.args.length;
            return this.closestIdx >= l - 1 && this.closest.has(this.args[l - 1]);
        }
    });
    Object.defineProperty(DeepMapEntry.prototype, "get", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.assertCurrentVersion();
            if (!this.exists())
                throw new Error("Entry doesn't exist");
            return this.closest.get(this.args[this.args.length - 1]);
        }
    });
    Object.defineProperty(DeepMapEntry.prototype, "set", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (value) {
            this.assertCurrentVersion();
            var l = this.args.length;
            var current = this.closest;
            // create remaining maps
            for (var i = this.closestIdx; i < l - 1; i++) {
                var m = new Map();
                current.set(this.args[i], m);
                current = m;
            }
            this.closestIdx = l - 1;
            this.closest = current;
            current.set(this.args[l - 1], value);
        }
    });
    Object.defineProperty(DeepMapEntry.prototype, "delete", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.assertCurrentVersion();
            if (!this.exists())
                throw new Error("Entry doesn't exist");
            var l = this.args.length;
            this.closest.delete(this.args[l - 1]);
            // clean up remaining maps if needed (reconstruct stack first)
            var c = this.root;
            var maps = [c];
            for (var i = 0; i < l - 1; i++) {
                c = c.get(this.args[i]);
                maps.push(c);
            }
            for (var i = maps.length - 1; i > 0; i--) {
                if (maps[i].size === 0)
                    maps[i - 1].delete(this.args[i - 1]);
            }
        }
    });
    Object.defineProperty(DeepMapEntry.prototype, "assertCurrentVersion", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            if (!this.versionChecker(this.version)) {
                throw new Error("Concurrent modification exception");
            }
        }
    });
    return DeepMapEntry;
}());
export { DeepMapEntry };
/**
 * @private
 */
var DeepMap = /** @class */ (function () {
    function DeepMap() {
        var _this = this;
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "argsLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "currentVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "checkVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function (version) {
                return _this.currentVersion === version;
            }
        });
    }
    Object.defineProperty(DeepMap.prototype, "entry", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (args) {
            if (this.argsLength === -1)
                this.argsLength = args.length;
            else if (this.argsLength !== args.length)
                throw new Error("DeepMap should be used with functions with a consistent length, expected: " + this.argsLength + ", got: " + args.length);
            if (this.currentVersion >= Number.MAX_SAFE_INTEGER) {
                // Reset version counter when it reaches max safe integer
                this.currentVersion = 0;
            }
            this.currentVersion++;
            return new DeepMapEntry(this.store, args, this.currentVersion, this.checkVersion);
        }
    });
    return DeepMap;
}());
export { DeepMap };
