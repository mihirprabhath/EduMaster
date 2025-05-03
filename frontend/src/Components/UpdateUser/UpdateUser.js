import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import './UpdateUser.css' // Import the CSS file

function UpdateUser() {
    const [input, setInputs] = useState({});
    const navigate = useNavigate();
    const  id  = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
             .get(`http://localhost:5000/users/${id}`)
            .then((res) => res.data)
             .then((data) => setInputs(data.user));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async () => {
        await axios
         .put(`http://localhost:5000/users/${id}`,
            {
                name: String(input.name),
                email: String(input.email), // Changed from gmail to email
                age: Number(input.age),
                address: String(input.address),
            })
            .then((res) => res.data);
        };

        const handleChange = (e) => {
            setInputs((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }));
          };

          const handleSubmit = (e) => {
            e.preventDefault();
            sendRequest().then(() => {
              navigate("/userdetails");
            });
          };
            
    return (
        <div className="update-user-container">
            <h1>Update User</h1>

            <form className="styled-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    value={input.name || ''}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={input.email || ''}
                    required
                />

                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    onChange={handleChange}
                    value={input.age || ''}
                    required
                />

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    value={input.address || ''}
                    required
                />

                <button type="submit">Update User</button>
            </form>
        </div>
    )
}

export default UpdateUser