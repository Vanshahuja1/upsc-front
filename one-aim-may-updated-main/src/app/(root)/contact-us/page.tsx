import Banner from "@/components/common/Banner";
import CommonHeading from "@/components/ui/CommonHeading";
import Link from "next/link";
import React from "react";
import ContactForm from "./components/Form";
import Footer from "@/components/Footer";

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-b from-[#FFE5E5] via-[#FFEBD9] to-[#FFE5E5]">
      <Banner title="Contact Us" desp="We’re Here to Help!">
        <Link href="/">Home</Link>
        <span>{">"}</span>
        <span className="text-primaryred"> Contact Us</span>
      </Banner>

      <div className="padding-yx screen">
        <ContactForm />
      </div>
      <div className="padding-bx screen">
        <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8673124066256!2d75.7223!3d26.9115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQxLjQiTiA3NcKwNDMnMjAuMyJF!5e0!3m2!1sen!2sin!4v1625661234567!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
