import Input from "@/_components/Input";
import CheckoutItems from "@/_components/Cart/CheckoutItems";
import { Suspense } from "react";

const CheckoutUserInfo = ({
  className,
  formData,
  setFormData,
  items,
  refreshCart,
  errors,
  setErrors,
  refreshSummary,
}) => {
  return (
    <div className={`col-span-2 flex w-full flex-col gap-6 lg:col-span-1`}>
      <div className={`flex w-full flex-col items-center gap-6 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={`${className}`}
          errClassName={` ${
            errors?.includes("first_name_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          name={`first_name_`}
          title={`First name`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`last_name_`}
          title={`Last name`}
          errClassName={` ${
            errors?.includes("last_name_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-6 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`phone_`}
          title={`Phone`}
          errClassName={` ${
            errors?.includes("phone_shipping") ? "!border !border-red-500" : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`email_`}
          title={`Email`}
          errClassName={` ${
            errors?.includes("email_shipping") ? "!border !border-red-500" : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-6 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`address_`}
          title={`Address`}
          errClassName={` ${
            errors?.includes("address_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`object_number_`}
          title={`Object number`}
          errClassName={` ${
            errors?.includes("object_number_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-6 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`zip_code_`}
          title={`Zip code`}
          errClassName={` ${
            errors?.includes("zip_code_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`town_name_`}
          errClassName={` ${
            errors?.includes("town_name_shipping")
              ? "!border !border-red-500"
              : ""
          }`}
          title={`Town`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
      <div className={`flex w-full flex-col items-center gap-6 sm:flex-row`}>
        <Input
          setFormData={setFormData}
          formData={formData}
          className={className}
          name={`note_`}
          title={`Note`}
          type={`textarea`}
          errors={errors}
          setErrors={setErrors}
          isCheckout
        />
      </div>
    </div>
  );
};

export default CheckoutUserInfo;
