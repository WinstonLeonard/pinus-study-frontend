import styled from 'styled-components';
import './App.css';
import ModulePageThread from './components/threads/ModulePageThread';
import { Colors } from './constants';

const Background = styled.div`
  background-color: ${Colors.blue};
  width: 100%;
  height: 100vh;
`

function App() {
  return (
    <Background>
      <ModulePageThread/>
    </Background>
  );
}

export default App;
