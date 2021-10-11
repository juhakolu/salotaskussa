//Kyselyt sivun kyselyformi

import React, { useState } from "react";
import "./kyselyform.styles.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const KyselyForm = ({ data, handleFormToggle, handleKiitos }) => {
  const [showThanks, setShowThanks] = useState(false);
  const [tekstiVastaus, setTekstiVastaus] = useState("default");

  //Schema kyselyformin datalle
  const [newData, setNewData] = useState({
    Name: "",
    Email: "",
    Answers: "",
    Feedback: "",
  });

  //Muuttaa unixajan "normaaliksi päivämääräksi"
  // const convertTime = (unixtime) => {
  //   let milliseconds = unixtime * 1000;
  //   let dateO = new Date(milliseconds);
  //   return dateO.toLocaleString()
  // }

  const url = process.env.REACT_APP_DATABASE_URL + "SetAnswers.php";
  //Lähettää kyselyform datan backendille
  const postData = (data) => {
    axios({
      method: "POST",
      url: url,
      data: data,
      params: { City: process.env.REACT_APP_CITY },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  //Post answers
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThanks(true);
    postData(newData);
    console.log(newData);
    handleKiitos();
    handleFormToggle();
  };

  const [isFeedback, setIsFeedback] = useState(false);
  const [isContact, setIsContact] = useState(false);

  return (
    <>
      <div className="form-container">
        <h1 className="question-header">{data.Name}</h1>
        <h6 className="info-header">{data.InfoText}</h6>
        {data.Questions.map((item) => {
          return (
            <div key={item.StartTime}>
              <h6 className="lil-header">{item.QuestionText}</h6>
              {item.Type === "Radio" ? (
                item.Answers.map((vastaus) => {
                  return (
                    <fieldset
                      id={vastaus.QuestionID}
                      key={item.StartTime}
                      className="radioform"
                    >
                      <label htmlFor={vastaus.AnswerText}>
                        {vastaus.AnswerText}
                      </label>
                      <input
                        onChange={(e) =>
                          setNewData({
                            ...newData,
                            Answers: e.target.value
                              ? [vastaus.AnswerID.toLocaleString()]
                              : null,
                          })
                        }
                        type="radio"
                        name="vastaus"
                      ></input>
                    </fieldset>
                  );
                })
              ) : item.Type === "Text" ? (
                <div key={item.StartTime}>
                  <textarea
                    onChange={(e) => {
                      console.log(item);
                      setTekstiVastaus(e.target.value);
                      setNewData({
                        ...newData,
                        TextAnswers: [
                          { QuestionID: item.QuestionID, Text: tekstiVastaus },
                        ],
                      });
                    }}
                    placeholder="Vastaa tähän"
                    id="textarea"
                    style={{
                      width: "80%",
                      marginLeft: "10%",
                      // marginTop: 30,
                      minHeight: 100,
                      maxHeight: 100,
                      padding: 10,
                      borderRadius: 10,
                    }}
                  />
                </div>
              ) : item.Type === "MoVal" ? (
                item.Answers.map((vastaus) => {
                  return (
                    <fieldset
                      id={vastaus.QuestionID}
                      key={item.StartTime}
                      className="radioform"
                    >
                      <label htmlFor={vastaus.AnswerText}>
                        {vastaus.AnswerText}
                      </label>
                      <input
                        onChange={(e) =>
                          setNewData({
                            ...newData,
                            Answers: e.target.value
                              ? [
                                  ...newData.Answers,
                                  vastaus.AnswerID.toLocaleString(),
                                ]
                              : null,
                          })
                        }
                        type="checkbox"
                      ></input>
                    </fieldset>
                  );
                })
              ) : null}
            </div>
          );
        })}
        {data.Contact == 1 ? (
          <div>
            <h6 className="lil-header">Nimi</h6>
            <input
              onChange={(e) => setNewData({ ...newData, Name: e.target.value })}
              placeholder="Anna nimesi"
              className="textinput"
              type="text"
              style={{
                width: "80%",
                marginLeft: "10%",
                // marginTop: 30,
                minHeight: 20,
                maxHeight: 100,
                padding: 10,
                borderRadius: 10,
              }}
            />
          </div>
        ) : null}
        {data.Contact == 1 ? (
          <div>
            <h6 className="lil-header">Sähköposti</h6>
            <input
              onChange={(e) =>
                setNewData({ ...newData, Email: e.target.value })
              }
              className="textinput"
              placeholder="Anna sähköposti"
              type="text"
              style={{
                width: "80%",
                marginLeft: "10%",
                // marginTop: 30,
                minHeight: 20,
                maxHeight: 100,
                padding: 10,
                borderRadius: 10,
              }}
            />
          </div>
        ) : null}
        {data.Feedback == 1 ? (
          <div>
            <h6 className="lil-header">Palaute</h6>
            <textarea
              onChange={(e) =>
                setNewData({ ...newData, Feedback: e.target.value })
              }
              placeholder="Vapaa palaute"
              id="textarea"
              style={{
                width: "80%",
                marginLeft: "10%",
                // marginTop: 30,
                minHeight: 100,
                maxHeight: 100,
                padding: 10,
                borderRadius: 10,
              }}
            />
          </div>
        ) : null}
        <button
          onClick={(e) => handleSubmit(e)}
          className="btn"
          style={{
            height: 40,
            borderRadius: 30,
            marginTop: 20,
            marginLeft: "10%",
            marginBottom: 20,
            width: "80%",
            backgroundColor: "rgb(13, 104, 139)",
            color: "white",
          }}
        >
          Lähetä
        </button>
      </div>
    </>
  );
};

export default KyselyForm;
