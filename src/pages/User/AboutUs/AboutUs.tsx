import React from "react";
import "../../../styles/aboutUs.css";
const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
        <p>Your trusted source for the best product discounts and events!</p>
      </header>
      <section className="about-us-content">
        <div className="about-us-section">
          <h2>Our Story</h2>
          <p>
            Founded in [Year], [Your Company Name] has been dedicated to
            providing the best deals and discounts on a wide range of products.
            Our mission is to bring you the best prices and help you save on
            every purchase.
          </p>
        </div>
        <div className="about-us-section">
          <h2>Our Mission & Values</h2>
          <p>
            At [Your Company Name], we believe in delivering value to our
            customers. We strive to offer exceptional service, top-quality
            products, and unbeatable prices. Our core values include integrity,
            customer satisfaction, and innovation.
          </p>
        </div>
        <div className="about-us-section">
          <h2>History of Our Discount Events</h2>
          <ul>
            <li>
              <strong>[Year] - Grand Opening Sale:</strong> Our first major
              discount event that set the standard for future sales.
            </li>
            <li>
              <strong>[Year] - Summer Blowout:</strong> A seasonal event
              featuring massive discounts on summer essentials.
            </li>
            <li>
              <strong>[Year] - Black Friday Extravaganza:</strong> One of our
              biggest annual events with unbeatable deals.
            </li>
            <li>
              <strong>[Year] - Holiday Savings Spectacular:</strong> End-of-year
              discounts to help you save during the holiday season.
            </li>
          </ul>
        </div>
        <div className="about-us-section">
          <h2>Join Our Community</h2>
          <p>
            Stay up-to-date with our latest discount events and special offers
            by joining our community. Follow us on social media and subscribe to
            our newsletter to be the first to know about upcoming sales and
            promotions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
