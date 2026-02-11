import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import { FiPlus, FiSearch } from 'react-icons/fi';
import ProductList from '../components/ProductList';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
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

        fetchProducts();
    }, []);

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
        <div className="product-page-container">
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

            <ProductList
                products={filteredProducts}
                loading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Products;
