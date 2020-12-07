import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";

class Menu extends Component {
  render() {
    return (
      <div className="FondoFooter">
        <Container fluid>
          <div className="text-center align-middle">
            <img className="srcimg" src="/assents/icons/Logo-Footer.png"></img>
            <p className="text-right copyr align-middle">
              &copy; {new Date().getFullYear()} Copyright: TP Colombia - TikTok
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Menu;
