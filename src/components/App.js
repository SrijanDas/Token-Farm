import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./App.css";
import Web3 from "web3";
import DaiToken from "../abis/DaiToken.json";
import DappToken from "../abis/DappToken.json";
import TokenFarm from "../abis/TokenFarm.json";

function App() {
  const [account, setAccount] = useState("0x0");
  const [daikToken, setDaikToken] = useState({});
  const [dappToken, setDappToken] = useState({});
  const [tokenFarm, setTokenFarm] = useState({});
  const [dappTokenBalance, setDappTokenBalance] = useState("0");
  const [daikTokenBalance, setDaikTokenBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiToken = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );
      setDaikToken(daiToken);

      let daiTokenBalance = await daiToken.methods
        .balanceOf(accounts[0])
        .call();
      setDaikTokenBalance(daiTokenBalance.toString());
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
      const dappToken = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );
      setDappToken(dappToken);

      let dappTokenBalance = await dappToken.methods
        .balanceOf(accounts[0])
        .call();
      setDappTokenBalance(dappTokenBalance.toString());
    } else {
      window.alert("DappToken contract not deployed to detected network.");
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );
      setTokenFarm(tokenFarm);

      let stakingBalance = await tokenFarm.methods
        .stakingBalance(accounts[0])
        .call();
      setStakingBalance(stakingBalance.toString());
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }

    setLoading(false);
  }

  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5 ">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="content mx-auto mt-3 text-center">
              {loading ? (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <h1>Hello, World!</h1>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
