import React, { Component } from "react";
import { Container, Row, Col, Accordion, Card, Button } from "react-bootstrap";
import { Cookies } from "react-cookie";
import Router from "next/router";
import Select from "react-select";
import axios from "axios";
import swal from "sweetalert";
import "./peliculas.css";
const cookies = new Cookies();
import Page from "react-page-loading";
import Global from "../../global";

class Peliculas extends Component {
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

  brandColor = "#282828";

  customStyles = {
    option: (styles, state) => ({
      ...styles,
      color: state.isSelected ? "#FFF" : styles.color,
      fontFamily: "Sofia Pro Light",
      backgroundColor: state.isSelected ? "#ff004b" : styles.color,
      borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
      "&:hover": {
        color: "#FFF",
        backgroundColor: "#ff004b",
      },
    }),
    control: (base, state) => ({
      ...base,
      fontFamily: "Sofia Pro Light",
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? this.brandColor : "#797979",
      "&:hover": {
        borderColor: state.isFocused ? this.brandColor : "#282828",
      },
    }),
  };
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
          <Col lg={8} xl={8} className="titulo">
            <h1>Peliculas</h1>
          </Col>
          <Col lg={4} xl={4}>
            <Select className="select" options={options} placeholder="Categorias" onChange={(value) => this.selectChange(value)} />
          </Col>
        </Row>
        <Row>
          {auxPeliculas.map((pelicula) => {
            let url = Global.url + "get-video/" + pelicula.id_pelicula;
            const data_image = pelicula.image_name;
            console.log(pelicula.image_name);
            return(
            <Row className="film-row">
        <Col lg={4} xl={4} className="image-film">  
                <div>
                <img className="imagen" src={pelicula.image_name} />
                </div>
              
            
            </Col>
            <Col lg={8} xl={8} className="content-film">
              <div className="title-film">
                <h2>{pelicula.titulo}</h2>
              </div>
              <div className="summary-film">
                <h2>Descripción:</h2>
                <h4>{pelicula.descripcion}</h4>
                <h3>Genero:</h3>
                <h4>{pelicula.genero}</h4>
                <h3>Duración:</h3>
                <h4>{pelicula.duracion} hora/s</h4>
                <h3>Disponibilidad:</h3>
                
                <Button>{pelicula.hora}</Button>

              </div>
            </Col>
            </Row>
            );
          })}
        </Row>
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

export default Peliculas;
