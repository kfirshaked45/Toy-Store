import { ToyPreview } from './toy-preview.jsx';
import Button from '@mui/material/Button';

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart, txt = 'Mashu' }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />

          {/* <div> */}

          <Button
            className="buy"
            variant="contained"
            onClick={() => {
              addToCart(toy);
            }}
          >
            Add to Cart
          </Button>
          <Button
            className="buy"
            variant="outlined"
            onClick={() => {
              onRemoveToy(toy._id);
            }}
          >
            Delete
          </Button>
          {/* <button
            className="buy"
            onClick={() => {
              addToCart(toy);
            }}
          >
            Add to Cart
          </button> */}
        </li>
      ))}
    </ul>
  );
}
