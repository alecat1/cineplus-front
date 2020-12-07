import React from "react";
import Head from 'next/head';
import Menu from "../src/components/menu";
import Cartelera from "../src/components/cartelera";
import "bootstrap/dist/css/bootstrap.min.css";
import "video-react/dist/video-react.css";

import "../src/components/admin/agregarsalas/agregarsala.css";
import "../src/components/admin/admin/admin.css";
import "../src/components/footer/footer.css";
import "../src/components/login/login.css";
import "../src/components/menu/menu.css";
import "../src/components/peliculas/peliculas.css";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Cineplus-Home</title>
      </Head>
      <Menu></Menu>
      <Cartelera></Cartelera>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: url("/assents/images/fondo-home.jpg");
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </div>
  );
}
