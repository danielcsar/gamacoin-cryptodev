import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import GamaCoinABI from "../../GamaCoinABI.json";
import { EventContainer } from "./style";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

function Token({ gamaSale, statusProp, symbol }) {
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-",
  });

  const [tokenStatus, setTokenStatus] = useState(statusProp);
  const [tokenSymbol, setTokenSymbol] = useState(symbol);

  const clear = () => {
    setBalanceInfo({
      address: "-",
      balance: "-",
    });
  };

  const balanceOf = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = "0x0269ca8225dC83318a1836927263fabD24654C3d";
    const gamaToken = new ethers.Contract(
      contractAddress,
      GamaCoinABI,
      provider
    );

    const balance = await gamaToken.balanceOf(address);
    setBalanceInfo({
      address: address,
      balance: String(balance),
    });
  }; 

  useEffect(() => {
    if (statusProp !== "-") {
      //0 - Ativo, 1 - Pausado, 2 - Cancelado.
      switch (statusProp) {
        case 0:
          setTokenStatus("Ativo");
          break;
        case 1:
          setTokenStatus("Pausado");
          break;
        case 2:
          setTokenStatus("Cancelado");
          break;
      }
    } else {
      setTokenStatus("");
    }
  }, [statusProp]);

  return (
    <EventContainer>
      <Card border="primary" style={{ width: "20rem", height: "22rem" }}>
        <Card.Header>Gama Token</Card.Header>
        <Card.Body>
          {balanceInfo.balance == "-" ? (
            <InputGroup size="sm" className="mb-3">
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                onChange={(e) => balanceOf(e.target.value)}
                placeholder="0xE1E68092bA200e93012e63eefF2816Ce40071c00"
              />
              <InputGroup.Text id="inputGroup-sizing-sm">
                <button className="button" onClick={() => balanceOf("0xE1E68092bA200e93012e63eefF2816Ce40071c00")}>
                  BalanceOf
                </button>
              </InputGroup.Text>
            </InputGroup>
          ) : (
            <div className="balanceOutput ">
              <InputGroup size="sm" className="mb-3">
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0" className="balanceBox">
                    <Accordion.Body>{symbol}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  <button onClick={clear} className="button">
                    X
                  </button>
                </InputGroup.Text>
              </InputGroup>
            </div>
          )}
            <InputGroup size="sm" className="mb-3">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className="balanceBox status">
                  <Accordion.Body>{tokenStatus}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <InputGroup.Text id="inputGroup-sizing-sm">
                <button onClick={clear} className="button buttonStatus">
                  Status
                </button>
              </InputGroup.Text>
            </InputGroup>
          <Card.Text>
            Funções a implementar: <br /> allowance(_owner,_spender), transfer(_to,
            _value), <br /> approve(_spender,_value), transferFrom(_from, _to,
            _value), <br /> changeStatus(_status)
          </Card.Text>
        </Card.Body>
      </Card>
    </EventContainer>
  );
}

export default Token;
