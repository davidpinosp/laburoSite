import React from "react";

const Message = (message: { message: string }) => (
  <section>
    <p>{message.message}</p>
  </section>
);

export default Message;
