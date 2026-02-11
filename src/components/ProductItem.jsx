import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ProductItem = ({ product, onDelete }) => {
    return (
        <tr className="product-row">
            <td><input type="checkbox" /></td>
            <td className="cell-image">
                <div className="table-img-wrapper">
                    <img
                        src={product.images?.[0] || 'https://via.placeholder.com/150'}
                        alt={product.title}
                    />
                </div>
            </td>
            <td className="cell-title">{product.title}</td>
            <td className="cell-desc">
                <p className="truncate-desc">{product.description}</p>
            </td>
            <td className="cell-price">$ {product.price}</td>
            <td className="cell-actions">
                <div className="action-group">
                    <button onClick={() => onDelete(product)} className="action-icon-btn delete" title="Delete">
                        <FiTrash2 />
                    </button>
                    <Link to={`/edit/${product.id}`} className="action-icon-btn edit" title="Edit">
                        <FiEdit2 />
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default ProductItem;
