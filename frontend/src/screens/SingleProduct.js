import React, { useEffect,useState} from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import {useDispatch,useSelector} from "react-redux";
import Loading from "../components/LoadingError/Loading";
import {createProductReview, listProductDetails } from "../Redux/Actions/ProductActions";
import { PRODUCTION_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
import axios from "axios";

const SingleProduct = ({ history , match }) => {
const [qty, setQty] = useState(1);
const [rating, setRating] = useState(1);
const [comment, setComment] = useState("");
const isAdmin = JSON.parse(localStorage.getItem('userInfo')).isAdmin
const token = JSON.parse(localStorage.getItem('userInfo')).token

const productId=match.params.id;
const dispatch=useDispatch();

const productDetails=useSelector((state)=>state.productDetails);
const {loading,error,product}=productDetails;

const userLogin=useSelector((state)=>state.userLogin);
const { userInfo }=userLogin;


const productReviewCreate=useSelector((state)=>state.productReviewCreate);
const { 

  loading : loadingCreateReview, 
  error : errorCreateReview,
  success: successCreateReview

}=productReviewCreate;
const hanldeDeletBook = () => {
  const response=window.confirm("Are you sure you want to delete this book?")

    try {
      axios.delete(`/api/books/${productId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }

      })
      history.push("/")

     
    } catch (error) {
      alert("Something went wrong")
      

    }
   


}

  useEffect(()=>{
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({type:PRODUCTION_CREATE_REVIEW_RESET})
    }
    dispatch(listProductDetails(productId))
  },[dispatch,productId,successCreateReview]);


  const AddToCartHandle = (e) => {
    e.preventDefault();
    
    history.push(`/cart/${productId}`);
    
  }
  // console.log("fsfsdf",product.rating)
const submitHandler=(e)=>{
e.preventDefault();
dispatch(createProductReview(productId,{
  rating,
  comment
}))
}

  return (
    <>
      <Header />
      <div className="container single-product">
        {
          loading ? (
            <Loading/>
          )
          : error ? (
            <Message variant="alert-danger">
              {error}
            </Message>
          )
          :
          (
            <>
                    <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{product.name}</div>
              </div>
              <p>{product.description}</p>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  
                  <span>{product.title}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {product.countInStock > 0 ? (
                    <span>In Store</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Reviews</h6>
                  <Rating
                    value={product.rating}
                    text={`${product.rating} reviews`}
                  />
                </div>
                {product.countInStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center"> 
                      <h6>Quantity</h6>
                      <h6>1</h6>
                    </div>
                    {/* if admin delete the book button */}
                    {isAdmin && (
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <button onClick={hanldeDeletBook} className="btn btn-danger">Delete Book</button>
                      </div>
                    )}

                    {!isAdmin && (
                       <button onClick={AddToCartHandle} className="round-black-btn">Reserve book</button>
                    )}
                   
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* RATING */}
        <div className="row my-5">
          <div className="col-md-6">
            <h6 className="mb-3">REVIEWS</h6>
            {
              product.reviews === 0 && (
                <Message variant={"alert-info mt-3"}>No Reviews</Message>
              )}
            {
              product.reviews.map((review)=>(
              <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
              <strong>{review.name}</strong>
              <Rating value={review.numsReviews}/>
              <span>{moment(review.createdAt).calendar()}</span>
              <div className="alert alert-info mt-3">
                {
                  review.comment
                }
              </div>
            </div>
              ))
            }

          </div>
          <div className="col-md-6">
            <h6>WRITE A CUSTOMER REVIEW</h6>
            <div className="my-4">
              {loadingCreateReview && <Loading/>}
              {errorCreateReview && (
                <Message variant="alert-danger">{errorCreateReview}</Message>
              )}
              </div>

              {
                userInfo ? (
                             <form onSubmit={submitHandler}>
              <div className="my-4">
                <strong>Rating</strong>
                <select value={rating} onChange={(e)=>setRating(e.target.value)} className="col-12 bg-light p-3 mt-2 border-0 rounded">
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="my-4">
                <strong>Comment</strong>
                <textarea
                  row="3"
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                ></textarea>
              </div>
              <div className="my-3">
                <button disabled={loadingCreateReview} className="col-12 bg-black border-0 p-3 rounded text-white">
                  SUBMIT
                </button>
              </div>
            </form> 
                )
                :
                           <div className="my-3">
              <Message variant={"alert-warning"}>
                Please{" "}
                <Link to="/login">
                  " <strong>Login</strong> "
                </Link>{" "}
                to write a review{" "}
              </Message>
            </div> 
              }
          </div>
        </div>
            </>
          )
        }
         


      </div>
    </>
  );
};

export default SingleProduct;