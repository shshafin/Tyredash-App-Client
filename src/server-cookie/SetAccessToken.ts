"use server";

import { cookies } from "next/headers";

const setAccessToken = async (token: string, name: string) => {
  (await cookies()).set(name, token);
};

export default setAccessToken;
