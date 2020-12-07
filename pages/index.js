import Head from 'next/head';
import Login from '../src/components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import "video-react/dist/video-react.css";

import "../src/components/admin/admin/admin.css";
import "../src/components/admin/agregarsalas/agregarsala.css";
import "../src/components/footer/footer.css";
import "../src/components/login/login.css";
import "../src/components/menu/menu.css";
import "../src/components/peliculas/peliculas.css";


export default function index() {
  return (
    <div className="container">
      <Head>
        <title>Cineplus-Login</title>
      </Head>
      <main>
        <Login></Login>
      </main>
      <style jsx global>{`
          body {
              margin: 0;
              padding: 0;
              background: url("/assents/images/principalv2.jpg");
              background-repeat: no-repeat;
              background-size: cover;
          }
      `}</style>
    </div>
  )
}
