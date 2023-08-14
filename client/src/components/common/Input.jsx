import { styled } from "styled-components";
export default styled.input`
  outline: none;
  border: 1px solid var(--border);
  border-radius: 5px;
  height: ${(props) => props.$height || "auto"};
  width: ${(props) => props.$width || "auto"};
  padding: ${(props) => props.$padding || "0"};
  font-size: ${(props) => props.$size || "16px"};
  color: ${(props) => props.$color || "var(--black-900)"};
  border-color: ${(props) => (props.$error ? "#d0393e;" : "")};
  &:focus {
    border-color: var(--blue-500);
  }
`;
