import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import MyPage from "./pages/my-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import GlobalLayout from "./layout/global-layout";
import UserInfoLayout from "./layout/user-info-layout";
import RankingPage from "./pages/ranking-page";
import ProfileEditPage from "./pages/profile-edit-page";
import DashboardPage from "./pages/dashboard-page";
import Test from "./Test";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-page/edit" element={<ProfileEditPage />} />
      </Route>

      <Route element={<UserInfoLayout />}>
        <Route path="/profile" element={<ProfileDetailPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>

      <Route path="/test" element={<Test />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
}
