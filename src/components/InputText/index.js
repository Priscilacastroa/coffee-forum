export function InputText(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        type="text"
      />
    </>
  );
}
