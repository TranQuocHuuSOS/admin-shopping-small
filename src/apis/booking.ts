import axios from "axios";
const API_URL = "https://shopping-mall-server.onrender.com";
export const getBooking = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/booking/getAll`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createBooking = async (
  user: string,
  product: string,
  deliveryAddress: string,
  notes: string
) => {
  try {
    const response = await axios.post(`${API_URL}/booking/create`, {
      user,
      product,
      deliveryAddress,
      notes
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getUserBookings = async (accessToken: string) => {
  try {
    const response = await axios.get(`${API_URL}/booking/getByUserId`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

export const changeStatusBooking = async (
  bookingId: string,
  status: string
) => {
  try {
    const response = await axios.put(`${API_URL}/booking/changeStatus`, {
      bookingId,
      status
    });
    return response.data;
  } catch (error) {
    console.error("Error change status bookings:", error);
    throw error;
  }
};
