import Head from "next/head";
import Peliculas from "../src/components/peliculas";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../src/components/menu";
import "video-react/dist/video-react.css";

import "../src/components/admin/agregarsalas/agregarsala.css";
import "../src/components/admin/admin/admin.css";
import "../src/components/footer/footer.css";
import "../src/components/login/login.css";
import "../src/components/menu/menu.css";

export default function peliculas() {
  return (
    <>
      <Head>
        <title>Peliculas</title>
      </Head>
      <Menu></Menu>
      <Peliculas />
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: url("/assents/images/fondo-home.jpg");
        }
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(102, 102, 102, 0.315);
        }

      `}</style>
    </>
  );
}
