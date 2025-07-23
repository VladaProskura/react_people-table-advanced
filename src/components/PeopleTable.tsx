import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useMemo } from 'react';

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getSortParams = (field: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (currentSort !== field) {
      newSearchParams.set('sort', field);
      newSearchParams.set('order', 'asc');
    } else {
      if (currentOrder === 'asc') {
        newSearchParams.set('order', 'desc');
      } else if (currentOrder === 'desc') {
        newSearchParams.delete('sort');
        newSearchParams.delete('order');
      } else {
        newSearchParams.set('order', 'asc');
      }
    }

    setSearchParams(newSearchParams);
  };

  const getSortIcon = (field: string) => {
    if (currentSort !== field) {
      return (
        <span className="icon">
          <i className="fas fa-sort" />
        </span>
      );
    }

    return currentOrder === 'desc' ? (
      <span className="icon">
        <i className="fas fa-sort-down" />
      </span>
    ) : (
      <span className="icon">
        <i className="fas fa-sort-up" />
      </span>
    );
  };

  const sortedPeople = useMemo(() => {
    if (!currentSort) {
      return people;
    }

    return [...people].sort((a, b) => {
      let comparison = 0;

      if (currentSort === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (currentSort === 'sex') {
        comparison = a.sex.localeCompare(b.sex);
      } else if (currentSort === 'born') {
        comparison = a.born - b.born;
      } else if (currentSort === 'died') {
        comparison = a.died - b.died;
      }

      return currentOrder === 'desc' ? -comparison : comparison;
    });
  }, [people, currentSort, currentOrder]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('name');
                }}
              >
                {getSortIcon('name')}
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('sex');
                }}
              >
                {getSortIcon('sex')}
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('born');
                }}
              >
                {getSortIcon('born')}
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={e => {
                  e.preventDefault();
                  getSortParams('died');
                }}
              >
                {getSortIcon('died')}
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr key={person.slug} data-cy="person">
            <td>
              <PersonLink person={person} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.motherName) || null
                  }
                  people={people}
                  name={person.motherName}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  person={
                    people.find(p => p.name === person.fatherName) || null
                  }
                  people={people}
                  name={person.fatherName}
                />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
