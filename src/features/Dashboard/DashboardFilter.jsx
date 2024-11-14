import { useSearchParams } from 'react-router-dom';
import Error from '../../ui/Error';
import { motion } from 'framer-motion';
import { Box, Button, Stack } from '@mui/material';

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
    <Stack
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      justifyContent={{ mobile: 'center', tablet: 'space-around' }}
      className="h-full w-full"
      gap={1}
    >
      {isValidFilter ? (
        options.map((option) => (
          <Box key={option?.value}>
            <Button
              size="small"
              disableRipple
              sx={{
                '&.MuiButton-root': {
                  color:
                    option.value === currentFilter
                      ? 'primary.contrastText'
                      : 'text.primary',
                },
              }}
              onClick={() => handleClick(option.value)}
              disabled={option.value === currentFilter}
            >
              {option.value === currentFilter && (
                <MotionBox
                  component="div"
                  layoutId="active-pill"
                  sx={{
                    position: 'absolute',
                    inset: '0px',
                    bgcolor: 'primary.main',
                  }}
                  className=" "
                  style={{ borderRadius: '4px' }}
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative tracking-wider z-10  ">
                {option.label}
              </span>
            </Button>
          </Box>
        ))
      ) : (
        <Error />
      )}
    </Stack>
  );
}

const MotionBox = motion(Box);

export default DashboardFilter;
