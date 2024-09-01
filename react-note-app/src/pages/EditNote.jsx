import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './EditNote.css';
import axios from 'axios';

function EditNote() {
  const { slug } = useParams(); // Get the unique identifier for the note from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Fetch existing note data when the component mounts
    axios
      .get(`http://127.0.0.1:8000/notes/${slug}/`)
      .then((response) => {
        setTitle(response.data.title);
        setBody(response.data.body);
        setCategory(response.data.category); 
      })
      .catch((err) => {
        console.error('Error fetching data:', err.message);
      });
  }, [slug]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the updated data
    const updatedNote = {
      title: title,
      body: body,
      category: category.toUpperCase(), // Ensure category is uppercase
    };

    // Send PUT request to update the note
    axios
      .put(`http://127.0.0.1:8000/notes/edit/${slug}/`, updatedNote)
      .then((response) => {
        console.log('Note updated successfully:', response.data);
        navigate(`/notes/${slug}`);
      })
      .catch((error) => {
        console.error('Error updating note:', error.message);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="edit-note-container">
      <h2 className="edit-note-title">Edit Note</h2>
      <form onSubmit={handleSubmit} className="edit-note-form">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Edit the title"
          required
        />
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Edit the body"
          rows="5"
          required
        ></textarea>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
        <button type="submit" className="submit-button">
          Update Note
        </button>
      </form>
    </div>
  );
}

export default EditNote;
