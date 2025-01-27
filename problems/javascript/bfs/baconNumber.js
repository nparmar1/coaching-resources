/*

actor name as input, must return actor's bacon number

actor name is min requirement to close to kevin bacon

for expamle a worked with b and b worked with KB, min input would be 2

actor will have a reltionship with one actor and vice versa


kevin bacon - carly 

kevin - fred - emma - richard


const actorGraph = {
    'Kevin Bacon': ['Carly', 'Fred', 'Isabella'],
    Carly: ['Kevin Bacon'],
    Fred: ['Kevin Bacon', 'Emma', 'Richard'],
    Emma: ['Molly', 'Justin', 'Fred'],
    Molly: ['Emma'],
    Justin: ['Emma', 'Jacob'],
    Jacob: ['Justin', 'Julia'],
    Julia: ['Jacob'],
    Richard: ['Fred', 'Olivia', 'Andrew'],
    Olivia: ['Richard', 'Ben'],
    Ben: ['Olivia'],
    Andrew: ['Richard', 'Sophia'],
    Sophia: ['Andrew'],
    Isabella: ['Edward', 'Brian', 'Alexa', 'Kevin Bacon'],
    Edward: ['Isabella'],
    Brian: ['Isabella', 'Kendall'],
    Kendall: ['Brian'],
    Alexa: ['Isabella', 'Harry', 'Diana', 'Grace'],
    Harry: ['Alexa'],
    Diana: ['Alexa'],
    Grace: ['Alexa', 'Monica'],
    Monica: ['Grace', 'Taylor'],
    Taylor: ['Monica', 'Robert'],
    Robert: ['Taylor', 'Hayley'],
    Hayley: ['Robert', 'Jessica'],
    Jessica: ['Hayley', 'Jennifer'],
    Jennifer: ['Jessica', 'Kate'],
    Kate: ['Jennifer'],
};


*/

const getActorsWhoHaveWorkedWith = (actor) => {
    if (!actorGraph.hasOwnProperty(actor)) return [];

    return actorGraph[actor];
};

const getBaconNumber = (initialActor) => {
    const queue = new Queue();
    const visited = new Set();

    visited.add(initialActor);
    queue.enqueue({ actor: initialActor, pathSofar: 0 });

    while (queue.size() > 0) {
        const { actor, pathSofar } = queue.dequeue();

        // Process node
        console.log(actor);
        const isKevin = actor === targetActor;
        if (isKevin) return pathSofar;

        const children = getActorsWhoHaveWorkedWith(actor);
        for (const child of children) {
            if (visited.has(child)) continue;

            visited.add(child);
            queue.enqueue({ actor: child, pathSofar: pathSofar + 1 });
        }
    }

    return NO_ACTOR_FOUND;
};
