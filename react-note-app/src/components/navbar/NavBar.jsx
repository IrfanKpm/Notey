import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'; 
import './NavBar.css';

function NavBar({onSearchChange}) {
  const handleInputChange = (event) => {onSearchChange(event.target.value)};
  return (
    <nav>
      <h1 className="logo"><a href="/">𝓝𝓸𝓽𝓮𝔂</a></h1>
      <div className="form-container">
        <form>
          <input type="text" placeholder='search' onChange={handleInputChange} required />
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='MagnifyingGlass' />
          </button>
        </form>
      </div>
      <div className="add-note">
         <a href="/addnote/">Add Notes</a>
      </div>
    </nav>
  );
}

export default NavBar;

