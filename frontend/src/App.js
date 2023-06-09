import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/style/main.css';

import AboutUs from './pages/about-us.jsx';
import { store } from './store/store.js';
import AppHeader from './cmps/app-header.jsx';
import AppFooter from './cmps/app-footer.jsx';
import HomePage from './pages/home-page.jsx';
import ToyIndex from './pages/toy-index.jsx';
import ToyEdit from './pages/toy-edit.jsx';
import DashBoardPage from './pages/dashboard-page.jsx';
import { ToyDetails } from './pages/toy-details';
import { LoginPage } from './pages/login-page';
import { ReviewPage } from './pages/review-page.jsx';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toys" />
              <Route element={<ToyEdit />} path="/toys/edit" />
              <Route element={<ToyDetails />} path="/toys/:toyId" />
              <Route element={<ToyEdit />} path="/toys/edit/:toyId" />
              <Route element={<DashBoardPage />} path="/dashboard" />
              <Route element={<LoginPage />} path="/user" />
              <Route element={<ReviewPage />} path="/toys/review/:toyId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  );
}
