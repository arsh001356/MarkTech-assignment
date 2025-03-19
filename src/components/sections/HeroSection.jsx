import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section className="relative h-screen flex items-center overflow-hidden">
            {/* Background Image with lazy loading */}
            <div className="absolute inset-0 w-full h-full bg-gray-900">
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isLoaded ? 'opacity-50' : 'opacity-0'
                        }`}
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80')"
                    }}
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-10">
                <div className="max-w-3xl">
                    <h1
                        className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-transform duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                    >
                        Innovative Tech Solutions for Your Business
                    </h1>
                    <p
                        className={`text-xl text-gray-300 mb-8 transition-transform duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                    >
                        We help businesses transform and grow with cutting-edge technology and custom solutions tailored to your needs.
                    </p>
                    <div
                        className={`flex flex-col sm:flex-row gap-4 transition-transform duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                    >
                        <Link to="/#services" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 text-center">
                            Explore Services
                        </Link>
                        <Link to="/#contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 text-center">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection; 