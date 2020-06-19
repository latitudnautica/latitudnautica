import Menu from '../components/Menu';
import CategoryMenu from '../components/categoryMenu'

export default function MainLayout({ children }) {
    return (
        <main className='main'>
            <Menu />
            {/* <CategoryMenu /> */}
            <div>List of items</div>
            {children}
            <footer>FOOTER</footer>
<style></style>
        </main>)
}