// When adding props with destructuring, you can FORWARD all props without having to manually set them on each element
// in the wrapper component by using spread operator with props. All the "extra" properties added at usage of the
// element are then spread as seen on the section element below.
export default function Section({ title, children, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
