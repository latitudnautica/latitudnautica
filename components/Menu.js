import Link from "next/link";

export default function Menu() {
  return (
    <nav className='menu' style={{ height: "50px" }}>
      <Link href='/'>
        <a>Home</a>
      </Link>

      <Link href='/test'>
        <a>Test</a>
      </Link>
      <Link href='/lista/user/1/posts'>
        <a>Posts</a>
      </Link>
    </nav>
  );
}
