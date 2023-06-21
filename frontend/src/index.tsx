import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

const icons = [
  faPlus
]

library.add.apply(library, icons);

import App from './components/App';
import Form from './components/Form';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Form />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
