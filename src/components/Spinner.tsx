const Spinner = () => {
  return (
    <div className="c-spinner">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="c-spinner__color" />
      ))}
    </div>
  );
};

export default Spinner;
