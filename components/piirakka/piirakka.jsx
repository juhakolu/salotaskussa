//Piirakka komponentti etusivulle

import React, {useState, useEffect} from 'react';
import { PieChart } from "react-minimal-pie-chart";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './piirakka.styles.css'

const Piirakka = ({title, answers}) => {
  let ind = 0;

  const [vastausData, setVastausData] = useState([]);

  const setData = () => {
    let temp = [];
    const colors = ["#7FFF7F", "#7F7FFF", "#FF6666", "#FF7FFF", "#7FFFFF", "#FFFF7F", "#515151", "#FF9B5E", "#99356A", "#724C99", "#6D824E", "#825834"];
    for(let item of answers){
      temp.push({title: item.AnswerText, value: parseInt(item.AnswerCount), color: colors[ind]})
      ind += 1
    }
    setVastausData(temp);
  }

  useEffect(() => {
    setData()
  }, [])

  return (
    <div className="piecard" style={{ maxWidth: 300,  width: "100%", marginTop: 40,borderRight: "1px solid lightgrey", height: "100%", paddingBottom: 10}}>
      
      <Link style={{color: "black"}} to="/kyselyt">
      <p style={{fontSize: 12, textAlign: 'center', width:"100%"}}>{title}</p>
      <div style={{height: "100%", overflow: "none", display: "flex"}}>
        <PieChart
          style={{
            width: 60,
            position: "relative",
            left: 10,
          }}
          data={vastausData}
          />

          {/*Vastaukset tekstinä*/}
          <div className="pievastaukstext" style={{maxHeight: 95, minWidth: 220, marginLeft: 20, overflow: 'scroll'}}>
            {
              vastausData.map(item => {
                return (
                  <div
                    key={uuidv4()} 
                    style={{
                      fontSize: 11,
                      marginLeft: 10,
                    }}
                    >
                      <div style={{
                        width: 7, 
                        height: 7, 
                        backgroundColor: item.color, 
                        float: "left", 
                        marginTop: 5, 
                        marginRight: 10}}>
                      </div>
                      {item.title}
                  </div>
                )
              })
            }
          </div>
      </div>
      </Link>
    </div>
    );
};

export default Piirakka;

