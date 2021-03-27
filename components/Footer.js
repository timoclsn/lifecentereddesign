import Link from 'next/link';

import CenteredColumn from '@/components/CenteredColumn';

export default function Footer() {
    return (
        <footer className="mt-auto bg-oak">
            <CenteredColumn>
                <div className="flex justify-between py-10">
                    <ul className="flex space-x-8">
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#newsletter">Newsletter</a>
                        </li>
                        <li>
                            <a href="https://katharinaclasen.de">
                                Katharina Clasen
                            </a>
                        </li>
                        <li>
                            <a href="https://timoclasen.de">Timo Clasen</a>
                        </li>
                    </ul>
                    <ul className="flex space-x-8 font-bold">
                        <li>
                            <Link href="/imprint">
                                <a>Imprint</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy">
                                <a>Privacy</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </CenteredColumn>
        </footer>
    );
}
