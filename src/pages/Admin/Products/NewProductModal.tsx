import React, { useState } from "react";
import "../../../styles/newModal.css";
import { createNewProduct } from "../../../apis/product";
interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}
const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [image, setImage] = useState("");
  const handleSubmit = async () => {
    const newProduct = {
      title,
      description,
      discount_percentage: discountPercentage,
      original_price: originalPrice,
      discounted_price: discountedPrice,
      image
    };
    try {
      await createNewProduct(newProduct);
      onSave();
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Product</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Discount Percentage:
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(Number(e.target.value))}
          />
        </label>
        <label>
          Original Price:
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Discounted Price:
          <input
            type="number"
            value={discountedPrice}
            onChange={(e) => setDiscountedPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={handleSubmit}
          className="action-btn save-btn"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="action-btn close-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewProductModal;
