import React from "react";

interface IContactsProps {}

const Contacts: React.FC<IContactsProps> = (props) => {
  return (
    <>
      <div>
        <p>Contacts</p>
        <div>
          you know waht
          <p>
            <a href="https://nextjs.org">Next.js</a>
          </p>
        </div>
      </div>
      Contacts
    </>
  );
};

export default Contacts;
