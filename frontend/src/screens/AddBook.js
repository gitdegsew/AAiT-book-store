import React, { useState } from 'react'
import axios from 'axios';

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    countInStock: '',
    bookcode: '',
    image: '',
    forstaffonly: false,
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.description || !book.category || !book.countInStock || !book.bookcode || !book.image) {
      alert('Please fill all the fields');
    } else {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post('/api/books/all', book, config);
        console.log(response.data);
        // Clear the form
        setBook({
          title: '',
          author: '',
          description: '',
          category: '',
          countInStock: '',
          bookcode: '',
          image: '',
          forstaffonly: false,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        
    {/* {error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading/>} */}

<h2>Add a New Book</h2>
    <p>Please fill out the form below to add a new book to the library. All fields are required.</p>
    
    <form style={{marginTop:'20px'}} className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
    <input type="text" name="title" placeholder='title' value={book.title} onChange={handleChange} required />
    
    <input type="text" name="author" placeholder='author' value={book.author} onChange={handleChange} required />
   
    <textarea 
  name="description" 
  value={book.description} 
  onChange={handleChange} 
  placeholder='description'
  required 
  style={{ 
    marginTop:"20px",
    width: '100%', 
    minHeight: '100px', 
    padding: '10px', 
    fontSize: '16px', 
    borderRadius: '4px', 
    border: '1px solid #ccc' 
  }}
/>

      
        <input type="text" name="category" placeholder='category' value={book.category} onChange={handleChange} required />

        
        <input type="number" name="countInStock" placeholder='contInStock' value={book.countInStock} onChange={handleChange} required />

        
        <input type="text" name="bookcode" placeholder='bookcode' value={book.bookcode} onChange={handleChange} required />

        
        <input type="text" name="image" placeholder='image url' value={book.image} onChange={handleChange} required />

        <div style={{display:'flexbox',flexDirection:'row', marginTop:"20px"}} >
        <label>For Staff Only:</label>
        <input type="checkbox" name="forstaffonly" checked={book.forstaffonly} onChange={e => setBook({ ...book, forstaffonly: e.target.checked })} />
        </div>
      <button type="submit">Add Book</button>
      <p>
        {/* <Link to={redirect ? `/register?redirect=${redirect}`:"/register"}>Create Account</Link> */}
      </p>
    </form>
  </div>
   )
}

export default AddBook