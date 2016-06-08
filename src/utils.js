

export function isFunction(object) {
    return !!(object && object.constructor && object.call && object.apply);
}


export function dasherize(what) {
    return what.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
}

// This is done in a linear time O(n) without recursion
export function flatten(array) {
    const result = [];
    if (!array.length) {
        return result;
    }
    const nodes = array.slice();

    let node = nodes.pop();

    do {
        if (Array.isArray(node)) {
            nodes.push.apply(nodes, node);
        } else {
            result.push(node);
        }
    } while (nodes.length && (node = nodes.pop()) !== undefined);

    result.reverse();
    return result;
}
