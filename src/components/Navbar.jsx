import { Link } from 'react-router-dom';
import { FiGrid, FiBox, FiSettings } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <div className="logo-icon">
                        <FiBox />
                    </div>
                    <span className="logo-text">Inventory<span>Pro</span></span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link active">
                        <FiGrid /> Dashboard
                    </Link>
                    <div className="nav-divider"></div>
                    <button className="nav-btn-icon">
                        <FiSettings />
                    </button>
                    <div className="user-profile">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff" alt="User" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
