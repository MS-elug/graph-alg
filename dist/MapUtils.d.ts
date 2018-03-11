import { IDirectedGraph } from "./Graph";
/**
 * Define the type of Cell
 * - S means Starting point
 * - E means Exit point
 * - X means there is a wall
 * - empty means navigable cell
 */
export declare type IMapCell = " " | "S" | "E" | "X";
export interface IMapRow extends Array<IMapCell> {
}
export interface IMap extends Array<IMapRow> {
}
export declare class MapUtils {
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
    static convertMapToGraph(map: IMap, allowDiagonalMove: boolean): {
        exitPoint: string | null;
        graph: IDirectedGraph;
        startingPoint: string | null;
    };
    private static generateNodeName(x, y);
}
