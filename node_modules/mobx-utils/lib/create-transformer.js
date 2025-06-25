var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { _getGlobalState, _isComputingDerivation, computed, onBecomeUnobserved, } from "mobx";
import { invariant } from "./utils";
/**
 * Creates a function that maps an object to a view.
 * The mapping is memoized.
 *
 * See the [transformer](#createtransformer-in-detail) section for more details.
 *
 * @param transformer A function which transforms instances of A into instances of B
 * @param arg2 An optional cleanup function which is called when the transformation is no longer
 * observed from a reactive context, or config options
 * @returns The memoized transformer function
 */
export function createTransformer(transformer, arg2) {
    invariant(typeof transformer === "function" && transformer.length < 2, "createTransformer expects a function that accepts one argument");
    // Memoizes: object -> reactive view that applies transformer to the object
    var views = new Map();
    var opts = getOpts(arg2);
    var debugNameGenerator = opts.debugNameGenerator, keepAlive = opts.keepAlive, onCleanup = opts.onCleanup;
    function createView(sourceObject) {
        var latestValue;
        var sourceType = typeof sourceObject;
        var prettifiedName = debugNameGenerator
            ? debugNameGenerator(sourceObject)
            : "Transformer-" + transformer.name + "-" + (sourceType === "string" || sourceType === "number" ? sourceObject : "object");
        var expr = computed(function () {
            return (latestValue = transformer(sourceObject));
        }, __assign(__assign({}, opts), { name: prettifiedName }));
        if (!keepAlive) {
            var disposer_1 = onBecomeUnobserved(expr, function () {
                views.delete(sourceObject);
                disposer_1();
                if (onCleanup)
                    onCleanup(latestValue, sourceObject);
            });
        }
        return expr;
    }
    var memoWarned = false;
    return function (object) {
        var _a;
        checkTransformableObject(object);
        var reactiveView = views.get(object);
        if (reactiveView)
            return reactiveView.get();
        if (!keepAlive && !_isComputingDerivation()) {
            if (!memoWarned &&
                ((_a = opts.requiresReaction) !== null && _a !== void 0 ? _a : _getGlobalState().computedRequiresReaction)) {
                console.warn("Invoking a transformer from outside a reactive context won't be memoized " +
                    "and is cleaned up immediately, unless keepAlive is set.");
                memoWarned = true;
            }
            var value = transformer(object);
            if (onCleanup)
                onCleanup(value, object);
            return value;
        }
        // Not in cache; create a reactive view
        reactiveView = createView(object);
        views.set(object, reactiveView);
        return reactiveView.get();
    };
}
function getOpts(opts) {
    if (typeof opts === "object") {
        return opts;
    }
    else if (typeof opts === "function") {
        return { onCleanup: opts };
    }
    else {
        return {};
    }
}
function checkTransformableObject(object) {
    var objectType = typeof object;
    if (object === null ||
        (objectType !== "object" &&
            objectType !== "function" &&
            objectType !== "string" &&
            objectType !== "number"))
        throw new Error("[mobx-utils] transform expected an object, function, string or number, got: " + String(object));
}
