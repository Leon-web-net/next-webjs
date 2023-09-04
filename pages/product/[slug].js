import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Image from "next/image";
import { Store } from "@/utils/Store";
import db from "@/utils/db";
import Product from "@/models/Product";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductScreen(props) {
  const { product } = props;

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  if (!product) {
    return (
      <>
        <Layout>
          <div>Product Not Found</div>
        </Layout>
      </>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug == product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    // console.log(data);

    if (data.stockNum < quantity) {
      return toast.error("Sorry. Product is out of stock");
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

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
