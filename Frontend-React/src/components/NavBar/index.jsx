import { NavbarContainer } from "./style";

function Navbar() {
  return (
    <NavbarContainer>
      <div className="container">
        <img
          src={"https://criptodev.corporate.gama.academy/wp-content/uploads/sites/22/2022/01/logo-cripto-dev.svg"}
          className="img flex"
          alt="logo"
        />
        <div className="itens">
          <a className="close" href="https://www.linkedin.com/in/danielcsar/">
            <button className="btn">Linked-In</button>
          </a>
          <a className="close" href="mailto:danielcesar.eng@gmail.com">
            <button className="btn">Email</button>
          </a>
          <a className="close" href="https://github.com/danielcsar">
            <button className="btn">Github</button>
          </a>
        </div>
      </div>
    </NavbarContainer>
  );
}

export default Navbar;
