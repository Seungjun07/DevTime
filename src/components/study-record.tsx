import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/token";
import trashIcon from "./../assets/trash.png";
import { formatDate } from "../lib/date";
import { formatTime } from "../lib/time";
import doubleLeftIcon from "./../assets/2chevron-left.png";
import leftIcon from "./../assets/chevron-left.png";
import doubleRightIcon from "./../assets/2chevron-right.png";
import rightIcon from "./../assets/chevron-right.png";
import { API_BASE_URL } from "../api/api";

export default function StudyRecord() {
  const [pagination, setPagination] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(1);
  const itemsPerpage = 10;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1) || 1;

  async function getStudyLogs() {
    try {
      const accessToken = getAccessToken();

      if (!accessToken) throw new Error("로그인 필요");

      const response = await fetch(
        `${API_BASE_URL}/api/study-logs?page=${currentPage}&limit=${itemsPerpage}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) throw new Error("공부 기록 불러오기 실패");
      const data = await response.json();
      setCurrentItems(data.data.studyLogs);
      setPageCount(data.data.pagination.totalPages);
      setPagination(data.data.pagination);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStudyLogs();
  }, [currentPage]);

  function removeRecord(id: string) {
    setCurrentItems((prev) => prev.filter((item) => item.id !== id));
  }

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
            {currentItems?.map((log, i) => {
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
                      onClick={() => removeRecord(log.id)}
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
