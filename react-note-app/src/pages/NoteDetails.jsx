import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './NoteDetails.css';
import axios from 'axios';

function NoteDetails() {
  const { slug } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    console.log("page rendered");
    axios.get(`http://127.0.0.1:8000/notes/${slug}/`)
      .then((response) => {
        setData(response.data);
      })
      .catch(err => {
        console.log("no data here");
        console.error('Error fetching data:', err.message);
      });
  }, [slug]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      axios.delete(`http://127.0.0.1:8000/notes/delete/${slug}/`)
        .then(() => {
          console.log('Note deleted successfully');
          navigate('/'); 
          window.location.reload();

        })
        .catch(err => {
          console.error('Error deleting note:', err.message);
        });
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ''; // Handle cases where the date is undefined
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    });
  };

  return (
    <div className="note-detail">
      <h2 className="title">{data.title?.toUpperCase()}</h2>
      <div className="time">
        <h3 className="create">Created: {formatDateTime(data.created)}</h3>
        <h3 className="update">Last Updated: {formatDateTime(data.updated)}</h3>
      </div>
      <div className="crud">
        <div className="edit">
          <Link to={`/notes/edit/${slug}`}>
            <FontAwesomeIcon icon={faEdit} title="Edit Note" />
            <h3>Edit</h3>
          </Link>
        </div> 
        <div className="delete" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashAlt} title="Delete Note" />
          <h3>Delete</h3>
        </div>
      </div>
      <div className="content">
        <p>{data.body}</p>
      </div>
    </div>
  );
}

export default NoteDetails;
