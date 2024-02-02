import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      reuqire: true,
    },
    author: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    reviews: [reviewSchema],
    countInStock: {
      type: Number,
      require: true,
      default: 1,
    },
    bookcode: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    forstaffonly: {
      type: Boolean,
      default: false,
    },
    numsReviews: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model("book", bookSchema);
export default book;
