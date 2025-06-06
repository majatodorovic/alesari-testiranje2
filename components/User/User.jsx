"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { post } from "@/_api/api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import hide from "@/public/icons/hide-password.png";
import show from "@/public/icons/show-password.png";

import Registration from "../Registration/Registration";
import { userContext } from "@/_context/user-context";
import { Button } from "@/_components/shared/ui/button";

const UserPage = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const [isReg, setIsReg] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword((prevShowLoginPassword) => !prevShowLoginPassword);
  };
  const [type, setType] = useState("password");

  const [formData, setFormData] = useState({
    email: "",
    email1: "",
    password: "",
  });

  const required = ["email", "password"];

  const [errors, setErrors] = useState([]);

  const formChangeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const formSubmitHandler = () => {
    setLoading(true);
    const err = [];
    if (err.length > 0) {
      setErrors(err);
      setLoading(false);
    } else {
      const ret = {
        email: formData.email,
        password: formData.password,
      };
      post("/customers/sign-in/login", ret)
        .then((response) => {
          if (response?.code === 200) {
            Cookies.set("customer_token", response.payload.customer_token, {
              expires: 365,
            });
            setIsLoggedIn(true);
            localStorage.setItem("loggedIn", true);
            router.push("/customer-profil");
          } else {
            setLoading(false);
            setErrors("Greška pri logovanju.");
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              },
            );
          }
          if (response?.code === 500 || response?.code === 400) {
            setLoading(false);
            setErrors(
              "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva.",
            );
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              },
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(
            "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            },
          );
          setLoading(false);
        });
    }
  };

  const changePasswordHandler = () => {
    const err = [];
    if (err.length > 0) {
      setErrors(err);
    } else {
      const ret = {
        email: formData.email1,
      };
      post("/customers/sign-in/forgot-password", ret)
        .then((response) => {
          if (response?.code === 200) {
            toast.success(
              "Uspešno ste poslali zahtev. Očekujte mail sa daljim instrukcijama.",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              },
            );
          } else {
            setErrors("Greška pri logovanju.");
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              },
            );
          }
          if (response?.code === 500 || response?.code === 400) {
            setErrors(
              "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva.",
            );
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              },
            );
          }
        })
        .catch((error) => {
          toast.error(
            "Greška pri slanju zahteva. Proverite da li ste uneli ispravne podatke.",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            },
          );
          setLoading(false);
        });
    }
  };
  return (
    <>
      <div className="mx-auto mt-[0rem] lg:mt-[9rem] !font-sans">
        <div className="mx-auto grid grid-cols-6 gap-x-3 gap-y-3 sm:mt-8 ">
          <div className="col-span-6 mb-[2rem]  bg-[#f7f7f7] p-1 px-8  py-[9rem] max-md:mx-[1rem] max-md:mt-[1rem] max-md:py-[2rem] sm:col-span-3 md:ml-[2rem]">
            <div className="flex h-[100%] flex-col items-center">
              <div className="loginHolder">
                <h3 className="text-xl font-semibold underline">
                  GOT AN ACCOUNT?
                </h3>
                <p className="mb-[2rem] mt-[0.4rem] font-thin text-[#4b4b4b]">
                  Please enter your email and password.
                </p>
                <form className="flex flex-col" onSubmit={formSubmitHandler}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={formChangeHandler}
                    placeholder="E-mail:"
                    className="border border-[#e0e0e0]   bg-white py-[0.6rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 lg:w-[24rem]"
                  />

                  <div className="relative flex">
                    <input
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={formChangeHandler}
                      id="password"
                      placeholder="Password*"
                      className="mt-[0.6rem] block w-full border  border-[#e0e0e0] bg-white py-[0.6rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 lg:mr-[0.6em] lg:w-[24rem]"
                    />
                    <button
                      type={"button"}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLoginPasswordVisibility();
                      }}
                      className="top-[1rem] max-lg:absolute max-lg:-right-[2rem] lg:right-[2rem]"
                    >
                      {showLoginPassword ? (
                        <Image
                          src={hide}
                          alt="hide password"
                          width={22}
                          height={22}
                        />
                      ) : (
                        <Image
                          src={show}
                          alt="show password"
                          width={22}
                          height={22}
                        />
                      )}
                    </button>
                  </div>
                </form>
                <div className="align-center mt-[2rem] flex justify-between">
                  <button
                    onClick={handleOpenModal}
                    className="block text-sm font-thin underline lg:ml-[0.6rem]"
                  >
                    Forgot password?
                  </button>
                  {isOpen && (
                    <div
                      className={`popup fixed left-0 top-0 z-[101] flex h-screen w-screen scale-100 items-center justify-center transition-all duration-500 max-md:z-[20000] max-md:mx-auto max-md:overflow-y-scroll`}
                    >
                      <div
                        className={`
                        borderThin relative flex flex-col  border bg-white p-[40px] shadow max-md:overflow-y-scroll`}
                      >
                        <h3 className="text-xl font-semibold underline">
                          FORGOT YOUR PASSWORD?
                        </h3>
                        <p className="mb-[2rem] mt-[0.4rem] font-thin text-[#4b4b4b]">
                          Please enter your e-mail to reset your password.
                        </p>
                        <form>
                          <input
                            name="email1"
                            type="email"
                            autoComplete="off"
                            placeholder="E-mail:"
                            value={formData.email1}
                            onChange={formChangeHandler}
                            className="w-full  border border-[#e0e0e0] py-[0.6rem] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 lg:w-[24rem]"
                          />
                        </form>
                        <button
                          onClick={changePasswordHandler}
                          className="bg-croonus-2  ml-auto mt-[0.6rem] w-fit px-[1.3rem] py-[0.7rem] text-sm text-white hover:bg-opacity-70"
                        >
                          RESET
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="absolute right-3 top-2"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={formSubmitHandler}
                    className="px-[1.3rem] py-[0.7rem] text-sm text-white hover:bg-opacity-70 max-lg:ml-[2rem] max-md:whitespace-nowrap lg:mr-[2rem]"
                  >
                    {loading ? (
                      <i
                        className={
                          "fa fa-spinner fa-spin text-center text-lg text-white"
                        }
                      ></i>
                    ) : (
                      <>LOGIN</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6  mb-[2rem] bg-[#f7f7f7] p-1 px-8  py-[9rem] max-md:mx-[1rem] max-md:mt-[0rem] max-md:py-[2rem] sm:col-span-3 md:mr-[2rem]">
            <Registration setIsReg={setIsReg} />
          </div>
        </div>
      </div>
      {isReg && (
        <div
          onClick={() => {
            setIsReg(false);
          }}
          className={`fixed left-0 top-0 h-screen w-screen bg-black/40`}
        />
      )}
    </>
  );
};

export default UserPage;
