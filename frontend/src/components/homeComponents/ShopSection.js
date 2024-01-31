import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { clearcart } from "../../Redux/Actions/cartActions";

const ShopSection = (props) => {
  const { keyword, pagenumber } = props;
  const dispatch = useDispatch();
  const isAdmin = JSON.parse(localStorage.getItem("userInfo"))
    ? JSON.parse(localStorage.getItem("userInfo")).isAdmin
    : false;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const removeallcart = () => {
    dispatch(clearcart());
  };
  removeallcart();

  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);
  return (
    <>
      <div className="container">
        {/* if not admin */}
        {!isAdmin && (
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="section-title">
                <h2>Our Books</h2>
                <p>
                  the library has a large collection of books. You can find the
                  book you want by searching for the book name or the author
                  name.
                </p>
              </div>
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="col-lg-12 col-md-12">
            <div className="addbook">
              <Link to="/addbook">
                <button className="btn btn-primary">Add Book</button>
              </Link>
              <Link to="/orders">
                <button className="btn btn-secondary">Show reserved books</button>
              </Link>
            </div>
          </div>
        )}

        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {products.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product._id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product._id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <Rating
                              value={product.rating}
                              text={`${product.numsReviews} reviews`}
                            />
                            <h3>{product.title}</h3>
                            <h3>{product.author}</h3>
                            <h3>{product.category}</h3>
                            {/* if count in stock is 0 show all books are reserved message */}
                            <h3>
                              {product.countInStock === 0 ? (
                                <span
                                  style={{
                                    backgroundColor: "red",
                                    marginBottom: "40px",
                                    color: "white",
                                    fontSize: "18px",
                                    borderRadius: "5px",
                                    padding: "5px",
                                  }}
                                >
                                  {" "}
                                  All books reserved{" "}
                                </span>
                              ) : (
                                product.countInStock
                              )}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
