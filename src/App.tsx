import Hero from './components/Hero';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Hero />
      <LeadForm />
      <Footer />
    </div>
  );
}
