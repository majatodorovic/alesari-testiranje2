import Image from "next/image";

export const MobileSearch = ({
  handleOpenSearch,
  data,
  handleSearch,
  handleSearchOnChange,
}) => {
  return (
    <>
      <div
        onClick={() => {
          handleOpenSearch(false, "");
        }}
        className={
          data?.search?.open ? `modal-open-overlay` : `modal-closed-overlay`
        }
      ></div>
      <div className={data?.search?.open ? `modal-open` : `modal-closed`}>
        <div className={`relative mx-auto`}>
          <form
            className={`flex items-center gap-2 px-2`}
            onSubmit={handleSearch}
          >
            <input
              value={data?.search?.term}
              placeholder={`Enter your search term...`}
              type={`text`}
              onChange={({ target: { value } }) => {
                handleSearchOnChange(value);
              }}
              className={`w-[20rem] rounded-md border border-slate-300 text-base font-sans hover:border-black focus:border-black focus:outline-0 focus:ring-1 focus:ring-black`}
            />
            <button
              onClick={handleSearch}
              className={`self-stretch rounded-md bg-black px-3 hover:bg-black/80`}
            >
              <Image
                src={`/icons/search.png`}
                width={20}
                height={20}
                className={`invert`}
                alt={`Alesari search`}
              />
            </button>
          </form>
          {data?.search?.term?.length >= 1 &&
            data?.search?.term?.length < 3 && (
              <p
                className={`absolute -bottom-7 left-2 mr-auto text-sm text-red-500`}
              >
                Please enter at least 3 characters
              </p>
            )}
        </div>
      </div>
    </>
  );
};
