import { IDirectedGraph, IEdge } from "./Graph";

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
export class Dijkstra {

    constructor(private readonly graph: IDirectedGraph) {
        if (!graph) {
            throw new Error("Class cannot instantiate without graph data");
        }
        if (Object.keys(this.graph).length === 0) {
            throw new Error("No graph data available");
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
    public resolve(sourceNode: string, targetNode: string): IResult {

        if (!this.graph.hasOwnProperty(sourceNode)) {
            throw new Error(`Graph do not contain sourceNode=${sourceNode}`);
        }
        if (!this.graph.hasOwnProperty(targetNode)) {
            throw new Error(`Graph do not contain targetNode=${targetNode}`);
        }

        const result: IResult = {
            distance: Number.POSITIVE_INFINITY,
            path: [],
        };

        // ----------------------------
        // #1 INIT

        // Q = set all of nodes
        const Q = Object.keys(this.graph);
        // P = set of processed nodes
        const P: string[] = [];

        // Create a structure to store computed cost from the source point to other nodes
        const totalCostToNode: { [node: string]: number } = {};
        // Create a structure to store every node predecessor
        const predecessor: { [node: string]: string | null } = {};
        Q.forEach((node) => {
            totalCostToNode[node] = node === sourceNode ? 0 : Number.POSITIVE_INFINITY;
            predecessor[node] = null;
        });

        // ----------------------------
        // #2
        // Init algo from source node
        let currentNode: string | null = sourceNode;
        while (currentNode) {
            // Get current distance from sourceNode
            const costFromSource = totalCostToNode[currentNode];
            // Get current node children
            const adjacentNodes = this.graph[currentNode];
            // For every child node, save only the minimal distance
            for (const adjacentNode in adjacentNodes) {
                if (!adjacentNodes.hasOwnProperty(adjacentNode)) {
                    continue;
                }
                const edge = adjacentNodes[adjacentNode];
                const cost = typeof edge === "number" ? edge : (edge as IEdge).cost;
                const adjacentNodeCostFromSource = costFromSource + cost;
                if (totalCostToNode[adjacentNode] > adjacentNodeCostFromSource) {
                    totalCostToNode[adjacentNode] = adjacentNodeCostFromSource;
                    predecessor[adjacentNode] = currentNode;
                }
            }
            // Remove node from Q set and put it to P
            P.push(Q.splice(Q.indexOf(currentNode), 1)[0]);
            currentNode = this.lowestDistanceNode(Q, totalCostToNode);
        }
        // Output the distance to reach the target nod from the source node
        result.distance = totalCostToNode[targetNode];

        // ----------------------------
        // #3 Compute shortest path between source and target nodes
        const optimalPath = [targetNode];
        let parent = predecessor[targetNode];
        while (parent) {
            optimalPath.push(parent);
            parent = predecessor[parent];
        }
        optimalPath.reverse();
        result.path = optimalPath;

        return result;
    }

    /**
     * Compute the lowest distance from the remaing nodes in Q set
     */
    private lowestDistanceNode = (Q: string[], distance: { [node: string]: number }) => {
        return Q.reduce((lowestNode: string | null, node) => {
            if (lowestNode === null) {
                lowestNode = node;
            }
            if (distance[node] < distance[lowestNode]) {
                lowestNode = node;
            }
            return lowestNode;
        }, null);
    }
}
