import { IDirectedGraph } from "./Graph";
/**
 *
 * @interface IResult
 */
export interface IResult {
    distance: number;
    path: string[];
}
/**
 * Implementation of the Dijkstra algorithm.
 * Dijkstra"s algorithm is an algorithm for finding the shortest paths between nodes in a graph.
 *
 * @export
 * @class Dijkstra
 * @ref https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 *
 */
export default class Dijkstra {
    private readonly graph;
    constructor(graph: IDirectedGraph);
    /**
     * Resolve the algorithm from a sourceNode to a targetNode
     *
     * @param {string} sourceNode
     * @param {string} targetNode
     * @returns {IResult}
     * @memberof Dijkstra
     */
    resolve(sourceNode: string, targetNode: string): IResult;
    /**
     * Compute the lowest distance from the remaing nodes in Q set
     */
    private lowestDistanceNode;
}
