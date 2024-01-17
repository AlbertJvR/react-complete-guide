// NB* When using 'event.target.value', the value is always a STRING. This leads to bugs when doing mathematical calcs
// ALWAYS CONVERT WITH THE '+' SYMBOL!!!! #JavaScript is SO fun.....#ImNotSaltyYoureSalty
export default function UserInput({ userValues, onInputChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment">Initial investment:</label>
          <input
            type="number"
            value={userValues.initialInvestment}
            onChange={(event) =>
              onInputChange("initialInvestment", +event.target.value)
            }
            required
          />
        </p>
        <p>
          <label htmlFor="annual-investment">Annual investment:</label>
          <input
            type="number"
            value={userValues.annualInvestment}
            onChange={(event) =>
              onInputChange("annualInvestment", +event.target.value)
            }
            required
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">Expected return:</label>
          <input
            type="number"
            value={userValues.expectedReturn}
            onChange={(event) =>
              onInputChange("expectedReturn", +event.target.value)
            }
            required
          />
        </p>
        <p>
          <label htmlFor="duration">Duration:</label>
          <input
            type="number"
            value={userValues.duration}
            onChange={(event) => onInputChange("duration", +event.target.value)}
            required
          />
        </p>
      </div>
    </section>
  );
}
