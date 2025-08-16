'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/functional/ProductCard';
import { productData } from '@/types/product';

// Sample saree products data
const sampleSareeProducts: productData[] = [
  {
    _id: "1",
    name: "Banarasi Silk Saree",
    description: "Elegant Banarasi silk saree with golden zari work, perfect for weddings and special occasions.",
    price: 4500,
    category: "Sarees",
    subCategory: "Banarasi",
    images: ["/placeholder.svg"],
    stockQuantity: 15,
    availableSizesColors: [
      {
        size: "One Size",
        dimensions: "Length: 5.5m, Width: 1.2m",
        stockQuantity: 15,
        combination_price: 4500
      }
    ],
    isAvailable: true,
    discountPercentage: 10,
    tags: ["silk", "wedding", "traditional"],
    carousel: false,
    most_selling_product: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    product_specification: {
      material: "Pure Silk",
      careInstruction: "Dry clean only",
      dimensions: "Length: 5.5m, Width: 1.2m"
    }
  },
  {
    _id: "2",
    name: "Kanjivaram Silk Saree",
    description: "Traditional Kanjivaram silk saree with intricate temple border design.",
    price: 3800,
    category: "Sarees",
    subCategory: "Kanjivaram",
    images: ["/placeholder.svg"],
    stockQuantity: 8,
    availableSizesColors: [
      {
        size: "One Size",
        dimensions: "Length: 5.5m, Width: 1.2m",
        stockQuantity: 8,
        combination_price: 3800
      }
    ],
    isAvailable: true,
    discountPercentage: 15,
    tags: ["silk", "traditional", "south indian"],
    carousel: false,
    most_selling_product: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    product_specification: {
      material: "Pure Silk",
      careInstruction: "Dry clean only",
      dimensions: "Length: 5.5m, Width: 1.2m"
    }
  },
  {
    _id: "3",
    name: "Chantilly Lace Saree",
    description: "Modern lace saree with delicate floral patterns, perfect for evening events.",
    price: 2999,
    category: "Sarees",
    subCategory: "Designer",
    images: ["/placeholder.svg"],
    stockQuantity: 12,
    availableSizesColors: [
      {
        size: "One Size",
        dimensions: "Length: 5.5m, Width: 1.2m",
        stockQuantity: 12,
        combination_price: 2999
      }
    ],
    isAvailable: true,
    discountPercentage: 5,
    tags: ["lace", "designer", "evening wear"],
    carousel: false,
    most_selling_product: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    product_specification: {
      material: "Silk Blend",
      careInstruction: "Hand wash cold",
      dimensions: "Length: 5.5m, Width: 1.2m"
    }
  },
  {
    _id: "4",
    name: "Bandhani Silk Saree",
    description: "Vibrant Bandhani saree with traditional tie-dye patterns, perfect for festivals.",
    price: 3200,
    category: "Sarees",
    subCategory: "Bandhani",
    images: ["/placeholder.svg"],
    stockQuantity: 10,
    availableSizesColors: [
      {
        size: "One Size",
        dimensions: "Length: 5.5m, Width: 1.2m",
        stockQuantity: 10,
        combination_price: 3200
      }
    ],
    isAvailable: true,
    discountPercentage: 12,
    tags: ["bandhani", "traditional", "festival"],
    carousel: false,
    most_selling_product: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    product_specification: {
      material: "Pure Silk",
      careInstruction: "Dry clean only",
      dimensions: "Length: 5.5m, Width: 1.2m"
    }
  },
  {
    _id: "5",
    name: "Chiffon Floral Print Saree",
    description: "Lightweight chiffon saree with beautiful floral prints, ideal for summer parties.",
    price: 1899,
    category: "Sarees",
    subCategory: "Chiffon",
    images: ["/placeholder.svg"],
    stockQuantity: 20,
    availableSizesColors: [
      {
        size: "One Size",
        dimensions: "Length: 5.5m, Width: 1.2m",
        stockQuantity: 20,
        combination_price: 1899
      }
    ],
    isAvailable: true,
    discountPercentage: 20,
    tags: ["chiffon", "floral", "summer"],
    carousel: false,
    most_selling_product: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    product_specification: {
      material: "Chiffon",
      careInstruction: "Hand wash cold",
      dimensions: "Length: 5.5m, Width: 1.2m"
    }
  },
  {
    _id: "6",
    name: "Paithani Silk Saree",
    description: "Traditional Paithani saree with peacock motifs, a symbol of Maharashtrian heritage.",
    price: 5500,
    category: "Sarees",
    subCategory: "Paithani",
    images: ["/placeholder.svg"],
    stockQuantity: 5,
    availableSizesColors: [
      {
        size: "One Size",
        dimensions: "Length: 5.5m, Width: 1.2m",
        stockQuantity: 5,
        combination_price: 5500
      }
    ],
    isAvailable: true,
    discountPercentage: 8,
    tags: ["silk", "traditional", "maharashtrian"],
    carousel: false,
    most_selling_product: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    product_specification: {
      material: "Pure Silk",
      careInstruction: "Dry clean only",
      dimensions: "Length: 5.5m, Width: 1.2m"
    }
  }
];

export default function SareePage() {
  const [products, setProducts] = useState<productData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleSareeProducts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sarees Collection</h1>
        <p className="text-gray-600">Discover our exquisite collection of traditional and designer sarees</p>
      </div>

      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Sarees</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition">
          Load More Sarees
        </button>
      </div>
    </div>
  );
}