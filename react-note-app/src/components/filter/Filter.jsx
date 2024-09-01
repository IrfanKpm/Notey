import React,{useEffect,useState} from 'react'
import './Filter.css'
import CardContainer from '../card/CardContainer';

function Filter({query}) {
   const [selectedCategory, setSelectedCategory] = useState('0');

   const handleCategoryChange = (event) => {
     setSelectedCategory(event.target.value);
   };
 
   return (
     <div className="filter-container">
       {/* <h2>{query}</h2> */}
       <select
         name="topic"
         id="topic"
         className='topic'
         value={selectedCategory}
         onChange={handleCategoryChange}
       >
         <option value="0">All Topic</option>
         <option value="BUSINESS">Business</option>
         <option value="PERSONAL">Personal</option>
         <option value="IMPORTANT">Important</option>
       </select>
       <CardContainer category={selectedCategory} query={query}/>
     </div>
   );
 }
 
 export default Filter;
