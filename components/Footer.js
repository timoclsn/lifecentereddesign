import Link from 'next/link';

import CenteredColumn from '@/components/CenteredColumn';

export default function Footer() {
    return (
        <footer className="mt-auto bg-oak">
            <CenteredColumn>
                <div className="flex justify-between py-10">
                    <ul className="flex space-x-8">
                        <li>About</li>
                        <li>Newsletter</li>
                        <li>Katharina Clasen</li>
                        <li>Timo Clasen</li>
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
