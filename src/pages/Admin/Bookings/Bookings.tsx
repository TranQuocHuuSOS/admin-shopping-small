import React, { useState, useEffect } from "react";
import { getBooking } from "../../../apis/booking";
import "../../../styles/booking.css";
interface DataBooking {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    email: string;
  };
  product: {
    _id: string;
    title: string;
    original_price: number;
    image: string;
  };
  status: string;
  totalPrice: number;
  paymentDetails: {
    method: string;
    status: string;
    transactionId: string;
    amount: number;
  };
  deliveryAddress: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
const Bookings = () => {
  const [bookings, setBookings] = useState<DataBooking[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBookings = async () => {
      const userData = localStorage.getItem("user");
      let accessToken = "";
      if (userData) {
        const user = JSON.parse(userData);
        accessToken = user.accessToken;
      }
      if (!accessToken) {
        console.error("Access token not found");
        setLoading(false);
        return;
      }
      try {
        const bookingData = await getBooking(accessToken);
        console.log("interface", bookingData?.data);
        // console.log(bookingData.data.product.title);

        setBookings(bookingData.data);
        setLoading(false);
      } catch (error) {
        console.error("Get products failed", error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);
  if (loading) return <p className="loading">Loading...</p>;
  return (
    <div className="bookings-container">
      <h1>Bookings List</h1>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Full Name</th>
            <th>Product Title</th>
            <th>Image</th>
            <th>Original Price</th>
            <th>Time</th>
            <th>Payment Method</th>
            <th>Delivery Address</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking, index) => (
            <tr key={booking._id} className="booking-row">
              <td>{index + 1}</td>
              <td>{booking.user.fullname}</td>
              <td>{booking?.product?.title || "No notes"}</td>
              <td>
                {booking?.product?.image ? (
                  <img
                    src={booking?.product?.image}
                    alt={booking?.product?.image}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>{booking.product.original_price}</td>
              <td>{new Date(booking.updatedAt).toLocaleDateString()}</td>
              <td>{booking.paymentDetails.method}</td>
              <td>{booking.deliveryAddress}</td>
              <td>{booking.notes || "No notes"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
