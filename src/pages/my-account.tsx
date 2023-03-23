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
import { Formik, Field, Form } from "formik";
import { Address } from "@prisma/client";
import type { FormikHelpers } from "formik";
import bcrypt from "bcryptjs";
import { type Card } from "@prisma/client";

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
  const loggedInUser = api.user.getUser.useQuery({ email: data?.user?.email });
  const userUpdater = api.user.updateUser.useMutation();
  const cardAdder = api.card.addCard.useMutation();
  const cardRemover = api.card.removeCard.useMutation();

  const currentUser = loggedInUser.data;
  const loggedInUserAddress = api.address.getAddress.useQuery({
    userID: currentUser?.id,
  });
  const userCards = api.card.getCards.useQuery({
    userID: currentUser?.id,
  });
  const currentAddress = loggedInUserAddress.data;
  const currentCards = userCards.data;

  const [user, setUser] = useState(currentUser);
  const [homeAddress, setHomeAddress] = useState(currentAddress);
  const [homeState, setHomeState] = useState("Alabama");
  const [cards, setCards] = useState<Card[]>([]);
  const [promo, setPromo] = useState(false);
  const showPaymentForm = cards.length < 3;

  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
    await cardAdder.mutateAsync({
      userID: currentUser?.id,
      cardNumber: document.getElementById("cardNumber")?.value as string,
      firstName: user?.firstName,
      lastName: user?.lastName,
      billAddress: document.getElementById("billStreet")?.value as string,
      billCity: document.getElementById("billCity")?.value as string,
      billState: document.getElementById("billState")?.value as string,
      billZip: document.getElementById("billZip")?.value as string,
      cardType: document.getElementById("cardType")?.value as string,
      billMonth: document.getElementById("billMonth")?.value as string,
      billYear: document.getElementById("billYear")?.value as string,
    });
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (homeAddress) {
      setHomeAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    }
  };

  const handleChangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (homeAddress && homeAddress.state) {
      setHomeState(value);
    }
  };

  const handleChangePromo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(e.target.checked);
  };

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  useEffect(() => {
    setPromo(currentUser?.agreeToPromo);
  }, [currentUser?.agreeToPromo]);

  useEffect(() => {
    currentCards ? setCards(currentCards) : setCards([]);
  }, [currentCards]);

  const changePwdMutation = api.user.updateUserPwd.useMutation();

  useEffect(() => {
    setHomeAddress(currentAddress);
    setHomeState(currentAddress?.state ?? "Alabama");
  }, [currentAddress]);

  const handleChangeInfo = async () => {
    if (!user || !homeAddress) return;
    await userUpdater.mutateAsync({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      homeStreet: homeAddress.street,
      homeCity: homeAddress.city,
      homeState: homeAddress.state,
      homeZip: homeAddress.zip,
      agreeToPromo: promo,
    });
  };

  // const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const oldPw = document.getElementById("oldPassword")?.value as string
    const newPw = document.getElementById("newPassword")?.value as string
    const hasNewPw = await bcrypt.hash(newPw, 10);
    // console.log(user.password)
    // console.log(oldPw)
    // console.log(newPw)
    if ((await bcrypt.compare(oldPw, user.password)) === true) {
      const a = await changePwdMutation.mutateAsync({
        id: user.id,
        email: user.email,
        password: hasNewPw,
      });
      if (a === true) alert("Password changed successfully");
      console.log(a);
    } else {
      alert("Old password was incorrect.");
    }
    console.log(user);
  };

  if (user) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-3xl font-bold text-black">Edit Profile</h1>
        <form onSubmit={handleChangeInfo}>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              First Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChangeUser}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Last Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleChangeUser}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">Email</label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Phone Number
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              type="text"
              name="phoneNumber"
              placeholder="xxx-xxx-xxxx"
              value={user.phoneNumber}
              onChange={handleChangeUser}
            />
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
              type="text"
              name="street"
              placeholder="123 Alphabet Street"
              value={homeAddress?.street ?? ""}
              onChange={handleChangeAddress}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">City</label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              type="text"
              name="city"
              placeholder="Anytown"
              value={homeAddress?.city ?? ""}
              onChange={handleChangeAddress}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">State</label>
            <select
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              name="state"
              value={homeState}
              onChange={handleChangeState}
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
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">Zip</label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              type="text"
              name="zip"
              placeholder="12345"
              value={homeAddress?.zip ?? ""}
              onChange={handleChangeAddress}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <div className="w-full md:mb-0">
              <input
                id="promo-checkbox"
                type="checkbox"
                defaultChecked={user.agreeToPromo}
                onChange={handleChangePromo}
                className="text-dark-coral-600 focus:ring-dark-coral-500 dark:focus:ring-dark-coral-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              />
              <label
                htmlFor="promo-checkbox"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Subscribe for promotions
              </label>
            </div>
          </div>

          <button
            className="focus:shadow-outline my-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Save Changes
          </button>
        </form>
        
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
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
                  pattern=".{8,}"
                  placeholder="Old Password"
                />
              </div>
              <div className="mb-4">
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  pattern=".{8,}"
                  placeholder="New Password"
                  required
                />
                <p className="text-xs italic text-gray-600">
                  Must be at least 8 characters long
                </p>
              </div>
              <div className="">
                <button className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700 focus:outline-none">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </form>

        <p className="mb-5 font-bold text-gray-700">Cards</p>
        <div className="my-4">
          {cards.map((card) => (
            <form key={card.cardNumber} className="-mx-3 mb-10 flex flex-wrap">
              <div className="mb-6 w-full px-3 md:mb-0 md:w-2/3">
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  type="text"
                  value={card.cardNumber}
                  readOnly
                />
              </div>
              <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                <button
                  className="block w-full appearance-none rounded border border-dark-red bg-light-red py-3 px-4 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none"
                  onClick={async () => {
                    await cardRemover.mutateAsync({
                      cardNumber: card.cardNumber,
                      userID: user.id,
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            </form>
          ))}

          {showPaymentForm && (
            <form>
              <div className="-mx-3 my-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    htmlFor="cardNumber"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Card Number<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="cardNumber"
                    type="text"
                    placeholder="####-####-####-####"
                  />
                </div>
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="w-full px-3">
                  <label
                    htmlFor="billStreet"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Billing Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="billStreet"
                    type="text"
                  />
                </div>
              </div>
              <div className="-mx-3 mb-10 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label
                    htmlFor="billCity"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    City<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="billCity"
                    type="text"
                    placeholder="Albuquerque"
                  />
                </div>
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label
                    htmlFor="billState"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    State<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="billState"
                      name="homeState"
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
                    htmlFor="billZip"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Zip<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="billZip"
                    type="text"
                    placeholder="90210"
                    name="homeZip"
                  />
                </div>
              </div>

              <div className="-mx-3 mb-10 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label
                    htmlFor="cardType"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Payment Type<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="cardType"
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
                    htmlFor="billMonth"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Month<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="billMonth"
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
                    htmlFor="billYear"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                  >
                    Year<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="billYear"
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
              <button
                onClick={handleAddCard}
                className="focus:shadow-outline my-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Add Card
              </button>
            </form>
          )}
        </div>
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
