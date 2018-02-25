/**
 * Orientated graph representation
 * @export
 * @interface IOrientedGraph
 */
export interface IOrientedGraph {
    /**
     * List of oriented connection between graph nodes.
     * Map oriented node connections with a cost
     */
    [fromNode: string]: {
        [toNode: string]: number;
    };
}
