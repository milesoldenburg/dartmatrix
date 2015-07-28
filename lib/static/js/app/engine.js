var adjacencyList = [];
var accuracy = 0.8;

/**
 * In our board representation, 20 is index 0 with the index increasing clockwise around the board.
 * We store the offsets to make conversions from real targets to the board representation easier.
 */
var offsets = [1, 8, 10, 3, 19, 5, 12, 14, 17, 6, 15, 18, 4, 16, 7, 13, 9, 2, 11, 0];

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
        return 'd' + index / 4;
    } else if (index % 4 === 1) {
        return 'os' + (index - 1) / 4;
    } else if (index % 4 === 2) {
        return 't' + (index - 2) / 4;
    } else if (index % 4 === 3) {
        return 'is' + (index - 3) / 4;
    }
};

// Talk shit
var getHit = function(target){
    if (Math.random() <= accuracy) {
        return target;
    } else {
        var index = convertIdToIndex(target);

        // TODO: Look up edges and traverse one depending on probability
    }
};

/**
 * Custom mod function so we can properly calculate mod with negative numbers allowing us to do proper mod subtraction.
 */
var mod = function(x, y){
    return ((x % y) + y) % y;
};

/**
 * Initializes the adjacency list representation. Every value contains array pairs with the first entry being the index of another vertex and the second entry being the edge probability.
 */
var initializeAdjacencyList = function(){
    for (var i = 0; i < 80; i++) {
        switch (i % 4) {
            case 0: // Double
                adjacencyList[i] = [
                    [mod((i + 1), 80), 1 / 5],
                    [mod((i + 4), 80), 4 / 35],
                    [mod((i + 5), 80), 4 / 35],
                    [mod((i + -3), 80), 4 / 35],
                    [mod((i + -4), 80), 4 / 35],
                    [82, 12 / 35]
                ];

                break;
            case 1: // Outer single
                adjacencyList[i] = [
                    [mod((i + 1), 80), 1 / 7],
                    [mod((i + 3), 80), 3 / 28],
                    [mod((i + 4), 80), 1 / 7],
                    [mod((i + 5), 80), 3 / 28],
                    [mod((i + -1), 80), 1 / 7],
                    [mod((i + -3), 80), 3 / 28],
                    [mod((i + -4), 80), 1 / 7],
                    [mod((i + -5), 80), 3 / 28]
                ];

                break;
            case 2: // Treble
                adjacencyList[i] = [
                    [mod((i + 1), 80), 1 / 4],
                    [mod((i + 3), 80), 1 / 12],
                    [mod((i + 4), 80), 1 / 12],
                    [mod((i + 5), 80), 1 / 12],
                    [mod((i + -1), 80), 1 / 4],
                    [mod((i + -3), 80), 1 / 12],
                    [mod((i + -4), 80), 1 / 12],
                    [mod((i + -5), 80), 1 / 12]
                ];

                break;
            case 3: // Inner single
                adjacencyList[i] = [
                    [mod((i + 4), 80), 1 / 4],
                    [mod((i + 3), 80), 1 / 8],
                    [mod((i + -1), 80), 1 / 7],
                    [mod((i + -4), 80), 1 / 4],
                    [mod((i + -5), 80), 1 / 8],
                    [80, 3 / 28]
                ];

                break;
        }
    }

    // Bull
    adjacencyList[80] = [81, 1 / 5];
    for (i = 3; i < 80; i += 4) {
        adjacencyList[80].push([i, 0.8 / 20]);
    }

    // Double bull
    adjacencyList[81] = [80, 1];
};

module.exports = {
    'getHit' : getHit,
    'initializeAdjacencyList' : initializeAdjacencyList
};
