import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { getProductById } from '../services/api';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getProductById(id);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product details. It might have been deleted.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <FiLoader className="spinner" />
                <p>Loading product data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <FiAlertCircle />
                <h2>Oops!</h2>
                <p>{error}</p>
                <Link to="/" className="btn btn-primary">Back to Products</Link>
            </div>
        );
    }

    return (
        <>
            {product && (
                <ProductForm
                    initialData={product}
                />
            )}
        </>
    );
};

export default EditProduct;
