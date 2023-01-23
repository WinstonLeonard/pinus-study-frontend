import Background from './components/Background';
import SignUpModal from './components/authentication_modal/SignUpModal';
import LoginModal from './components/authentication_modal/LoginModal';

function App() {

  return (
    <Background>
      <SignUpModal/>
    </Background>
  );
}

export default App;