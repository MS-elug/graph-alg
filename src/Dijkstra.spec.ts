import { expect } from "chai";
import Dijkstra from "./Dijkstra";
import {IDirectedGraph} from "./Graph";
import { IMap, MapUtils } from "./MapUtils";

describe("Dijkstra", () => {
    describe("Graph distance", () => {
        it("should compute smallest path for a simple graph with ponderated value", () => {
            // https://hackernoon.com/how-to-implement-dijkstras-algorithm-in-javascript-abdfd1702d04
            /**
             * Oriented Graph with ponderation
             * +-+        +-+         +-+         +-+
             * |0+---5---->1+----+-4-->3+-----3--->5|
             * +++        +^+    |    +++         +^+
             *  |          |     |     |           |
             *  |          8     2     6           |
             *  |          |     |     |           |
             *  |         +++    |    +v+          |
             *  +----2---->2+--7-+---->4+-----1----+
             *            +-+         +-+
             */
            const graph: IDirectedGraph = {
                "0": { "1": 5, "2": 2 },
                "1": { "3": 4, "4": 2 },
                "2": { "1": 8, "4": 7 },
                "3": { "5": 3, "4": 6 },
                "4": { "5": 1 },
                "5": {},
            };

            const dijkstra = new Dijkstra(graph);
            const result = dijkstra.resolve("0", "5");

            expect(result.distance).to.equal(8);
            expect(result.path).to.deep.equal(["0", "1", "4", "5"]);
        });

    });

    describe("Shortest path in map", () => {
        /**
         * S is the starting point, E is the Exit and X are walls
         */
        const map: IMap = [
            ["S", " ", " ", " ", " ", " "],
            ["X", "X", "X", "X", " ", " "],
            [" ", " ", " ", " ", " ", " "],
            [" ", "X", " ", "X", "X", " "],
            [" ", "E", " ", " ", " ", " "],
        ];

        it("should compute smallest path for a map with orthogonal moves", () => {
            const mapToGraphData = MapUtils.convertMapToGraph(map, false);

            const dijkstra = new Dijkstra(mapToGraphData.graph);
            const result = dijkstra.resolve(mapToGraphData.startingPoint, mapToGraphData.exitPoint);

            expect(result.distance).to.equal(11);
            expect(result.path).to.deep.equal(["0:0", "1:0", "2:0", "3:0", "4:0", "4:1", "4:2", "3:2", "2:2", "2:3", "2:4", "1:4"]);
        });

        it("should compute smallest path for a map with orthogonal and diagonal moves", () => {
            const mapToGraphData = MapUtils.convertMapToGraph(map, true);

            const dijkstra = new Dijkstra(mapToGraphData.graph);
            const result = dijkstra.resolve(mapToGraphData.startingPoint, mapToGraphData.exitPoint);

            expect(result.distance).to.equal(7);
            expect(result.path).to.deep.equal(["0:0", "1:0", "2:0", "3:0", "4:1", "3:2", "2:3", "1:4"]);
        });
    });
});
