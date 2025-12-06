export async function checkNickname(nickname: string) {
  const response = await fetch(
    `https://devtime.prokit.app/api/signup/check-nickname?nickname=${encodeURIComponent(nickname)}`,
  );

  if (!response.ok) throw new Error("닉네임 중복 검사 실패");
  const data = await response.json();

  return data;
}
