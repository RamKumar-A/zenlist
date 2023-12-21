import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { FaCodeBranch } from 'react-icons/fa6';
import {
  HiMiniExclamationCircle,
  HiOutlineBellAlert,
  HiOutlineExclamationCircle,
  HiOutlineXMark,
} from 'react-icons/hi2';

function TaskTemplate({
  task,
  handleDetails,
  handleFinished,
  handleDelete,
  handleImportant,
  imp,
  all,
}) {
  return (
    <ul className="text-gray-950 dark:text-gray-200 px-5">
      {task.map((list, i) => (
        <ul className=" sm:pt-5" key={`list-${i}-${list.id}`}>
          <div
            className={`h-20 px-5 border-b border-gray-900 flex p-2 gap-2 items-center justify-between    ${
              list.finished && 'bg-gray-700 border-none rounded-xl'
            }`}
            onClick={() => handleDetails(list)}
          >
            <h1 className=" sm:text-2xl" onClick={() => handleFinished(list)}>
              {' '}
              {list.finished ? (
                <BsCheckCircleFill className="text-green-500" />
              ) : (
                <BsCircle className="" />
              )}
            </h1>

            <div className="w-full">
              <h1 className={`sm:text-xl ${list.finished && 'line-through '}`}>
                {list.desc}
              </h1>
              <div className="text-xs pl-1.5 pt-1 flex items-center gap-3 ">
                {list.remainder && (
                  <h1 className="flex items-center">
                    <HiOutlineBellAlert />
                    <p>{list?.date}</p>
                  </h1>
                )}
                {list.subtasks.length > 0 && (
                  <h1 className="text-[10px] font-extralight flex items-center gap-1 lg:text-xs    ">
                    <FaCodeBranch className="opacity-70 -rotate-90" />
                    <p>
                      <span>0</span> / <span>{list.subtasks.length}</span>
                    </p>
                  </h1>
                )}
              </div>
            </div>

            {all && (
              <h1
                onClick={() => handleImportant(list)}
                className={`${list.finished ? 'hidden' : 'pr-2 sm:text-xl '}`}
              >
                {list.important ? (
                  <HiMiniExclamationCircle className="text-red-600 " />
                ) : (
                  <HiOutlineExclamationCircle />
                )}
              </h1>
            )}

            {imp && (
              <h1
                onClick={() => handleImportant(list)}
                className="pr-2 sm:text-xl "
              >
                {list.important && (
                  <HiMiniExclamationCircle className="text-red-600 " />
                )}
              </h1>
            )}

            <h1
              onClick={() => handleDelete(list)}
              className="text-xs p-0.5 border border-gray-900 dark:border-gray-500 rounded-full sm:text-xl"
            >
              <HiOutlineXMark />
            </h1>
          </div>
        </ul>
      ))}
    </ul>
  );
}

export default TaskTemplate;
