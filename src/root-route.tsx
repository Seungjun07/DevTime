import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import MyPage from "./pages/my-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import GlobalLayout from "./layout/global-layout";
import UserInfoLayout from "./layout/user-info-layout";
import RankingPage from "./pages/ranking-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Route>

      <Route element={<UserInfoLayout />}>
        <Route path="/profile" element={<ProfileDetailPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>

      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
}
