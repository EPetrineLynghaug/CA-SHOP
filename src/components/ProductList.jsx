// import ProductCard from "./ProductCard";

// export default function ProductList({ products }) {
//   if (!products || products.length === 0) {
//     return <p className="text-center text-gray-500">No products found.</p>;
//   }

//   return (
//     <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </ul>
//   );
// }
// import React from "react";
// import ProductCard from "./ProductCard";


// function ProductList({ products }) {
//   if (!products || products.length === 0) {
//     return <p className="text-center text-gray-500">No products found.</p>;
//   }

//   return (
//     <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </ul>
//   );
// }

// export default ProductList;

import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products found.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;
