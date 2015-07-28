var adjacencyList = [];

var mod = function(x, y){
    return ((x % y) + y) % y;
};

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
            case 1: // Upper single
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
            case 3: // Lower single
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
    for (i = 3; i < 80; i += 4) {
        adjacencyList[80].push([i, 0.8 / 20]);
    }

    adjacencyList[80].push([81, 1 / 5]);

    // Double bull
    adjacencyList[81] = [80, 1];
};

module.exports = {
    'initializeAdjacencyList' : initializeAdjacencyList
};
