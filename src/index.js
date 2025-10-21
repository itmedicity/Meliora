import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'

// Get the root DOM element
const container = document.getElementById('root')

// Create a root using React 18's new API
// const root = ReactDOM.createRoot(container)

const root = createRoot(container)
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'),
// )

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
// import 'react-app-polyfill/stable';
// import 'core-js';
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import { Provider } from 'react-redux';
// import store from './store';
// import { initAxiosInstances } from './views/Axios/Axios';

// const container = document.getElementById('root');
// const root = createRoot(container); // React 18 root

// async function startApp() {
//   try {
//     await initAxiosInstances(); // wait for Axios to initialize

//     root.render(
//       <React.StrictMode>
//         <Provider store={store}>
//           <App />
//         </Provider>
//       </React.StrictMode>
//     );
//   } catch (error) {
//     console.error('? Failed to initialize Axios instances:', error);
//   }
// }

// startApp();

serviceWorker.unregister();
