import { useState } from "react";
import trashIcon from "./../../../../assets/trash.png";
import { formatDate } from "../../../../lib/date";
import { formatTime } from "../../../../lib/time";
import doubleLeftIcon from "./../../../../assets/2chevron-left.png";
import leftIcon from "./../../../../assets/chevron-left.png";
import doubleRightIcon from "./../../../../assets/2chevron-right.png";
import rightIcon from "./../../../../assets/chevron-right.png";
import { useStudyLogQuery } from "../../hooks/useStudyLogQuery";
import { useDeleteStudyLog } from "../../hooks/useDeleteStudyLog";

export default function StudyLogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [seletedDate, setSeletedDate] = useState("");
  const itemsPerpage = 10;

  const { mutate: deleteStudyLog, isPending: isDeleteStudyLogPending } =
    useDeleteStudyLog();
  const { data: studyLogData, isLoading: isStudyLogsLoading } =
    useStudyLogQuery({
      page: currentPage,
      limit: itemsPerpage,
      // date: seletedDate,
    });

  if (!studyLogData?.data) return null;

  const { studyLogs, pagination } = studyLogData.data;

  const pages =
    Array.from({ length: pagination.totalPages }, (_, i) => i + 1) || 1;

  if (isStudyLogsLoading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col gap-6 rounded-[18px] bg-white p-6">
      <h2 className="text-disabled-400 text-lg leading-[22px] font-semibold">
        학습 기록
      </h2>
      <div className="overflow-hidden rounded-t-xl">
        <table className="w-full">
          <colgroup>
            <col className="w-[90px]" />
            <col className="w-[186px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-[90px]" />
            <col className="w-6" />
          </colgroup>
          <thead>
            <tr className="bg-primary-blue/10 text-secondary-indigo w-[996px] text-left text-lg leading-[22px] font-semibold">
              <th className="py-5 pl-9">날짜</th>
              <th>목표</th>
              <th>공부 시간</th>
              <th>할 일 갯수</th>
              <th>미완료 할 일</th>
              <th>달성률</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studyLogs.map((log) => {
              const { hours, minutes } = formatTime(log.studyTime);
              return (
                <tr
                  key={log.id}
                  className="border-b text-[16px] leading-5 font-medium text-[#394252]"
                >
                  <td className="py-6 pl-9">{formatDate(log.date)}</td>
                  <td className="text-secondary-indigo font-semibold">
                    {log.todayGoal}
                  </td>
                  <td>
                    {hours}시간 {minutes}분
                  </td>
                  <td>{log.totalTasks}</td>
                  <td>{log.incompleteTasks}</td>
                  <td>{log.completionRate}</td>
                  <td>
                    <button
                      onClick={() => deleteStudyLog(log.id)}
                      disabled={isDeleteStudyLogPending}
                      className="flex cursor-pointer items-center justify-center"
                    >
                      <img
                        className="h-6 w-6 object-cover"
                        src={trashIcon}
                        alt="쓰레기통 아이콘"
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-3 py-9">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={!pagination?.hasPrev}
          className="disabled:bg-disabled-200 disabled:text-disabled-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5"
        >
          <img
            src={doubleLeftIcon}
            className={`${!pagination?.hasPrev && "brightness-150 invert"}`}
            alt="처음 페이지로"
          />
        </button>
        <button
          disabled={!pagination?.hasPrev}
          className="disabled:bg-disabled-200 disabled:text-disabled-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5"
        >
          <img
            src={leftIcon}
            className={`${!pagination?.hasPrev && "brightness-150 invert"}`}
            alt="이전 페이지로"
          />
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={page === currentPage}
            className={`${page === currentPage ? "bg-primary-blue font-bold text-white" : "bg-[#f0f2f5] font-medium text-gray-600"} flex h-6 w-6 cursor-pointer items-center justify-center rounded-[5px] py-0.5 text-[16px] leading-5`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={!pagination?.hasNext}
          className="disabled:bg-disabled-200 disabled:text-disabled-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5"
        >
          <img
            src={rightIcon}
            className={`${!pagination?.hasNext && "brightness-150 invert"}`}
            alt="다음 페이지로"
          />
        </button>
        <button
          disabled={!pagination?.hasNext}
          className="disabled:bg-disabled-200 disabled:text-disabled-300 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5"
        >
          <img
            src={doubleRightIcon}
            className={`${!pagination?.hasNext && "brightness-150 invert"}`}
            alt="마지막 페이지로"
          />
        </button>
      </div>
    </div>
  );
}
