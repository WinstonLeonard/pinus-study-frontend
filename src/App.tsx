import Background from './components/Background';
import SignUpModal from './components/authentication_modal/SignUpModal';
import LoginModal from './components/authentication_modal/LoginModal';

function App() {

  return (
    <Background>
      <LoginModal/>
    </Background>
  );
}

export default App;