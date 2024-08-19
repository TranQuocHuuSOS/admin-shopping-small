import React, { useState } from "react";
import "../../../styles/modalBooking.css";
import { createBooking } from "../../../apis/booking";
import ProductDescript from "../../../pages/User/Home/ProductDescript";
interface ModalBookingProps {
  isOpen: boolean;
  onRequestClose: () => void;
  product: Product | null;
}

interface Product {
  _id: number;
  title: string;
  description: string;
  image: string;
  original_price: number;
  discount_percentage: number;
  discounted_price: number;
}
const ModalBooking: React.FC<ModalBookingProps> = ({
  isOpen,
  onRequestClose,
  product
}) => {
  const [notes, setNotes] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  if (!isOpen) return null;
  const dataUser = JSON.parse(localStorage.getItem("user") || "{}");
  const user = dataUser.id;
  const handleBookClick = async () => {
    if (product) {
      try {
        const bookingData = await createBooking(
          user,
          product._id,
          deliveryAddress,
          notes
        );
        if (bookingData.message === "Booking created successfully!!!") {
          console.log("Booking successful");
        }
      } catch (error) {
        console.error("Error creating booking:", error);
      } finally {
        onRequestClose();
      }
    }
  };
  return (
    <div className="custom-modal-overlay">
    <div className="custom-modal">
      <h2>Detail Product</h2>
      {product && (
        <>
          <div className="info">
            <div className="custom-modal-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="custom-modal-image"
              />
            </div>
            <div className="infor">
              <h3 className="title">{product.title}</h3>
              <div>
                <p className="title">Original price:</p>
                <p className="value">
                  {product?.original_price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
              </div>
              <div className="inforPercentage">
                <p className="title">Discount percentage:</p>
                <p>{product?.discount_percentage}%</p>
              </div>
              <div>
                <p className="title">Discounted price:</p>
                <p className="discounted-price">
                  {(
                    product?.original_price *
                    (1 - product?.discount_percentage / 100)
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
              </div>
            </div>
          </div>
          <ProductDescript description={product.description} />
          <div className="custom-modal-form">
            <div>
              <label htmlFor="notes" className="notes">
                Notes:
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter your notes"
              />
            </div>
            <div>
              <label htmlFor="deliveryAddress" className="notes">
                Delivery Address:
              </label>
              <textarea
                id="deliveryAddress"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
              />
            </div>
          </div>
          <div className="event">
            <button className="action-btn create-btn" onClick={handleBookClick}>
              Book
            </button>
            <button className="action-btn create-btn" onClick={onRequestClose}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default ModalBooking;
