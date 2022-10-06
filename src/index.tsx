import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import debounce from 'lodash.debounce';
import { store } from 'redux/store';
import App from './App';
import { saveState } from 'redux/browser-storage';

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 1000),
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

