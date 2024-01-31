import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const AddCategory = () => {
  
  const [category, setCategory] = useState({
    name: '',
    
  });

  const history = useHistory();

  const handleChange = (e) => {
    setCategory({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.name)  {
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
        const response = await axios.post('http://localhost:5000/api/categories', category, config);
        console.log(response.data);
        // Clear the form
        setCategory({
          name: '',
         
        });
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        
    {/* {error && <Message variant="alert-danger">{error}</Message>}
    {loading && <Loading/>} */}

<h2>Add a New Category</h2>
    <p>Please fill out the form below to add a new Category to the to The store</p>
    
    <form style={{marginTop:'20px'}} className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder='category name' value={category.name} onChange={handleChange} required />
    
   

      
        
      <button type="submit">Add Category</button>
      <p>
        {/* <Link to={redirect ? `/register?redirect=${redirect}`:"/register"}>Create Account</Link> */}
      </p>
    </form>
  </div>
   )
}

export default AddCategory