"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapUtils {
    /**
     * Create a connected graph from the map
     * @param map
     *
     * values of map:
     *  - S means Starting point
     *  - E means Exit point
     *  - X means there is a wall
     *
     * Coordinate system:
     * 0,0 --->Xmax,0
     *  |
     * 0,Ymax
     *
     * Example:
     *
     *
     *   | 1 | 2 | 3 | 4 | 5 | 6
     * --------------------------
     * 1 | S |   |   |   |   |
     * --------------------------
     * 2 | X | X | X | X |   |
     * --------------------------
     * 3 |   |   |   |   |   |
     * --------------------------
     * 4 |   | X |   |   | X | X
     * --------------------------
     * 5 | E |   |   |   |   |
     * --------------------------
     */
    static convertMapToGraph(map, allowDiagonalMove) {
        const height = map.length;
        const width = map[0].length;
        const graph = {};
        let startingPoint = null;
        let exitPoint = null;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const mapValue = map[y][x];
                const fromNodeName = MapUtils.generateNodeName(x, y);
                // Test if the map value is either a starting or ending point
                if (!startingPoint && mapValue === "S") {
                    startingPoint = fromNodeName;
                }
                else if (!exitPoint && mapValue === "E") {
                    exitPoint = fromNodeName;
                }
                // If the map value is navigable, compute graph value
                if (mapValue === " " || mapValue === "S" || mapValue === "E") {
                    graph[fromNodeName] = {};
                    // Generate a list of allowed moved
                    let nav = [{ x: x, y: y - 1 }, { x: x - 1, y: y }, { x: x + 1, y: y }, { x: x, y: y + 1 }];
                    // Add diagonal move if enabled
                    if (allowDiagonalMove) {
                        nav = nav.concat([{ x: x - 1, y: y - 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y - 1 }, { x: x + 1, y: y + 1 }]);
                    }
                    nav.forEach((coord) => {
                        if (coord.x >= 0 && coord.x < width && coord.y >= 0 && coord.y < height) {
                            const navToNode = map[coord.y][coord.x];
                            if (navToNode !== "X") {
                                const toNodeName = MapUtils.generateNodeName(coord.x, coord.y);
                                graph[fromNodeName][toNodeName] = 1;
                            }
                        }
                    });
                }
            }
        }
        return {
            exitPoint: exitPoint,
            graph: graph,
            startingPoint: startingPoint,
        };
    }
    static generateNodeName(x, y) {
        return `${x}:${y}`;
    }
}
exports.MapUtils = MapUtils;
//# sourceMappingURL=MapUtils.js.map