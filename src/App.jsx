import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Services from './components/sections/ServicesSection'; // Assuming you have a Services page
import Pricing from './components/sections/PricingSection'; // Assuming you have a Pricing page
import Contact from './components/sections/ContactSection'; // Assuming you have a Contact page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;