import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");

  return (
    <div style = {{display:"flex"}}>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Create a Project</h2>
        <Divider />
        <div style={{ margin: 8 }}>
        <h2>What is the name of your project 🤔?</h2>
          <Input
            onChange={e => {
              setNewPurpose(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              // /* notice how you pass a call back for tx updates too */
              // const result = tx(writeContracts.YourContract.setPurpose(newPurpose), update => {
              //   console.log("📡 Transaction Update:", update);
              //   if (update && (update.status === "confirmed" || update.status === 1)) {
              //     console.log(" 🍾 Transaction " + update.hash + " finished!");
              //     console.log(
              //       " ⛽️ " +
              //         update.gasUsed +
              //         "/" +
              //         (update.gasLimit || update.gas) +
              //         " @ " +
              //         parseFloat(update.gasPrice) / 1000000000 +
              //         " gwei",
              //     );
              //   }
              // });
              // console.log("awaiting metamask/web3 confirm result...", result);
              // console.log(await result);
            }}
          >
            Set Purpose!
          </Button>
        </div>
        <Divider />
        <h2>Description of the project</h2>
          <Input
            onChange={e => {
              setNewPurpose(e.target.value);
            }}
          />
        <Divider />
        ENS Address Example:

        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}

        <Divider />
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /*
              you can also just craft a transaction and send it to the tx() transactor
              here we are sending value straight to the contract's address:
            */
              tx({
                to: writeContracts.YourContract.address,
                value: utils.parseEther("0.001"),
              });
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Deposit
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* look how we call setPurpose AND send some value along */
              tx(
                writeContracts.YourContract.setPurpose("💵 Paying for this one!", {
                  value: utils.parseEther("0.001"),
                }),
              );
              /* this will fail until you make the setPurpose function payable */
            }}
          >
            Set Purpose With Value
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button type="primary">Buttons"
            onClick={() => {
              /* you can also just craft a transaction and send it to the tx() transactor */
              tx({
                to: writeContracts.YourContract.address,
                value: utils.parseEther("0.001"),
                data: writeContracts.YourContract.interface.encodeFunctionData("setPurpose(string)", [
                  "🤓 Whoa so 1337!",
                ]),
              });
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Another Example
          </Button>
        </div>
      </div>

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in YourContract.sol! )
      */}
      {/* <Events
        contracts={readContracts}
        contractName="YourContract"
        eventName="SetPurpose"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      /> */}

      <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 256 }}>


        <Card style={{ marginTop: 32 }}>
          {/* <div>
            There are tons of generic components included from{" "}
            <a href="https://ant.design/components/overview/" target="_blank" rel="noopener noreferrer">
              🐜 ant.design
            </a>{" "}
            too!
          </div> */}

          {/* <div style={{ marginTop: 8 }}>
            <SyncOutlined spin /> Icons
          </div> */}


          {/* <div style={{ marginTop: 32 }}>
            <Slider range defaultValue={[20, 50]} onChange={() => {}} />
          </div> */}
{/* 
          <div style={{ marginTop: 32 }}>
            <Switch defaultChecked onChange={() => {}} />
          </div> */}
{/* 
          <div style={{ marginTop: 32 }}>
            <Progress percent={50} status="active" />
          </div> */}

          <div style={{ marginTop: 100 }}>
            <img src="https://ironfish.network/img/index/new-half.gif" style = {{width:"450px", height:"450PX"}}alt="" />
            {/* <Spin /> */}
          </div>
        </Card>
      </div>
    </div>
  );
}
