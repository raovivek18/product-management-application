import ProductForm from '../components/ProductForm';
import { createProduct } from '../services/api';

const AddProduct = () => {
    const handleAddProduct = async (data) => {
        await createProduct(data);
    };

    return (
        <div className="container">
            <ProductForm
                title="Add New Product"
                onSubmit={handleAddProduct}
            />
        </div>
    );
};

export default AddProduct;
