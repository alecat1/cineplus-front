import React, { Component } from "react";
import { Cookies } from "react-cookie";
import Router from "next/router";
import axios from "axios";
import "./menu.css";
import Global from "../../global";
var jwtDecode = require("jwt-decode");
const cookies = new Cookies();
import {Row,Col} from "react-bootstrap";
import Local from "../../local";

class Menu extends Component {
  state = {
    rol: 0,
    loading: true,
    dataLang: {},
  };

  async componentDidMount() {
    let auxload = true;
    let auxrol = 2;
    const language = await cookies.get("language");
    const rolee = await cookies.get("role_id");
    console.log(rolee)
    if(language==undefined){
      Router.push("/index");
    }
    async function onPingCall() {
      const token = await cookies.get("token");
      if (token != undefined) {
        var decoded = jwtDecode(token);
        console.log("decoded"+decoded.role_id)
      }
      try {
        const res = await axios.post(Global.url + "home", {
          headers: {
            "access-token": token,
            "key-token": "codekey:!m@!K3CjDz*NdInr7Q773u3hj*G%5Kl$zZ^%Uz%Z5v#jf2humR",
          },
        });

        if (token != undefined) {
          auxrol = await decoded.role_id;
        }
        auxload = await false;
      } catch (err) {}
    }
    let dataToT = {};
      dataToT = "es";
    let auxData = await dataToT[language];
    await onPingCall();
    this.setState({
      dataLang: auxData,
      loading: auxload,
      rol: auxrol,
    });
  }

  cookiesRemover = () => {
    if (cookies.get("token") != undefined) {
      cookies.remove("token");
    }
    if (cookies.get("token", { path: "/admin/agregarsala" }) != undefined) {
      cookies.remove("token", { path: "/admin/agregarsala" });
    }
    
    if (cookies.get("token", { path: "/" }) != undefined) {
      cookies.remove("token", { path: "/" });
    }
    if (cookies.get("token", { path: "/admin" }) != undefined) {
      cookies.remove("token", { path: "/admin" });
    }
    if (cookies.get("token", { path: "/home" }) != undefined) {
      cookies.remove("token", { path: "/home" });
    }
    if (cookies.get("token", { path: "/index" }) != undefined) {
      cookies.remove("token", { path: "/index" });
    }
    if (cookies.get("token", { path: "/pelicula" }) != undefined) {
      cookies.remove("token", { path: "/pelicula" });
    }

  };

  submenu = () => {
    var content = document.getElementById("training-des-menu");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  };

  openNav() {
    let element = document.getElementById("hover-menu");
    element.classList.add("overlay-menu");
  }
  closeNav() {
    let element = document.getElementById("hover-menu");
    element.classList.remove("overlay-menu");
  }

  renderAdmin = () => {
    const {dataLang} = this.state;
    return (
      <li className="class-back">
        <a href={Local.url + "admin"}>
          <i className="fas fa-address-card">
            <img src="/assents/icons/id-card-solid.svg" width="30" height="30"></img>
          </i>
          {dataLang.menuAdmin}
        </a>
      </li>
    );
  };
  renderAdmin = () => {
    return (
      <li className="class-back">
        <a className="class-back dropdown-toggle"href={Local.url + "admin"}>
                    <i className="fas fa-address-card">
                      <img src="/assents/icons/admin.svg" width="60" height="60"></img>
                    </i>
                    <h4>Admin</h4>
                  </a>
      </li>
    );
  };
  renderList = () => {
    const { rol } = this.state;
    return (
      <div>
        <div id="hover-menu" className=""></div>
        <div className="Menu">
          
          <div className="sidebar hand-cursor">
          <a className="class-back dropdown-toggle"href={Local.url + "home"}>
            <header>
              <h1>CINEPLUS</h1>
            </header>
            </a>
            {/* ACA PONER EL ADMIN */}
            <Row className="row-menu">
            <Col className="class-back">
            {rol == 1 ? this.renderAdmin() : null}
            </Col>

              <Col className="class-back">
              <a className="class-back dropdown-toggle"href={Local.url + "pelicula"}>
                    <i className="fas fas fa-book">
                      <img src="/assents/icons/pelicula.svg" width="60" height="60"></img>
                    </i>
                    <h4>Peliculas</h4>
                  </a>
              
              </Col>
              <Col className="class-back">
              <a className="class-back"onClick={this.cookiesRemover} href={Local.url + "index "}>
                  <i className="far fa-arrow-alt-circle-left">
                    <img src="/assents/icons/cerrar-sesion.svg" width="60" height="60"></img>
                  </i>
                  <h4>Cerrar Sesión</h4>
                </a>
              
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { loading } = this.state;
    return <div>{loading ? null : this.renderList()}</div>;
  }
}

export default Menu;
