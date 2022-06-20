import { SaleContainer } from "./style";
import Card from "react-bootstrap/Card";

function Sale({ txs }) {
  return (
    <SaleContainer>
      <Card border="primary" style={{ width: "20rem", height: "22rem" }}>
        <Card.Header>Gama Sale</Card.Header>
        <Card.Body>
          <Card.Text>
            Funções a implementar:
            setTokenBuyPrice(_newPrice), setTokenSellPrice(_newPrice),
            buyTokens(), <br/> sellTokens(_tokensToSell), <br/> addEthers(), <br/> addTokens(_tokens),<br/>  withdrawBalance().
          </Card.Text>
        </Card.Body>
      </Card>
    </SaleContainer>
  );
}

export default Sale;
