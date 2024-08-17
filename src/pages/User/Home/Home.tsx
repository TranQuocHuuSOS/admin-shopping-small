import React, { useState, useEffect } from "react";
import { getProducts } from "../../../apis/product";
import "../../../styles/home.css";
import ModalBooking from "../../../components/User/ModalBooking/ModalBooking";

interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    original_price: number;
    discount_percentage: number;
    discounted_price: number;
  }
const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  
  const openModal = (product:Product):void => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  
  const lastProduct = products[products.length - 1];
  return (
    <div className="home-container">
        <ModalBooking
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        product={selectedProduct}
      />
      <h1 className="user-text">
        Welcome {user.fullname}'s to Ong Tran's Store
      </h1>
      {lastProduct && (
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${lastProduct.image})` }}
        >
          <div className="overlay">
            <div className="hero-text">
              <h3>{lastProduct.title}</h3>
              <p>{lastProduct.description}</p>
              <div className="pricing">
                <p className="original-price">${lastProduct.original_price}</p>
                <p className="discount-percentage">
                  -{lastProduct.discount_percentage}%
                </p>
                <p className="discounted-price">
                  ${lastProduct.discounted_price}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="news-section">
        <h2>Featured News</h2>
        <div className="news-cards">
          {products.map((product, index) => (
            <div className="card" key={index} onClick={() => openModal(product)}>
              <img
                src={product.image}
                alt={product.image}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-description">{product.description}</p>
              </div>
              <button  type="button"
            className="action-btn create-btn"
            onClick={() => openModal(product)}>Book Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
