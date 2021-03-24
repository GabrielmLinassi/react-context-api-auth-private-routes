const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async (name) => {
  await delay(2000);
  if (name === "Gabriel") return true;
  throw new Error("User not found");
};
