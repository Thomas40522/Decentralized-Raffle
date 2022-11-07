import 'antd/dist/antd.css';
import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {Navigate, Link} from "react-router-dom";
import raffleFactory from "../raffleFactory";
// import { utils } from "ethers";

// import from smart contract later
// const raffleInfo = [{"name": "raffle1", "amount": 10, "entries": 10, "price": 10, "active": true, "winner": "", "endingTime": "2022-10-25"},
// {"name": "raffle2", "amount": 20, "entries": 4, "price": 15, "active": false, "winner": "1sade", "endingTime": "2022-12-25"},
// {"name": "raffle3", "amount": 15, "entries": 21, "price": 5, "active": true, "winner": "", "endingTime": "2022-11-23"},
// {"name": "raffle4", "amount": 12, "entries": 0, "price": 8, "active": true,  "winner": "", "endingTime": "2022-9-4"},
// {"name": "raffle5", "amount": 11, "entries": 0, "price": 12, "active": true, "winner": "", "endingTime": "2022-1-2"}
// ];


// the exported list of all raffles
function RaffleList() {


  const [raffleInfo, setRaffleInfo] = useState(['main']);

  useEffect(() => {
    const init = async() => {
      const raffleInfoRetrieve = await raffleFactory.methods.getRaffle().call();
      setRaffleInfo(raffleInfoRetrieve);
    }

    init();
  },[])

  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2 style={{textAlign: 'center'}}>Tickets Raffle</h2>
        <Divider/>
        <RaffleInfo raffleInfo={raffleInfo}/>
        <div>
          <Link to="/admin">Create Raffle</Link>
        </div>
        <Link to="/winner">Generate Winner</Link>
      </div>
    </div>
  );

}

// all the rows containing the raffle information
function RaffleInfo({raffleInfo}) {
  const rows = [];
  raffleInfo.forEach((raffle) => {
    rows.push(<RaffleRow 
      raffle={raffle}
      key = {raffle.name}/>)
  });
  return (
    <div>
      {rows}
    </div>
  )
}

// Row to display raffle information
function RaffleRow({raffle}) {
  console.log(raffle);

  const totalTicket = raffle.maxEntries >= raffle.entriesNum ? raffle.maxEntries :
    <span style = {{color: "red"}}>{raffle.maxEntries}</span>;

  const joinOrWin = raffle.active ? 
    <h3 style={{paddingTop: '10px'}}>
      <Button>
        <Link to= "/raffle"
        state={raffle}>
          Join
        </Link>
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
        <div>{joinOrWin}</div>
        <Divider/>
    </div>
  );
}

export default RaffleList;