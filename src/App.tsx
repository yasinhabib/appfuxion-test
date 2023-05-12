import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import PlaceLocator from './pages/PlaceLocator';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PlaceLocator />
    </Provider>
  );
}

export default App;
