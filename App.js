import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/components/redux/store'; // Import store từ file cấu hình Redux của bạn
import Index from './src/components/index'; // Import component App của bạn

const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};

export default App;
