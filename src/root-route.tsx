import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/index-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import MyPage from "./pages/my-page";
import ProfileDetailPage from "./pages/profile-detail-page";
import GlobalLayout from "./layout/global-layout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route path="/" element={<IndexPage />} />
        <Route path="/sign-up" element={<SignInPage />} />
        <Route path="/sign-in" element={<SignUpPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/profile" element={<ProfileDetailPage />} />
      </Route>
    </Routes>
  );
}
