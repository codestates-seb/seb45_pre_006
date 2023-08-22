import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useAxiosData from "../../hooks/useAxiosData";

import { BlueButton } from "../common/Button";

const MainHeadLineStyle = styled.div`
  width: 1124px;
  height: 82px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  .title{
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    gap: 22px;
  }
  .title > h1 {
    font-size: 27px;
  }
  .title > h3 {
    font-size: 17px;
    font-weight: 500;
  }
  .filter-container {
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-right: 48px;
    gap: 15px;
  }
  .togle-container {
    display: flex;
  }
  .filter-container > button {
    padding: 0px;
    height: 37.8px;
    width: 103px;
    font-size: 13px;
    font-weight: bold;
  }
  .togle-container > span {
    margin-right: 10px;
    padding-top: 7px;
    font-size: 13px;
    color: #6a737c;
  }
  #toggle {
    position: relative;
    display: block;
    width: 50px;
    height: 25px;
    background-color: var(--powder-100);
    border-radius: 160px;
    transition: 0.3s;
    cursor: pointer;
    box-shadow: inset 0 8px 60px rgba(0, 0, 0, 0.1) inset 0 8px 8px rgba(0, 0, 0, 0.1) inset 0 -4px 4px
      rgba(0, 0, 0, 0.1);
  }
  #toggle .indicator {
    position: absolute;
    top: 2.3px;
    left: 4px;
    width: 20px;
    height: 20px;
    background: linear-gradient(to bottom, var(--black-200), var(--black-200));
    border-radius: 50%;
    transform: scale(0.9);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5) inset 0 4px 4px rgba(0, 0, 0, 0.2) inset 0 4px 4px
      rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  #toggle.active .indicator {
    left: 25px;
    background: linear-gradient(to bottom, var(--blue-500), var(--blue-500));
  }
`;

export default function MainHeadLine(props) {
  const askPage = useNavigate();
  const askBtnHandler = () => {
    askPage("/ask");
  };

  return (
    <MainHeadLineStyle>
      <div className="title">
        <h1>All question</h1>
        <h3>{`${props.questionsFiltered.length} questions`} </h3>
      </div>
      <div className="filter-container">
          <BlueButton className="blue-btn" onClick={askBtnHandler}>Ask Question</BlueButton>
          <div className="togle-container">
            <span>Answered</span>
            <div id="toggle" className={props.togle ? "active" : ""} onClick={props.filterHandler}>
              <div className="indicator"></div>
            </div>
          </div>
      </div>
    </MainHeadLineStyle>
  );
}
