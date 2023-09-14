/*
Question:
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. 
There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
*/

class Trie {
    constructor() {
        this.trie = {};
        this.endSymbol = '*';
    }

    insert(word) {
        let currentTrie = this.trie;

        for (const char of word) {
            const containsChar = currentTrie.hasOwnProperty(char);

            if (!containsChar) currentTrie[char] = {};
            currentTrie = currentTrie[char];
        }

        currentTrie[this.endSymbol] = true;
    }

    search(word) {
        let currentTrie = this.trie;

        for (const char of word) {
            const containsChar = currentTrie.hasOwnProperty(char);

            if (!containsChar) return false;
            currentTrie = currentTrie[char];
        }

        const containsEndSymbol = currentTrie.hasOwnProperty(this.endSymbol);

        return containsEndSymbol;
    }

    startsWith(prefix) {
        let currentTrie = this.trie;

        for (const char of prefix) {
            const containsChar = currentTrie.hasOwnProperty(char);

            if (!containsChar) return false;
            currentTrie = currentTrie[char];
        }

        return true;
    }
}
