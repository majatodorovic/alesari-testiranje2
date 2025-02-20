import { Layout } from "@/_components/shared/ui/layout";

const PrivacyPolicy = () => {
  return (
    <Layout className={`mt-5 !font-sans lg:mt-20`}>
      <h1 className={`active-selected text-2xl font-bold uppercase`}>
        Privacy Policy
      </h1>

      <p className={`mt-3 text-[1.1rem]`}>
        On behalf of Alesari, we are committed to protecting everyone's privacy
        our customers. We only collect necessary, basic data about
        customers/users and data necessary for business and user information in
        accordance with good business practices customs and in order to provide
        quality service. We give customers a choice including the ability to
        decide whether or not they want to be removed from mailing lists used
        for marketing purposes campaigns. All user/customer data is strictly
        stored and is only available to employees for which these data are
        necessary for the performance of work. All employees of Alesari (and
        business partners) are responsible for respecting the principles of
        privacy protection.
      </p>

      <p className={`mt-3 text-[1.1rem]`}>
        At Alesari, we are committed to protecting your privacy and ensuring
        that your personal information is handled in a safe and responsible
        manner. This policy outlines how we collect, use, and safeguard your
        information.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>Information Collection</h3>
      <p className={`mt-3 text-[1.1rem]`}>
        We collect personal information such as name, email address, billing and
        shipping address, and payment details when you place an order on our
        website. We may also collect information about your interactions with
        our site to improve your shopping experience.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>Use of Information</h3>
      <p className={`mt-3 text-[1.1rem]`}>
        Your information is used to process orders, provide customer service,
        and improve our website. We may also use your information to send
        promotional emails, which you can opt out of at any time.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>Information Sharing</h3>
      <p className={`mt-3 text-[1.1rem]`}>
        We do not sell, trade, or otherwise transfer your personal information
        to outside parties, except when necessary to fulfill your order (e.g.,
        with our shipping provider, DHL). We may also share information to
        comply with legal requirements or protect our rights.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>Data Security</h3>
      <p className={`mt-3 text-[1.1rem]`}>
        We implement various security measures to protect your personal
        information. All payment transactions are processed through secure
        gateways and are not stored on our servers.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>Cookies</h3>
      <p className={`mt-3 text-[1.1rem]`}>
        Our website uses cookies to enhance your browsing experience. Cookies
        help us understand your preferences and improve site functionality. You
        can choose to disable cookies through your browser settings.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>Your Rights</h3>
      <p className={`mt-3 text-[1.1rem]`}>
        You have the right to access, correct, or delete your personal
        information. If you wish to exercise these rights, please contact us at
        info@alesari.com.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>
        Changes to Our Privacy Policy
      </h3>
      <p className={`mt-3 text-[1.1rem]`}>
        We may update our privacy policy from time to time. Any changes will be
        posted on this page, and we encourage you to review it periodically.
      </p>
      <h3 className={`mt-7 text-[1.3rem] font-bold`}>Contact Us</h3>
      <p className={`mt-3 text-[1.1rem]`}>
        If you have any questions about our privacy policy, please contact us at{" "}
        <a href=" mailto:info@alesari.com" className="">
          <strong>info@alesari.com</strong>
        </a>
        .
      </p>
    </Layout>
  );
};

export default PrivacyPolicy;

export const metadata = {
  title: "Privacy Policy | Alesari",
};
