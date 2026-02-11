import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX, FiImage, FiAlertCircle } from 'react-icons/fi';
import { getProducts, createProduct, updateProduct } from '../services/api';
import './ProductForm.css';

const ProductForm = ({ initialData, title: formTitle }) => {
    const navigate = useNavigate();
    const isEditMode = !!initialData;
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        categoryId: 1,
        description: '',
        images: [],
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                price: initialData.price || '',
                categoryId: initialData.category?.id || 1,
                description: initialData.description || '',
                images: initialData.images || [],
            });
        }
    }, [initialData]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                images: [reader.result]
            }));
            if (errors.image) {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                });
            }
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

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
        const trimmedTitle = formData.title.trim();
        const trimmedDescription = formData.description.trim();

        if (!trimmedTitle) {
            newErrors.title = 'Product name is required';
        } else if (trimmedTitle.length === 0) {
            newErrors.title = 'Product name cannot be empty';
        }

        if (!formData.price || formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!trimmedDescription) {
            newErrors.description = 'Description is required';
        }

        const imageUrl = formData.images[0]?.trim();
        if (!imageUrl) {
            newErrors.image = 'Image URL is required';
        }

        if (!newErrors.title) {
            try {
                const response = await getProducts(100, 0); // Check a larger batch for uniqueness
                const products = response.data;
                const isNameTaken = products.some(p =>
                    p.title.trim().toLowerCase() === trimmedTitle.toLowerCase() &&
                    (!isEditMode || p.id !== initialData.id)
                );
                if (isNameTaken) {
                    newErrors.title = 'A product with this name already exists (case-insensitive)';
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

        try {
            const isValid = await validateForm();
            if (!isValid) return;

            setIsSubmitting(true);

            // Safe data preparation
            const title = formData.title?.trim() || '';
            const description = formData.description?.trim() || '';
            const price = Number(formData.price) || 0;
            const images = formData.images?.[0] ? [formData.images[0].trim()] : ['https://placehold.co/600x400'];

            const submissionData = {
                title,
                price,
                description,
                categoryId: formData.categoryId || 1,
                images
            };

            if (isEditMode) {
                await updateProduct(initialData.id, submissionData);
            } else {
                await createProduct(submissionData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving product:', error);
            setErrors({ submit: 'Failed to save product. Please try again.' });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="product-form-wrapper">
            <header className="form-header">
                <h2>{formTitle || (isEditMode ? 'Update Product' : 'Add Product')}</h2>
            </header>

            {errors.submit && (
                <div className="error-banner">
                    <FiAlertCircle /> {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="sleek-form">
                <div className="form-section">
                    <label className="section-label">Product image</label>
                    {(formData.images && formData.images[0]) ? (
                        <div className="current-image-preview">
                            <img src={formData.images[0]} alt="Preview" />
                            <button type="button" className="remove-img" onClick={() => setFormData(prev => ({ ...prev, images: [] }))}>
                                <FiX />
                            </button>
                        </div>
                    ) : (
                        <div
                            className={`image-upload-zone ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <div className="upload-content">
                                <FiImage className="upload-icon" />
                                <p>Drag and drop files</p>
                                <span className="or">or</span>
                                <button type="button" className="browse-btn" onClick={() => fileInputRef.current.click()}>Browse</button>
                                <p className="formats">Supported file types: jpg, png and jpeg format</p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden-file-input"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <div className="url-input-divider">
                                <span>OR</span>
                            </div>
                            <input
                                type="url"
                                placeholder="Paste image URL here..."
                                value={formData.images[0] || ''}
                                onChange={handleImageChange}
                                className="hidden-url-input"
                            />
                        </div>
                    )}
                    {errors.image && <span className="error-text image-error">{errors.image}</span>}
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={errors.title ? 'input-error' : ''}
                            placeholder="Enter product title"
                        />
                        {errors.title && <span className="error-text">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <div className="price-input-wrapper">
                            <span className="currency">$</span>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={errors.price ? 'input-error' : ''}
                                placeholder="0"
                            />
                        </div>
                        {errors.price && <span className="error-text">{errors.price}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="categoryId">Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="sleek-select"
                        >
                            <option value="1">Clothes</option>
                            <option value="2">Electronics</option>
                            <option value="3">Furniture</option>
                            <option value="4">Shoes</option>
                            <option value="5">Others</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={errors.description ? 'input-error' : ''}
                            rows="4"
                            placeholder="Enter product description"
                        ></textarea>
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>
                </div>

                <div className="form-footer">
                    <button type="submit" className="btn-primary-large" disabled={isSubmitting}>
                        {isSubmitting ? 'Processing...' : (isEditMode ? 'Update' : 'Add')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
