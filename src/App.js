
import './App.css';
import Table from './component/Table';
function App() {
  return (
    <div style={{ width: "100vw", height: "100vh",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
      <div style={{ width: "70vw", height: "60vh", border:"1px solid black" }}>
        <Table />
      </div>

      


    </div>
  );
}

export default App;
