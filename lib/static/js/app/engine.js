var adjacencyList = [];
var accuracy = 0.8;

/**
 * In our board representation, d20 is index 0 with the index increasing first from the double ring in towards bull, then clockwise around the board.
 * For example, t2 = 2, d1 = 4, and d18 = 8.
 * We store the offsets to make conversions from real targets to the board representation easier.
 */
var offsets = [1, 8, 10, 3, 19, 5, 12, 14, 17, 6, 15, 18, 4, 16, 7, 13, 9, 2, 11, 0];

/**
 * Store the relative sizes of segment areas in relation to an outer single.
 * @type {{double: number, outerSingle: number, treble: number, innerSingle: number, bull: number, double: number}}
 */
var relativeSegmentSizes = {
    'double' : 0.22,
    'outerSingle' : 1,
    'treble' : 0.14,
    'innerSingle' : 0.64,
    'bull' : 0.29,
    'doubleBull' : 0.06
};

/**
 * Enumerate board representation movement for convenience and readability.
 * @type {{OUTER: number, OUTER_RIGHT: number, RIGHT: number, INNER_RIGHT: number, INNER: number, INNER_LEFT: number, LEFT: number, OUTER_LEFT: number}}
 */
var board = {
    'OUTER' : -1,
    'OUTER_RIGHT' : 3,
    'RIGHT' : 4,
    'INNER_RIGHT' : 5,
    'INNER' : 1,
    'INNER_LEFT' : -3,
    'LEFT' : -4,
    'OUTER_LEFT' : -5
};

/**
 * Converts the board id to the index of the board representation.
 *
 * @param id Expecting id with the pattern of tX, osX, dX, isX, Outer, or Bull.
 * @returns {number} the index of the area in the board representation
 */
var convertIdToIndex = function(id){
    var number;
    var offset;

    if (id.charAt(0) === 'd') {
        number = id.substr(1);
        offset = offsets[number - 1];
        return offset * 4;
    } else if (id.charAt(0) === 'o') {
        number = id.substr(2);
        offset = offsets[number - 1];
        return offset * 4 + 1;
    } else if (id.charAt(0) === 't') {
        number = id.substr(1);
        offset = offsets[number - 1];
        return offset * 4 + 2;
    } else if (id.charAt(0) === 'i') {
        number = id.substr(2);
        offset = offsets[number - 1];
        return offset * 4 + 3;
    } else if (id === 'Outer') {
        return 80;
    } else if (id === 'Bull') {
        return 81;
    } else {
        return 82;
    }
};

/**
 * Converts the board representation index to the SVG id
 * @param index The index of the board representation
 * @returns {string} The SVG id
 */
var convertIndexToId = function(index){
    if (index === 82) {
        return 'Outside';
    } else if (index === 81) {
        return 'Bull';
    } else if (index === 80) {
        return 'Outer';
    } else if (index % 4 === 0) {
        return 'd' + (_.indexOf(offsets, index / 4) + 1);
    } else if (index % 4 === 1) {
        return 'os' + (_.indexOf(offsets, (index - 1) / 4) + 1);
    } else if (index % 4 === 2) {
        return 't' + (_.indexOf(offsets, (index - 2) / 4) + 1);
    } else if (index % 4 === 3) {
        return 'is' + (_.indexOf(offsets, (index - 3) / 4) + 1);
    }
};

/**
 * Returns the segment type of the board representation index.
 * @param index
 * @returns {string} The segment type
 */
var convertIndexToType = function(index){
    if (index === 82) {
        return 'outside';
    } else if (index === 81) {
        return 'bull';
    } else if (index === 80) {
        return 'doubleBull';
    } else if (index % 4 === 0) {
        return 'double';
    } else if (index % 4 === 1) {
        return 'outerSingle';
    } else if (index % 4 === 2) {
        return 'treble';
    } else if (index % 4 === 3) {
        return 'innerSingle';
    }
};

/**
 * Helper function to return a random float in [min, max)
 * @param min The floor of the range
 * @param max The ceiling (exclusive) of the range
 * @returns {float} The random float result
 */
var rand = function(min, max){
    return Math.random() * (max - min) + min;
};

/**
 * Compute a hit using the internal representation of the board
 * @param index The index of the hit target
 * @param exclusion An array of indices that should be excluded from the search
 * @return {number} The index of the hit result
 */
var computeHit = function(index, exclusion){
    // Calculate the target accuracy using the relative segment sizes.
    var segment = convertIndexToType(index);
    var targetAccuracy = (((1 - relativeSegmentSizes[segment]) * accuracy) + relativeSegmentSizes[segment]) * accuracy;

    if (Math.random() <= 0.01 && index > 0 && index < 80 && _.isUndefined(exclusion)) { // 1% shank percentage on the first shot of hitting the roughly opposite side of the board
        var lowerBound = (index + 26) % 80;
        var upperBound = (index + 52) % 80;

        return _.random(lowerBound, upperBound);
    } else if ((Math.random() <= targetAccuracy) || (index === 82)) { // If we are accurate or we are aiming outside we hit what we are aiming for
        return index;
    } else {
        // Create exclusion array if it is not yet defined and add index to list if it is
        if (_.isUndefined(exclusion)) {
            exclusion = [index];
        } else {
            exclusion.push(index);
        }

        // Get pairs from the adjacency list that are not in the exclusion list
        var pairs = _.reject(adjacencyList[index], function(element){
            return _.contains(exclusion, element[0]);
        });

        // Calculate the sum of the pair probabilities
        var pairSum = _.reduce(pairs, function(memo, element){
            return memo + element[1];
        }, 0);

        // Get random value between 0 and the sum of pair probabilities
        var testWeight = rand(0, pairSum);

        // Counter that we will increment with each pairs probability
        var testSum = 0;

        for (var i = 0; i < pairs.length; i++) {
            // Add the pair probability to the counter
            testSum += pairs[i][1];

            // If the test weight is in the current range then recursively call computeHit and repeat
            if (testWeight <= testSum) {
                return computeHit(pairs[i][0], exclusion);
            }
        }
    }
};

/**
 * Returns a hit using the SVG representation of a target
 * @param target The SVG ID of the hit target
 * @returns {string} The SVG id of hte hit result
 *
 * Talk shit
 */
var getHit = function(id){
    var index = convertIdToIndex(id);
    index = computeHit(index);

    return convertIndexToId(index);
};

/**
 * Custom mod function so we can properly calculate mod with negative numbers allowing us to do proper mod subtraction.
 */
var mod = function(x, y){
    return ((x % y) + y) % y;
};

/**
 * Simulates throwing 100 darts in a row at the target to see the engine results.
 * Results of test are logged to console as object where keys are computed results and values are # times hit.
 * @param _accuracy The base accuracy probability
 * @param _id The target (uses SVG ID)
 */
var testAccuracy = function(_accuracy, _id){
    accuracy = _accuracy;

    console.log('target', _id, 'accuracy', _accuracy);

    var results = [];
    for (var i = 0; i < 100; i++) {
        results.push(getHit(_id));
    }

    results = _.chain(results)
        .groupBy(function(element){
            return element;
        })
        .mapObject(function(element){
            return element.length;
        })
        .value();

    console.log(results);
};

/**
 * Initializes the adjacency list representation. Every value contains array pairs with the first entry being the index of another vertex and the second entry being the edge probability.
 */
var initializeAdjacencyList = function(){
    for (var i = 0; i < 80; i++) {
        switch (i % 4) {
            case 0: // Double
                adjacencyList[i] = [
                    [mod((i + board.INNER), 80), 1 / 5],
                    [mod((i + board.RIGHT), 80), 4 / 35],
                    [mod((i + board.INNER_RIGHT), 80), 4 / 35],
                    [mod((i + board.INNER_LEFT), 80), 4 / 35],
                    [mod((i + board.LEFT), 80), 4 / 35],
                    [82, 12 / 35]
                ];

                break;
            case 1: // Outer single
                adjacencyList[i] = [
                    [mod((i + board.INNER), 80), 1 / 7],
                    [mod((i + board.OUTER_RIGHT), 80), 3 / 28],
                    [mod((i + board.RIGHT), 80), 1 / 7],
                    [mod((i + board.INNER_RIGHT), 80), 3 / 28],
                    [mod((i + board.OUTER), 80), 1 / 7],
                    [mod((i + board.INNER_LEFT), 80), 3 / 28],
                    [mod((i + board.LEFT), 80), 1 / 7],
                    [mod((i + board.OUTER_LEFT), 80), 3 / 28]
                ];

                break;
            case 2: // Treble
                adjacencyList[i] = [
                    [mod((i + board.INNER), 80), 1 / 4],
                    [mod((i + board.OUTER_RIGHT), 80), 1 / 12],
                    [mod((i + board.RIGHT), 80), 1 / 12],
                    [mod((i + board.INNER_RIGHT), 80), 1 / 12],
                    [mod((i + board.OUTER), 80), 1 / 4],
                    [mod((i + board.INNER_LEFT), 80), 1 / 12],
                    [mod((i + board.LEFT), 80), 1 / 12],
                    [mod((i + board.OUTER_LEFT), 80), 1 / 12]
                ];

                break;
            case 3: // Inner single
                adjacencyList[i] = [
                    [mod((i + board.RIGHT), 80), 1 / 4],
                    [mod((i + board.OUTER_RIGHT), 80), 1 / 8],
                    [mod((i + board.OUTER), 80), 1 / 7],
                    [mod((i + board.LEFT), 80), 1 / 4],
                    [mod((i + board.OUTER_LEFT), 80), 1 / 8],
                    [80, 3 / 28]
                ];

                break;
        }
    }

    // Bull
    adjacencyList[80] = [[81, 1 / 5]];
    for (i = 3; i < 80; i += 4) {
        adjacencyList[80].push([i, 0.8 / 20]);
    }

    // Double bull
    adjacencyList[81] = [[80, 1]];
};

module.exports = {
    'getHit' : getHit,
    'initializeAdjacencyList' : initializeAdjacencyList,
    'testAccuracy' : testAccuracy
};
