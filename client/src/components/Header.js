import { Link } from 'react-router-dom'
 
function Header() {
    return (
        <nav className="header">
            <Link className="header__link" to="/">Signin</Link>
           
            <Link className="header__link" to="/login">Login</Link>
        </nav>
    )
}

export default Header