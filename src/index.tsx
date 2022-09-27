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

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
