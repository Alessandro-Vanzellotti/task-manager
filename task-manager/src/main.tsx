import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './routes.tsx';
import { StrictMode } from 'react';

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
        <Router />
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
