import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function ToyPreview({ toy }) {
  return (
    <article>
      <h4>{toy.name}</h4>
      <img src="https://m.media-amazon.com/images/I/71ZstQZH8LL.jpg" alt="Example" />
      <p>
        Price: <span>${toy.price && toy.price.toLocaleString()}</span>
      </p>
      {toy.owner && (
        <p>
          Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link>
        </p>
      )}
      <hr />
      <Link to={`/toys/${toy._id}`}>
        <Button variant="text">Details</Button>
      </Link>

      <Link to={`/toys/edit/${toy._id}`}>
        <Button variant="text">Edit</Button>
      </Link>
    </article>
  );
}
