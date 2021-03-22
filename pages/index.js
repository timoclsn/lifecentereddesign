import Categories from '@/components/Categories';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { getCO2Consumtion } from '@/lib/co2';

export default function Home(props) {
    return (
        <Layout co2Consumption={props.co2Consumption}>
            <div className="space-y-28">
                <Header />
                <Categories />
            </div>
        </Layout>
    );
}

export async function getStaticProps() {
    const co2Consumption = await getCO2Consumtion('https://timoclasen.de');

    return {
        props: { co2Consumption }
    };
}
