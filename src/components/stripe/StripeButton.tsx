import React from "react";
import { JobInt } from "../../typescript/interfaces/JobInterface";

interface StripeButtonProps {
  body: JobInt;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

function StripeButton(props: StripeButtonProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.setLoading) {
      props.setLoading(true);
    }
    console.log(JSON.stringify(props.body));

    const response = await fetch(
      "https://stripecheckoutsession-gi2cautoja-uc.a.run.app",
      {
        method: "POST",
        redirect: "manual",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.body),
      }
    );
    console.log(response);

    const RedirectUrl = await response.json();
    // // Redirect to the session URL

    window.location.href = RedirectUrl.url;

    // window.location.href = response.url;
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="flx flx-center mt-25 ">
        <button type="submit" className="postjob-createjob-button">
          Pagar
        </button>
      </form>
    </React.Fragment>
  );
}

export default StripeButton;
