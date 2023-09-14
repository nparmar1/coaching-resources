/*
Question:
A company has n employees with a unique ID for each employee from 0 to n - 1. 
The head of the company is the one with headID.

Each employee has one direct manager given in the manager array where manager[i] 
is the direct manager of the i-th employee, manager[headID] = -1. 
Also, it is guaranteed that the subordination relationships have a tree structure.

The head of the company wants to inform all the company employees of an urgent piece of news. 
He will inform his direct subordinates, and they will inform their subordinates, 
and so on until all employees know about the urgent news.

The i-th employee needs informTime[i] minutes to inform all of his direct 
subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).

Return the number of minutes needed to inform all the employees about the urgent news.
*/

const getGraph = (numEmployees, manager) => {
    const graph = {};

    for (let employeeId = 0; employeeId < numEmployees; employeeId++) {
        graph[employeeId] = [];
    }

    for (let employeeId = 0; employeeId < numEmployees; employeeId++) {
        const managerId = manager[employeeId];

        if (managerId === -1) continue;

        graph[managerId].push(employeeId);
    }
    console.log(graph);
    return graph;
};

const getNumberOfMins = (graph, employeeId, informTime) => {
    // Base case

    // Process node
    const currentEmployeeIdTime = informTime[employeeId];
    let maxChildNumberOfMins = 0;

    // Recursive case
    const children = graph[employeeId];
    for (const child of children) {
        maxChildNumberOfMins = Math.max(
            getNumberOfMins(graph, child, informTime),
            maxChildNumberOfMins,
        );
    }

    return currentEmployeeIdTime + maxChildNumberOfMins;
};

const getNumOfMinutes = (numEmployees, headId, manager, informTime) => {
    const graph = getGraph(numEmployees, manager);

    return getNumberOfMins(graph, headId, informTime);
};

const n = 6;
const headID = 2;
const manager = [2, 2, -1, 2, 2, 2];
const informTime = [0, 0, 1, 0, 0, 0];

console.log(`Your answer: ${getNumOfMinutes(n, headID, manager, informTime)}`);
console.log(`Correct answer: ${1}`);
