import About from '@/components/About';
import AboutUs from '@/components/AboutUs';
import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import NewsletterCard from '@/components/NewsletterCard';
import { getCO2Consumtion } from '@/lib/co2';
import CO2Badge from '@/components/CO2Badge';

export default function Home(props) {
    return (
        <>
            <CO2Badge co2Consumption={props.co2Consumption} />
            <Layout co2Consumption={props.co2Consumption}>
                <Header />
                <Categories />
                <About />
                <NewsletterCard />
                <AboutUs />
            </Layout>
        </>
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
