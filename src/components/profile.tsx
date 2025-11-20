import { useState } from "react";
import ProfilePopOver from "./profile-pop-over";

export default function Profile() {
  const [isClicked, setIsClicked] = useState(false);

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
          nickname
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
