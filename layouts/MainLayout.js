import Menu from '../components/Menu';
import CategoryMenu from '../components/categoryMenu'

export default function MainLayout({ children }) {
    return (
        <main style={{ border: '4px dashed blue' }}>
            <Menu />
            <CategoryMenu />
            <div>List of items</div>
            {children}
            <footer>FOOTER</footer>
        </main>)
}