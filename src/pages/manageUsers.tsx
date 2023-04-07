import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import type { Session } from "next-auth";

const NotLoggedIn = () => (
  <div className="my-auto flex w-full flex-col items-center gap-10 rounded-md bg-white py-20 px-3 shadow-md lg:max-w-xl">
    <h1 className="text-center text-3xl font-semibold text-dark-red">
      You are not signed in!
    </h1>
    <Link
      className={`w-2/5 rounded-md bg-dark-red p-2 text-center`}
      href="/login"
    >
      Go to Login
    </Link>
  </div>
);

type ManageProfileProps = {
  data: Session;
};

const ManageProfile = ({ data }: ManageProfileProps) => {
  const loggedInUser = api.user.getUser.useQuery({ email: data?.user?.email });
  const userUpdater = api.user.updateUser.useMutation();
  const currentUser = loggedInUser.data;

  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChangeInfo = async () => {
    if (!user) return;
    await userUpdater.mutateAsync({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      homeStreet: homeAddress.street,
      homeCity: homeAddress.city,
      homeState: homeState,
      homeZip: homeAddress.zip,
      agreeToPromo: promo,
      state: user.state,
    });
  };

  interface User {
    email: string;
  }

  const userList = api.user.getAllUserEmails.useQuery();
  const userEmails = userList.data ?? [];

  if (user) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-3xl font-bold text-black">Manage Users</h1>
        <table className="w-full table-auto border text-black ">
          <thead>
            <tr>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Suspend</th>
            </tr>
          </thead>
          <tbody>
            {userEmails.map((email) => (
              <tr key={email}>
                <td className="px-4 py-2">{User.email}</td>
                <td className="flex justify-center px-4 py-2">
                  <input type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <></>;
  }
};

const ManageUsers: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="my-10 flex min-h-screen flex-col items-center">
        {data?.user ? <ManageProfile data={data} /> : <NotLoggedIn />}
      </main>
      <Footer />
    </>
  );
};

export default ManageUsers;
