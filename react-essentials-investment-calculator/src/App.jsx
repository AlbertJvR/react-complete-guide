import { useState } from "react";
import UserInput from "./components/UserInput";
import Header from "./components/Header/Header";
import Results from "./components/Results";

const INITIAL_VALUES = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  const [userInput, setUserInput] = useState(INITIAL_VALUES);

  function handleInputChange(inputIdentifier, newValue) {
    setUserInput((prevInput) => ({
      ...prevInput,
      [inputIdentifier]: newValue,
    }));
  }

  const inputIsValid = userInput.duration > 0;

  return (
    <>
      <Header />
      <UserInput userValues={userInput} onInputChange={handleInputChange} />
      {inputIsValid && <Results userValues={userInput} />}
      {!inputIsValid && <p className="center">Please enter valid duration</p>}
    </>
  );
}

export default App;
