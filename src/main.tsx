import React from 'react'
import ReactDOM from 'react-dom/client'
import {Home, Login} from './routes'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page.tsx";
import { Nav } from './components';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider i18n={translations}>
        <Nav />
        <div className="bg-gray-100 min-h-screen">
          <div className="flex items-center max-w-4xl w-full mx-4 sm:mx-auto px-6 py-8 bg-white shadow-md rounded-md min-h-screen">
            <RouterProvider router={router} />
          </div>
        </div>
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
