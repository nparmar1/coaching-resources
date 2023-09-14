/*
Question:
You have n processes forming a rooted tree structure. 
You are given two integer arrays pid and ppid, where pid[i] is the ID of the ith process 
and ppid[i] is the ID of the ith process's parent process.

Each process has only one parent process but may have multiple children processes. 
Only one process has ppid[i] = 0, which means this process has no parent process (the root of the tree).

When a process is killed, all of its children processes will also be killed.

Given an integer kill representing the ID of a process you want to kill, 
return a list of the IDs of the processes that will be killed. 
You may return the answer in any order.
*/

const NO_PARENT_PROCESS = 0;

const getGraph = (processIds, parentProcessIds) => {
    const graph = {};

    for (let i = 0; i < processIds.length; i++) {
        const parentProcessId = parentProcessIds[i];
        const processId = processIds[i];

        if (parentProcessId === NO_PARENT_PROCESS) continue;

        const containsParentProcessId = graph.hasOwnProperty(parentProcessId);
        if (!containsParentProcessId) graph[parentProcessId] = [];

        graph[parentProcessId].push(processId);
    }
    console.log(graph);
    return graph;
};

const getKilledIds = (graph, processId, killedIds) => {
    // Base case

    // Process node
    killedIds.push(processId);

    // Recursive case
    const containsNode = graph.hasOwnProperty(processId);
    if (!containsNode) return;

    const children = graph[processId];
    for (const child of children) {
        getKilledIds(graph, child, killedIds);
    }
};

const getKilledProcessIds = (processIds, parentProcessIds, killId) => {
    const graph = getGraph(processIds, parentProcessIds);

    const killedIds = [];

    getKilledIds(graph, killId, killedIds);

    return killedIds;
};

const pid = [1, 3, 10, 5];
const ppid = [3, 0, 5, 3];
const kill = 5;

console.log(`Your answer: ${getKilledProcessIds(pid, ppid, kill)}`);
console.log(`Correct answer: ${[5, 10]}`);
