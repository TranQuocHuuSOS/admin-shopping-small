import React, { useState, useEffect } from 'react';
import { deleteProduct, getProducts } from '../../apis/product';
import '../../styles/product.css';
import ProductModal from './ProductModal';
import NewProductModal from './NewProductModal';
interface DataProducts {
  _id: string,
  title: string,
  original_price: number,
  discount_percentage: number,
  discounted_price: number,
  description: string,
  image: string,
}
const Products = () => {
  const [products, setProducts] = useState<DataProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct]= useState<DataProducts | null>(null);
  const [isModalOpen, setModalOpen]= useState(false);
  const [isNewProductModalOpen, setNewProductModalOpen]= useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        console.log("interface", productData);
        setProducts(productData.data);
        setLoading(false);
      } catch (err) {
        console.error("Get products failed", err);
        setLoading(false);
      }
    };
  const handleEdit = (id:string)=>{
    const product = products.find(p => p._id ===id )|| null;
    setSelectedProduct(product);
    setModalOpen(true);
  }
  const handleDelete =async (id:string)=>{
    if(window.confirm("Are you sure you want to delete this product?")){
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error("Delete product failed", error);
      }
    }
}
const handleCreate = () => {
    setNewProductModalOpen(true);
};
const handleCloseModal = ()=>{
  setModalOpen(false);
  setSelectedProduct(null);
};
const handleCloseNewProductModal = () => {
  setNewProductModalOpen(false);
};
const handleSaveModal =()=>{
  fetchProducts();
  handleCloseModal();
  handleCloseNewProductModal();
}
  if (loading) return <p className="loading">Loading...</p>;
  return (
    <div className="products-container">
      <div className="header-row">
        <h1>Products List</h1>
        <div>
        <button onClick={handleCreate} className="action-btn create-btn">Create New Product</button>
        </div>
        
      </div>
      <table className="products-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Original Price</th>
            <th>Discount Percentage</th>
            <th>Discounted Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.title || 'N/A'}</td>
              <td>{product.original_price || 0}</td>
              <td>{product.discount_percentage || 0}</td>
              <td>{product.discounted_price || 0}</td>
              <td>{product.description || 'No description'}</td>
              <td>{product.image ? <img src={product.image} alt={product.title} /> : 'No image'}</td>
              <td>
              <button onClick={() => handleEdit(product._id)} className="action-btn edit-btn">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="action-btn delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductModal isOpen={isModalOpen} product={selectedProduct} onClose={handleCloseModal} onSave={handleSaveModal}/>
      <NewProductModal isOpen={isNewProductModalOpen} onClose={handleCloseNewProductModal} onSave={handleSaveModal}/>
    </div>
  );
};
export default Products;
