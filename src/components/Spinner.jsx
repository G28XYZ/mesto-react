const Spinner = () => {
  return (
    <div
      className="spinner"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h2 style={{ alignSelf: "center" }}>Загрузка...</h2>
    </div>
  );
};

export default Spinner;
