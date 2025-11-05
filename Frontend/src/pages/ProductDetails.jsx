import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../features/products/productSlice";
import { addAndUpdateCart, selectCartItems } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { navigate, toast } = useContext(AppContext);
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  const cartItem = cartItems.find((item) => item.product?._id === product?._id);

  useEffect(() => {
    if (product && products.length > 0) {
      const filtered = products.filter(
        (item) =>
          product.category._id === item.category._id && item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [product, products]);

  useEffect(() => {
    setThumbnail(product?.images[0] ? product.images[0] : null);
  }, [product]);

  if (!product) {
    return (
      <div className="text-2xl text-gray-500 flex items-center justify-center h-[80vh]">
        Product not found or is loading...
      </div>
    );
  }

  return (
    <div className="mt-12">
      <p>
        <Link to={"/"}>Home</Link> /<Link to={"/products"}> Products</Link> /
        <Link to={`/products/${product?.category?.name.toLowerCase()}`}>
          {product?.category?.name}
        </Link>
        /<span className="text-emerald-600"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          <p className="tracking-tighter text-base">
            From {product.seller.storeName}
          </p>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-lg ${
                    i < 4 ? "text-emerald-500" : "text-emerald-100"
                  }`}
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          <div className="mt-6">
            {product.offerPrice ? (
              <>
                <p className="text-gray-500/70 line-through">
                  MRP: ₹{product.price}
                </p>
                <p className="text-2xl font-medium">
                  MRP: ₹{product.offerPrice}
                </p>
              </>
            ) : (
              <p className="text-2xl font-medium">MRP: ₹{product.price}</p>
            )}
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>
          <div className="mt-4 text-base">
            {product.stockQuantity === 0 ? (
              <p className="font-semibold text-red-600">Out Of Stock</p>
            ) : product.stockQuantity <= 10 ? (
              <p className="font-semibold text-orange-500">
                Only {product.stockQuantity} left in stock - order soon!
              </p>
            ) : (
              <p className="font-semibold text-emerald-600">In Stock</p>
            )}
          </div>
          <p className="text-base font-medium mt-6">About Product</p>
          <p className="text-sm text-gray-500 px-1">{product.description}</p>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => {
                if (product.stockQuantity === 0) {
                  toast.error("Out of stock");
                  return;
                }
                dispatch(
                  addAndUpdateCart({
                    product,
                    quantity: (cartItem?.quantity || 0) + 1,
                  })
                );
              }}
              // disabled={product.stockQuantity === 0}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                if (product.stockQuantity === 0) {
                  toast.error("Out of stock");
                  return;
                }
                dispatch(
                  addAndUpdateCart({
                    product,
                    quantity: (cartItem?.quantity || 0) + 1,
                  })
                );
                navigate("/cart");
              }}
              // disabled={product.stockQuantity === 0}
              className="w-full py-3.5 cursor-pointer font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition flex flex-col items-center justify-center"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      {/* Related Products*/}
      <div className=" flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-2xl md:text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-emerald-600 rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-6 w-full justify-items-center">
          {relatedProducts
            .filter((product) => product.stockQuantity > 0)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-emerald-600 hover:bg-emerald-600/10 transition"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
