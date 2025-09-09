import React from "react";
import Footer from "@/components/Footer";
import BannerSec from "@/components/common/BannerSec";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFF5EE] min-h-screen">
      <BannerSec>
        <div className="flex items-center  gap-x-2">
          <a href="/">Home</a>
          <div>{">"}</div>
          <p className="text-primaryred">Privacy Policy</p>
        </div>
      </BannerSec>
      <div className="screen mx-auto">
        <div className=" rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              1. Introduction
            </h2>
            <p className="text-gray-600">
              Welcome to One Aim. We respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              about how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              2. Data We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Identity Data</span> includes
                first name, last name, username or similar identifier.
              </li>
              <li>
                <span className="font-medium">Contact Data</span> includes email
                address and telephone numbers.
              </li>
              <li>
                <span className="font-medium">Technical Data</span> includes
                internet protocol (IP) address, browser type and version, time
                zone setting and location, operating system and platform.
              </li>
              <li>
                <span className="font-medium">Usage Data</span> includes
                information about how you use our website and services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              3. How We Use Your Data
            </h2>
            <p className="text-gray-600 mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To register you as a new customer.</li>
              <li>
                To process and deliver your order including managing payments.
              </li>
              <li>
                To manage our relationship with you including notifying you
                about changes to our terms or privacy policy.
              </li>
              <li>To administer and protect our business and this website.</li>
              <li>
                To deliver relevant website content and advertisements to you.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              4. Cookie Policy
            </h2>
            <p className="text-gray-600">
              Our website uses cookies to distinguish you from other users of
              our website. This helps us to provide you with a good experience
              when you browse our website and also allows us to improve our
              site. A cookie is a small file of letters and numbers that we
              store on your browser or the hard drive of your computer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              5. Data Security
            </h2>
            <p className="text-gray-600">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              6. Your Legal Rights
            </h2>
            <p className="text-gray-600 mb-4">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              7. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at privacy@oneaim.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              8. Changes to the Privacy Policy
            </h2>
            <p className="text-gray-600">
              We may update our privacy policy from time to time. We will notify
              you of any changes by posting the new privacy policy on this page
              and updating the "Last Updated" date at the top of this page.
            </p>
            <p className="text-gray-600 mt-4">Last Updated: January 15, 2025</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
