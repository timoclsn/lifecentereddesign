import Favicons from '@/components/Favicons';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';

export default function Layout({ co2Consumption, children }) {
    return (
        <>
            <SEO />
            <Favicons />
            <Navigation co2Consumption={co2Consumption} />
            <main>{children}</main>
            <Footer />
        </>
    );
}
