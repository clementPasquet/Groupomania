import { Link } from 'react-router-dom'
 
function Header() {
    return (
        <nav>
            <Link to="/">Signin</Link>
            <Link to="/login">Login</Link>
        </nav>
    )
}

export default Header