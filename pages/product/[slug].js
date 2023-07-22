import Layout from "@/components/Layout";
import data from "@/utils/data";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Image from "next/image";
import { Store } from "@/utils/Store";

export default function ProductScreen() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  //   console.log(product.name);
  if (!product) {
    return (
      <>
        <div>Product Not Found</div>
      </>
    );
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug == product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.stockNum < quantity) {
      alert("Sorry. Product is Out of Stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <>
      <Layout title={product.name}>
        <div className="py-2">
          <Link
            href="/"
            className="text-xl rounded-md px-2 hover:bg-gray-100 active:bg-gray-200"
          >
            {" "}
            &#8592;
          </Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>
                <p className="product-stats">{product.rating}</p> Rating,{" "}
                <p className="product-stats">{product.numReviews}</p> Reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div className="card p-2 h-fit">
            <div className="mb-2 flex justify-between ">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>
                {product.stockNum > 0 ? (
                  <>
                    <p className="product-stats"> {product.stockNum}</p>{" "}
                    <p className="inline-block text-xs">in stock</p>
                  </>
                ) : (
                  <p className="inline-block text-sm">Out of stock</p>
                )}
              </div>
            </div>
            <button
              className="mt-4 primary-button w-full"
              onClick={addToCartHandler}
            >
              {" "}
              Add to Cart
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
