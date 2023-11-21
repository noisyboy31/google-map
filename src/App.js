import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import SearchWrap from './components/SearchWrap';
import initStore from './redux/store';

const store = initStore();

function App() {
  return (
    <div className="searchPageWrap">
      <Provider store={store}>
        <SearchWrap />
      </Provider>
    </div>
  );
}

export default App;
