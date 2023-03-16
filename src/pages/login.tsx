import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { NextPage } from "next";
import Link from "next/link";
import { useFormik } from 'formik';
import bcrypt from 'bcryptjs'
// import { useSession, signIn, signOut } from "next-auth/react";
// import Credentials from "next-auth/providers/credentials";


const Login: NextPage = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    onSubmit
  });

  /*async*/ function onSubmit(values: { email: string; password: string; }) {
    if (!values.email || !values.password) {
      alert("Please enter your email and password!");
    }
    else {
      // const status = await signIn('credentials', {
      //   redirect: false,
      //   email: values.email,
      //   password: values.password,
      //   callbackUrl: '/'
      // })
      console.log(values)

      async function hashPassword(plaintextPassword : string) {
          const hash = await bcrypt.hash(plaintextPassword, 10);
          
      }
    
      // compare password
      async function comparePassword(plaintextPassword : string, hash : string) {
          const result = await bcrypt.compare(plaintextPassword, hash);
          return result;
      }

      const saltRounds = 10;
    //   const salt = bcrypt.genSaltSync(saltRounds);
    //   const hash = bcrypt.hashSync(values.password, salt);

    //   async function checkUser(username : string, password : string) {
    //     //... fetch user from a db etc.
    
    //     const match = await bcrypt.compare(password, user.passwordHash);
    
    //     if(match) {
    //         //login
    //     }
    
    //     //...
    // }

    const hashPassword1 = async () => {
      const hash = await bcrypt.hash(values.password, saltRounds)
      console.log(hash)
      console.log(await bcrypt.compare(values.password, hash))
    }
    
    hashPassword1()
    //.catch(err => handle(err))
    .then(() => console.log('this will succeed'))
    .catch(() => 'obligatory catch')

      // authentication
      if (values.email == "jenny@gmail.com" && values.password == "abc123") {
        alert("Login successful");
      } else {
        alert("Incorrect email or password.")
      }

      // console.log(status);
      // if(status?.ok)console.log("success!");
    }
  }

  return (
    <>
      <Head>
        <title>Cinema E-Booking App</title>
        <meta name="description" content="Buy your tickets today!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center ">
        <div className="my-auto w-full rounded-md bg-white p-6 shadow-md lg:max-w-xl">
          <h1 className="text-center text-3xl font-semibold text-dark-red ">
            Sign in
          </h1>

          <form onSubmit={formik.handleSubmit} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                id="email"
                type="email"        
                {...formik.getFieldProps('email')}
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-dark-red focus:border-light-coral focus:outline-none focus:ring focus:ring-light-coral focus:ring-opacity-40"
              required/>
              {formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                pattern=".{8,}"            
                {...formik.getFieldProps('password')}
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-dark-red focus:border-light-coral focus:outline-none focus:ring focus:ring-light-coral focus:ring-opacity-40"
              required/>
              {formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>
            <a href="#" className="text-xs text-dark-red hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button className="w-full transform rounded-md bg-dark-red px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-light-coral focus:bg-light-coral focus:outline-none">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-xs font-light text-gray-700">
            {" "}
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-dark-red hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
