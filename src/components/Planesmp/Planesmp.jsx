import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Planes.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Planesmp() {
  return (
    <>
    <Navbar/>
    <div className="planes-container">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="/img/musculacion.jpg" />
        <Card.Body>
          <Card.Title>Plan Solo Musculación</Card.Title>
          <Card.Text>
            Acceso a sala de musculación<br />
            Equipos de última generación<br />
            Horarios flexibles<br />
            Asesoramiento básico
          </Card.Text>
          <Card.Text className="tex">$25000</Card.Text>
          <Button variant="primary">Pagar</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="/img/clases.jpg" />
        <Card.Body>
          <Card.Title>Plan Solo Clases</Card.Title>
          <Card.Text>
            Clases de spinning<br />
            Yoga y pilates<br />
            Zumba y aeróbicos<br />
            Clases de funcional
          </Card.Text>
          <Card.Text className="tex">$30000</Card.Text>
          <Button variant="primary">Pagar</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="/img/planfull.jpg" />
        <Card.Body>
          <Card.Title>Plan Full</Card.Title>
          <Card.Text>
            Acceso a musculación<br />
            Todas las clases grupales<br />
            Entrenamiento personalizado<br />
            Nutricionista incluido<br />
          </Card.Text>
          <Card.Text className="tex">$35000</Card.Text>
          <Button variant="primary">Pagar</Button>
        </Card.Body>
      </Card>
    </div>
    <Footer/>
    </>
  );
}


export default Planesmp;