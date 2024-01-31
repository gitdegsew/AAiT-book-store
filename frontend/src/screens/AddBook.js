import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';




const AddBook = () => {
  
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    
    countInStock: '',
    bookcode: '',
    image: '',
    forstaffonly: false,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.description || !selectedCategory || !book.countInStock || !book.bookcode || !book.image) {
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
        const response = await axios.post('http://localhost:5000/api/books', {...book,category:selectedCategory}, config);
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
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  };
// get categories first
  useEffect(() => {
    const fetchCategories = async () => {
      
      const token = JSON.parse(localStorage.getItem('userInfo')).token
      try {
       
      const { data } = await axios.get('http://localhost:5000/api/categories/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });
      console.log(data);
      setCategories(data);
      setLoading(false);
        
      } catch (error) {
        console.error(error);
        setLoading(false);
        
      }
    };
    fetchCategories();
  }
  , []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center login-center">
      {/* go back */}
    
    
        
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

      
        <select style={{height:"60px", width:"300px",marginTop:"20px"}}  name="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category}>
              {category.name}
            </option>
          ))}
        </select>

        
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