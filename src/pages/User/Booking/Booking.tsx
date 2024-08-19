import { useState, useEffect } from "react";
import "../../../styles/userBookings.css";
import { changeStatusBooking, getUserBookings } from "../../../apis/booking";
import ProductDescription from "../../Admin/Products/ProductDescription";
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
    description: string;
    discount_percentage: number;
    discounted_price: number;
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
      const users = localStorage.getItem("user");
      let accessToken = "";
      if (users) {
        const user = JSON.parse(users);
        accessToken = user.accessToken;
      }
      try {
        const data = await getUserBookings(accessToken);
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
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await changeStatusBooking(bookingId, "cancelled");
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
      alert("Booking has been canceled");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking");
    }
  };
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
              <th>STT</th>
              <th>Book Date</th>
              <th>Product</th>
              <th>Description</th>
              <th>original_price</th>
              <th>discount_percentage</th>
              <th>Discounted_price</th>
              <th>Delivery Address</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .slice()
              .reverse()
              .map((booking, index) => (
                <tr key={booking._id} className="booking-row">
                  <td data-label="STT">{bookings.length - index}</td>
                  <td data-label="Book Date">{new Date(booking.updatedAt).toLocaleDateString()}</td>
                  <td data-label="Product" className="title">{booking?.product?.title}</td>
                  <ProductDescription
                    description={booking?.product?.description}
                    image={booking?.product?.image}
                  />
                  <td data-label="Original Price">
                    {booking?.product?.original_price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </td>
                  <td data-label="Discount Percentage">{booking?.product?.discount_percentage}%</td>
                  <td data-label="Discounted Price">
                    {" "}
                    {(
                      booking?.product?.original_price *
                      (1 - booking?.product?.discount_percentage / 100)
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </td>
                  <td data-label="Delivery Address">{booking.deliveryAddress}</td>
                  <td data-label="Notes">{booking.notes}</td>

                  <td data-label="Status">
                    {booking.status === "pending" ? (
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <>
                        <p>{booking.status}</p>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Booking;
