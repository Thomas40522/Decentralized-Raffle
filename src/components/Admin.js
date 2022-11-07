import React, { useEffect, useState } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core"
import { injected } from "./wallet/Connectors"
import { Button, Form, DatePicker, Divider, Input, Progress, Slider, Spin } from "antd";
// import { Form } from "react-router-dom";
import Web3 from 'web3'
import raffleFactory from "../raffleFactory";

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

const createRaffle = async(account, raffle) => {
  raffleFactory.methods
    .createRaffle(
      raffle.name,
      parseInt(raffle.entryFee),
      parseInt(raffle.maxEntries),
      parseInt(raffle.endingTime),
      parseInt(raffle.numWinners)
    )
    .send({from: account})
    .on("receipt", function() {
      alert("Raffle created");
      window.location = "./";
    })
    .on("error", function() {
      alert("Raffle creation failed, please try again");
    });
};

function getLibrary(provider) {
  return new Web3(provider)
}

function Connection() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const [raffle, setRaffle] = useState({
    name: "",
    entryFee: "",
    maxEntries: "",
    numWinners: "",
    endingTime: "",
    entries: [],
    winners: [],
  });

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
    onFinish= {() => {createRaffle(account, raffle)}}
    >
      <Form.Item>
        <Button onClick={connect}>Connect to MetaMask</Button>
        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>{active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}</div>
        <Button onClick={disconnect}>Disconnect</Button>
      </Form.Item>
      <Form.Item>
        <label>Raffle Name</label>
        <Input
          type="text"
          name="name"
          value={raffle.name}
          onChange={(e) => setRaffle({ ...raffle, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <label>Entry Fee</label>
        <Input
          type="text"
          name="entryFee"
          value={raffle.entryFee}
          onChange={(e) =>
            setRaffle({ ...raffle, entryFee: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <label>Max Entries</label>
        <Input
          type="text"
          name="maxEntries"
          value={raffle.maxEntries}
          onChange={(e) =>
            setRaffle({ ...raffle, maxEntries: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <label>Number of Winners</label>
        <Input
          type="text"
          name="numWinners"
          value={raffle.numWinners}
          onChange={(e) =>
            setRaffle({ ...raffle, numWinners: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <label>Ending Time</label>
        <Input
          type="text"
          name="endingTime"
          value={raffle.endingTime}
          onChange={(e) =>
            setRaffle({ ...raffle, endingTime: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Create Raffle</Button>
      </Form.Item>
    </Form>
  )
}

export default Admin;
