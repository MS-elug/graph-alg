"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the Dijkstra algorithm.
 * Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph.
 *
 * @export
 * @class Dijkstra
 * @ref https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 *
 */
class Dijkstra {
    constructor(graph) {
        this.graph = graph;
        /**
         * Compute the lowest distance from the remaing nodes in Q set
         */
        this.lowestDistanceNode = (Q, distance) => {
            return Q.reduce((lowestNode, node) => {
                if (lowestNode === null || distance[node] < distance[lowestNode]) {
                    lowestNode = node;
                }
                return lowestNode;
            }, null);
        };
        if (!graph) {
            throw new Error('Class cannot instantiate without graph data');
        }
        if (Object.keys(this.graph).length === 0) {
            throw new Error('No graph data available');
        }
    }
    /**
     * Resolve the algorithm from a sourceNode to a targetNode
     *
     * @param {string} sourceNode
     * @param {string} targetNode
     * @returns {IResult}
     * @memberof Dijkstra
     */
    resolve(sourceNode, targetNode) {
        if (!this.graph.hasOwnProperty(sourceNode)) {
            throw new Error(`Graph do not contain sourceNode=${sourceNode}`);
        }
        if (!this.graph.hasOwnProperty(targetNode)) {
            throw new Error(`Graph do not contain targetNode=${targetNode}`);
        }
        const result = {
            distance: Number.POSITIVE_INFINITY,
            path: []
        };
        // ----------------------------
        // #1 INIT
        // Q = set all of nodes
        const Q = Object.keys(this.graph);
        // P = set of processed nodes
        const P = [];
        // Create a structure to store computed cost from the source point to other nodes
        const distance = {};
        // Create a structure to store every node predecessor
        const predecessor = {};
        Q.forEach((node) => {
            distance[node] = node === sourceNode ? 0 : Number.POSITIVE_INFINITY;
            predecessor[node] = null;
        });
        // ----------------------------
        // #2 
        // Init algo from source node
        let node = sourceNode;
        while (node) {
            // Get current distance from sourceNode
            let distanceFromSource = distance[node];
            // Get current node children
            let childrenDistanceFromCurrentNode = this.graph[node];
            // For every child node, save only the minimal distance
            for (let n in childrenDistanceFromCurrentNode) {
                let childDistanceFromSource = distanceFromSource + childrenDistanceFromCurrentNode[n];
                if (distance[n] > childDistanceFromSource) {
                    distance[n] = childDistanceFromSource;
                    predecessor[n] = node;
                }
            }
            // Remove node from Q set and put it to P
            P.push(Q.splice(Q.indexOf(node), 1)[0]);
            node = this.lowestDistanceNode(Q, distance);
        }
        //Output the distance to reach the target nod from the source node
        result.distance = distance[targetNode];
        // ----------------------------
        // #3 Compute shortest path between source and target nodes
        let optimalPath = [targetNode];
        let parent = predecessor[targetNode];
        while (parent) {
            optimalPath.push(parent);
            parent = predecessor[parent];
        }
        optimalPath.reverse();
        result.path = optimalPath;
        return result;
    }
}
exports.default = Dijkstra;
//# sourceMappingURL=Dijkstra.js.map