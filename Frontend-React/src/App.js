import { useState, useEffect } from "react";
import { ethers } from "ethers";
import GAMASAILabi from "./GAMASAILabi.json";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import "./App.css";

export default function App() {
  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [error, setError] = useState();
  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
  });
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-",
  });

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const gamaSail = new ethers.Contract(contractInfo.address, GAMASAILabi, provider);

      gamaSail.on("Transfer", (from, to, amount, event) => {
        console.log({ from, to, amount, event });

        setTxs((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount),
          },
        ]);
      });
      setContractListened(gamaSail);

      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInfo.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = "0x9D24fCb372c728d16DafD3CC99272Ca917b1b3B1";
    const gamaSail = new ethers.Contract(contractAddress, GAMASAILabi, provider);

    const tokenName = await gamaSail.getName();
    const tokenSymbol = await gamaSail.getSymbol();
    const totalSupply = await gamaSail.getTotalSupply();

    setContractInfo({
      address: data.get("addr"),
      tokenName,
      tokenSymbol,
      totalSupply,
    });
  };

  const getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const gamaSail = new ethers.Contract(contractInfo.address, GAMASAILabi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await gamaSail.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance),
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const gamaSail = new ethers.Contract(contractInfo.address, GAMASAILabi, signer);
    await gamaSail.transfer(data.get("recipient"), data.get("amount"));
  };

  return (
    <>
    <div className="grid grid-cols-1 gap-2 m-full flex-row">
      <div className="flex h-24 Container m-full w-full flex-row">
        <div className="bg-white w-full flex justify-between py-6 pr-24">
          <img
            src={"https://criptodev.corporate.gama.academy/wp-content/uploads/sites/22/2022/01/logo-cripto-dev.svg"}
            className="img flex"
            alt="logo"
          />
          <button className="btn font-bold inline-block relative text-cd-blue hover:text-white items-center w-40 h-10 text-center rounded-md">
            <a className="close" href="https://www.linkedin.com/in/danielcsar/">
              Linked-In
            </a>
          </button>
          <button className="btn font-bold inline-block relative text-cd-blue hover:text-white items-center w-40 h-10 text-center rounded-md">
            <a className="close" href="mailto:danielcesar.eng@gmail.com">
              Email
            </a>
          </button>
          <button className="btn font-bold bg-cd-orange hover:bg-cd-blue inline-block relative text-cd-blue hover:text-white items-center w-40 h-10 text-center rounded-md">
            <a href="https://github.com/danielcsar">Github</a>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 mx-8 h-full">
        <div className="rounded-xl bg-white">
          <form onSubmit={handleSubmit}>
            <main className="mt-4 p-4">
              <h1 className="text-xl font-semibold text-gray-700 text-center">Dados do Contrato</h1>
              <div className="">
                <div className="my-3">
                  <input
                    type="text"
                    name="addr"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="ERC20 contract address"
                  />
                </div>
              </div>
            </main>
            <footer className="p-4">
              <button type="submit" className="btn btn-primary submit-button focus:ring focus:outline-none w-full">
                Get token info
              </button>
            </footer>
            <div className="px-4">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Total supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{contractInfo.tokenName}</th>
                      <td>{contractInfo.tokenSymbol}</td>
                      <td>{String(contractInfo.totalSupply)}</td>
                      <td>{contractInfo.deployedAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={getMyBalance}
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              >
                Get my balance
              </button>
            </div>
            <div className="px-4 py-1">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{balanceInfo.address}</th>
                      <td>{balanceInfo.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>

        <div className="rounded-xl bg-white">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Write to contract</h1>

            <form onSubmit={handleTransfer}>
              <div className="my-3">
                <input
                  type="text"
                  name="recipient"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Recipient address"
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  name="amount"
                  className="input input-bordered block w-full focus:ring focus:outline-none"
                  placeholder="Amount to transfer"
                />
              </div>
              <footer className="p-4">
                <button type="submit" className="btn btn-primary submit-button focus:ring focus:outline-none w-full">
                  Transfer
                </button>
              </footer>
            </form>
          </div>
        </div>
        <div className="event rounded-xl bg-white max-h-screen overflow-auto">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">Recent transactions</h1>
            <p>
              <TxList txs={txs} />
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
