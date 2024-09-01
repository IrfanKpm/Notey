import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import './CardContainer.css';

function CardContainer({ category, query }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let url = 'http://127.0.0.1:8000/'; // Default URL

        if (query.length > 0) {
          // Fetch notes based on query
          url = `http://127.0.0.1:8000/notes/search/${query}/`;
        } else if (category !== '0') {
          // Fetch notes based on category
          url = `http://127.0.0.1:8000/notes/filter/${category}/`;
        }

        console.log(url)

        const response = await axios.get(url);
        let fetchedNotes = response.data;

        if (query.length > 0 && category !== '0') {
          // If query is present, filter notes by category manually
          fetchedNotes = fetchedNotes.filter(note =>
            note.category === category
          );
        }

        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      }
    };

    fetchNotes();
  }, [category, query]);

  return (
    <div className="note-container">
      {notes.map((note, index) => (
        <Card
          key={index}
          title={note.title}
          date={note.date}
          body={note.body}
          category={note.category}
          slug={note.slug}
        />
      ))}
    </div>
  );
}

export default CardContainer;
