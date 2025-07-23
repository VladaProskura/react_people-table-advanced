import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';

import './App.scss';
import { useEffect, useState } from 'react';
import { Person } from './types';
import { getPeople } from './api';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          {error ? (
            <div data-cy="error">
              <p>Something went wrong.</p>
            </div>
          ) : (
            <Routes>
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/people"
                element={<PeoplePage people={people} isLoading={isLoading} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};
