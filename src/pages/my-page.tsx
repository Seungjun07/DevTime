import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/token";
import editIcon from "./../assets/edit.png";
import { Link } from "react-router-dom";
import { type MyProfile } from "../types";

export default function MyPage() {
  const [profile, setProfile] = useState<MyProfile>();
  const [imageUrl, setImageUrl] = useState("");

  async function getMyProfile() {
    try {
      const accessToken = getAccessToken();

      if (!accessToken) throw new Error("로그인이 필요합니다.");

      const response = await fetch(`https://devtime.prokit.app/api/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error("프로필 불러오기 실패");

      const data = await response.json();
      setProfile(data);
      console.log(data);
      setImageUrl(
        `https://dev-time-bucket.s3.ap-northeast-2.amazonaws.com/${data.profile.profileImage}`,
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div className="m-auto flex gap-14 rounded-xl bg-white p-9">
      <div className="h-45 w-45 bg-[#f0f2f5]">
        <img src={imageUrl} />
      </div>

      <div className="flex flex-1 flex-col gap-12">
        <div className="flex flex-col gap-1">
          <p className="text-secondary-indigo text-[18px] leading-[22px] font-medium">
            tony_engineer
          </p>
          {profile?.profile.goal ? (
            <p className="text-secondary-indigo text-2xl leading-[30px] font-bold">
              {profile.profile.goal}
            </p>
          ) : (
            <p className="text-disabled-300 text-2xl leading-[30px] font-bold">
              아직 설정한 목표가 없어요
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              이메일 주소
            </p>
            <p className="text-[18px] leading-[22px] font-semibold text-gray-600">
              {profile?.email}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              개발 경력
            </p>
            {profile?.profile.career ? (
              <p className="text-[18px] leading-[22px] font-semibold text-[#4b5563]">
                {profile.profile.career}
              </p>
            ) : (
              <p className="text-disabled-300 text-[18px] leading-[22px] font-semibold">
                개발 경력을 업데이트 해주세요.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              공부 목적
            </p>
            {profile?.profile.purpose ? (
              <p className="text-[18px] leading-[22px] font-semibold text-[#4b5563]">
                {profile.profile.purpose}
              </p>
            ) : (
              <p className="text-disabled-300 text-[18px] leading-[22px] font-semibold">
                공부 목적을 업데이트 해주세요.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-disabled-400 text-[14px] leading-[18px] font-semibold">
              개발 스택
            </p>
            {profile?.profile.techStacks ? (
              profile.profile.techStacks.map((stack) => (
                <div key={stack} className="flex">
                  <div className="rounded-[5px] bg-[#F0F2F5] px-2 py-1 text-[16px] leading-5 font-medium text-[#717887]">
                    {stack}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-disabled-300 text-[18px] leading-[22px] font-semibold">
                현재 공부 중인 또는 가지고 있는 개발 스택을 업데이트 해주세요.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex cursor-pointer gap-2">
        <img className="size-6" src={editIcon} alt="편집 아이콘 이미지" />
        <Link to={"/my-page/edit"}>회원정보 수정</Link>
      </div>
    </div>
  );
}
