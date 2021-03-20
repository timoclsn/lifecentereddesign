import Layout from '@/components/Layout';
import { getCO2Consumtion } from '@/lib/co2';

export default function Privacy(props) {
    return (
        <Layout co2Consumption={props.co2Consumption}>
            Das ist die Datenschutzerklärung!
        </Layout>
    );
}

export async function getStaticProps() {
    const co2Consumption = await getCO2Consumtion('https://timoclasen.de');

    return {
        props: { co2Consumption }
    };
}
