import React from "react";

export type FooterProps = {
  absolute?: boolean;
};

// TODO: Fix inconsistencies across pages
const Footer = (props: FooterProps) => {
  return (
    <footer
      className={`px-auto ${
        props.absolute ? "absolute" : ""
      } bottom-0 mt-auto h-20 w-full bg-dark-red pt-6`}
    >
      <div className={`mx-auto  w-5/6`}>
        <div
          className={`justify-center text-center md:flex md:justify-between`}
        >
          <p
            className={`text-deep-dark-coral font-firasans text-2xl font-semibold`}
          >
            CINEMA E-BOOKING APP
          </p>
          <p className={`text-md text-deep-dark-coral font-firasans`}>
            © 2022 TEAM B7. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
