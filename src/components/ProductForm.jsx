import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiImage } from 'react-icons/fi';
import './ProductForm.css';

const ProductForm = ({ initialData, onSubmit, title: formTitle }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        categoryId: 1,
        description: '',
        images: ['https://placehold.co/600x400'],
    });

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
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            images: [e.target.value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Platzi API expects categoryId and array for images
            await onSubmit(formData);
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to save product. Please check the console for details.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container glass">
            <div className="form-header">
                <h2>{formTitle}</h2>
                <button onClick={() => navigate('/')} className="btn-close">
                    <FiX />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="title">Product Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Premium Wireless Headphones"
                    />
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
                            required
                            step="0.01"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoryId">Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
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
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Provide a detailed description of the product..."
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        <FiSave /> {isSubmitting ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
