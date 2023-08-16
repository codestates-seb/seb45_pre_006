import React from 'react';
import { styled } from "styled-components"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BlueButton } from '../common/Button';

const MainHeadLineStyle = styled.div`
  width: 1100px;
  height: 82px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--border);
  div:first-child{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 12px;
  }
    div > h1 {
      max-width: 100%;
      height: 35px;
      font-size: 27px;
      margin-left: 25px;
    }
    div > button {
      padding: 0px;
      height: 37.8px;
      width: 103px;
      margin-right: 24px;
      font-size: 13px;
      font-weight: bold;
    }
    .filter-container {
      width: 1100px;
      height: 30px;
      display: flex;
      justify-content: space-between;
      margin-right: 24px;
      margin-bottom: 12px;
    }
    .filter-container > div > h3 {
      margin-left: 25px;
      font-size: 17px;
      font-weight: 500;
    }
    .toggle-wrap {
      display: flex;
      flex-direction: row;
    }
    .toggle-wrap > span {
      margin-right: 10px;
      padding-top: 7px;
      font-size: 13px;
      color: #6A737C;
    }
    #toggle {
      margin-right: 24px;
      position: relative;
      display: block;
      width: 50px;
      height: 25px;
      background-color: var(--powder-100);
      border-radius: 160px;
      transition: 0.5s;
      cursor: pointer;
      box-shadow: inset 0 8px 60px rgba(0,0,0,0.1)
                  inset 0 8px 8px rgba(0,0,0,0.1)
                  inset 0 -4px 4px rgba(0,0,0,0.1);
        &:hover {
          background-color: var(--powder-100-hover);
        }
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
      box-shadow: 0 8px 40px rgba(0,0,0,0.5)
                  inset 0 4px 4px rgba(0,0,0,0.2)
                  inset 0 4px 4px rgba(0,0,0,0.2);
      transition: 0.5s;
    }
    #toggle.active .indicator {
      left: 25px;
      background: linear-gradient(to bottom, var(--blue-500), var(--blue-500) );
    }
`

export default function MainHeadLine(props) {
  const askPage = useNavigate();
  const askBtnHandler =()=>{
    askPage("/ask")
  }
    return(
      <MainHeadLineStyle >
        <div >
          <h1>All question</h1>
          <BlueButton onClick={askBtnHandler}>Ask Question</BlueButton>
        </div>
        <div className="filter-container">
          <div>
            <h3>1245124 questions</h3>
          </div>
          <div className='toggle-wrap'>
            <span>Answered</span>
            <div id="toggle" className={props.togle ? "active" : ""} onClick={props.filterHandler}>
              <div className='indicator'></div>
            </div>
          </div>
        </div>
      </MainHeadLineStyle>
    )
}