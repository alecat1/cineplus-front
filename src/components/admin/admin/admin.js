import React, { Component } from "react";
import { Row, Col, Form, Button, InputGroup, FormControl, Container, Card } from "react-bootstrap";
import Select from "react-select";
import { Cookies } from "react-cookie";
import axios from "axios";
import Router from "next/router";
import "./admin.css";
import Global from "../../../global";
var jwtDecode = require("jwt-decode");
const cookies = new Cookies();
import Page from "react-page-loading";
import swal from "sweetalert";

class Admin extends Component {
  state = {
    loading: true,
    rol: 0,
    id_db: null,
  };

  async componentDidMount() {
    let auxload = true;
    let auxrol = 0;
    let auxid = null;
    async function onPingCall() {
      const token = await cookies.get("token");
      if (token != undefined) {
        var decoded = jwtDecode(token);
      }
      try {
        const res = await axios.post(Global.url + "home", {
          headers: {
            "access-token": token,
            "key-token": "codekey:!m@!K3CjDz*NdInr7Q773u3hj*G%5Kl$zZ^%Uz%Z5v#jf2humR",
          },
        });
        if (token != undefined) {
          auxrol = await decoded.role;
          auxid = await decoded.ident;
        }
        auxload = await false;
      } catch (err) {
        swal("Session Expired", "Please sign-in again", "warning").then(() => {
          Router.push("/index");
        });
      }
    }
    await onPingCall();
    this.setState({
      loading: auxload,
      rol: auxrol,
      id_db: auxid,
    });
  }
  renderRolUser() {
    return (
      <Col>
      <Row className="row-admin">
      <Col lg={4} xl={4}>
        <Card className="text-center card--animation-admin">
          <Card.Body>
            <Card.Title>Agregar</Card.Title>
            <Card.Text>Películas</Card.Text>
            <Button
              variant="warning"
              className="button--change-admin"
              onClick={() => {
                Router.push("/admin");
              }}
              block
            >
              Agregar
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} xl={4}>
        <Card className="text-center card--animation-admin">
          <Card.Body>
            <Card.Title>Modificar</Card.Title>
            <Card.Text>Películas</Card.Text>
            <Button
              variant="warning"
              className="button--change-admin"
              onClick={() => {
                Router.push("/admin");
              }}
              block
            >
              Modificar
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} xl={4}>
        <Card className="text-center card--animation-admin">
          <Card.Body>
            <Card.Title>Eliminar</Card.Title>
            <Card.Text>Películas</Card.Text>
            <Button
              variant="warning"
              className="button--change-admin"
              onClick={() => {
                Router.push("/admin");
              }}
              block
            >
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      </Col>
      </Row>
      <Row className="row-admin">
      <Col lg={4} xl={4}>
        <Card className="text-center card--animation-admin">
          <Card.Body>
            <Card.Title>Agregar</Card.Title>
            <Card.Text>Salas</Card.Text>
            <Button
              variant="warning"
              className="button--change-admin"
              onClick={() => {
                Router.push("/admin/agregarsala");
              }}
              block
            >
              Agregar
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} xl={4}>
        <Card className="text-center card--animation-admin">
          <Card.Body>
            <Card.Title>Modificar</Card.Title>
            <Card.Text>Salas</Card.Text>
            <Button
              variant="warning"
              className="button--change-admin"
              onClick={() => {
                Router.push("/admin");
              }}
              block
            >
              Modificar
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} xl={4}>
        <Card className="text-center card--animation-admin">
          <Card.Body>
            <Card.Title>Eliminar</Card.Title>
            <Card.Text>Salas</Card.Text>
            <Button
              variant="warning"
              className="button--change-admin"
              onClick={() => {
                Router.push("/admin/eliminarsala");
              }}
              block
            >
              Eliminar
            </Button>
          </Card.Body>
        </Card>
      </Col>

      </Row>
      </Col>
      
    );
  }
  renderList() {
    
      return (
        <div className="container--admin">
          <Container className="margin--container-admin">
            <Row className="mt-4">
              {this.renderRolUser()}
            </Row>
          </Container>
        </div>
      );
    
  }

  espacio = () => {
    return (
      <div>
        <Page loader={"comet-spin"} color={"#00cad4"} size={80} duration={0.8}></Page>
      </div>
    );
  };
  render() {
    const { loading } = this.state;
    return <div>{loading ? this.espacio() : this.renderList()}</div>;
  }
}

export default Admin;
