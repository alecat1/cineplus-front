import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Page from "react-page-loading";
import { Formik } from "formik";
import { Cookies } from "react-cookie";
import Router from "next/router";
import Link from "next/link";
import swal from "sweetalert";
import Global from "../../../global";
import axios from "axios";
import Local from "../../../local";

import "./eliminarsala.css";
const cookies = new Cookies();
class EliminarSala extends Component {
  state = {
    lang: "en",
    dataLang: {},
    allLang: [],
    loading: true,
  };
  async componentDidMount() {
    let dataToT = {};
    await axios.get(Global.url + "multi-language").then((res) => {
      dataToT = res.data;
    });
    let auxData = await dataToT;
    await this.setState({
      allLang: auxData,
      dataLang: auxData[this.state.lang],
      loading: false,
    });
  }
  renderList = () => {
    const { lang } = this.state;
    const { dataLang } = this.state;
    const expression = new RegExp("^[0-9]+$");
    return (
      <>
        <Container>
          <Row className="center-content">
            <Col lg={10} xl={10} className="mx-auto">
              <Formik
                initialValues={{ numero: ""}}
                validate={(values) => {
                  const errors = {};

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  await setTimeout(async () => {
                      console.log(values.numero)
                    const datos = {
                      numero: values.numero,
                    };
                    const url = Global.url + "eliminarsala";
                      axios
                        .post(url, datos)
                        .then(function (res) {
                          if (res.status == 200 && datos.numero != "") {
                            swal({
                              title: "¡Eliminada!",
                              text: "Sala eliminada correctamente",
                              className: "swal-wide",
                              button: "Aceptar",
                              icon: "warning",
                            }).then(async (value) => {
                              if (value == true) {
                                  if ((res.status = 200)) {
                                    cookies.set("token", res.data);
                                    cookies.set("language", "es");
                                  } 
                              } 
                            });
                          } else {
                            swal("Error", "Error al eliminar una sala, complete todos los datos", "error").then(() => {
                            });
                          }
                        })
                        .catch(function (errors) {
                          Router.push("/index");
                        });
                    
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <form className="formulario" onSubmit={handleSubmit}>
                    <Col className="titulo" lg={12} xl={12}>
                      <h2>Eliminar una sala:</h2>
                    </Col>
                    <Row >
                    <Col lg={6} xl={6}>
                      <input type="text" name="numero" onChange={handleChange} onBlur={handleBlur} value={values.numero} className="input-login" placeholder={"Ingrese el número de la sala"} autoComplete="false" />
                      {errors.numero && touched.numero && <div className="error">{errors.numero}</div>}
                    </Col>
                
                    </Row>
                    <Row className="buttons-aling--center mx-auto">
                      <Col lg={12} xl={12}>
                        <button type="submit" className="button-login" disabled={isSubmitting}>
                          {"Eliminar"}
                        </button>
                      </Col>
                    </Row>
                  </form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  espacio = () => {
    return (
      <>
        <Page loader={"comet-spin"} color={"#ea1d52"} size={80} duration={0.8}></Page>
      </>
    );
  };
  render() {
    const { loading } = this.state;
    return <>{loading ? this.espacio() : this.renderList()}</>;
  }
}

export default EliminarSala;
