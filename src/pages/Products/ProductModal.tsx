import React, { useState, useEffect } from "react";
import { updateProduct } from "../../apis/product";
import "../../styles/modal.css";
interface DataProducts {
    _id: string,
    title: string,
    original_price: number,
    discount_percentage: number,
    discounted_price: number,
    description: string,
    image: string,
  }
interface ProductModalProps {
  isOpen: boolean;
  product: DataProducts | null;
  onClose: () => void;
  onSave: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  product,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_percentage: 0,
    original_price: 0,
    discounted_price: 0
  });

  useEffect(()=>{
    if(product){
        setFormData({
            title: product.title,
            description: product.description,
            discount_percentage: product.discount_percentage,
            original_price: product.original_price,
            discounted_price: product.discounted_price,
        });
    }
  },[product]);


    const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}= e.target;
        setFormData(prev=> ({...prev, [name]:value}));
    }

    const handleSubmit = async()=>{
        if(product && window.confirm("Are you sure you want to delete this product?")){
            try {
                
                await updateProduct(product._id, formData);
                onSave();
            } catch (error) {
                console.error("Update product failed", error);
            }
        }
    }
  if(!isOpen) return null;
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>Edit Product</h2>
            <form>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={formData.description} onChange={handleChange}/>
                </label>
                <label>
                    Discount Percentage:
                    <input type="number" name="discount_percentage" value={formData.discount_percentage} onChange={handleChange} />
                </label>
                <label>
            Original Price:
            <input type="number" name="original_price" value={formData.original_price} onChange={handleChange} />
          </label>
          <label>
            Discounted Price:
            <input type="number" name="discounted_price" value={formData.discounted_price} onChange={handleChange} />
          </label>
          <button type="button" className="action-btn create-btn" onClick={handleSubmit}>Save</button>
          <button type="button" className="action-btn create-btn" onClick={onClose}>Close</button>
            </form>
        </div>
    </div>
  );
};

export default ProductModal;
