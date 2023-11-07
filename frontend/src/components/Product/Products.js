import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../redux/actions/product";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const Products = () => {
  const {
    loading,
    products,
    resultPerPage,
    productCount,
    filterProductsCount,
    error,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const Categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "TShirts",
    "Mobile"
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 500000]);
  const [rating, setRating] = useState(0);

  const handlePriceChange = (e, newPrice) => {
    setPrice(newPrice);
  };

  const handleRating = (e, newRating) => {
    setRating(newRating);
  };

  const params = useParams();
  const keyword = params.keyword;

  const setCurrPage = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(loadProducts(keyword, currentPage, price, category, rating));
    if (error) {
      dispatch({ type: "clearError" });
      toast.error(error);
    }
  }, [dispatch, error, keyword, currentPage, price, category, rating]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products -- ECOMMERCE-MERN" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              aria-labelledby="range-slider"
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={50000}
            />

            <Typography>Category</Typography>
            <div className="categoryBox">
              <ul>
                {Categories && Categories.map((category) => (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <Typography component={"legend"}>Ratings Above</Typography>
            <fieldset>
              <Slider
                aria-labelledby="contniuos-slider"
                value={rating}
                onChange={handleRating}
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < filterProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrPage}
                prevPageText="Pre"
                nextPageText="Next"
                firstPageText="First"
                lastPageText="Last"
                activeClass="pageItemActive"
                linkClass="page-link"
                itemClass="page-item"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Products;
