import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ProductItem = ({ product, onDelete }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/150'}
                    alt={product.title}
                />
                <span className="product-category">{product.category?.name}</span>
            </div>
            <div className="product-content">
                <h3>{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description?.substring(0, 60)}...</p>
                <div className="product-actions">
                    <Link to={`/edit/${product.id}`} className="btn-icon btn-edit" title="Edit">
                        <FiEdit2 />
                    </Link>
                    <button onClick={() => onDelete(product.id)} className="btn-icon btn-delete" title="Delete">
                        <FiTrash2 />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
