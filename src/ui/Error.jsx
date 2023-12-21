import { Link, useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  // console.log(error);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-900 px-3 py-2 md:px-4 md:py-5 shadow-lg shadow-gray-900">
      <h1 className="text-gray-900 text-xl py-2">Something went wrong 😢</h1>
      <p className="text-red-500 text-lg font-medium pb-2">
        {error.data || error.message}
      </p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    'text-sm text-blue-500 font-bold hover:text-blue-700 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default Error;
