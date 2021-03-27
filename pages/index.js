import About from '@/components/About';
import AboutUs from '@/components/AboutUs';
import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import NewsletterCard from '@/components/NewsletterCard';
import { getCO2Consumtion } from '@/lib/co2';

export default function Home(props) {
    return (
        <Layout co2Consumption={props.co2Consumption}>
            <Header />
            <Categories />
            <About />
            <NewsletterCard />
            <AboutUs />
        </Layout>
    );
}

export async function getStaticProps() {
    const co2Consumption = await getCO2Consumtion(
        'https://lifecentereddesign.net'
    );

    return {
        props: { co2Consumption }
    };
}

// Test
