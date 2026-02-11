import { NavLink } from 'react-router-dom';
import {
    FiGrid, FiPackage, FiStar, FiAlertCircle,
    FiArrowUp, FiCheckSquare, FiCreditCard, FiActivity,
    FiCode, FiDatabase, FiSettings, FiUser
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
    const menuGroups = [
        {
            items: [
                { name: 'Overview', icon: <FiGrid />, path: '/overview' },
                { name: 'Products', icon: <FiUser />, path: '/' },
            ]
        },
        {
            items: [
                { name: 'Reviews', icon: null, path: '/reviews' },
                { name: 'Disputes', icon: null, path: '/disputes' },
                { name: 'Top-ups', icon: null, path: '/top-ups' },
                { name: 'Check deposits', icon: null, path: '/deposits' },
                { name: 'Payouts', icon: null, path: '/payouts' },
                { name: 'All transactions', icon: null, path: '/transactions' },
            ]
        },
        {
            title: 'Balances',
            items: [
                { name: 'Payments', icon: <FiActivity />, path: '/payments' },
                { name: 'Connected accounts', icon: <FiCheckSquare />, path: '/accounts' },
                { name: 'Products', icon: <FiPackage />, path: '/products-balance' },
                { name: 'Readers', icon: <FiCreditCard />, path: '/readers' },
                { name: 'Reports', icon: <FiActivity />, path: '/reports' },
                { name: 'Issued cards', icon: <FiCreditCard />, path: '/cards' },
            ]
        },
        {
            items: [
                { name: 'Developers', icon: <FiCode />, path: '/developers' },
                { name: 'View test data', icon: <FiDatabase />, path: '/test-data' },
                { name: 'Settings', icon: <FiSettings />, path: '/settings' },
            ]
        }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                FakeApp
            </div>
            <nav className="sidebar-nav">
                {menuGroups.map((group, gIndex) => (
                    <div key={gIndex} className="nav-group">
                        {group.title && (
                            <h3 className="nav-group-title">
                                <span className="group-sort-icon">↕</span> {group.title}
                            </h3>
                        )}
                        {group.items.map((item, iIndex) => (
                            <NavLink
                                key={iIndex}
                                to={item.path}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                {item.icon ? (
                                    <span className="nav-icon">{item.icon}</span>
                                ) : (
                                    <span className="nav-icon-placeholder" />
                                )}
                                <span className="nav-label">{item.name}</span>
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
