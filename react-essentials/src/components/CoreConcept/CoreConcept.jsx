import "./CoreConcept.css";
// Object desctructuring of the "props" object, keys defined by the component usage and for shorthand,
// the keys of the object defined in data.js
// function CoreConcept({ image, title, description }) {
//   return (
//     <li>
//       <img src={image} alt={title} />
//       <h3>{title}</h3>
//       <p>{description}</p>
//     </li>
//   );
// }

// and it can be called like this:
// <CoreConcept
//   image={CORE_CONCEPTS[2].image}
//   title={CORE_CONCEPTS[2].title}
//   description={CORE_CONCEPTS[2].description}
// />

// If you have data already grouped into an object like in data.js, you can pass the object as a single prop value
// instead of splitting across multiple props

// then you can call it like the following:
// <CoreConcept concept={CORE_CONCEPTS[2]} />

// function CoreConcept({ concept }) {
//   // Instead of desctructuring like below, you can also use concept.image, concept.title, concept.description
//   const { image, title, description } = concept;
//   return (
//     <li>
//       <img src={image} alt={title} />
//       <h3>{title}</h3>
//       <p>{description}</p>
//     </li>
//   );
// }

// Finally, if you send through the individual props on invocation, with spread operator or indexed values,
// you can group them in the props with the spread operator like below:
export default function CoreConcept({ ...concept }) {
  // Instead of desctructuring like below, you can also use concept.image, concept.title, concept.description
  const { image, title, description } = concept;
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
