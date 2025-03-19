import { useState, useEffect, useCallback } from 'react';
import { fetchUsers } from '../api/userApi';
import { Trie } from '../utils/trie';
import { debounce } from '../utils/debounce';

/**
 * Custom hook for searching users with a Trie-based solution
 * @param {number} debounceTime - Time in ms to debounce search input
 * @returns {Object} - Object containing users, filteredUsers, searchTerm, and setSearchTerm
 */
export const useUserSearch = (debounceTime = 300) => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userTrie, setUserTrie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users on component mount
    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);

                // Initialize Trie with fetched users
                const trie = new Trie();
                trie.buildTrie(fetchedUsers);
                setUserTrie(trie);

                setFilteredUsers(fetchedUsers);
                setLoading(false);
            } catch (err) {
                setError('Failed to load users');
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((term) => {
            if (!userTrie) return;

            if (!term.trim()) {
                setFilteredUsers(users);
            } else {
                const results = userTrie.search(term);
                setFilteredUsers(results);
            }
        }, debounceTime),
        [userTrie, users]
    );

    // Handle search term changes
    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    return {
        users,
        filteredUsers,
        searchTerm,
        setSearchTerm,
        loading,
        error
    };
}; 