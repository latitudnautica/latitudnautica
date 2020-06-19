import Link from 'next/link'

const CategoryMenu = (props) => {
    return (
        <div>
            <div><Link href='/lista/posts'><a>Posts</a></Link></div>
            <div><Link href='/user/[id]/posts'><a>User</a></Link></div>
            <div><Link href='/lista/seguridad'><a>seguridad</a></Link></div>
            <div><Link href='/lista/veleros'><a>veleros</a></Link></div>
        </div>
    )
}

export default CategoryMenu