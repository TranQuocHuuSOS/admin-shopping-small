import React, {useState} from 'react';
import "../../../styles/modalBooking.css";
import { createBooking } from '../../../apis/booking';
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
const ModalBooking: React.FC<ModalBookingProps> = ({isOpen, onRequestClose, product}) => {
    const [notes, setNotes] = useState<string>("");
    const [deliveryAddress, setDeliveryAddress] = useState<string>("");
    if(!isOpen) return null;
    const dataUser =JSON.parse(localStorage.getItem("user") || "{}")
    const user = dataUser.id;
    const handleBookClick = async() => {
        console.log("product nè", product);
        if (product) {
            try {
                const bookingData = await createBooking(user, product._id, deliveryAddress, notes);
                console.log('Booking successful:', bookingData);
            } catch (error) {
                console.error('Error creating booking:', error);
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
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.image} className="custom-modal-image" />
              <p>{product.description}</p>
              <div className="custom-modal-form">
                <label htmlFor="notes">Notes:</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter your notes"
                />
                <label htmlFor="deliveryAddress">Delivery Address:</label>
                <textarea
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                />
              </div>
              <button  className="action-btn create-btn" onClick={handleBookClick}>Book</button>
              <button  className="action-btn create-btn" onClick={onRequestClose}>Close</button>
            </>
          )}
        </div>
      </div>
  )
}

export default ModalBooking