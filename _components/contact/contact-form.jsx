"use client";

import { useContact, useProductThumb } from "@/_hooks/ecommerce.hooks";
import { toast } from "react-toastify";
import { useCallback, useEffect, useMemo, useState } from "react";
import Input from "@/_components/Input";
import { Button } from "@/_components/shared/ui/button";

export const ContactForm = ({ slug }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    message: "",
    agree: false,
  });

  const handleReset = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      message: "",
      agree: false,
    });
  };

  const {
    validateEmail,
    formMutation: { mutate: send, isPending, isSuccess },
  } = useContact();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(formData?.email)) {
      send({
        form: {
          page_section: "contact_page",
          customer_name: formData?.first_name + " " + formData?.last_name,
          email: formData?.email,
          mail_to: "",
          message: formData?.message,
          phone: "null",
          address: "",
          accept_terms: formData?.agree,
        },
      });
    } else {
      toast.warn("Please enter valid data!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handleReset();
    }
  }, [isSuccess]);

  const { data } = useProductThumb({ id: slug, categoryId: "*" });

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        message: `I am interested in the product: ${data?.basic_data?.name}.`,
      });
    }
  }, []);

  return (
    <div
      className={`mx-auto mt-[4rem] w-full border p-5 !font-sans shadow-[10px_10px_2px_0px_rgba(0,0,0,0.75)] lg:w-[60%] lg:p-10`}
    >
      <form className={`flex flex-col gap-4 `} onSubmit={handleSubmit}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={``}
          errClassName={` ${
            []?.includes("first_name") ? "!border !border-red-500" : ""
          }`}
          name={`first_name`}
          title={`First name`}
          errors={[]}
          setErrors={() => {}}
          isCheckout={false}
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={``}
          errClassName={` ${
            []?.includes("last_name") ? "!border !border-red-500" : ""
          }`}
          name={`last_name`}
          title={`Last name`}
          errors={[]}
          setErrors={() => {}}
          isCheckout={false}
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={``}
          errClassName={` ${
            []?.includes("email") ? "!border !border-red-500" : ""
          }`}
          name={`email`}
          title={`Email`}
          errors={[]}
          setErrors={() => {}}
          isCheckout={false}
        />
        <Input
          type={`textarea`}
          setFormData={setFormData}
          formData={formData}
          className={``}
          errClassName={` ${
            []?.includes("message") ? "!border !border-red-500" : ""
          }`}
          name={`message`}
          title={`Message`}
          errors={[]}
          setErrors={() => {}}
          isCheckout={false}
        />
        <Button
          disabled={isPending}
          className={`!mx-auto bg-[#828282] px-6 py-2 font-sans text-[1rem] font-bold text-white transition-all duration-300 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
