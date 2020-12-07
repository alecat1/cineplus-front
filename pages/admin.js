import Head from 'next/head';
import Admin from '../src/components/admin/admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../src/components/menu';
import Footer from '../src/components/footer';
import 'video-react/dist/video-react.css';

import '../src/components/footer/footer.css';
import '../src/components/login/login.css';
import '../src/components/menu/menu.css';

export default function material() {
  return (
    <>
      <Head>
        <title>Cineplus-Administrador</title>
      </Head>
      <Menu></Menu>
      <Admin></Admin>
      <style jsx global>{`
        html,
        body {
          width: 100%;
          height: 100%;
        }
        body {
          margin: 0;
          padding: 0;
          background: url('/assents/images/fondo-home.jpg');
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </>
  );
}
