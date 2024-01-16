// buttonsContainer in the props list takes in a built in html component type below and dynamically sets the type.
// For built in types you have to assign to a const variable starting with a capital letter so that react treats it
// as a custom component and not a built-in type in html. If you are using a custom type like TabButton, you will need
// to not assign a string value (check where this is being called), but rather a pointer to the type, i.e. {TabButton} and
// not "menu". You can also set a default as shown below.
export default function Tabs({ children, buttons, ButtonsContainer = "menu" }) {
  // if you send the param starting with a capital letter, react treats it as a custom component, so you dont need
  // to assign it like the below
  //const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
