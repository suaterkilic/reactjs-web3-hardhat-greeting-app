import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { contractABI, contractAddress, myAddress } from "./utils/constants";
import "./App.css";

const web3 = new Web3("ws://localhost:8545");
const greeterContract = new web3.eth.Contract(contractABI, contractAddress);
const App = () => {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const getGreetingMessage = async () => {
    return await greeterContract.methods.greet().call();
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const updateGreeting = async () => {
    await greeterContract.methods
      .setGreeting(newMessage)
      .send({ from: myAddress });

    setMessage(await getGreetingMessage());
  };

  useEffect(
    () => async () => {
      const message = await getGreetingMessage();
      setMessage(message);
    },
    []
  );

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <input
            onChange={handleInputChange}
            type="text"
            name="greeting"
            placeholder="Update greeting"
          />
          <button className="btn update-greet-btn" onClick={updateGreeting}>
            UPDATE GREETINGS
          </button>
        </div>
        <div className="wrapper">
          <div className="message-content">
            <strong>Default Message:</strong>
            <span>{message}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
