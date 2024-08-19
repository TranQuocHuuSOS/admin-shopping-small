import axios from "axios";
const API_URL = "https://shopping-mall-server.onrender.com";
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product/getAll`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/product/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  productData: {
    title?: string;
    description?: string;
    discount_percentage?: number;
    original_price?: number;
    discounted_price?: number;
    image?: string;
  }
) => {
  try {
    const response = await axios.put(
      `${API_URL}/product/update/${id}`,
      productData
    );
    return response.data;
  } catch (error) {
    throw new Error("Update product failed: " + error);
  }
};

export const createNewProduct = async (newProduct: object) => {
  try {
    const response = await axios.post(`${API_URL}/product/create`, newProduct, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};
