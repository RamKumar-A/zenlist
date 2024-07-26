import { useSearchParams } from 'react-router-dom';
import Error from '../../ui/Error';
import { motion } from 'framer-motion';

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
    <div className=" flex items-center justify-evenly flex-wrap gap-2 ">
      {isValidFilter ? (
        options.map((option) => (
          <button
            onClick={() => handleClick(option.value)}
            disabled={option.value === currentFilter}
            key={option.value}
            className={`p-2 text-center text-sm font-medium  relative  ${
              option.value === currentFilter
                ? 'text-blue-700 dark:text-gray-100'
                : ' '
            } `}
          >
            {option.value === currentFilter && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-gray-100 dark:bg-gray-950  "
                style={{ borderRadius: '4px' }}
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative tracking-wider z-10  ">
              {option.label}
            </span>
          </button>
        ))
      ) : (
        <Error />
      )}
    </div>
  );
}

export default DashboardFilter;

// $;
// {
//   option.value === currentFilter
//     ? 'bg-gray-100 dark:bg-gray-950 text-blue-700 dark:text-gray-100'
//     : '';
// }
