export function Button(props) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      class="btn btn-primary m-2"
    >
      {props.children}
    </button>
  );
}
