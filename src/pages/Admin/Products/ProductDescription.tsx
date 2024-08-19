import React, { useState } from "react";
import "../../../styles/productDescription.css";
interface ProductDescriptionProps {
  description: string;
  image: string;
}
const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  image
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  if (!description) {
    return <td>No description</td>;
  }
  const truncatedDescription =
    description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  return (
    <td>
      {isExpanded ? description : truncatedDescription}
      {description.length > maxLength && (
        <p className="toggle-button" onClick={handleToggle}>
          {isExpanded ? "Show less" : "See more"}
        </p>
      )}
      <div className="img">
        <img className="image" src={image} alt={image} />
      </div>
    </td>
  );
};

export default ProductDescription;
