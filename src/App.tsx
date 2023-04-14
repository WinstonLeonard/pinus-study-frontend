import Navbar from "./components/Navbar";
import Background from "./components/Background";
import HomePage from "./pages/HomePage";
import SearchModulesPage from "./pages/SearchModulesPage";

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
        <div className="app">
            <Navbar />
            <HomePage />
        </div>
    );
}

export default App;
