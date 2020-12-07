import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Page from "react-page-loading";
import { Formik } from "formik";
import { Cookies } from "react-cookie";
import Router from "next/router";
import Link from "next/link";
import swal from "sweetalert";
import Global from "../../global";
import axios from "axios";
import Local from "../../local";

import "./login.css";
const cookies = new Cookies();
class Login extends Component {
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
            <Col lg={5} xl={5} className="mx-auto">
              <Formik
                initialValues={{ cedula: "", password: "" }}
                validate={(values) => {
                  const errors = {};

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  await setTimeout(async () => {
                    const datos = {
                      cedula: values.cedula,
                      password: values.password,
                    };
                    const url = Global.url + "signin";
                      axios
                        .post(url, datos)
                        .then(function (res) {
                          if (res.status == 200) {
                            swal({
                              title: "Ingreso éxitoso",
                              text: "Bienvenido a Cineplus",
                              className: "swal-wide",
                              button: "Aceptar",
                              icon: "warning",
                            }).then(async (value) => {
                              if (value == true) {
                                  if ((res.status = 200)) {
                                    cookies.set("token", res.data);
                                    cookies.set("language", "es");
                                    Router.push("/home");
                                  } else {
                                    Router.push("/index");
                                  }
                                
                              } else {
                                Router.push("/index");
                              }
                            });
                          } else {
                            swal("Error", "Usuario o contraseña incorrectos", "error").then(() => {
                              Router.push("/index");
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
                  <form onSubmit={handleSubmit}>
                    <Col className="titulo" lg={12} xl={12}>
                      <h2>¡Bienvenido a Cineplus!</h2>
                    </Col>
                    <Col lg={12} xl={12}>
                      <input type="text" name="cedula" onChange={handleChange} onBlur={handleBlur} value={values.cedula} className="input-login" placeholder={"Ingrese su cédula"} autoComplete="false" />
                      {errors.cedula && touched.cedula && <div className="error">{errors.cedula}</div>}
                      <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} className="input-login" placeholder={"Ingrese su contraseña"} />
                      {errors.password && touched.password && <div className="error">{errors.password}</div>}
                    </Col>
                    <Row className="buttons-aling--center mx-auto">
                      <Col lg={12} xl={12}>
                        <button type="submit" className="button-login" disabled={isSubmitting}>
                          {"Iniciar sesión"}
                        </button>
                      </Col>
                      <Col lg={12} xl={12}>
                        {"Si usted aún no es un usuario,"}
                        <a href={Local.url + "registro "}>
                          registrese aquí
                        </a>
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

export default Login;
