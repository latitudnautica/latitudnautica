import Link from 'next/link'
import MainLayout from '../../layouts/MainLayout'

const Posts = (props) => {
    return (
        <div>
            {props.data.map(item => {
                return <div>{item.name}</div>
            })}
        </div>
    )
}


Posts.Layout = MainLayout


export default Posts


Posts.getInitialProps = async ({ req }) => {
        const res = await fetch("http://localhost:5000/api/category/all");
        const json = await res.json();
        console.log(json)
        return { data: json };
    };