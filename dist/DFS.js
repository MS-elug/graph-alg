"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class DFS {
    constructor(graph) {
        this.graph = graph;
        if (!graph) {
            throw new Error("Class cannot instantiate without graph data");
        }
        if (Object.keys(this.graph).length === 0) {
            throw new Error("No graph data available");
        }
    }
    /**
     *
     *
     * @param {string} rootNode
     * @returns {string[]}
     * @memberof DFS
     */
    explore(rootNode) {
        const connectedNodes = [];
        this.recursiveExplore(rootNode, 0, connectedNodes);
        return connectedNodes;
    }
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
    recursiveExplore(node, itrNumber, connectedNodes) {
        connectedNodes.push(node);
        const adjacentNodes = Object.keys(this.graph[node]);
        adjacentNodes.forEach((adjacentNode) => {
            if (connectedNodes.indexOf(adjacentNode) === -1) {
                this.recursiveExplore.call(this, adjacentNode, itrNumber + 1, connectedNodes);
            }
        });
    }
}
exports.default = DFS;
//# sourceMappingURL=DFS.js.map