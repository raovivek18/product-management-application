import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const filteredProducts = products.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list-container">
            <header className="page-header">
                <div className="header-info">
                    <h1>Products</h1>
                    <p>Manage your inventory and product details</p>
                </div>
                <Link to="/add" className="btn btn-primary">
                    <FiPlus /> Add Product
                </Link>
            </header>

            <div className="list-actions">
                <div className="search-bar">
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="loading-state">Loading products...</div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/150'} alt={product.title} />
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
                                    <button onClick={() => handleDelete(product.id)} className="btn-icon btn-delete" title="Delete">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredProducts.length === 0 && (
                <div className="empty-state">
                    No products found. Start by adding one!
                </div>
            )}
        </div>
    );
};

export default ProductList;
