import React, { useEffect, useState } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core"
import { injected } from "./wallet/Connectors"
import { Button, Form, DatePicker, Divider, Input, Progress, Slider, Spin } from "antd";
// import { Form } from "react-router-dom";
import Web3 from 'web3'
import raffleFactory from "../raffleFactory";

function RaffleInfo({raffleInfo, account}) {
  const rows = [];
  raffleInfo.forEach((raffle) => {
    rows.push(<RaffleRow 
      raffle={raffle}
      account = {account}
      key = {raffle.name}/>)
  });
  return (
    <div>
      {rows}
    </div>
  )
}

// Row to display raffle information
function RaffleRow({raffle, account}) {
  console.log(raffle);

  const totalTicket = raffle.maxEntries >= raffle.entriesNum ? raffle.maxEntries :
    <span style = {{color: "red"}}>{raffle.maxEntries}</span>;

  const joinOrWin = raffle.active ? 
    <h3 style={{paddingTop: '10px'}}>
      <Button type="primary" htmlType="submit">
        Pick Winners
      </Button>
    </h3> :
    <h4 style={{paddingTop: '10px'}}>
      <span>End</span>
    </h4>

  return (
    <div style={{color: !raffle.active ? 'gray' : 'black'}}>
        <h3>{raffle.name}</h3>
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
        <Form
          onFinish= {() => {selectWinner(raffle.id, account)}}
        >
        <Form.Item>{joinOrWin}</Form.Item>
        </Form>
        <Divider/>
    </div>
  );
}

const Admin = () => {

  const handleSubmit = () => {
    if (username === "admin" && password === "Password") {
      setIsLoggedIn(true);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Password");
  return (
    <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
      {isLoggedIn && (
        <div>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Connection/>
          </Web3ReactProvider>
        </div>
      )}
      {!isLoggedIn && (
        <form>
          <Form.Item>
            <label>Username</label>
            <Input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <label>Password</label>
            <Input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={handleSubmit}>
              Login
            </Button>
          </Form.Item>
        </form>
      )}
    </div>
  );
};

const selectWinner = async(id, account) => {
  raffleFactory.methods
    .generateWinner(id)
    .send({from: account})
    .on("receipt", function() {
      alert("Winner Generated");
      window.location = "./";
    })
    .on("error", function() {
      alert("Winner generation failed, please try again");
    });
};

function getLibrary(provider) {
  return new Web3(provider)
}

function Connection() {

  const [raffleInfo, setRaffleInfo] = useState(['main']);

  useEffect(() => {
    const init = async() => {
      const raffleInfoRetrieve = await raffleFactory.methods.getRaffle().call();
      setRaffleInfo(raffleInfoRetrieve);
    }

    init();
  },[])

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
    >
      <Form.Item>
        <Button onClick={connect}>Connect to MetaMask</Button>
        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>{active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}</div>
        <Button onClick={disconnect}>Disconnect</Button>
      </Form.Item>
      <RaffleInfo raffleInfo={raffleInfo} account = {account}/>
    </Form>
  )
}

export default Admin;
