import styled from "styled-components";


export const Loader = styled.span`
 {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #ff3d00 100%);
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
    background: #263238;
  }
  @keyframes rotation {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg)}
  } 
  }  
`

export const SubscribeLoader = styled.span`
  {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #FFF;
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
