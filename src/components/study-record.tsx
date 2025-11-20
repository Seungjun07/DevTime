import trashIcon from "./../assets/trash.png";

const records = [
  {
    date: "2025.09.30",
    goal: "공부 시간 10시간 채우자 💪",
    studyTime: "10시간 1분",
    successCount: 8,
    failCount: 2,
    achieved: "75%",
  },
  {
    date: "2025.09.29",
    goal: "불타올라 정보 코드 뜯어내기",
    studyTime: "23시간 50분",
    successCount: 10,
    failCount: 2,
    achieved: "80%",
  },
  {
    date: "2025.09.30",
    goal: "공부 시간 10시간 채우자 💪",
    studyTime: "10시간 1분",
    successCount: 8,
    failCount: 2,
    achieved: "75%",
  },
  {
    date: "2025.09.29",
    goal: "불타올라 정보 코드 뜯어내기",
    studyTime: "23시간 50분",
    successCount: 10,
    failCount: 2,
    achieved: "80%",
  },
  {
    date: "2025.09.30",
    goal: "공부 시간 10시간 채우자 💪",
    studyTime: "10시간 1분",
    successCount: 8,
    failCount: 2,
    achieved: "75%",
  },
  {
    date: "2025.09.29",
    goal: "불타올라 정보 코드 뜯어내기",
    studyTime: "23시간 50분",
    successCount: 10,
    failCount: 2,
    achieved: "80%",
  },
  {
    date: "2025.09.30",
    goal: "공부 시간 10시간 채우자 💪",
    studyTime: "10시간 1분",
    successCount: 8,
    failCount: 2,
    achieved: "75%",
  },
  {
    date: "2025.09.29",
    goal: "불타올라 정보 코드 뜯어내기",
    studyTime: "23시간 50분",
    successCount: 10,
    failCount: 2,
    achieved: "80%",
  },
];

export default function StudyRecord() {
  return (
    <div className="flex flex-col rounded-[18px] bg-white px-6">
      <p className="py-6">학습 기록</p>
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
            {records.map((record, i) => (
              <tr key={i} className="border-b">
                <td className="py-6 pl-9">{record.date}</td>
                <td>{record.goal}</td>
                <td>{record.studyTime}</td>
                <td>{record.successCount}</td>
                <td>{record.failCount}</td>
                <td>{record.achieved}</td>
                <td>
                  <button className="flex cursor-pointer items-center justify-center">
                    <img
                      className="h-6 w-6 object-cover"
                      src={trashIcon}
                      alt="쓰레기통 아이콘"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-center gap-3 py-9">
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          ㅇ
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          ㅈ
        </button>
        <button className="bg-primary-blue flex h-6 w-6 items-center justify-center rounded-[5px] py-0.5 text-white">
          1
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          2
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          3
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          4
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          5
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          ㄷ
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#f0f2f5] py-0.5">
          ㅇ
        </button>
      </div>
    </div>
  );
}
