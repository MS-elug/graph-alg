import { expect } from 'chai';
import Dijkstra from './Dijkstra';


describe('Dijkstra', function () {
  describe('Graph distance', function () {
    it('should compute smallest path for a simple graph with ponderated value', function () {
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
      const graph = {
        '0': { '1': 5, '2': 2 },
        '1': { '3': 4, '4': 2 },
        '2': { '1': 8, '4': 7 },
        '3': { '5': 3, '4': 6 },
        '4': { '5': 1 },
        '5': {}
      };

      const dijkstra = new Dijkstra(graph);
      const result = dijkstra.resolve('0', '5');

      expect(result.distance).to.equal(8);
      expect(result.path).to.deep.equal(['0', '1', '4', '5']);
    });

  });

  describe('Shortest path in map', function () {

    /**
       * Create a connected graph from the map
       * @param map 
       * 
       * values of map: 
       *  - I means Starting point
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
       * 1 | I |   |   |   |   |   
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
    function convertMapToGraph(map, allowDiagonalMove: boolean) {
      const height = map.length;
      const width = map[0].length;

      const graph = {};
      let startingPoint = null;
      let exitPoint = null;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const mapValue = map[y][x];
          const nodeName = `${x}:${y}`;
          // Test if the map value is either a starting or ending point
          if (!startingPoint && mapValue === 'S') {
            startingPoint = nodeName;
          } else if (!exitPoint && mapValue === 'E') {
            exitPoint = nodeName;
          }

          // If the map value is navigable, compute graph value
          if (mapValue === ' ' || mapValue === 'S' || mapValue === 'E') {
            graph[nodeName] = {};

            if (y > 1) {
              let topNode = map[y - 1][x];
              if (topNode !== 'X') {
                graph[nodeName][`${x}:${y - 1}`] = 1;
              }
            }
            if (y < height - 1) {
              let bottomNode = map[y + 1][x];
              if (bottomNode !== 'X') {
                graph[nodeName][`${x}:${y + 1}`] = 1;
              }
            }

            if (x > 1) {
              let leftNode = map[y][x - 1];
              if (leftNode !== 'X') {
                graph[nodeName][`${x - 1}:${y}`] = 1;
              }
              if (allowDiagonalMove) {
                if (y > 1) {
                  let topLeftNode = map[y - 1][x - 1];
                  if (topLeftNode !== 'X') {
                    graph[nodeName][`${x - 1}:${y - 1}`] = 1;
                  }
                }
                if (y < height - 1) {
                  let bottomLeftNode = map[y + 1][x - 1];
                  if (bottomLeftNode !== 'X') {
                    graph[nodeName][`${x - 1}:${y + 1}`] = 1;
                  }
                }
              }
            }
            if (x < width - 1) {
              let rightNode = map[y][x + 1];
              if (rightNode !== 'X') {
                graph[nodeName][`${x + 1}:${y}`] = 1;
              }
              if (allowDiagonalMove) {
                if (y > 1) {
                  let topRightNode = map[y - 1][x + 1];
                  if (topRightNode !== 'X') {
                    graph[nodeName][`${x + 1}:${y - 1}`] = 1;
                  }
                }
                if (y < height - 1) {
                  let bottomRightNode = map[y + 1][x + 1];
                  if (bottomRightNode !== 'X') {
                    graph[nodeName][`${x + 1}:${y + 1}`] = 1;
                  }
                }
              }
            }
          }
        }
      }

      return {
        graph: graph,
        startingPoint: startingPoint,
        exitPoint: exitPoint
      };
    }

    const map = [
      ['S', ' ', ' ', ' ', ' ', ' '],
      ['X', 'X', 'X', 'X', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' '],
      [' ', 'X', ' ', 'X', 'X', ' '],
      [' ', 'E', ' ', ' ', ' ', ' '],
    ];

    it('should compute smallest path for a map with orthogonal moves', function () {
      const mapToGraphData = convertMapToGraph(map, false);

      const dijkstra = new Dijkstra(mapToGraphData.graph);
      const result = dijkstra.resolve(mapToGraphData.startingPoint, mapToGraphData.exitPoint);

      expect(result.distance).to.equal(11);
      expect(result.path).to.deep.equal(['0:0', '1:0', '2:0', '3:0', '4:0', '4:1', '4:2', '3:2', '2:2', '2:3', '2:4', '1:4']);
    });

    it('should compute smallest path for a map with orthogonal and diagonal moves', function () {
      const mapToGraphData = convertMapToGraph(map, true);

      const dijkstra = new Dijkstra(mapToGraphData.graph);
      const result = dijkstra.resolve(mapToGraphData.startingPoint, mapToGraphData.exitPoint);

      expect(result.distance).to.equal(7);
      expect(result.path).to.deep.equal(['0:0', '1:0', '2:0', '3:0', '4:1', '3:2', '2:3', '1:4']);
    });
  });
});