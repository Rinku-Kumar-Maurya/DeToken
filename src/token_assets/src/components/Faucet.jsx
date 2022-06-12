import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Gimme gimme");

  async function handleClick(event) {
    setIsDisabled(true);
    const res = await token.payOut();
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
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
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
