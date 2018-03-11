# graph-alg
[![npm version](https://badge.fury.io/js/graph-alg.svg)](https://badge.fury.io/js/graph-alg) [![Build Status](https://travis-ci.org/MS-elug/graph-alg.svg?branch=master)](https://travis-ci.org/MS-elug/graph-alg) [![Coverage Status](https://coveralls.io/repos/github/MS-elug/graph-alg/badge.svg?branch=master)](https://coveralls.io/github/MS-elug/graph-alg?branch=master)

A Node.js module to manipulate Graph
## Installation
```sh
npm install graph-alg --save
```
## Usage
### Javascript
```javascript
const Dijkstra = require('graph-alg').Dijkstra;
```

### TypeScript
```typescript
import { Dijkstra } from 'graph-alg';
```

## Test
```sh
npm run test
```

## Graph class


### Dijkstra

***Example:***

```typescript
import { Dijkstra } from 'graph-alg';

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
// Initialize Dijkstra alg with an oriented graph
const dijkstra = new Dijkstra(graph);
// Compute the smaller path from node 0 to node 5
const result = dijkstra.resolve("0", "5");

// result.distance equals 8
// result.path equals ["0", "1", "4", "5"]

```
