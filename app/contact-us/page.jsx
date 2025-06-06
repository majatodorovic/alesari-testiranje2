import { Layout } from "@/_components/shared/ui/layout";
import data from "./contact.json";
import { ContactForm } from "@/_components/contact/contact-form";
const Contact = ({ searchParams: { slug } }) => {
  return (
    <Layout className={`mt-5 !font-sans lg:mt-20`}>
      <h1 className={`active-selected text-2xl font-bold uppercase`}>
        Contact Us
      </h1>
      <p className={`mt-5 text-justify text-[1.1rem]`}>
        Welcome to the Alesari Contact Us page—a gateway to personalized
        assistance and unparalleled support. We're here to ensure that your
        experience with us is nothing short of exceptional, guiding you every
        step of the way and addressing any inquiries you may have.
      </p>

      <div className={`mt-10 flex flex-col gap-5 text-justify`}>
        {data?.map(({ title, text, text2, email, id }) => {
          const findEmail = (text) => {
            if (!text) return ""; // Ako je text undefined, vrati prazan string

            const email = text.match(
              /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
            );
            if (email) {
              return text.replace(
                email[0],
                `<a href="mailto:${email[0]}">${email[0]}</a>`,
              );
            }
            return text;
          };
          // Spajanje `text` i `text2`
          const combinedText = [text, text2].filter(Boolean).join(" "); // Spoji samo ako postoji
          return (
            <div key={id} className={`flex flex-col gap-2`}>
              <h3 className={`text-xl font-bold`}>{title}</h3>
              <p
                className={`text-[1.1rem]`}
                dangerouslySetInnerHTML={{ __html: findEmail(combinedText) }} // Prosleđujemo spojeni tekst
              ></p>
            </div>
          );
        })}
      </div>

      <ContactForm slug={slug} />
    </Layout>
  );
};

export default Contact;

export const metadata = {
  title: "Contact Us | Alesari",
};
