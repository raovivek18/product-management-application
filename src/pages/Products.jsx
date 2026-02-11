import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import { FiPlus, FiFilter, FiUpload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductList from '../components/ProductList';
import DeleteModal from '../components/DeleteModal';
import './Products.css';

const Products = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getProducts(limit, offset);
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Unable to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [offset]);

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!productToDelete) return;

        // Optimistic UI Update
        const previousProducts = [...products];
        setProducts(products.filter(p => p.id !== productToDelete.id));
        setIsModalOpen(false);

        try {
            await deleteProduct(productToDelete.id);
            setProductToDelete(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            // Rollback on failure
            setProducts(previousProducts);
            alert('Failed to delete product. Restoring list.');
        }
    };

    const handleNext = () => setOffset(prev => prev + limit);
    const handlePrevious = () => setOffset(prev => Math.max(0, prev - limit));

    const filteredProducts = products.filter(product =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentPage = Math.floor(offset / limit) + 1;

    return (
        <div className="product-page">
            <header className="product-page-header">
                <h1>Products</h1>
                <div className="header-actions">
                    <button className="btn-ghost filter-btn">
                        <FiFilter /> Filter
                        <span className="badge">1</span>
                    </button>
                    <button className="btn-ghost">
                        <FiUpload /> Export
                    </button>
                    <Link to="/add" className="btn-primary">
                        <FiPlus /> Add Product
                    </Link>
                </div>
            </header>

            <ProductList
                products={filteredProducts}
                loading={loading}
                error={error}
                onDelete={handleDeleteClick}
            />

            <footer className="pagination">
                <button
                    className="nav-page-btn"
                    onClick={handlePrevious}
                    disabled={offset === 0}
                >
                    <FiChevronLeft /> Previous
                </button>
                <div className="page-numbers">
                    <button className="page-btn active">{currentPage}</button>
                    {products.length === limit && (
                        <button className="page-btn" onClick={handleNext}>{currentPage + 1}</button>
                    )}
                </div>
                <button
                    className="nav-page-btn"
                    onClick={handleNext}
                    disabled={products.length < limit}
                >
                    Next <FiChevronRight />
                </button>
            </footer>

            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                productName={productToDelete?.title}
            />
        </div>
    );
};

export default Products;
