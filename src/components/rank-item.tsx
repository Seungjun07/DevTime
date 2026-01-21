import { IMAGE_URL } from "../api/api";
import type { RankingItem } from "../types";
import defaultAvartar from "./../assets/Profile.png";

export default function RankItem(props: RankingItem) {
  const totalStudyTime = (props.totalStudyTime / 3600 / 1000).toFixed(0);
  const averageStudyTime = (props.averageStudyTime / 3600 / 1000).toFixed(1);

  const profileImage = `${IMAGE_URL}/${props?.profile?.profileImage}`;
  return (
    <div className="flex gap-9 rounded-xl bg-white px-6 py-3">
      <div className="flex h-[126px] flex-col items-start gap-4">
        <div
          className={` ${props.rank > 3 ? "bg-primary-blue/10 text-primary-blue" : "bg-primary-blue text-white"} flex h-[30px] w-auto items-center justify-center rounded-lg px-2 text-xl leading-6 font-bold`}
        >
          {props.rank}위
        </div>
        <div className="h-20 w-20">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src={props.profile.profileImage ? profileImage : defaultAvartar}
            alt="프로필 이미지"
          />
        </div>
      </div>

      <div className="flex h-auto w-[998px] flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="text-primary-blue text-xl leading-6 font-bold">
            {props.nickname}
          </div>
          <div className="text-primary-blue text-[16px] leading-5 font-medium">
            {props.profile.purpose}
          </div>
        </div>
        <div className="flex gap-6">
          <p className="flex gap-2 text-[16px] leading-5 text-gray-500">
            누적{" "}
            <b className="font-semibold text-gray-700">{totalStudyTime}시간</b>
          </p>
          <p className="flex gap-2 text-[16px] leading-5 text-gray-500">
            일 평균{" "}
            <b className="font-semibold text-gray-700">
              {averageStudyTime}시간
            </b>
          </p>
          <p className="flex gap-2 text-[16px] leading-5 text-gray-500">
            경력{" "}
            <b className="font-semibold text-gray-700">
              {props.profile.career}
            </b>
          </p>
        </div>
        <div className="flex gap-2">
          {props.profile.techStacks.slice(0, 5).map((tech) => (
            <div
              key={tech.id}
              className="rounded-[5px] bg-gray-100 px-2 py-1 text-center text-[16px] leading-5 font-medium text-gray-500"
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
