/**
 * Directed graph representation
 * A directed graph (or digraph) is a graph that is a set of vertices connected by edges,
 * where the edges have a direction associated with them.
 *
 * @export
 * @interface IDirectedGraph
 */
export interface IDirectedGraph {
    /**
     * List of directed link between graph nodes.
     * Map oriented edge
     */
    [fromNode: string]: {
        [toNode: string]: IEdge | number;
    };
}
/**
 * Edge is a relation between two nodes of a graph
 *
 * @export
 * @interface IEdge
 */
export interface IEdge {
    cost: number;
}
