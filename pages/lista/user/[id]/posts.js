import Link from 'next/link'
import MainLayout from '../../../../layouts/MainLayout'
import useRouter from 'next/router'

const User = (props) => {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            {props.data.map(item => {
                return <div>{item.title}</div>
            })}
        </div>
    )
}


User.Layout = MainLayout


export default User


// User.getInitialProps = async ({ req }) => {
//     console.log(req)

//     const res = await fetch(`https://jsonplaceholder.typicode.com/user/1/posts`);
//     const json = await res.json();
//     console.log(json)
//     return { data: json };
// };


// This function gets called at build time
export async function getStaticPaths() {
    return {
        // Only `/posts/1` and `/posts/2` are generated at build time
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        // Enable statically generating additional pages
        // For example: `/posts/3`
        fallback: true,
    }
}
// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://jsonplaceholder.typicode.com/user/${params.id}/posts}`)
    const posts = await res.json()
    console.log(posts)

    // Pass post data to the page via props
    return { props: { data: posts } }
}