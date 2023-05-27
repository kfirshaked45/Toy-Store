import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { toyService } from '../services/toy.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { Button, TextField } from '@mui/material';

export default function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy());
  const navigate = useNavigate();
  const { toyId } = useParams();

  useEffect(() => {
    if (!toyId) return;
    loadToy();
    // eslint-disable-next-line
  }, []);

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToyToEdit(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err);
        navigate('/toy');
      });
  }
  // console.log(toyToEdit, 'TOY TO EDIT HERE');
  function handleChange({ target }) {
    let { value, type, name: field } = target;
    value = type === 'number' ? +value : value;

    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }));
  }

  function onSaveToy(ev) {
    ev.preventDefault();
    console.log('here');
    console.log(toyToEdit);
    toyService
      .save(toyToEdit)
      .then((toy) => {
        console.log('toy saved', toy);
        showSuccessMsg('Toy saved!');
        navigate('/toy');
      })
      .catch((err) => {
        console.log('err', err);
        showErrorMsg('Cannot save toy TOY-EDIT');
      });
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

      <form onSubmit={onSaveToy} className="form-edit">
        {/* <label htmlFor="name">Name : </label> */}
        <TextField label="Name:" name="name" id="name" variant="standard" value={toyToEdit.name} onChange={handleChange} />
        {/* <input type="text" name="name" id="name" placeholder="Enter name..." value={toyToEdit.name} onChange={handleChange} /> */}
        {/* <label htmlFor="price">Price : </label> */}
        <TextField label="Price:" name="price" id="price" variant="standard" value={toyToEdit.price} onChange={handleChange} />
        {/* <input type="number" name="price" id="price" placeholder="Enter price" value={toyToEdit.price} onChange={handleChange} /> */}

        <div className="form-edit-buttons">
          <Link to="/toy">
            <Button variant="outlined">Cancel</Button>
          </Link>
          <Button variant="outlined" onClick={onSaveToy}>
            {toyToEdit._id ? 'Save' : 'Add'}
          </Button>
        </div>
      </form>
    </section>
  );
}
