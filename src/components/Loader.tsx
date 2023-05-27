import styled from "styled-components";
import { Colors } from "../constants";


export const Loader = styled.span`
 {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    background: linear-gradient(0deg, ${Colors.green_2 + "20"} 33%, ${Colors.green_2} 100%);
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  &::after {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    background: ${Colors.blue_3};
  }
  @keyframes rotation {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg)}
  } 
  }  
`

export const WhiteLoader = styled.span`
  {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid ${Colors.black};
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`

export const SmallWhiteLoader = styled.span`
  {
    width: 1.0em;
    height: 1.0em;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid ${Colors.black};
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`
