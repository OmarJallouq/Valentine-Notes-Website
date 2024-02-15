import React, {useEffect, useState} from 'react';
import '../styles/adduser.css'

function AddUser() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [nameCharacterError, setNameCharacterError] = useState(false);
    const [emailCharacterError, setEmailCharacterError] = useState(false);

    useEffect(() => {
        fetchItems();
    });
    
    function convertToTitleCase(str) {
        if (!str) {
            return ""
        }
        return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
    }

    const fetchItems = async () => {
        try {
            const response = await fetch(`${process.env.USERLINK}`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNameChange = (event) => {
        const newName = event.target.value;

        if (newName.length){
            setNameCharacterError(false);
        }
        else{
            setNameCharacterError(true);
        }

        setName(convertToTitleCase(newName));
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;

        if (newEmail.length){
            setEmailCharacterError(false);
        }
        else{
            setEmailCharacterError(true);
        }

        setEmail(newEmail.toLowerCase());
    };

    const handleSubmit = (event) => {
        if (nameCharacterError || emailCharacterError) {
            event.preventDefault();
            // Optionally, you can display an error message to the user
            alert('There were errors with your submission. Please check the form.');
        }

        const isNameUnique = !users.some(user => user.name.toLowerCase() === name.toLowerCase());
        const isEmailUnique = !users.some(user => user.email.toLowerCase() === email.toLowerCase());

        if (!isNameUnique) {
            // Display an error message for duplicate name
            event.preventDefault();
            alert('User with this name already exists.');
            return;
        }

        if (!isEmailUnique) {
            event.preventDefault();
            // Display an error message for duplicate email
            alert('User with this email already exists.');
            return;
        }
    };

    return(
        <section>
            <form class="form" method="POST" action="/api/addUser" onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input name="name" placeholder='Firstname Lastname' onChange={handleNameChange}></input>
                </div>
                <div>
                    <label>Email:</label>
                    <input name="email" placeholder='Email' onChange={handleEmailChange}></input>
                </div>
                <input type="submit" value="Send" disabled={!name.trim() || !email.trim()}/>
            </form>
        </section>
    );
}

export default AddUser;