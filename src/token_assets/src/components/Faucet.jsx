import React, { useState } from "react";
import { token, canisterId,  createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const res = await authenticatedCanister.payOut();
    setBtnText(res);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button
          id="btn-payout"
          onClick={handleClick}
          disabled={isDisabled}
        >
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
