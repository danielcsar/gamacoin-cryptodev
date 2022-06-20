import { KPIContainer } from "./style";
import Card from "react-bootstrap/Card";

function KPI({ totalSupply, tokensSold, tokensPurchased, tokenSellPrice, tokenBuyPrice }) {
  return (
    <KPIContainer>
        <Card style={{ width: "10rem", backgroundColor: "#f0f4fe" }} className="card1" border="dark">
          <Card.Body>
            <Card.Title className="title">Total Tokens</Card.Title>
            <Card.Text className="value">{totalSupply}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "10rem", backgroundColor: "#ffeee6" }} className="card2" border="dark">
          <Card.Body>
            <Card.Title className="title">Tokens Vendidos</Card.Title>
            <Card.Text className="value">{tokensSold}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "10rem", backgroundColor: "#eefdef" }} className="card" border="dark">
          <Card.Body>
            <Card.Title className="title">Tokens Comprados</Card.Title>
            <Card.Text className="value">{tokensPurchased}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "10rem", backgroundColor: " #ffeee6" }} className="card" border="dark">
          <Card.Body>
            <Card.Title className="title">Preço Venda</Card.Title>
            <Card.Text className="value">{tokenSellPrice}</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "10rem", backgroundColor: "#eefdef" }} className="card" border="dark">
          <Card.Body>
            <Card.Title className="title">Preço Compra</Card.Title>
            <Card.Text className="value">{tokenBuyPrice}</Card.Text>
          </Card.Body>
        </Card>
    </KPIContainer>
  );
}

export default KPI;
