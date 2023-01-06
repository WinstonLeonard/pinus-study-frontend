import ThreadComponent from './components/ThreadComponent';
import Background from './components/Background';
// import ModulePageThread from './components/threads/ModulePageThread';

// function TestCORS() 
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
      <ThreadComponent 
        threadId={2}
        type="THREAD_PAGE"
      />
    </Background>
  );
}

export default App;
