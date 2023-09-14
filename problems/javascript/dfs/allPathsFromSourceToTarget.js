/*
Question:
Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, 
find all possible paths from node 0 to node n - 1 and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit from node i 
(i.e., there is a directed edge from node i to node graph[i][j]).
*/

// [0, 4], [0, 3, 4] [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]

const START_NODE = 0;

const getPathsFromStartToTarget = (graph, currentNode, targetNode) => {
    // Base case
    if (currentNode === targetNode) return [[currentNode]];

    // Process node
    const allPathsFromNodeToTarget = [];

    // Recursive case
    const children = graph[currentNode];
    for (const child of children) {
        const childToTargetPath = getPathsFromStartToTarget(graph, child, targetNode);

        for (const path of childToTargetPath) {
            allPathsFromNodeToTarget.push([currentNode, ...path]);
        }
    }

    return allPathsFromNodeToTarget;
};

const getAllPathsSourceTarget = (graph) => {
    const targetNode = graph.length - 1;

    return getPathsFromStartToTarget(graph, START_NODE, targetNode);
};

const graph = [[4, 3, 1], [3, 2, 4], [3], [4], []];

console.log(`Your answer: ${getAllPathsSourceTarget(graph)}`);
console.log(
    `Correct answer: ${[
        [0, 4],
        [0, 3, 4],
        [0, 1, 3, 4],
        [0, 1, 2, 3, 4],
        [0, 1, 4],
    ]}`,
);
