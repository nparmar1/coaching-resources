/*
Question:
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.
*/

const getGraph = (prerequisites) => {
    const graph = {};

    for (const prereq of prerequisites) {
        const [course, prerequisite] = prereq;

        const containsPrereq = graph.hasOwnProperty(prerequisite);
        if (!containsPrereq) graph[prerequisite] = [];

        graph[prerequisite].push(course);
    }

    console.log(graph);
    return graph;
};

const isCycle = (node, graph, visited, visiting) => {
    // Base case
    if (visiting.has(node)) {
        return true;
    }
    if (visited.has(node)) return false;

    // Process node
    visiting.add(node);

    // Recursive on neighbors
    const containsNode = graph.hasOwnProperty(node);
    if (!containsNode) {
        visiting.delete(node);
        return false;
    }

    const neighbors = graph[node];
    for (const neighbor of neighbors) {
        if (isCycle(neighbor, graph, visited, visiting)) return true;
    }

    visiting.delete(node);
    visited.add(node);
    return false;
};

const canFinish = (numCourses, prerequisites) => {
    const graph = getGraph(prerequisites);
    const visited = new Set();
    const visiting = new Set();

    for (let numCourse = 0; numCourse < numCourses; numCourse++) {
        if (visited.has(numCourse)) continue;
        if (isCycle(numCourse, graph, visited, visiting)) return false;
    }

    return true;
};

// let numCourses = 2;
// let prerequisites = [[1, 0]];

// console.log(`Your answer: ${canFinish(numCourses, prerequisites)}`);
// console.log(`Correct answer: ${true}`);

numCourses = 2;
prerequisites = [
    [1, 0],
    [0, 1],
];

console.log(`Your answer: ${canFinish(numCourses, prerequisites)}`);
console.log(`Correct answer: ${false}`);
