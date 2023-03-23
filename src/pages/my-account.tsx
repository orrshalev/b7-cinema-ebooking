import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { states, months, days } from "../utils/consts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import type { Session } from "next-auth";
import bcrypt from "bcryptjs"

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  homeAddress: string;
  city: string;
  state: string;
  zip: string;
}

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

type EditProfileProps = {
  data: Session;
};

const EditProfile = ({ data }: EditProfileProps) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const loggedInUser = api.user.getUser.useQuery({ email: data?.user?.email });

  const currentUser = loggedInUser.data;
  const [user, setUser] = useState(currentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  
  const changePwdMutation = api.user.updateUserPwd.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const changePwd = async () => {
    const oldPw = document.getElementById("oldPassword")?.value as string
    const newPw = document.getElementById("newPassword")?.value as string
    const hasNewPw = await bcrypt.hash(newPw, 10);
    // console.log(user.password)
    // console.log(oldPw)
    // console.log(newPw)
    if (await bcrypt.compare(oldPw, user.password) === true) {
      const a = await changePwdMutation.mutateAsync({ id: user.id, email: user.email, password: hasNewPw })
      if (a === true) alert("Password changed successfully")
      console.log(a)
    } else {
      alert("Old password was incorrect.")
      // jennyngo1925@gmail.com
      // randompwd
    }
    console.log(user);
  };
  if (user) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-3xl font-bold text-black">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="xxx-xxx-xxxx"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 grid grid-cols-2 grid-rows-3 gap-2">
            <div className="justify-center pt-3">
              <label
                className="mb-2 block font-bold text-gray-700"
                htmlFor="password"
              >
                Change Password
              </label>
            </div>
            <div></div>
            <div className="mb-4">
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="oldPassword"
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <button 
              onClick = {changePwd}
              className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none">
                Change Password
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="homeAddress"
            >
              Home Address
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="homeAddress"
              type="text"
              name="homeAddress"
              placeholder="123 Alphabet Street"
              value={user.homeAddress}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="city"
              type="text"
              name="city"
              placeholder="Anytown"
              value={user.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="state"
            >
              State
            </label>
            <div className="relative">
              <select
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="state"
              >
                {states.map((state) => {
                  return <option key={state}>{state}</option>;
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700" htmlFor="zip">
              Zip
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="zip"
              type="text"
              name="zip"
              placeholder="12345"
              value={user.zip}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="w-full md:mb-0 md:w-1/3">
                <input
                  id="promo-checkbox"
                  type="checkbox"
                  value=""
                  className="text-dark-coral-600 focus:ring-dark-coral-500 dark:focus:ring-dark-coral-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
                <label
                  htmlFor="promo-checkbox"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Subscribe for promotions
                </label><br/><br/>
              <label
                htmlFor="payment-checkbox"
                className="text-sm font-medium text-gray-700"
              >
                Add payment info
              </label>{" "}
              <br />
              <input
                id="payment-checkbox"
                type="checkbox"
                value=""
                className="text-dark-coral-600 focus:ring-dark-coral-500 dark:focus:ring-dark-coral-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                onChange={() => setShowPaymentForm((prev) => !prev)}
              />
            </div>
            {showPaymentForm && (
              <>
                <div className="-mx-3 my-6 flex flex-wrap">
                  <div className="w-full px-3">
                    <label
                      htmlFor="grid-card-number"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Card Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-card-number"
                      type="text"
                      placeholder="####-####-####-####"
                    />
                  </div>
                </div>
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="w-full px-3">
                    <label
                      htmlFor="grid-home-address"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Billing Address<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-shipping-address"
                      type="text"
                    />
                  </div>
                </div>
                <div className="-mx-3 mb-10 flex flex-wrap">
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-city"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      City<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-state"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      State<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-state"
                      >
                        {states.map((state) => {
                          return <option key={state}>{state}</option>;
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-zip"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Zip<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div>

                <div className="-mx-3 mb-10 flex flex-wrap">
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-payment-type"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Payment Type<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-payment-type"
                      >
                        <option>Credit</option>
                        <option>Debit</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                    <label
                      htmlFor="grid-month"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Month<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-month"
                      >
                        {months.map((month) => {
                          return <option key={month}>{month}</option>;
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/6">
                    <label
                      htmlFor="grid-month"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      Day<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-month"
                      >
                        {days.map((day) => {
                          return <option key={day}>{day}</option>;
                        })}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                    <label
                      htmlFor="grid-cvv"
                      className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    >
                      CVV<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-cvv"
                      type="text"
                      placeholder="###"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <button
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    );
  } else {
    return <></>;
  }
};

const MyAccount: NextPage = () => {
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
        {data?.user ? <EditProfile data={data} /> : <NotLoggedIn />}
      </main>
      <Footer />
    </>
  );
};

export default MyAccount;
