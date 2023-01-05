import styled from 'styled-components';
import './App.css';
import ModulePageThread from './components/threads/ModulePageThread';
import { Colors } from './constants';

const Background = styled.div`
    background-color: ${Colors.blue};
    width: 100%;
    background-size: cover;
    min-height: 100vh;
`
// import ModulePageThread from './components/threads/ModulePageThread';

// function TestCORS() {
//   const makeAPICall = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/ping', {mode:'cors'});
//       const data = await response.json();
//       console.log({ data })
//     }
//     catch (e) {
//       console.log(e)
//     }
//   }
//   useEffect(() => {
//     makeAPICall();
//   }, [])
//   return (
//     <div className="App">
//       <h1>React Cors Guide</h1>
//     </div>
//   );
// }

function App() {
  return (
    <Background>
      <ModulePageThread threadId={2} />
    </Background>
  );
}

export default App;
