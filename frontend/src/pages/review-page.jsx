// const { useEffect, useState } = React;
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toyService } from '../services/toy.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { useDispatch, useSelector } from 'react-redux';
import { saveToy } from '../store/toy.action.js';
import { ReviewForm } from '../cmps/review-form.jsx';
function getEmptyReview() {
  return {
    reviewText: '',
    rating: 1,
  };
}
export function ReviewPage() {
  const [toy, setToy] = useState(null);
  const [review, setReview] = useState(getEmptyReview());
  const { toyId } = useParams();
  const { reviewText, rating } = review;
  const navigate = useNavigate();
  const user = useSelector((storeState) => storeState.userModule.loggedinUser);

  useEffect(() => {
    loadToy();
  }, []);

  function handleReviewChange(ev) {
    const field = ev.target.name;
    const value = ev.target.value;
    const updatedReview = { ...review, [field]: value };
    setReview(updatedReview);
  }
  function onSubmit(ev) {
    ev.preventDefault();
    setToy((prevToy) => ({
      ...prevToy,
      reviews: prevToy.reviews ? [...prevToy.reviews, review] : [review],
    }));
    saveToy(toy)
      .then(() => {
        showSuccessMsg('Review submitted successfully');
      })
      .catch((err) => {
        showErrorMsg('Oops, try again');
      });
  }
  console.log(review);
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
    <div className="review-page">
      <ReviewForm initialValues={review} onSubmit={onSubmit} onChange={handleReviewChange} />
    </div>
  );
}
