import Link from 'next/link'

export default function Menu() {
    return (
        <nav>
            <ul>
                <li>home</li>
                <li>about</li>
                <li>contact</li>
                <Link href="/red">
                    <a style={{ color: 'red' }}>Red Page</a>
                </Link>
                <Link href="/green">
                    <a style={{ color: 'green' }}>Green Page</a>
                </Link>
            </ul>
        </nav>
    )
}