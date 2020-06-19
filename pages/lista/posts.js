import Link from 'next/link'
import MainLayout from '../../layouts/MainLayout'

const Posts = (props) => {
    return (
        <div>
            {props.data.map(item => {
                return <div>{item.title}</div>
            })}
        </div>
    )
}


Posts.Layout = MainLayout


export default Posts


Posts.getInitialProps = async ({ req }) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const json = await res.json();
        console.log(json)
        return { data: json };
    };