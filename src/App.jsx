import { Routes, Route } from 'react-router-dom';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';
import { Header } from 'components';
import Home from 'pages/Home';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Provider store={store}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Provider>
    </div>
  );
}

export default App;
