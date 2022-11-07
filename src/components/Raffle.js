import 'antd/dist/antd.css';
import { Button, Card, DatePicker, Divider, Input, Form, Progress, Slider, Spin } from "antd";
import React, { useState } from "react";
import {useLocation} from "react-router-dom";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core"
import { injected } from "./wallet/Connectors"
import Web3 from 'web3'
import raffleFactory from "../raffleFactory"


function getLibrary(provider) {
  return new Web3(provider)
}

// send data to the blockchain
function sendData(account, id) {
  raffleFactory.methods.createEntry(id.id).send({from: account})
  .on("receipt", function() {
    alert("Entry submit");
    window.location = "./";
    return true
  })
  .on("error", function() {
    return false;
  });

}

// handle after the submission of user input
function handleSubmit(account, active, id) {
  if (!active || sendData(account, id)) {
    alert("Entry submission failed, please connect to metamask or check your balance")
  }
}

// the export page
function Raffle() {
  const location = useLocation();
  const raffle = location.state;

  return (
    <div>
    <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
      <RaffleInfoRow raffleInfo={raffle}/>
      <Divider/>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Connection id={raffle.id}/>
      </Web3ReactProvider>
    </div>
  </div>
  );
}

// row displaying the raffle information
function RaffleInfoRow(raffleInfo) {
  const raffle = raffleInfo.raffleInfo;

  const totalTicket = raffle.maxEntries >= raffle.entriesNum ? raffle.maxEntries :
    <span style = {{color: "red"}}>{raffle.maxEntries}</span>;

  return (
    <div style={{textAlign: 'center'}}>
      <h2>{raffle.name} Infomation</h2>
      <div>
        <span>Total Tickets: </span>
        <span>{totalTicket}</span>
      </div>
      <div>
        <span>Participants: </span>
        <span>{raffle.entriesNum}</span>
      </div>
      <div>
        <span>Price: </span>
        <span>{raffle.entryFee}</span>
      </div>
      <div>
        <span>Ending At: </span>
        <span>{raffle.endingTime}</span>
      </div>
    </div> 
  );
}

function Connection(id) {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <Form
    name="UserEntries"
    labelCol= {{ span: 6 }}
    wrapperCol= {{ span: 16 }}
    onFinish= {() => {handleSubmit(account, active, id)}}
    >
      <Form.Item>
        <Button onClick={connect}>Connect to MetaMask</Button>
        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>{active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}</div>
        <Button onClick={disconnect}>Disconnect</Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Raffle;