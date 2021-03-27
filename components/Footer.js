import Link from 'next/link';

import CenteredColumn from '@/components/CenteredColumn';

export default function Footer() {
    return (
        <footer className="mt-auto bg-oak">
            <CenteredColumn>
                <div className="flex justify-between py-10">
                    <ul className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                        <li>
                            <Link href="/#about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#newsletter">
                                <a>Newsletter</a>
                            </Link>
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
                    <ul className="flex flex-col space-y-4 font-bold sm:flex-row sm:space-y-0 sm:space-x-8">
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
