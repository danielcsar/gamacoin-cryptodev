import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import GamaCoinABI from "./GamaCoinABI.json";
import GamaSaleABI from "./GamaSaleABI.json";
import NavBar from "./components/NavBar";
import Button from "react-bootstrap/Button";
import KPI from "./components/KPIs";
import Token from "./components/Token";
import Sale from "./components/Sale";
import Event from "./components/Event";
import "./App.css";

function App() {
  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [contractToken, setcontractToken] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
  });
  const [contractSale, setcontractSale] = useState({
    address: "-",
    tokenSold: "-",
    tokensPurchased: "-",
    tokenBuyPrice: "-",
    tokenSellPrice: "-",
  });

  useEffect(() => {
    if (contractSale.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const gamaSail = new ethers.Contract(contractToken.address, GamaSaleABI, provider);

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
  }, [contractToken.address]);

  const handleSubmitToken = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = "0x0269ca8225dC83318a1836927263fabD24654C3d";
    const gamaToken = new ethers.Contract(contractAddress, GamaCoinABI, provider);

    const tokenName = await gamaToken.getName();
    const tokenSymbol = await gamaToken.getSymbol();
    const totalSupply = await gamaToken.getTotalSupply();

    setcontractToken({
      address: contractAddress,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      totalSupply: totalSupply.toNumber(),
    });
  };

  const handleSubmitSale = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = "0xe099d38C8323976A853cfBf457be669a8B95C916";
    const gamaSale = new ethers.Contract(contractAddress, GamaSaleABI, provider);

    const tokenSold = await gamaSale.getTokensSold();
    const tokensPurchased = await gamaSale.getTokensPurchased();
    const tokenBuyPrice = await gamaSale.getTokenBuyPrice();
    const tokenSellPrice = await gamaSale.getTokenSellPrice();

    setcontractSale({
      address: contractAddress,
      tokenSold: ethers.utils.formatEther(BigNumber.from(tokenSold)),
      tokensPurchased: ethers.utils.formatEther(BigNumber.from(tokensPurchased)),
      tokenBuyPrice: ethers.utils.formatEther(BigNumber.from(tokenBuyPrice)),
      tokenSellPrice: ethers.utils.formatEther(BigNumber.from(tokenSellPrice)),
    });
  };

  // const getMyBalance = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  //   const gamaSail = new ethers.Contract(contractInfo.address, GAMASAILabi, provider);
  //   const signer = await provider.getSigner();
  //   const signerAddress = await signer.getAddress();
  //   const balance = await gamaSail.balanceOf(signerAddress);

  //   setBalanceInfo({
  //     address: signerAddress,
  //     balance: String(balance),
  //   });
  // };

  // const handleTransfer = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = await provider.getSigner();
  //   const gamaSail = new ethers.Contract(contractInfo.address, GAMASAILabi, signer);
  //   await gamaSail.transfer(data.get("recipient"), data.get("amount"));
  // };

  return (
    <>
      <NavBar />
      <KPI
        totalSupply={contractToken.totalSupply}
        tokensSold={contractSale.tokenSold}
        tokensPurchased={contractSale.tokensPurchased}
        tokenSellPrice={contractSale.tokenSellPrice}
        tokenBuyPrice={contractSale.tokenBuyPrice}
      />
      <div className="body">
        <Token/>
        <Sale/>
        <Event txs={txs} />
      </div>
      <Button onClick={handleSubmitToken} />
      <Button onClick={handleSubmitSale} />
    </>
  );
}

export default App;
