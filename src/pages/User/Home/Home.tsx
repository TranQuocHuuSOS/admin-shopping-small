import { useState, useEffect } from "react";
import { getProducts } from "../../../apis/product";
import "../../../styles/home.css";
import ModalBooking from "../../../components/User/ModalBooking/ModalBooking";
import ProductDescript from "./ProductDescript";
interface Product {
  _id: string;
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
  const openModal = (product: Product): void => {
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
      <h1 className="user-text">Welcome to Ong Tran's Store</h1>
      {lastProduct && (
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${lastProduct.image})` }}
        >
          <div className="overlay">
            <div className="hero-text">
              <h3>{lastProduct.title}</h3>

              <div className="pricing">
                <p className="original-price">
                  {lastProduct.original_price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
                <p className="discount-percentage">
                  -{lastProduct.discount_percentage}%
                </p>
                <p className="discounted-price">
                  {(
                    lastProduct?.original_price *
                    (1 - lastProduct?.discount_percentage / 100)
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="news-section">
        <h2 className="feature">Featured News</h2>
        <div className="news-cards">
          {products.map((product, index) => (
            <div className="card" key={index}>
              <img
                src={product.image}
                alt={product.image}
                className="card-image"
              />
              {product.discounted_price && (
                <div className="discount-badge">
                  {product.discount_percentage}% Off
                </div>
              )}
              <div className="card-content">
                <h3 className="card-title">{product.title}</h3>
                <ProductDescript description={product.description} />
                <div className="price-info">
                  <span className="original-price">
                    {product.original_price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </span>
                  <span className="discounted-price">
                    {product.discounted_price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND"
                    })}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="action-btn create-btn"
                onClick={() => openModal(product)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
