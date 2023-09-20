import { Product } from "../types/types";

import React, { useState } from "react";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        margin: "5px",
        maxWidth: "200px",
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div style={{ padding: "0 10px" }}>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p>{product.category.name}</p>
        <button>See more</button>
      </div>
    </div>
  );
};

export default ProductCard;
