import Link from 'next/link';

export default function Footer() {
    return (
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
    );
}
