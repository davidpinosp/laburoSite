import React, { useEffect, useState } from "react";

import { JobInt } from "../../typescript/interfaces/JobInterface";

interface PaymentPageProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  job: JobInt;
}
function PaymentPage(props: PaymentPageProps) {
  const [message, setMessage] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    const result = query.get("success");
    if (result === "true") {
      setMessage(
        "¡Gracias por tu pedido y por confiar en nosotros! Pronto recibirás un correo electrónico con la información de tu compra."
      );
      setLinkMessage("Crear otra publicación");
    } else {
      setMessage(
        "Tu pedido ha sido cancelado. Te invitamos a intentarlo nuevamente."
      );
      setLinkMessage("Volver a Intentar");
    }
  }, []);
  return (
    <React.Fragment>
      {/*  main */}
      <div className="w100">
        <div className="flx flx-center" style={{ textAlign: "center" }}>
          {message}
        </div>
        <div className="flx flx-center laburo-green ">
          {" "}
          <div
            onClick={() => {
              props.setStep(1);
            }}
            className="mt-25"
          >
            {linkMessage}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PaymentPage;
