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
    height: 3px;
    font-size: 13px;
    font-weight: bold;
    color: #d0393e;
    padding-left: 2px;
    margin-bottom: 15px;
  }
`;
export const ErrorInput = ({ label, type, name, value, onChange, error, maxLength }) => (
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
    />
    <div className="error-message">{error}</div>
  </StyleErrorInput>
);
