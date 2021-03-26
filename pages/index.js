import About from '@/components/About';
import AboutUs from '@/components/AboutUs';
import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Stack from '@/components/Stack';
import { getCO2Consumtion } from '@/lib/co2';

export default function Home(props) {
    return (
        <Layout co2Consumption={props.co2Consumption}>
            <Stack space="xlarge">
                <Header />
                <Categories />
                <About />
                <AboutUs />
            </Stack>
        </Layout>
    );
}

export async function getStaticProps() {
    const co2Consumption = await getCO2Consumtion('https://timoclasen.de');

    return {
        props: { co2Consumption }
    };
}
