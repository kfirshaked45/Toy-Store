// const { useEffect, useState } = React;
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toyService } from '../services/toy.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadToy();
  }, []);

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err);
        showErrorMsg('Cannot load toy');
        navigate('/toy');
      });
  }

  if (!toy) return <div>Loading...</div>;
  return (
    <section className="toy-details">
      <h1>Toy vendor : {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem,
        placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!
      </p>
      <div className="details-buttons-container">
        <Link to={`/toy/`}>Back</Link>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
      </div>
    </section>
  );
}
