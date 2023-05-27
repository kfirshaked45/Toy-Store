import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
  const dispatch = useDispatch();

  return (
    <div className="homepage">
      <img
        className="homepage-img"
        src="https://bloomidea.com/sites/default/files/styles/og_image/public/blog/Porque%20deve%20ter%20uma%20loja%20online_0.png?itok=lxdmtNZE"
      />
      <p>Homepage</p>
    </div>
  );
}
