import { useState } from 'react';
import './App.css'; 
import contactsData from './contacts.json';

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  function handleClick() {
    const newContacts = contactsData[Math.floor(Math.random() * contactsData.length)]; 
    setContacts([newContacts, ...contacts])
  }

  function clickToSortByPopularity() {
    const popularContacts = [...contacts].sort((a, b) => b.popularity - a.popularity); 
    setContacts(popularContacts)
  }

  function clickToSortByName() {
    const orderedContacts = [...contacts].sort((a, b) => {
      let nameOne = a.name.toUpperCase(); 
      let nameTwo = b.name.toUpperCase(); 
      return nameOne.localeCompare(nameTwo)
    }); 
    setContacts(orderedContacts) 
  }

  function clickToDelete(id) {
    const deleteContacts = [...contacts].filter(contacts => contacts.id !== id)
    console.log(id)
    setContacts(deleteContacts)
  }

  return (
    <div className='content'>
      <h1 className='IronContacts'>IronContacts</h1>
      <div className='btn'>
        <button onClick={handleClick}>Add Random Contact</button>
        <button onClick={clickToSortByPopularity}>Sort by popularity</button> 
        <button onClick={clickToSortByName}>Sort by name</button>
      </div>
      <table className='table-content'>
        <thead>
          <tr>
            <td>Picture</td>
            <td>Name</td>
            <td>Popularity</td>
            <td>Won<br></br>Oscar</td>
            <td>Won<br></br>Emmy</td>
          </tr>
        </thead>
        <tbody>          
          {contacts.map(contact => {
            return (
              <tr key={contact.id}>
                <td className='tdPhoto'><img src={contact.pictureUrl} alt="" height="90"></img> </td>
                <td className='tdName'>{contact.name}</td>
                <td className='tdPopularity'>{Math.round(contact.popularity * 100)/100}</td>
                <td className='tdOscar'>{contact.wonOscar ? <p>🏆</p> : <p>❌</p>}</td>
                <td className='tdEmmy'>{contact.wonEmmy ? <p>🏆</p> : <p>❌</p>}</td>
                <td className='tdRemove'><button onClick={() => clickToDelete(contact.id)}>Delete</button></td>
              </tr>
            ) 
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
