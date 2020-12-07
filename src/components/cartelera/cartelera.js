import React, { Component } from "react";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import { Cookies } from "react-cookie";
import Router from "next/router";
import Select from "react-select";
import axios from "axios";
import swal from "sweetalert";
import "./cartelera.css";
const cookies = new Cookies();
import Page from "react-page-loading";
import Global from "../../global";

class Cartelera extends Component {
  state = {
    status: null,
    data: [],
    loading: true,
    peliculas: [],
    urlState: "",
    selectState: "",
    searchState: "",
    dataLang: {},
  };

  async componentDidMount() {
    let auxload = true;
    let auxurl = window.location.search;
    const language = await cookies.get("language");
    if(language==undefined){
      Router.push("/index");
    }
    async function onPingCall() {
      const token = await cookies.get("token");
      try {
        const res = await axios.post(Global.url + "home", {
          headers: {
            "access-token": token,
            "key-token": "codekey:!m@!K3CjDz*NdInr7Q773u3hj*G%5Kl$zZ^%Uz%Z5v#jf2humR",
          },
        });
      } catch (err) {
        if(language=='en'){
          swal("Session Expired", "Please sign-in again", "warning").then(()=>{Router.push("/index");})
        }else if(language=='es'){
          swal("Sesión expirada", "Inicie sesión de nuevo", "warning").then(()=>{Router.push("/index");})
        }else if(language=='por'){
          swal("Sessão expirada", "Faça login novamente", "warning").then(()=>{Router.push("/index");})
        }
      }
    }
    let auxData = "es";
    await onPingCall();
    await axios.get(Global.url + "pelicula").then(async (res) => {
      await this.setState({
        peliculas: res.data,
        auxpeliculas: res.data,
      });
    });
    auxload = await false;
    this.setState({
      loading: auxload,
      urlState: auxurl,
      dataLang: auxData,
    });
  }

  selectChange = async (e) => {
    const { dataLang } = this.state;
    if (e.value == dataLang.selectAll) {
      await history.pushState(null, "Cineplus-Peliculas");
      await this.setState({
        urlState: "",
        selectState: e.value,
      });
    } else {
      await this.setState({
        selectState: e.value,
      });
    }
  };
  searchChange = async (e) => {
    await this.setState({
      searchState: e.target.value,
    });
  };
  renderList = () => {
    const { dataLang } = this.state;
    const { peliculas } = this.state;
    const { urlState } = this.state;
    const { selectState } = this.state;
    const { searchState } = this.state;
    var options = [{ value: dataLang.selectAll, label: "Categorias" }];
    var auxPeliculas = [];
    peliculas.forEach((element1) => {
      let exist = false;
      let aux = { value: element1.genero, label: element1.genero };
      options.forEach((element2) => {
        if (element2.value == element1.genero) {
          exist = true;
        }
      });
      if (!exist) {
        options.push(aux);
      }
    });
    let selectURL = [];
    let auxUrl = urlState.split("?");
    let regex = /%20/g;
    let regex2 = /%27/g;
    let regexa = /%C3%A1/g;
    let regexe = /%C3%A9/g;
    let regexi = /%C3%AD/g;
    let regexo = /%C3%B3/g;
    let regexu = /%C3%BA/g;
    if (auxUrl[0] == "" && auxUrl[1] == undefined) {
      selectURL = peliculas;
    } else {
      let auxTitle = auxUrl[1].replace(regex, " ");
      auxTitle = auxTitle.replace(regex2, "'");
      auxTitle = auxTitle.replace(regexa, "á");
      auxTitle = auxTitle.replace(regexe, "é");
      auxTitle = auxTitle.replace(regexi, "í");
      auxTitle = auxTitle.replace(regexo, "ó");
      auxTitle = auxTitle.replace(regexu, "ú");
      peliculas.forEach((element) => {
        if (element.titulo == auxTitle) {
          selectURL.push(element);
        }
      });
    }
    let selectArray = [];
    if (selectState == "") {
      selectArray = selectURL;
    } else if (selectState == dataLang.selectAll) {
      selectArray = peliculas;
    } else {
      selectURL.forEach((element) => {
        if (element.genero == selectState) {
          selectArray.push(element);
        }
      });
    }
    auxPeliculas = selectArray.filter((element) => {
      return element.titulo.indexOf(searchState) !== -1;
    });
    return (
      <Container className="container__videos" fluid>
        <Row className="mx-auto">
          <Col lg={12} xl={12} className="titulo">
            <h1>Cartelera</h1>
          </Col>
        </Row>
        <div>
          {auxPeliculas.map((pelicula) => {
            let url = Global.url + "get-video/" + pelicula.id_pelicula;
            const data_image = pelicula.image_name;
            console.log(pelicula.image_name);
            return(
            <div assName="film-row">
                <Row className="head-row">
                    <Col lg={8} xl={8}>
                        <h2>{pelicula.titulo}</h2>
                    </Col>
                    
                </Row>
                <Row className="body-row"> 
                <Col lg={6} xl={6}>
                        <div className="image-film"> 
                        <img className="imagen" src={pelicula.image_name} />
                        </div>
                        </Col>
                </Row>

            </div>
            );
          })}
        </div>
      </Container>
    );
  };
  espacio = () => {
    return (
      <div>
        <Page loader={"comet-spin"} color={"#ea1d52"} size={80} duration={0.8}></Page>
      </div>
    );
  };
  render() {
    const { loading } = this.state;
    return <div>{loading ? this.espacio() : this.renderList()}</div>;
  }
}

export default Cartelera;
