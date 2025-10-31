import './ErrorPage.css'
import { Header } from '../components/Header'
export const ErrorPage = ({ cart }) => {
    return (
        <div className="error-page-container">
            <Header cart={cart} />
            <header className="error-page-header">404: Page not Found</header>
        </div>
    )
}