import { expect } from "chai";
import { DFS } from "./DFS";
import { IDirectedGraph } from "./Graph";
import { IMap, MapUtils } from "./MapUtils";

describe("DFS", () => {
    describe("Depth mapping", () => {
        it("should compute connected nodes a simple oriented graph", () => {
            /**
             * Oriented Graph with ponderation
             * +-+        +-+         +-+         +-+
             * |0+<--5----+1+----+-4-->3+-----3--->5|
             * +++        +-+    |    +++         +^+
             *  |                |     |           |
             *  |                2     6           |
             *  |                |     |           |
             *  |         +++    |    +v+          |
             *  +----2---->2+--7-+---->4+-----1----+
             *            +-+         +-+
             */
            const graph: IDirectedGraph = {
                "0": { "2": 2 },
                "1": { "0": 1, "3": 4, "4": 2 },
                "2": { "4": 7 },
                "3": { "5": 3, "4": 6 },
                "4": { "5": 1 },
                "5": {},
            };

            const dfs = new DFS(graph);
            let connectedNodes = dfs.explore("0");
            expect(connectedNodes).to.deep.equal(["0", "2", "4", "5"]);

            connectedNodes = dfs.explore("1");
            expect(connectedNodes).to.deep.equal([ "1", "0", "2", "4", "5", "3" ] );

            connectedNodes = dfs.explore("4");
            expect(connectedNodes).to.deep.equal([  "4", "5"] );
        });
    });
});
