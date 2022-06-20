import { EventContainer } from "./style";
import Card from "react-bootstrap/Card";
import TxList from "../../TxList";

function Event({ txs }) {
  return (
    <EventContainer>
      <Card border="primary" style={{ width: "20rem", height: "22rem" }}>
        <Card.Header>Eventos - Transações recentes</Card.Header>
        <Card.Body>
          <p>
            <TxList txs={txs} />
          </p>
        </Card.Body>
      </Card>
    </EventContainer>
  );
}

export default Event;
