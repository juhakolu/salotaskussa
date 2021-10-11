//Yksittäinen tiedotekortti tiedotteet sivulle tiedotteet containeriin

import React from 'react';
import './tiedotteet-card.style.css';
import {Card} from 'react-bootstrap';
import * as AiIcons from 'react-icons/ai';
import parse from "html-react-parser";

const TiedotteetCard = ({data, setCurrentUrl, openInfo}) => {

  return (
    <>
      <Card className="card" style={{
        margin: "3px 0px 0px 5%",
        padding: "5px 0px",
        width: "90%",
        overflow: "scroll",
        backgroundColor: "rgba(0,0,0,0)",
        border: "none",
        // color: "",
        borderBottom: "0.5px solid lightgrey",
        borderRadius: 0,
        scrollbarWidth: 0
      }}>
          <Card.Body>
          <Card.Title 
          onClick={() => {
            setCurrentUrl(data.url ? data.url : "")
            openInfo();
          }}
          style={{
            fontSize: "min(3.5vw, 25px)",
            marginTop: -10,
            marginLeft: 15
          }}>{parse(data.title)}
          <AiIcons.AiOutlineInfoCircle 
            size={20}
            color="grey"
            style={{
              position: 'absolute',
              left: 0,
              top: "37%",
            }}
          />
          <p style={{fontSize: "0.8em", marginTop: 5, marginBottom: -25}}>{`${data.date.slice(8,10)}.${data.date.slice(5,7)}.${data.date.slice(0,4)}`}</p>
          </Card.Title>
          
          </Card.Body>
      </Card>
          
    </>
  )
}

export default TiedotteetCard;