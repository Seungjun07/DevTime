import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.svg";
import Profile from "../components/profile";
import { useAuthStore } from "../store/auth";
import { useEffect, useState } from "react";
import SignInAlertModal from "../components/modal/sign-in-alert-modal";
export default function GlobalLayout() {
  const isLogin = useAuthStore((state) => state.isLogin);

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  function handleNavClick(path: string) {
    if (!isLogin) {
      setOpenModal(true);
      return;
    }

    navigate(path);
  }

  function handleModalClose() {
    setOpenModal(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-[rgba(246,247,249,1)] from-0% to-[rgba(233,236,245,1)] to-100%">
      <header className="text-font-secondary relative m-auto flex h-10 w-full max-w-300 justify-between pt-4 font-semibold">
        <div className="flex h-full items-center gap-12">
          <Link to={"/"}>
            <img src={logo} alt="devTime의 로고" />
          </Link>
          <div className="flex gap-9">
            <button
              className="cursor-pointer"
              onClick={() => handleNavClick("/dashboard")}
            >
              대시보드
            </button>
            <button
              className="cursor-pointer"
              onClick={() => handleNavClick("/ranking")}
            >
              랭킹
            </button>
            {openModal && <SignInAlertModal close={handleModalClose} />}
          </div>
        </div>

        <div className="flex gap-9">
          {isLogin ? (
            <Profile />
          ) : (
            <>
              <Link to={"/sign-in"}>로그인</Link>
              <Link to={"/sign-up"}>회원가입</Link>
            </>
          )}
        </div>
      </header>

      <main className="m-auto mt-24 w-full max-w-[1200px] flex-1">
        <Outlet />
      </main>
    </div>
  );
}
