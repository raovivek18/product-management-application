import ProductItem from './ProductItem';
import './ProductList.css';

const ProductList = ({ products, loading, onDelete }) => {
    if (loading) {
        return <div className="loading-state">Loading products...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="empty-state">
                No products found. Start by adding one!
            </div>
        );
    }

    return (
        <div className="products-grid">
            {products.map(product => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProductList;
