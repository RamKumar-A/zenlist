import { useSearchParams } from 'react-router-dom';
import Error from '../../ui/Error';

function DashboardFilter() {
  return (
    <Filter
      filterField="task"
      options={[
        { value: 'today', label: 'Today' },
        { value: 'tomorrow', label: ' Tomorrow' },
        { value: 'upcoming', label: ' Upcoming' },
        { value: 'all', label: 'All' },
      ]}
    />
  );
}

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  const isValidFilter = options.some(
    (option) => option.value === currentFilter
  );

  return (
    <div className="p-2 grid grid-cols-2 gap-1 md:grid-cols-4  ">
      {isValidFilter ? (
        options.map((option) => (
          <button
            onClick={() => handleClick(option.value)}
            disabled={option.value === currentFilter}
            key={option.value}
            className={`lg:text-sm xl:text-lg p-2 border-none font-medium transition-all duration-300 lg:px-1 lg:py-2 ${
              option.value === currentFilter
                ? 'bg-gray-100  text-blue-700 rounded-lg'
                : ''
            }`}
          >
            {option.label}
          </button>
        ))
      ) : (
        <Error />
      )}
    </div>
  );
}

export default DashboardFilter;
