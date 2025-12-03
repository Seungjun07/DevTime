import userIcon from "./../assets/user.png";
import logoutIcon from "./../assets/logout.png";
import { Link, useNavigate } from "react-router-dom";
import { deleteToken, getAccessToken } from "../utils/token";
import { useAuthStore } from "../store/auth";

export default function ProfilePopOver({ onClick }: { onClick: () => void }) {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.actions.logout);

  async function handleLogout() {
    await logout();

    navigate("/", { replace: true });
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

      <div className="flex cursor-pointer gap-4" onClick={handleLogout}>
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
