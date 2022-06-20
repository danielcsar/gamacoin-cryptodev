import { EventContainer } from "./style";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function Token({ txs }) {
  return (
    <EventContainer>
      <Card border="primary" style={{ width: "20rem", height: "22rem" }}>
        <Card.Header>Gama Token</Card.Header>
        <Card.Body>
          {/* <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">BalanceOf</InputGroup.Text>
            <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup> */}
          <Card.Text>
            Funções a implementar: <br/>
            getStatus(), <br/> balanceOf( _account), allowance(_owner,_spender),
            transfer(_to, _value), <br/> approve(_spender,_value), transferFrom(_from, _to,  _value), <br/> changeStatus(_status), changeStatus(_status).
          </Card.Text>
        </Card.Body>
      </Card>
    </EventContainer>
  );
}

export default Token;
