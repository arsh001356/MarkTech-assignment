import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-blue-600">MarkTech</h1>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Home</Link>
                    <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Services</Link>
                    <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Pricing</Link>
                    <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">Contact</Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-700 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white px-4 py-2 shadow-lg">
                    <div className="flex flex-col space-y-3">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/#services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Services</Link>
                        <Link to="/#pricing" className="text-gray-700 hover:text-blue-600 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                        <Link to="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header; 