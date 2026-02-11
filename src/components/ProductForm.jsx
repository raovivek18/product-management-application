import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiImage, FiAlertCircle } from 'react-icons/fi';
import { getProducts, createProduct, updateProduct } from '../services/api';
import './ProductForm.css';

const ProductForm = ({ initialData, title: formTitle }) => {
    const navigate = useNavigate();
    const isEditMode = !!initialData;

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        categoryId: 1,
        description: '',
        images: ['https://placehold.co/600x400'],
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                price: initialData.price || '',
                categoryId: initialData.category?.id || 1,
                description: initialData.description || '',
                images: initialData.images || ['https://placehold.co/600x400'],
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'categoryId' ? Number(value) : value
        }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            images: [e.target.value]
        }));
        if (errors.image) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.image;
                return newErrors;
            });
        }
    };

    const validateForm = async () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Product name is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.images[0]?.trim()) newErrors.image = 'Image URL is required';

        if (!newErrors.title) {
            try {
                const response = await getProducts();
                const products = response.data;
                const isNameTaken = products.some(p =>
                    p.title.toLowerCase() === formData.title.toLowerCase() &&
                    (!isEditMode || p.id !== initialData.id)
                );
                if (isNameTaken) {
                    newErrors.title = 'A product with this name already exists';
                }
            } catch (error) {
                console.error('Error validating unique name:', error);
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        setIsSubmitting(true);
        try {
            if (isEditMode) {
                await updateProduct(initialData.id, formData);
            } else {
                await createProduct(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving product:', error);
            setErrors({ submit: 'Failed to save product. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container glass">
            <div className="form-header">
                <h2>{formTitle || (isEditMode ? 'Edit Product' : 'Add New Product')}</h2>
                <button onClick={() => navigate('/')} className="btn-close" type="button">
                    <FiX />
                </button>
            </div>

            {errors.submit && (
                <div className="error-banner">
                    <FiAlertCircle /> {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="title">Product Name</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={errors.title ? 'input-error' : ''}
                        placeholder="Enter product name"
                    />
                    {errors.title && <span className="error-text">{errors.title}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price ($)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className={errors.price ? 'input-error' : ''}
                            step="0.01"
                            placeholder="0.00"
                        />
                        {errors.price && <span className="error-text">{errors.price}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoryId">Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                        >
                            <option value="1">Clothes</option>
                            <option value="2">Electronics</option>
                            <option value="3">Furniture</option>
                            <option value="4">Shoes</option>
                            <option value="5">Miscellaneous</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <div className="input-with-icon">
                        <FiImage />
                        <input
                            type="url"
                            id="image"
                            name="image"
                            value={formData.images[0] || ''}
                            onChange={handleImageChange}
                            className={errors.image ? 'input-error' : ''}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    {errors.image && <span className="error-text">{errors.image}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={errors.description ? 'input-error' : ''}
                        rows="4"
                        placeholder="Provide product details..."
                    ></textarea>
                    {errors.description && <span className="error-text">{errors.description}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        <FiSave /> {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
