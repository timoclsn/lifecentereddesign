import Link from 'next/link';

import CenteredColumn from '@/components/CenteredColumn';

export default function Footer() {
    return (
        <CenteredColumn>
            <footer>
                <span>Footer: </span>
                <ul>
                    <li>
                        <Link href="/impressum">
                            <a>Impressum</a>
                        </Link>
                    </li>
                </ul>
            </footer>
        </CenteredColumn>
    );
}
