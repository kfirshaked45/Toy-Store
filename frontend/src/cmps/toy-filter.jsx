import { useEffect, useRef, useState } from 'react';
import { toyService } from '../services/toy.service.js';
import { utilService } from '../services/util.service.js';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export function ToyFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter());

  onSetFilter = useRef(utilService.debounce(onSetFilter));

  const elInputRef = useRef(null);

  useEffect(() => {
    elInputRef.current.focus();
  }, []);

  useEffect(() => {
    // update father cmp that filters change very type

    onSetFilter.current(filterByToEdit);

    // eslint-disable-next-line
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === 'number' ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function onSubmitFilter(ev) {
    // update father cmp that filters change on submit
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }

  return (
    <section className="toy-filter full main-layout">
      <form onSubmit={onSubmitFilter}>
        {/* <label htmlFor="name">Toy Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="By name"
          value={filterByToEdit.txt}
          onChange={handleChange}
          ref={elInputRef}
        /> */}
        <TextField
          label="Toy Name"
          variant="standard"
          type="text"
          id="name"
          name="name"
          value={filterByToEdit.txt}
          onChange={handleChange}
          ref={elInputRef}
        />
        <TextField
          label="By Max Price"
          variant="standard"
          type="number"
          id="price"
          name="price"
          value={filterByToEdit.price}
          onChange={handleChange}
        />

        {/* <label htmlFor="price">Max price:</label>
        <input type="number" id="price" name="price" placeholder="By max price" value={filterByToEdit.price} onChange={handleChange} /> */}

        <button hidden>Filter</button>
      </form>

      <Link to={`/toy/edit`}>
        <Button variant="text">Add Toy</Button>
      </Link>
    </section>
  );
}
