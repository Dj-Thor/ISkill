import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { signIn as authSignIn, getProviders } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth/next";
import NextAuth from "../api/auth/[...nextauth]";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast, Slide } from "react-toastify";
import Timer from "../../components/Timer";
import { useRouter } from "next/router";
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Head from "next/head";

const URL = process.env["NEXT_PUBLIC_URL"];

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [signIn, setSignIn] = React.useState({
    email: "",
    password: "",
    otp: "",
  });
  const [timer, setTimer] = React.useState(false);
  const [type, setType] = React.useState("password");
  const [verify, setVerify] = React.useState(false);
  const [spin, setSpin] = React.useState(false);
  const signIn_OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const resendOTP = async () => {
    const myPromise = new Promise(async (resolve, reject) => {
      setSpin(true);
      let response = await fetch(`${URL}/api/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { email: signIn.email, isNew: "no", password: signIn.password },
          null,
          2,
        ),
      });
      const json = await response.json();
      if (json.success) {
        resolve(json.msg);
        setSpin(false);
        setVerify(true);
        setTimer(true);
      } else {
        reject(json.msg);
        setSpin(false);
      }
    });

    const res = await toast.promise(myPromise, {
      pending: "Please Wait",
      success: "OTP Send Successfully",
      error: "Some Error Occurred",
    });
  };

  const sendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myPromise = new Promise(async (resolve, reject) => {
      setSpin(true);
      let response = await fetch(`${URL}/api/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { email: signIn.email, isNew: "no", password: signIn.password },
          null,
          2,
        ),
      });
      const json = await response.json();
      if (json.success) {
        resolve(json.msg);
        setSpin(false);
        setVerify(true);
        setTimer(true);
      } else {
        reject(json.msg);
        setSpin(false);
      }
    });

    const res = await toast.promise(myPromise, {
      pending: "Please Wait",
      success: "OTP Send Successfully",
      error: "Some Error Occurred",
    });
  };

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => {
    e.preventDefault();
    setSpin(true);
    const myPromise = new Promise(async (resolve, reject) => {
      const response = await authSignIn(id, {
        redirect: false,
        email: signIn.email,
        password: signIn.password,
        isNew: "no",
        otp: signIn.otp,
        callbackUrl: `${URL}/`,
      });

      console.log(response);

      if (response && response.ok) {
        resolve("login successfully");
        setSpin(false);
        router.push(`${URL}/`);
      } else {
        reject();
        setSpin(false);
      }
    });
    const res = await toast.promise(myPromise, {
      pending: "Please Wait",
      success: "Login Successfully",
      error: "Invalid Credentials",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <Head>
        <title>ISkill | Sign-In</title>
        <meta name="description" content="SignI n page" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico " />
      </Head>
      <section className="min-h-screen">
        <div className="flex justify-center my-8">
          <Card color="transparent" shadow={false}>
            <Typography variant="h2" color="pink" className="font-lato ">
              Sign In
            </Typography>
            <Typography color="pink" className="mt-2 font-poppins text-sm">
              Good to see you again.
            </Typography>
            <Typography color="gray" className="mt-1 font-poppins">
              Enter your details to Sign-In
            </Typography>

            {Object.values(providers).map((item, idx) => {
              let value;
              switch (item.name) {
                case "Credentials":
                  value = verify ? (
                    <form
                      key={idx}
                      onSubmit={(e) => handleSignIn(e, item.id)}
                      className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    >
                      {timer ? (
                        ""
                      ) : (
                        <Button
                          onClick={() => {
                            setVerify(false);
                          }}
                          color="pink"
                          className=" mb-6 p-1"
                        >
                          <BiArrowBack className="text-xl" />
                        </Button>
                      )}
                      <div className="w-full p-1 mb-2">
                        {timer ? (
                          <Timer Start={timer} Stop={setTimer} />
                        ) : (
                          <Button
                            onClick={() => {
                              resendOTP();
                            }}
                            variant="text"
                            size="sm"
                            color="pink"
                            className="font-poppins"
                          >
                            Resend
                          </Button>
                        )}
                      </div>
                      <div className="mb-4 flex flex-col gap-6">
                        <Input
                          type="text"
                          size="lg"
                          label="OTP"
                          name="otp"
                          required
                          value={signIn.otp}
                          onChange={signIn_OnChange}
                          icon={
                            <MdOutlinePassword className="text-xl text-pink-500" />
                          }
                          color="pink"
                          style={{ fontFamily: "lato" }}
                        />
                      </div>
                      <Checkbox
                        label={
                          <Typography
                            variant="small"
                            color="pink"
                            className="flex items-center font-poppins"
                          >
                            I agree the
                            <a
                              href="#"
                              className="font-medium transition-colors hover:text-gray-900"
                            >
                              &nbsp;Terms and Conditions
                            </a>
                          </Typography>
                        }
                        containerProps={{ className: "-ml-2.5 text-pink-500" }}
                        color="pink"
                        required
                      />
                      {spin ? (
                        <Spinner className="mx-auto" />
                      ) : (
                        <Button
                          type="submit"
                          color="pink"
                          className="mt-6 font-poppins"
                          fullWidth
                        >
                          Login
                        </Button>
                      )}
                      <Typography
                        color="gray"
                        className="mt-4 text-center font-poppins"
                      >
                        Already have an account?{" "}
                        <Link
                          href={`${URL}/user/SignUp`}
                          className="font-medium text-pink-500"
                        >
                          Sign Up
                        </Link>
                      </Typography>
                    </form>
                  ) : (
                    <form
                      key={idx}
                      onSubmit={(e) => {
                        sendOTP(e);
                      }}
                      className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    >
                      <div className="mb-4 flex flex-col gap-6">
                        <Input
                          type="email"
                          size="lg"
                          label="Email"
                          name="email"
                          required
                          value={signIn.email}
                          icon={<MdEmail className="text-xl text-pink-500" />}
                          onChange={signIn_OnChange}
                          color="pink"
                          style={{ fontFamily: "lato" }}
                        />
                        <Input
                          type={type}
                          size="lg"
                          label="Password"
                          name="password"
                          value={signIn.password}
                          required
                          onChange={signIn_OnChange}
                          icon={
                            type == "text" ? (
                              <FaEyeSlash
                                className="text-xl text-pink-500"
                                onClick={() => {
                                  type == "text"
                                    ? setType("password")
                                    : setType("text");
                                }}
                              />
                            ) : (
                              <FaEye
                                className="text-xl text-pink-500"
                                onClick={() => {
                                  type == "text"
                                    ? setType("password")
                                    : setType("text");
                                }}
                              />
                            )
                          }
                          style={{ fontFamily: "lato" }}
                          color="pink"
                        />
                        <Typography
                          variant="small"
                          color="pink"
                          className="flex items-center gap-1 font-normal font-lato"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-px h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <Link href={`${URL}/user/Forgot`}>
                            Forgot Password
                          </Link>
                        </Typography>
                      </div>

                      {spin ? (
                        <Spinner className="mx-auto" />
                      ) : (
                        <Button
                          type="submit"
                          color="pink"
                          className="mt-6 font-poppins"
                          fullWidth
                        >
                          Send OTP
                        </Button>
                      )}
                      <Typography
                        color="gray"
                        className="mt-4 text-center font-poppins"
                      >
                        Already have an account?{" "}
                        <Link
                          href={`${URL}/user/SignUp`}
                          className="font-medium text-pink-500"
                        >
                          Sign Up
                        </Link>
                      </Typography>
                    </form>
                  );
                  break;

                case "Google":
                  value = (
                    <Button
                      size="lg"
                      variant="outlined"
                      color="pink"
                      className="flex items-center font-poppins gap-3 mt-6"
                      key={idx}
                      onClick={() => {
                        authSignIn(item.id, { callbackUrl: `${URL}/` });
                      }}
                      type="submit"
                    >
                      <img
                        src="https://docs.material-tailwind.com/icons/google.svg"
                        alt="metamask"
                        className="h-6 w-6"
                      />
                      Continue with Google
                    </Button>
                  );
                  break;
                default:
                  value = <span key={idx}></span>;
              }
              return value;
            })}
          </Card>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, NextAuth);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

/*
<Button onClick={() => { authSignIn(item.id, { callbackUrl: `${URL}/` }) }} type="submit" className="mt-6 font-poppins" fullWidth key={idx}>
        Sign In with Google
       </Button>

*/
