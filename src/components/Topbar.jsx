import { FiSearch, FiBell, FiHelpCircle, FiUser, FiMessageSquare } from 'react-icons/fi';
import './Topbar.css';

const Topbar = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="topbar">
            <div className="topbar-search">
                <FiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="topbar-actions">
                <button className="action-btn feedback">
                    <FiMessageSquare />
                    <span>Feedback?</span>
                </button>
                <button className="action-btn">
                    <FiBell />
                </button>
                <button className="action-btn">
                    <FiHelpCircle />
                </button>
                <button className="action-btn profile">
                    <FiUser />
                </button>
            </div>
        </header>
    );
};

export default Topbar;
