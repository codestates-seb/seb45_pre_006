import { styled } from "styled-components";
import Input from "./Input";

const StyleErrorInput = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-weight: bold;
    margin-bottom: 3px;
  }
  input {
    margin-bottom: 3px;
  }
  .error-message {
    height: 100%;
    font-size: 13px;
    font-weight: bold;
    color: #d0393e;
    padding-left: 2px;
    margin-bottom: 15px;
  }
`;
const ErrorInput = ({ label, type, name, value, onChange, error, maxLength, autoComplete }) => (
  <StyleErrorInput>
    <label htmlFor={name}>{label}</label>
    <Input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      $error={error}
      autoComplete={autoComplete}
    />
    <div className="error-message">{error}</div>
  </StyleErrorInput>
);

export default ErrorInput;
