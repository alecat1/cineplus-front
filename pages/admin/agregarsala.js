import Head from 'next/head';
import Admin from '../../src/components/admin/admin';
import AgregarSala from '../../src/components/admin/agregarsalas';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../../src/components/menu';
import 'video-react/dist/video-react.css';
import '../../src/components/admin/agregarsalas/agregarsala.css';
export default function material() {
  return (
    <>
      <Head>
        <title>Cineplus-Administrador</title>
      </Head>
      <Menu></Menu>
      <AgregarSala></AgregarSala>
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
