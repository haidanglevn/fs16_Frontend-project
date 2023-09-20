import { Product } from "../types/types";

import React from "react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        maxWidth: "300px",
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category.name}</p>
      <img
        src={product.category.image}
        alt={product.category.name}
        style={{ width: "50px", borderRadius: "4px" }}
      />
      <p>{product.description}</p>
    </div>
  );
};

export default ProductCard;
