"use client";

import React, { useContext } from "react";
// import UserAddresses from "../user/UserAddresses";
import Link from "next/link";
// import AuthContext from "@/context/AuthContext";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Profile = () => {
  //   const { user } = useContext(AuthContext);
  const { data } = useSession();

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <Image
            className="w-16 h-16 rounded-full mr-4"
            src={
              data?.user?.avatar
                ? data?.user?.avatar?.url
                : "/images/default.png"
            }
            width={50}
            height={50}
            alt={"data?.user?.name"}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{data?.user?.name}</h5>
          <p>
            <b>Email:</b> {data?.user?.email} | <b>Joined On:</b>
            {data?.user?.createdAt?.substring(0, 10)}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      {/* <UserAddresses /> */}

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
