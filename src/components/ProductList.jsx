import { FiAlertCircle, FiLoader } from 'react-icons/fi';
import ProductItem from './ProductItem';
import './ProductList.css';

const ProductList = ({ products, loading, error, onDelete }) => {
    if (loading) {
        return (
            <div className="loading-state">
                <FiLoader className="spinner" />
                <p>Fetching amazing products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-state">
                <FiAlertCircle />
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-secondary">
                    Retry
                </button>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>No products found. Start by adding one!</p>
            </div>
        );
    }

    return (
        <div className="product-table-container">
            <table className="product-table">
                <thead>
                    <tr>
                        <th className="col-check">
                            <input type="checkbox" />
                        </th>
                        <th className="col-image">IMAGE</th>
                        <th className="col-title">TITLE</th>
                        <th className="col-desc">DESCRIPTION</th>
                        <th className="col-price">PRICE</th>
                        <th className="col-actions">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
