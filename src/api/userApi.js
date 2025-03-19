/**
 * API endpoint for fetching users
 */
const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Fetch users from the API
 * @returns {Promise<Array>} - Promise that resolves to an array of user objects
 */
export const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}; 