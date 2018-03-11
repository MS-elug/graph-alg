import { IDirectedGraph } from "./Graph";
/**
 * Implementation of the Depth-first search algorithm.
 * Depth-first search (DFS) is an algorithm for traversing or
 * searching tree or graph data structures.
 * One starts at the root (selecting some arbitrary node as the root in the case of a graph)
 * and explores as far as possible along each branch before backtracking.
 *
 * It is commonly used to solve maze
 *
 * @export
 * @class DFS
 * @ref https://en.wikipedia.org/wiki/Depth-first_search
 *
 */
export default class DFS {
    private readonly graph;
    constructor(graph: IDirectedGraph);
    /**
     *
     *
     * @param {string} rootNode
     * @returns {string[]}
     * @memberof DFS
     */
    explore(rootNode: string): string[];
    /**
     *
     *
     * @private
     * @param {string} node
     * @param {number} itrNumber
     * @param {string[]} connectedNodes
     * @memberof DFS
     *
     * @todo implements:
     * - Detecting cycle in a graph
     * - Path Finding
     * - Topological Sorting
     * - To test if a graph is bipartite
     * - Finding Strongly Connected Component
     * - Solving puzzles with only one solution
     * * https://www.geeksforgeeks.org/applications-of-depth-first-search/
     */
    private recursiveExplore(node, itrNumber, connectedNodes);
}
