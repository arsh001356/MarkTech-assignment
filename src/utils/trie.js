/**
 * Trie Node class for implementing efficient search
 */
class TrieNode {
    constructor() {
        this.children = {};
        this.users = [];
        this.isEndOfWord = false;
    }
}

/**
 * Trie data structure for efficient prefix-based search
 */
export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Insert a user into the trie based on name
     * @param {Object} user - User object with name property
     */
    insert(user) {
        // Convert user name to lowercase for case-insensitive search
        const word = user.name.toLowerCase();
        let current = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];

            // Add user to the current node's users array
            if (!current.users.some(u => u.id === user.id)) {
                current.users.push(user);
            }
        }
        current.isEndOfWord = true;
    }

    /**
     * Build the trie with an array of users
     * @param {Array} users - Array of user objects
     */
    buildTrie(users) {
        users.forEach(user => {
            this.insert(user);
        });
    }

    /**
     * Search for users by prefix
     * @param {string} prefix - The prefix to search for
     * @returns {Array} - Array of user objects matching the prefix
     */
    search(prefix) {
        prefix = prefix.toLowerCase();
        let current = this.root;

        // Navigate to the node representing the last character of the prefix
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!current.children[char]) {
                return []; // Prefix not found
            }
            current = current.children[char];
        }

        // Return users associated with the current node
        return current.users;
    }
} 