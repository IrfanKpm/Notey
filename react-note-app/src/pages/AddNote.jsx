import React, { useState } from 'react';
import './AddNote.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AddNote() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the new note data
    const newNote = {
      title: title,
      body: body,
      category: category.toUpperCase() // Ensure category is uppercase
    };

    // POST request to add the new note
    axios
      .post('http://127.0.0.1:8000/notes/add/', newNote)
      .then((response) => {
        console.log('Note added successfully:', response.data);
        // Navigate to the home page after successful addition
        navigate('/'); // Redirect to home page
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding note:', error.message);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="add-note-container">
      <h2 className="add-note-title">Add New Note</h2>
      <form onSubmit={handleSubmit} className="add-note-form">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title"
          required
        />
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter the body"
          rows="5"
          required
        ></textarea>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
        <button type="submit" className="submit-button">Add Note</button>
      </form>
    </div>
  );
}

export default AddNote;
