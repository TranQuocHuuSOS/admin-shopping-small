import React, { useState, useEffect } from 'react';
import "../../../styles/userBookings.css";
import { getUserBookings } from '../../../apis/booking';
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
      description:string;
      discount_percentage: number;
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
const Booking = () => {
  const [bookings, setBookings] = useState<DataBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const users = localStorage.getItem('user');
      let accessToken = "";
      if (users) {
        const user = JSON.parse(users);
        accessToken = user.accessToken;
        console.log("acc", accessToken);
      }
      try {
        const data = await getUserBookings(accessToken);
        console.log("Bookings:", data);
        setBookings(data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="booking-container">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>Book Date</th>
              <th>Product</th>
              <th>Description</th>
              <th>original_price</th>
              <th>discount_percentage</th>
              <th>Delivery Address</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{new Date(booking.updatedAt).toLocaleDateString()}</td>
                <td>{booking?.product?.title}</td>
                <td>{booking?.product?.description}</td>
                <td>{booking?.product?.original_price}</td>
                <td>{booking?.product?.discount_percentage}</td>
                <td>{booking.deliveryAddress}</td>
                <td>{booking.notes}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Booking;
