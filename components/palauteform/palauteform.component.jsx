import axios from 'axios';
import React, {useState} from 'react';
import RatingEmoji from '../ratingemoji/ratingemoji.component';
import parse from 'html-react-parser';

const PalauteForm = ({title, id ,handleToggle}) => {

  //Schema Tapahtumat -palautteen datalle
  const [formData, setFormData] = useState({
    Attached: id,
    AttachedType: "event",
    Rating: "3",
    Feedback: ""
  })
  
  const url = process.env.REACT_APP_DATABASE_URL + "SetRatingAnswers.php"
  
  //Lähettää Tapahtumat -palautteen backendille
  const postData = (data) => {
    axios({
      method: "POST",
      url: url,
      data: data,
      params: {"City": process.env.REACT_APP_CITY}
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(formData);
    console.log(formData);
    handleToggle()
  }

  return (
    <div style={{
      height: "75%",
      marginTop: 50
    }}>
      <h1 style={{
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 7,
      }}>Palaute</h1>
      <h1 style={{
        fontSize: 15,
        paddingTop: 10,
        maxHeight: 50,
        textAlign: 'center',
      }}>{parse(title)}</h1>
      <RatingEmoji onChange={(e) => setFormData({...formData, Rating: e.slice(-1)})}/>
      
      <form style={{
        width: "100%",
        textAlign: 'center',
        
      }}>
        <textarea 
          onChange={(e) => setFormData({...formData, Feedback: e.target.value})}
          placeholder="Anna palaute" 
          id="textarea" 
          style={{
            width: "80%",
            marginTop: 30,
            minHeight: 100,
            maxHeight: 100,
            padding: 10,
            borderRadius: 10
          }}
        />
      </form>
        <button 
          onClick={(e) => handleSubmit(e)}
          className="btn" style={{
          height: 40,
          borderRadius: 30,
          marginBottom: -30,
          width: "80%",
          marginLeft: "10%",
          backgroundColor: "rgb(13, 104, 139)",
          color: "white"
        }}>Lähetä</button>
    </div>
  )
}

export default PalauteForm;