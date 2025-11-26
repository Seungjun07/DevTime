import { useEffect, useState } from "react";
import ProfilePopOver from "./profile-pop-over";
import { deleteToken, getAccessToken } from "../utils/token";
import type { MyProfile } from "../types";

export default function Profile() {
  const [isClicked, setIsClicked] = useState(false);

  const [profile, setProfile] = useState<MyProfile>();
  const accessToken = getAccessToken();

  async function refreshAccessToken() {
    try {
      const response = await fetch(
        "https://devtime.prokit.app/api/auth/refresh",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) return false;

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function getProfile() {
    try {
      if (!accessToken) throw new Error("로그인 필요");

      let response = await fetch("https://devtime.prokit.app/api/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        const tokenRefreshed = await refreshAccessToken();
        if (tokenRefreshed) {
          response = await fetch("https://devtime.prokit.app/api/profile", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } else {
          deleteToken();
          throw new Error("로그인 필요");
        }
      }

      if (!response.ok) throw new Error("프로필 불러오기 실패");
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <div
        onClick={() => setIsClicked((prev) => !prev)}
        className="flex cursor-pointer items-center justify-end gap-3"
      >
        <div className="h-10 w-10 rounded-full bg-gray-300">
          <img />
        </div>
        <div className="text-secondary-indigo text-[16px] leading-5 font-bold">
          {profile?.nickname}
        </div>
      </div>
      {isClicked && (
        <div className="absolute top-full mt-6">
          <ProfilePopOver onClick={() => setIsClicked(false)} />
        </div>
      )}
    </>
  );
}
