import ProductForm from '../components/ProductForm';
import { createProduct } from '../services/api';

const AddProduct = () => {
    return (
        <div className="container">
            <ProductForm />
        </div>
    );
};

export default AddProduct;
