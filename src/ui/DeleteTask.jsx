function DeleteTask({ task, handler }) {
  return (
    <div className=" grid justify-items-center  py-3 rounded ">
      <p className="text-lg text-white p-2 text-center">
        Are you sure want to delete{' '}
        <span className="font-semibold">{task || 'this'}</span>
      </p>
      <div className="flex items-center justify-between py-5">
        {/* <button className="bg-gray-300 p-0.5 px-4 text-lg border-2 border-gray-50 rounded-md outline outline-offset-1 outline-gray-400 text-gray-900 ">
          Cancel
        </button> */}
        <button
          onClick={handler}
          className="bg-red-600 py-0.5 px-4 text-lg border-2 border-gray-50 rounded-md text-gray-200 "
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteTask;
