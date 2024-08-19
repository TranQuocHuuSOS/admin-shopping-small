import React, { useState, useEffect } from "react";
import { changeStatusBooking, getBooking } from "../../../apis/booking";
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
    discounted_price: number;
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
        setBookings(bookingData.data);
        setLoading(false);
      } catch (error) {
        console.error("Get products failed", error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);
  const handleChangeStatus = async (bookingId: string, status: string) => {
    try {
      await changeStatusBooking(bookingId, status);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: status } : booking
        )
      );
      alert(`Booking status changed to ${status}`);
    } catch (error) {
      console.error(`Error changing booking status to ${status}:`, error);
      alert(`Failed to change booking status to ${status}`);
    }
  };
  if (loading) return <p className="loading">Loading...</p>;
  return (
    <div className="bookings-container">
      <h1 className="title">Bookings List</h1>
      <div className="table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Full Name</th>
              <th>Product Title</th>
              <th>Image</th>
              <th>Discounted Price</th>
              <th>Time</th>
              <th>Payment Method</th>
              <th>Delivery Address</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .slice()
              .reverse()
              .map((booking, index) => (
                <tr key={booking._id} className="booking-row">
                  <td>{bookings.length - index}</td>
                  <td>{booking.user.fullname}</td>
                  <td className="title">
                    {booking?.product?.title || "No notes"}
                  </td>
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
                  <td>
                    {" "}
                    {(
                      booking?.product?.original_price *
                      (1 - booking?.product?.discount_percentage / 100)
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </td>
                  <td>{new Date(booking.updatedAt).toLocaleDateString()}</td>
                  <td>{booking.paymentDetails.method}</td>
                  <td>{booking.deliveryAddress}</td>
                  <td>{booking.notes || "No notes"}</td>
                  <td>
                    {booking.status === "pending" && (
                      <button
                        className="confirm-button"
                        onClick={() =>
                          handleChangeStatus(booking._id, "confirmed")
                        }
                      >
                        Confirmed
                      </button>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        className="complete-button"
                        onClick={() =>
                          handleChangeStatus(booking._id, "completed")
                        }
                      >
                        Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
