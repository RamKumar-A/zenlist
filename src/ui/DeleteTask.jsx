function DeleteTask({ task, handler }) {
  return (
    <div className="sm:w-full w-64 md:w-96 py-8 ">
      <p className="text-lg p-2 text-center">
        Are you sure want to delete{' '}
        <span className="font-semibold">{task || 'this'}</span>
      </p>
      <div className="flex items-center justify-center p-5">
        {/* <button className="bg-gray-300 p-0.5 px-4 text-lg border-2 border-gray-50 rounded-md outline outline-offset-1 outline-gray-400 text-gray-900 ">
          Cancel
        </button> */}
        <button
          onClick={handler}
          className="bg-red-600 p-0.5 px-4 text-lg border-2 border-gray-50 rounded-md outline outline-offset-1 outline-red-600 text-gray-200 "
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteTask;
