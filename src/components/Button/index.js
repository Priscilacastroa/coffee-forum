export function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={props.isDanger ? "btn btn-danger m-2" : "btn btn-primary m-2"}
    >
      {props.children}
    </button>
  );
}
