import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ userValues }) {
  const results = calculateInvestmentResults(userValues);
  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  const output = results.map((result, index) => {
    const totalInterest =
      result.valueEndOfYear -
      result.annualInvestment * result.year -
      initialInvestment;
    const totalAmountInvested = result.valueEndOfYear - totalInterest;

    return (
      <tr key={index}>
        <td>{result.year}</td>
        <td>{formatter.format(result.valueEndOfYear)}</td>
        <td>{formatter.format(result.interest)}</td>
        <td>{formatter.format(totalInterest)}</td>
        <td>{formatter.format(totalAmountInvested)}</td>
      </tr>
    );
  });

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>{output}</tbody>
    </table>
  );
}
