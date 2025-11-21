import userIcon from "./../assets/user.png";
import logoutIcon from "./../assets/logout.png";
import { Link, useNavigate } from "react-router-dom";
import { deleteToken, getAccessToken } from "../utils/token";

export default function ProfilePopOver({ onClick }: { onClick: () => void }) {
  const navigate = useNavigate();

  async function logout() {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) throw new Error("로그인 상태가 아님");

      const response = await fetch(
        "https://devtime.prokit.app/api/auth/logout",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!response.ok) throw new Error("로그아웃 실패");

      deleteToken();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="border-disabled-300 flex w-[130px] flex-col justify-between gap-4 rounded-[5px] border bg-white px-3 py-4">
      <Link to={"/my-page"} onClick={onClick} className="flex w-[106px] gap-4">
        <img
          className="h-5 w-5 object-cover"
          src={userIcon}
          alt="유저 아이콘"
        />
        <p className="text-[16px] leading-5 font-medium text-[#4b5563]">
          마이페이지
        </p>
      </Link>
      <hr className="text-disabled-300" />

      <div className="flex cursor-pointer gap-4" onClick={logout}>
        <img
          className="h-5 w-5 object-cover"
          src={logoutIcon}
          alt="로그아웃 아이콘"
        />
        <p className="text-[16px] leading-5 font-medium text-[#4b5563]">
          로그아웃
        </p>
      </div>
    </div>
  );
}
