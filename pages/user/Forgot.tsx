import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
  Stepper,
  Step,
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
import Image from "next/image";
import Head from "next/head";

const URL = process.env["NEXT_PUBLIC_URL"];

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [fields, setField] = React.useState({
    email: "",
    password: "",
    otp: "",
    cpassword: "",
  });
  const [timer, setTimer] = React.useState(false);
  const [typeOne, setTypeOne] = React.useState("password");
  const [typeTwo, setTypeTwo] = React.useState("password");
  const [step, setStep] = React.useState(1);
  const [spin, setSpin] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField({ ...fields, [e.target.name]: e.target.value });
  };

  const resendOTP = async () => {
    const myPromise = new Promise(async (resolve, reject) => {
      setSpin(true);
      let response = await fetch(`${URL}/api/forgototp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: fields.email, isNew: "no" }, null, 2),
      });
      const json = await response.json();

      if (json.success) {
        resolve(json.msg);
        setSpin(false);
        setStep(step + 1);
        handleNext();
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
      let response = await fetch(`${URL}/api/forgototp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: fields.email, isNew: "no" }, null, 2),
      });
      const json = await response.json();

      if (json.success) {
        resolve(json.msg);
        setSpin(false);
        setStep(step + 1);
        handleNext();
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

  const verifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myPromise = new Promise(async (resolve, reject) => {
      setSpin(true);
      let response = await fetch(`${URL}/api/verifyOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: fields.email, OTP: fields.otp }, null, 2),
      });
      const json = await response.json();
      if (json.success) {
        resolve(json.msg);
        setSpin(false);
        setStep(step + 1);
        handleNext();
        setTimer(false);
      } else {
        reject(json.msg);
        setSpin(false);
      }
    });

    const res = await toast.promise(myPromise, {
      pending: "Please Wait",
      success: "Verified Successful",
      error: "Some Error Occurred",
    });
  };

  const resetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fields.cpassword != fields.password) {
      alert("Passwords Doesn't Match");
      return;
    }
    const myPromise = new Promise(async (resolve, reject) => {
      setSpin(true);
      let response = await fetch(`${URL}/api/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            email: fields.email,
            OTP: fields.otp,
            newPassword: fields.password,
          },
          null,
          2,
        ),
      });
      const json = await response.json();
      if (json.success) {
        resolve(json.msg);
        setSpin(false);
        router.push(`${URL}/user/SignIn`);
        setTimer(true);
      } else {
        reject(json.msg);
        router.push(`${URL}/user/Forgot`);
        setSpin(false);
      }
    });

    const res = await toast.promise(myPromise, {
      pending: "Please Wait",
      success: "Password Reset Successful",
      error: "Some Error Occurred",
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
        <title>ISkill | Forgot Password</title>
        <meta
          name="description"
          content="Page for user to reset his account password"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico " />
      </Head>
      <section className="min-h-screen">
        <div className="flex justify-center my-8 pb-8">
          <Card color="transparent" shadow={false}>
            <Typography variant="h2" color="pink" className="font-lato">
              Forgot Password
            </Typography>
            <Typography color="pink" className="mt-2 font-poppins text-sm">
              Recover your password with an OTP.
            </Typography>

            <div className="py-4 px-8 w-80 max-w-screen-lg sm:w-96 flex justify-center">
              <Image src="/fpvector.jpg" width={200} height={250} alt="img" />
            </div>
            <div className="py-4 px-8 w-80 max-w-screen-lg sm:w-96">
              <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                lineClassName="bg-gray-500/50"
                activeLineClassName="bg-pink-500"
              >
                <Step
                  className="!bg-blue-gray-800 text-white/75 cursor-pointer"
                  activeClassName="ring-0 !bg-pink-500 text-white"
                  completedClassName="!bg-pink-500 text-white"
                  onClick={() => setActiveStep(0)}
                >
                  1
                </Step>
                <Step
                  className="!bg-blue-gray-800 text-white/75 cursor-pointer"
                  activeClassName="ring-0 !bg-pink-500 text-white"
                  completedClassName="!bg-pink-500 text-white"
                  onClick={() => setActiveStep(1)}
                >
                  2
                </Step>
                <Step
                  className="!bg-blue-gray-800 text-white/75 cursor-pointer"
                  activeClassName="ring-0 !bg-pink-500 text-white"
                  completedClassName="!bg-pink-500 text-white"
                  onClick={() => setActiveStep(2)}
                >
                  3
                </Step>
              </Stepper>
            </div>

            {step == 1 && (
              <form
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
                    value={fields.email}
                    icon={<MdEmail className="text-xl text-pink-500" />}
                    onChange={OnChange}
                    color="pink"
                    style={{ fontFamily: "lato" }}
                  />
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
                  Clicked by mistake?{" "}
                  <Link
                    href={`${URL}/user/SignIn`}
                    className="font-medium text-pink-500"
                  >
                    Click to to Sign In
                  </Link>
                </Typography>
              </form>
            )}
            {step == 2 && (
              <form
                onSubmit={(e) => {
                  verifyOTP(e);
                }}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                {timer ? (
                  ""
                ) : (
                  <Button
                    onClick={() => {
                      setStep(step - 1);
                      handlePrev();
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
                    value={fields.otp}
                    onChange={OnChange}
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
                    Verify OTP
                  </Button>
                )}
                <Typography
                  color="gray"
                  className="mt-4 text-center font-poppins"
                >
                  Clicked by mistake?{" "}
                  <Link
                    href={`${URL}/user/SignIn`}
                    className="font-medium text-pink-500"
                  >
                    Click to to Sign In
                  </Link>
                </Typography>
              </form>
            )}
            {step == 3 && (
              <form
                onSubmit={resetPassword}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              >
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    handlePrev();
                  }}
                  color="pink"
                  className=" mb-6 p-1"
                >
                  <BiArrowBack className="text-xl" />
                </Button>
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    type={typeOne}
                    size="lg"
                    label="Password"
                    name="password"
                    value={fields.password}
                    required
                    onChange={OnChange}
                    icon={
                      typeOne == "text" ? (
                        <FaEyeSlash
                          className="text-xl text-pink-500"
                          onClick={() => {
                            typeOne == "text"
                              ? setTypeOne("password")
                              : setTypeOne("text");
                          }}
                        />
                      ) : (
                        <FaEye
                          className="text-xl text-pink-500"
                          onClick={() => {
                            typeOne == "text"
                              ? setTypeOne("password")
                              : setTypeOne("text");
                          }}
                        />
                      )
                    }
                    style={{ fontFamily: "lato" }}
                    color="pink"
                  />
                  <Input
                    type={typeTwo}
                    size="lg"
                    label="Confirm Password"
                    name="cpassword"
                    value={fields.cpassword}
                    required
                    onChange={OnChange}
                    icon={
                      typeTwo == "text" ? (
                        <FaEyeSlash
                          className="text-xl text-pink-500"
                          onClick={() => {
                            typeTwo == "text"
                              ? setTypeTwo("password")
                              : setTypeTwo("text");
                          }}
                        />
                      ) : (
                        <FaEye
                          className="text-xl text-pink-500"
                          onClick={() => {
                            typeTwo == "text"
                              ? setTypeTwo("password")
                              : setTypeTwo("text");
                          }}
                        />
                      )
                    }
                    style={{ fontFamily: "lato" }}
                    color="pink"
                  />
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
                    Reset Password
                  </Button>
                )}
                <Typography
                  color="gray"
                  className="mt-4 text-center font-poppins"
                >
                  Clicked by mistake?{" "}
                  <Link
                    href={`${URL}/user/SignIn`}
                    className="font-medium text-pink-500"
                  >
                    Click to to Sign In
                  </Link>
                </Typography>
              </form>
            )}
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

  return {
    props: { providers: [] },
  };
}
