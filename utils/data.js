import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Leon",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jeon",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Product-1",
      slug: "product-1",
      category: "product-cat-1",
      image: "/images/Gon.jpg",
      price: 24,
      brand: "brand-1",
      rating: "4.5",
      numReviews: 8,
      stockNum: 10,
      description: "product-1 from brand-1",
    },
    {
      name: "Product-2",
      slug: "product-2",
      category: "product-cat-2",
      image: "/images/ICE.png",
      price: 40,
      brand: "brand-2",
      rating: "4.0",
      numReviews: 4,
      stockNum: 1,
      description: "product-2 from brand-2",
    },
    {
      name: "Product-3",
      slug: "product-3",
      category: "product-cat-3",
      image: "/images/ICE.png",
      price: 45,
      brand: "brand-3",
      rating: "3.5",
      numReviews: 2,
      stockNum: 12,
      description: "product-3 from brand-3",
    },
    {
      name: "Product-4",
      slug: "product-4",
      category: "product-cat-4",
      image: "/images/Gon.jpg",
      price: 40,
      brand: "brand-4",
      rating: "3.5",
      numReviews: 2,
      stockNum: 0,
      description: "product-4 from brand-4",
    },
    {
      name: "Product-5",
      slug: "product-5",
      category: "product-cat-5",
      image: "/images/ICE.png",
      price: 55,
      brand: "brand-5",
      rating: "2.5",
      numReviews: 2,
      stockNum: 12,
      description: "product-5 from brand-5",
    },
    {
      name: "Product-6",
      slug: "product-6",
      category: "product-cat-6",
      image: "/images/ICE.png",
      price: 45,
      brand: "brand-6",
      rating: "3.5",
      numReviews: 2,
      stockNum: 12,
      description: "product-6 from brand-6",
    },
  ],
};

export default data;
