// const { useEffect, useState } = React;
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toyService } from '../services/toy.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
export function ToyDetails() {
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);

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
        navigate('/toys');
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
      <Link to={`/toys/review/${toy._id}`}>
        <Button>{user && 'Add Review'}</Button>
      </Link>
      <div className="details-buttons-container">
        <Link to={`/toys/`}>Back</Link>
        <Link to={`/toys/edit/${toy._id}`}>Edit</Link>
      </div>
    </section>
  );
}
