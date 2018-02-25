import { IOrientedGraph } from "./Graph";

/**
 * Define the type of Cell
 * - S means Starting point
 * - E means Exit point
 * - X means there is a wall
 * - empty means navigable cell
 */
export type IMapCell = " " | "S" | "E" | "X";
export interface IMapRow extends Array<IMapCell> { }

export interface IMap extends Array<IMapRow> { }

export class MapUtils {
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
    public static convertMapToGraph(map: IMap, allowDiagonalMove: boolean) {
        const height = map.length;
        const width = map[0].length;

        const graph: IOrientedGraph = {};
        let startingPoint: string = null;
        let exitPoint: string = null;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const mapValue = map[y][x];
                const fromNodeName = MapUtils.generateNodeName(x, y);
                // Test if the map value is either a starting or ending point
                if (!startingPoint && mapValue === "S") {
                    startingPoint = fromNodeName;
                } else if (!exitPoint && mapValue === "E") {
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

    private static generateNodeName(x: number, y: number) {
        return `${x}:${y}`;
    }
}
