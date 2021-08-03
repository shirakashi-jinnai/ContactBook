import { TextField } from '@material-ui/core';

const TextInput = (props) => {
  return (
    <TextField
      fullWidth={props.fullWidth} //幅をmaxにするかしないかを真偽値で渡す
      label={props.label}
      margin='dense'
      multiline={props.multiline}
      required={props.required}
      rows={props.rows} //あらかじめ何行のフィールドを表示するか
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  );
};

export default TextInput;
