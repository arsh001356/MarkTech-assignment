import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ContactSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        submitted: false,
        loading: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validation
        if (!formState.name || !formState.email || !formState.message) {
            setFormState((prev) => ({
                ...prev,
                error: 'Please fill out all required fields.'
            }));
            return;
        }

        // Simulate form submission
        setFormState((prev) => ({ ...prev, loading: true, error: null }));

        // Simulate API call delay
        setTimeout(() => {
            setFormState({
                name: '',
                email: '',
                company: '',
                message: '',
                submitted: true,
                loading: false,
                error: null
            });
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div
                    ref={ref}
                    className={`max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-1000 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-8 lg:p-12 bg-blue-600 text-white">
                            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                            <p className="mb-6">
                                Have a project in mind or questions about our services? Fill out the form and our team will get back to you promptly.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-xl mb-1">Address</h3>
                                        <p>123 Tech Street, Silicon Valley, CA, USA</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-xl mb-1">Email</h3>
                                        <p>info@marktech.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-xl mb-1">Phone</h3>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 lg:p-12">
                            {formState.submitted ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600">
                                        Thank you for reaching out. We'll get back to you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>

                                    {formState.error && (
                                        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                                            {formState.error}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formState.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formState.message}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState.loading}
                                            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors duration-300 ${formState.loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                                }`}
                                        >
                                            {formState.loading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection; 