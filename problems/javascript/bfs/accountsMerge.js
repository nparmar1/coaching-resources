/*
Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, 
and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. 
Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, 
and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.
*/

const { Queue } = require('../../../utils/queue');

var accountsMerge = function (accounts) {
    let hash = {};
    let visited = new Array(accounts.length).fill(false);
    let res = [];

    accounts.forEach((a, idx) => {
        let emails = a.slice(1);

        emails.forEach((e) => {
            if (e in hash) {
                hash[e].push(idx);
            } else {
                hash[e] = [idx];
            }
        });
    });

    console.log(hash);

    for (let i = 0; i < accounts.length; i++) {
        if (visited[i]) continue;
        let queue = [i];
        let set = new Set();
        while (queue.length) {
            let idx = queue.shift();
            if (visited[idx]) continue;
            let emails = accounts[idx].slice(1);
            visited[idx] = true;
            emails.forEach((e) => {
                set.add(e);
                for (let j of hash[e]) {
                    !visited[j] && queue.push(j);
                }
            });
        }
        res.push([accounts[i][0], ...[...set].sort()]);
    }
    return res;
};

const accounts = [
    ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
    ['John', 'johnsmith@mail.com', 'john00@mail.com'],
    ['Mary', 'mary@mail.com'],
    ['John', 'johnnybravo@mail.com'],
];

console.log(`Your answer: ${accountsMerge(accounts)}`);
console.log(
    `Correct answer: ${[
        ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
        ['Mary', 'mary@mail.com'],
        ['John', 'johnnybravo@mail.com'],
    ]}`,
);
