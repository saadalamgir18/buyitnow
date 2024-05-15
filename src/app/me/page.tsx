import Profile from "@/components/auth/Profile";
import axios from "axios";
import { cookies } from "next/headers";
import React from "react";
const getAddresses = async () => {
  const nextCookies = cookies();
  const NextAuthSessionToken = nextCookies.get("next-auth.session-token");
  console.log(NextAuthSessionToken);
  const { data } = await axios.get("http://localhost:3000/api/address", {
    headers: {
      Cookie: `next-auth.session-token=${NextAuthSessionToken?.value}`,
    },
  });

  return data?.address;
};
const ProfilePage = async () => {
  const addresses = await getAddresses();
  return <Profile addresses={addresses} />;
};

export default ProfilePage;
