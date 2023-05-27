import { useDispatch, useSelector } from 'react-redux';

import { showSuccessMsg } from '../services/event-bus.service.js';
import { userService } from '../services/user.service.js';
import { REMOVE_TOY_FROM_CART } from '../store/toy.reducer.js';
import { checkout } from '../store/user.action.js';
import { Button } from '@mui/material';

export function ShoppingCart({ isCartShown, onCloseCart }) {
  const dispatch = useDispatch();

  const cart = useSelector((storeState) => storeState.toyModule.shoppingCart);
  const user = userService.getLoggedinUser();

  function removeFromCart(toyId) {
    console.log(`Todo: remove: ${toyId} from cart`);
    dispatch({ type: REMOVE_TOY_FROM_CART, toyId });
  }

  function getCartTotal() {
    return cart.reduce((acc, toy) => acc + toy.price, 0);
  }

  function onCheckout() {
    const amount = getCartTotal();
    checkout(-amount)
      .then(() => {
        showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`);
        onCloseCart && onCloseCart();
      })
      .catch((err) => console.log('err:', err));
  }

  if (!isCartShown) return <span></span>;
  const total = getCartTotal();
  return (
    <section className="cart">
      <h5>Your Cart</h5>
      <ul>
        {cart.map((toy, idx) => (
          <li key={idx}>
            <button
              onClick={() => {
                removeFromCart(toy._id);
              }}
            >
              x
            </button>
            {toy.vendor} | ${toy.price}
          </li>
        ))}
      </ul>
      <p>Total: ${total} </p>
      <Button variant="outlined" disabled={!user || !total} onClick={onCheckout}>
        Checkout
      </Button>
      {/* <button disabled={!user || !total} onClick={onCheckout}>
        Checkout
      </button> */}
    </section>
  );
}
