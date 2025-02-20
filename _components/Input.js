"use client";

const Input = ({
  className,
  errClassName,
  formData = [],
  setFormData = () => {},
  name = "",
  title = "",
  type = "text",
  errors,
  setErrors,
  isCheckout = false,
}) => {
  //pravimo input komponentu da bismo izbegli ponavljanje koda, na promenu vrednost se upisuje u formData u shipping i billing delu, da bi bili isti

  return (
    <div className={`inputFocus relative w-full flex-1 font-sans text-sm !font-sans`}>
      {isCheckout ? (
        <>
          {type === "text" ? (
            <>
              <input
                type={`text`}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name + `shipping`]: e.target.value,
                    [name + `billing`]: e.target.value,
                  });
                  //ako polje nije prazno, brisemo ga iz niza gresaka
                  if (e?.target?.value?.length > 0) {
                    setErrors(
                      errors?.filter((error) => error !== `${name}shipping`),
                    );
                  }
                }}
                className={`w-full border-b border-[#f4f2f0] bg-[#f4f2f0] py-3  text-[16px] font-light placeholder:text-[0.965rem] placeholder:text-black focus:border-b-black focus:border-l-[#f4f2f0] focus:border-r-[#f4f2f0] focus:border-t-[#f4f2f0] focus:outline-none focus:ring-0 max-sm:!text-[16px] ${className} ${errClassName} pl-2 transition-all duration-500 focus:pl-10 ${
                  formData?.[name + `shipping`]?.length > 0 && "!pl-10"
                }`}
              />
              <label
                className={`z-0 text-black ${className} absolute left-2 top-3.5 text-[20px] font-light transition-all duration-500 ${
                  formData?.[name + `shipping`]?.length > 0 &&
                  "!top-[-15px] text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          ) : (
            <>
              <textarea
                rows={5}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name + `shipping`]: e.target.value,
                    [name + `billing`]: e.target.value,
                  });
                }}
                className={`w-full border  border-b border-[#f4f2f0] bg-[#f4f2f0]  py-3  text-[0.965rem] font-light placeholder:text-[0.965rem] focus:border-b-black focus:border-b-black focus:border-l-[#f4f2f0] focus:border-r-[#f4f2f0] focus:border-t-[#f4f2f0] focus:outline-none focus:ring-0 max-sm:!text-[16px] ${className} ${errClassName} pl-2 transition-all duration-500 focus:pl-10 ${
                  formData?.[name + `shipping`]?.length > 0 && "!pl-10"
                }`}
              />
              <label
                className={`z-0 text-black ${className} absolute left-2 top-3.5 text-[20px] font-light transition-all duration-500 ${
                  formData?.[name + `shipping`]?.length > 0 &&
                  "!top-[-15px] text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          )}
        </>
      ) : (
        <>
          {type === "text" ? (
            <>
              <input
                type={`text`}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name]: e.target.value,
                  });
                  //ako polje nije prazno, brisemo ga iz niza gresaka
                  if (e?.target?.value?.length > 0) {
                    setErrors(errors?.filter((error) => error !== name));
                  }
                }}
                className={`w-full border border-slate-200 py-3 text-[0.965rem] font-light uppercase placeholder:text-[0.965rem] placeholder:uppercase focus:border-slate-200 focus:border-b-black focus:outline-none focus:ring-0 max-sm:text-[16px] ${className} ${errClassName} pl-2 transition-all duration-500 focus:pl-10 ${
                  formData?.[name]?.length > 0 && "!pl-10"
                }`}
              />
              <label
                className={`z-0 text-[#919191] ${className} absolute left-2 top-3.5 font-light uppercase transition-all duration-500 ${
                  formData?.[name]?.length > 0 &&
                  "!top-[-15px] !text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          ) : (
            <>
              <textarea
                rows={5}
                value={formData?.[name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [name]: e.target.value,
                  });
                  if (!isCheckout) {
                    setErrors(errors?.filter((error) => error !== name));
                  }
                }}
                className={`w-full border border-slate-200 py-3 text-[0.965rem] font-light uppercase placeholder:text-[0.965rem] placeholder:uppercase focus:border-slate-200 focus:border-b-black focus:outline-none focus:ring-0 max-sm:text-[16px] ${className} ${errClassName} pl-2 transition-all duration-500 focus:pl-10 ${
                  formData?.[name]?.length > 0 && "!pl-10"
                }`}
              />
              <label
                className={`z-0 text-[#919191] ${className} absolute left-2 top-3.5 font-light uppercase transition-all duration-500 ${
                  formData?.[name]?.length > 0 &&
                  "!top-[-15px] !text-[0.7rem] !text-black"
                }`}
              >
                {title}
              </label>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
