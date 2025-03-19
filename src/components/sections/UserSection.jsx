import { useInView } from 'react-intersection-observer';
import { useUserSearch } from '../../hooks/useUserSearch';
import { useState } from 'react';

const UserCard = ({ user }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.company.name}</p>
                </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user.email}
                </p>
                <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {user.phone}
                </p>
                <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {user.website}
                </p>
            </div>
        </div>
    );
};

const UserSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { filteredUsers, searchTerm, setSearchTerm, loading, error } = useUserSearch(300);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    // Calculate pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Handle pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of user section
        document.getElementById('user-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section id="user-section" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Clients</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Trusted by businesses worldwide. Search through our client list to see who we've worked with.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search clients by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Loading and Error States */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600">Loading clients...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12">
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg inline-block">
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                {/* User Grid */}
                {!loading && !error && (
                    <>
                        <div
                            ref={ref}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user, index) => (
                                    <div
                                        key={user.id}
                                        className={`transition-all duration-700 ease-out transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <UserCard user={user} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-12">
                                    <p className="text-gray-600">No clients found matching your search.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredUsers.length > usersPerPage && (
                            <div className="flex justify-center mt-12">
                                <nav className="inline-flex rounded-md shadow">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 text-sm font-medium rounded-l-md ${currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                            } border border-gray-300`}
                                    >
                                        Previous
                                    </button>

                                    {[...Array(totalPages).keys()].map((number) => (
                                        <button
                                            key={number + 1}
                                            onClick={() => paginate(number + 1)}
                                            className={`px-4 py-2 text-sm font-medium ${currentPage === number + 1
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                                } border border-gray-300 border-l-0`}
                                        >
                                            {number + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 text-sm font-medium rounded-r-md ${currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                            } border border-gray-300 border-l-0`}
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default UserSection; 