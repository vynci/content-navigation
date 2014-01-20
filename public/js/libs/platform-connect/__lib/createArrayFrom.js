define( 'createArrayFrom', function ( require ) {

    var ES5 = require( 'ES5' );


    function g(i) {
        return ( !! i && (typeof i == 'object' || typeof i == 'function') && ('length' in i) && !('setInterval' in i) && (typeof i.nodeType != 'number') && (ES5('Array', 'isArray', false, i) || ('callee' in i) || ('item' in i)));
    }

    function h(i) {
        if (!g(i)) return [i];
        if (i.item) {
            var j = i.length,
                k = new Array(j);
            while (j--) k[j] = i[j];
            return k;
        }
        return Array.prototype.slice.call(i);
    }
    return h;
});