export const QUERY_KEYS = {
  SIGN_UP: {
    all: ["signup"],
    emailCheck: (email: string) => ["signup", "emailCheck", email],
    nicknameCheck: (nickname: string) => ["signup", "nicknameCheck", nickname],
  },

  PROFILE: {
    all: ["profile"],
    nicknameCheck: (nickname: string) => ["profile", "nicknameCheck", nickname],
  },
};
