import React, { useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

type PeoplePageProps = {
  people: Person[];
  isLoading: boolean;
};

export const PeoplePage: React.FC<PeoplePageProps> = ({
  people,
  isLoading,
}) => {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              people={people}
              setFilteredPeople={setFilteredPeople}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              <p data-cy="peopleLoadingError">Something went wrong</p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>

              <p>There are no people matching the current search criteria</p>

              <PeopleTable people={filteredPeople} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
