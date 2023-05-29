import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();

  return (
    <div className="homepage">
      <h3>
        Welcome to <span className="toy-beyond-span">TOY & BEYOND</span>, The best selling Toy Store since 1967, Click the Link below to
        Starting Browsing our Store!{' '}
      </h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste totam cum atque accusantium enim, doloremque praesentium fuga minus
        unde repellat sed ullam, quod vel. Quibusdam voluptate repellendus pariatur corporis ut magni exercitationem! Possimus, non,
        distinctio, quidem labore esse repellendus consequatur asperiores facere nam fuga quisquam et? Consectetur quam illum voluptate.
      </p>
      <Link to={`/toys/`}>
        <img
          className="homepage-img"
          src="https://bloomidea.com/sites/default/files/styles/og_image/public/blog/Porque%20deve%20ter%20uma%20loja%20online_0.png?itok=lxdmtNZE"
        />
      </Link>
    </div>
  );
}
