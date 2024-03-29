import { useState, useEffect } from "react";
import { ticketPrices } from "../utils/consts";
import { type NextPage } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import type { Promotion } from "@prisma/client";
import Link from "next/link";
import { states, months, days, bookingFee } from "../utils/consts";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { type Address } from "@prisma/client";
import bcrypt from "bcryptjs";
import { type Card } from "@prisma/client";
import { useSession } from "next-auth/react";

//import type { Ticket } from "../types/ticket";

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
  onSubmit: () => void;
};

const EditProfile = ({ data, onSubmit }: EditProfileProps) => {
  const loggedInUser = api.user.getUser.useQuery({ email: data?.user?.email });
  const cardAdder = api.card.addCard.useMutation();
  const currentUser = loggedInUser.data;

  const userCards = api.card.getCards.useQuery({
    userID: currentUser?.id,
  });
  const currentCards = userCards.data;

  const [user, setUser] = useState(currentUser);
  const [cards, setCards] = useState<Card[]>([]);

  const showPaymentForm = cards.length < 3;

  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
    if (
      billingAddress.cardNumber &&
      billingAddress.billStreet &&
      billingAddress.billCity &&
      billingAddress.billState &&
      billingAddress.billZip &&
      billingAddress.billMonth &&
      billingAddress.billYear &&
      billingAddress.billCVV
    ) {
      await cardAdder.mutateAsync({
        userID: currentUser?.id,
        cardNumber: Buffer.from(
          document.getElementById("cardNumber")?.value as string,
          "utf8"
        ).toString("base64"),
        firstName: user?.firstName,
        lastName: user?.lastName,
        billStreet: document.getElementById("billStreet")?.value as string,
        billCity: document.getElementById("billCity")?.value as string,
        billState: document.getElementById("billState")?.value as string,
        billZip: document.getElementById("billZip")?.value as string,
        cardType: document.getElementById("cardType")?.value as string,
        billMonth: document.getElementById("billMonth")?.value as string,
        billYear: document.getElementById("billYear")?.value as string,
      });
      alert("Card saved! Please proceed with checking out.");
    } else {
      alert("Please fill out all fields to save card.");
    }
  };

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    currentCards ? setCards(currentCards) : setCards([]);
  }, [currentCards]);

  const [cardSelected, setCardSelected] = useState(null);

  const handleCardSelection = (card) => {
    if (cardSelected === card) {
      setCardSelected(null);
    } else {
      setCardSelected(card);
    }
  };

  const [billingAddress, setBillingAddress] = useState({
    cardNumber: "",
    billStreet: "",
    billCity: "",
    billState: "",
    billZip: "",
    billMonth: "",
    billYear: "",
    billCVV: "",
  });

  const handleBillingChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { id, value } = e.target;
    //if (billingAddress) {
    setBillingAddress((prevAddress) => ({ ...prevAddress, [id]: value }));
    //}
  };

  const handleCompleteOrder = (event) => {
    if (
      cardSelected ||
      (billingAddress.cardNumber &&
        billingAddress.billStreet &&
        billingAddress.billCity &&
        billingAddress.billState &&
        billingAddress.billZip &&
        billingAddress.billMonth &&
        billingAddress.billYear &&
        billingAddress.billCVV)
    ) {
      // Perform order completion logic here
      console.log("Order completed");
      onSubmit();
    } else {
      // Show error message or perform other actions for incomplete order
      event.preventDefault();
      alert(
        "Please select a payment method or enter a new one. Please fill out all fields."
      );
    }
  };

  if (user) {
    return (
      <>
        <h2 className="py-5 text-2xl font-bold text-dark-red">
          Saved Payment Methods
        </h2>
        <div className="center my-4 flex">
          {cards.map((card) => (
            <button
              key={Buffer.from(card.cardNumber, "base64").toString("utf8")}
              className={`${
                cardSelected === card ? "bg-sky-500" : "bg-gray-100"
              } mx-2 my-2 flex-1 overflow-hidden rounded`}
              onClick={() => handleCardSelection(card)}
            >
              <div className="p-4">
                <span className="block w-full appearance-none border-none bg-transparent text-gray-700">
                  {Buffer.from(card.cardNumber, "base64").toString("utf8")}
                </span>
              </div>
            </button>
          ))}
        </div>
        <h3 className="text-xl font-bold text-dark-red">New Payment Method</h3>
        <form>
          <div className="center my-4 flex">
            <div className="flex-grow">
              <label
                htmlFor="cardNumber"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              >
                Card Number<span className="text-red-500">*</span>
              </label>
              <input
                className="mb-3 block w-3/4 appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="cardNumber"
                type="text"
                placeholder="####-####-####-####"
                value={billingAddress.cardNumber}
                onChange={handleBillingChange}
                required
              />
            </div>
            <div className="flex-basis-0 w-96 flex-shrink">
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
                placeholder="1234 Alphabet St"
                value={billingAddress.billStreet}
                onChange={handleBillingChange}
                required
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
                value={billingAddress.billCity}
                onChange={handleBillingChange}
                required
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
                  value={billingAddress.billState}
                  onChange={handleBillingChange}
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
                value={billingAddress.billZip}
                onChange={handleBillingChange}
                required
              />
            </div>
          </div>

          <div className="-mx-3 mb-10 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-[28%]">
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
            <div className="mb-6 w-full px-3 md:mb-0 md:w-[20%]">
              <label
                htmlFor="billMonth"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              >
                Month<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="billMonth"
                  name="billMonth"
                  placeholder="12"
                  pattern="([1-9]|1[012])"
                  value={billingAddress.billMonth}
                  onChange={handleBillingChange}
                  required
                />
              </div>
            </div>
            <div className="mb-6 w-full px-3 md:mb-0 md:w-[25%]">
              <label
                htmlFor="billYear"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              >
                Year<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="billYear"
                  name="billYear"
                  placeholder="2023"
                  pattern="(\d\d\d\d)"
                  value={billingAddress.billYear}
                  onChange={handleBillingChange}
                  required
                />
              </div>
            </div>
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/4">
              <label
                htmlFor="billCVV"
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              >
                CVV<span className="text-red-500">*</span>
              </label>
              <input
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="billCVV"
                type="text"
                placeholder="###"
                value={billingAddress.billCVV}
                onChange={handleBillingChange}
                required
              />
            </div>
          </div>
        </form>
        {showPaymentForm && (
          <button
            onClick={handleAddCard}
            className="focus:shadow-outline my-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Save Card
          </button>
        )}
        <div className="flex flex-col items-center justify-center py-10">
          <Link
            href="/checkoutSuccess"
            className="rounded bg-dark-red px-10 py-4 text-center text-2xl"
            type="button"
            onClick={handleCompleteOrder}
          >
            COMPLETE ORDER
          </Link>
          <Link href="/" className="mt-5 text-sm text-dark-red underline">
            cancel order
          </Link>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

const PaymentCheckout: NextPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const movieTitle = router.query.movie as string;
  const movie = api.movie.getMovie.useQuery({ title: movieTitle });
  const movieData = movie.data;
  const adult = parseInt(router.query.adult as string);
  const child = parseInt(router.query.child as string);
  const senior = parseInt(router.query.senior as string);
  const showtime = new Date(router.query.showtime as string);
  const seats = (router.query.seats as string)?.split(",");

  const [promoCode, setPromoCode] = useState("");
  const promo = api.promotion.getPromotionByCode.useQuery({
    code: promoCode,
    title: movieTitle,
  });
  const discountPrice = promo.data ?? 0;
  const bookSeatMutation = api.seat.bookSeat.useMutation();
  const addOrderMutation = api.order.addOrder.useMutation();
  const loggedInUser = api.user.getUser.useQuery({ email: data?.user?.email });
  const currentUser = loggedInUser.data;
  const [user, setUser] = useState(currentUser);
  const handleSubmit = async () => {
    const o = await addOrderMutation.mutateAsync({
      userId: user?.id,
      title: movieData.title,
      seats: seats,
      adult: adult,
      children: child,
      senior: senior,
      promo: discountPrice,
      total:
        adult * ticketPrices.adult +
        child * ticketPrices.child +
        senior * ticketPrices.senior +
        bookingFee -
        discountPrice,
      showtime: showtime,
    });

    if (o) {
      seats.forEach(async (seat) => {
        const s = await bookSeatMutation.mutateAsync({
          seat: seat,
          movie: movieTitle,
          showtime: showtime,
        });
      });
    }
    await router.push("/checkoutSuccess");
  };
  useEffect(() => setUser(currentUser), [currentUser]);

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center">
        <div className="flex flex-col items-center justify-center px-4">
          <div className="top-20 flex h-[40vh] w-screen flex-row items-center justify-center">
            <Image
              width={250}
              height={300}
              src={movieData?.poster}
              alt="Movie Poster"
              className="relative"
            ></Image>
            <div className="center flex flex-col">
              <h1 className="px-5 text-4xl font-bold text-black">
                {movieTitle}
              </h1>
              <p className="px-5 text-xl text-black">{`${showtime.toLocaleDateString()} ${
                showtime.getHours() % 12 === 0 ? 12 : showtime.getHours() % 12
              }:${showtime.getMinutes().toString().padStart(2, "0")} 
                      ${showtime.getHours() >= 12 ? "PM" : "AM"}`}</p>
              <p className="max-w-sm px-5 text-xl text-black">
                {movieData?.synopsis}
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-md">
            <h1 className="py-5 text-4xl font-bold text-dark-red">
              Ticket Checkout
            </h1>
            <h1 className="py-5 pb-12 text-3xl font-bold text-gray-500 ">
              Tickets &gt; Seats &gt;
              <span className="text-3xl font-bold text-gray-500 underline">
                Payment
              </span>
            </h1>
            <div className="flex w-full flex-row justify-center space-x-5">
              <label className="text-2xl font-bold text-dark-red">
                Promotion Code:
              </label>
              <input
                className="center rounded border-2 border-gray-400 px-2 py-1 text-black hover:border-gray-600"
                placeholder=" Promo Code"
                id="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>
            <div className="grid grid-flow-col grid-cols-3 grid-rows-6 gap-y-5">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  Order Summary
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  Adult x{adult}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  Senior x{senior}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  Child x{child}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">Subtotal</h2>
                <p className="text-lg font-bold text-dark-red">Booking Fee</p>
                <p className="text-lg font-bold text-dark-red">Promotion</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-dark-red">TOTAL</h2>
              </div>
              <div></div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${ticketPrices.adult.toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${ticketPrices.senior.toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${ticketPrices.child.toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${(ticketPrices.adult * adult).toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${(ticketPrices.senior * senior).toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  ${(ticketPrices.child * child).toFixed(2)}
                </h2>
                <hr className="mt-8 h-[0.1rem] w-full bg-gray-400" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-dark-red">
                  $
                  {(
                    adult * ticketPrices.adult +
                    child * ticketPrices.child +
                    senior * ticketPrices.senior
                  ).toFixed(2)}
                </h2>
                <p className="text-lg font-bold text-dark-red">
                  ${bookingFee.toFixed(2)}
                </p>
                <p className="text-lg font-bold text-dark-red">
                  ${discountPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold text-dark-red">
                  $
                  {(
                    adult * ticketPrices.adult +
                    child * ticketPrices.child +
                    senior * ticketPrices.senior +
                    bookingFee -
                    discountPrice
                  ).toFixed(2)}
                </h2>
                <p className="text-md text-dark-red">
                  Includes applicable state and local sales taxes.
                </p>
              </div>
            </div>
            <div className="my-10 flex min-h-screen flex-col items-center">
              {data?.user ? (
                <EditProfile data={data} onSubmit={handleSubmit} />
              ) : (
                <NotLoggedIn />
              )}
            </div>
            {/* <div className="flex flex-col items-center justify-center py-10">
              <Link
                href="/checkoutSuccess"
                className="rounded bg-dark-red px-10 py-4 text-center text-2xl"
                onClick={handleCompleteOrder}
              >
                COMPLETE ORDER
              </button>
              <Link href="/" className="mt-5 text-sm text-dark-red underline">
                cancel order
              </Link>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentCheckout;
