import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const pricing = [
    {
        id: 1,
        name: 'Basic',
        price: 499,
        description: 'Perfect for small businesses and startups.',
        features: [
            'Responsive Website Design',
            'CMS Integration',
            'Up to 5 Pages',
            'Contact Form',
            'Basic SEO Setup',
            '3 Months Support',
        ],
        popular: false,
    },
    {
        id: 2,
        name: 'Professional',
        price: 999,
        description: 'Ideal for growing businesses with specific needs.',
        features: [
            'Everything in Basic',
            'E-commerce Functionality',
            'Up to 15 Pages',
            'Custom Design Elements',
            'Advanced SEO Setup',
            'Performance Optimization',
            '6 Months Support',
        ],
        popular: true,
    },
    {
        id: 3,
        name: 'Enterprise',
        price: 1999,
        description: 'For large businesses with complex requirements.',
        features: [
            'Everything in Professional',
            'Custom Web Application',
            'Unlimited Pages',
            'Advanced Analytics',
            'API Integration',
            'Dedicated Account Manager',
            '12 Months Support',
        ],
        popular: false,
    },
];

const PricingSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="pricing" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose the perfect plan for your business needs. No hidden fees or surprises.
                    </p>
                </div>

                <div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {pricing.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-lg overflow-hidden transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                } ${plan.popular ? 'border-2 border-blue-600 shadow-xl' : 'border border-gray-200 shadow-lg'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 mb-6">{plan.description}</p>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                                    <span className="text-gray-500 ml-2">/project</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/#contact"
                                    className={`block w-full text-center py-3 rounded-md text-lg font-medium transition-colors duration-300 ${plan.popular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">Need a custom solution? Contact us for a personalized quote.</p>
                    <Link
                        to="/#contact"
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300"
                    >
                        Contact us
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PricingSection; 