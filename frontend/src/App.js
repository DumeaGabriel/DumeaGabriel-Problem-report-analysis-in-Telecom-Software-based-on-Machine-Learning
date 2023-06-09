import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NewPronto from "./newPronto";
import Result from "./Result";
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './Background';
import Dashboard from './Dashboard';
import UploadPage from './UploadPage';
import './variables.css';

function App() {

  const [prontoList, setProntoList] = useState([])

  const [pages, setPages] = useState([
    {
      key: '/',
      name: 'Pronto form',
      subpages: []
    },
    {
      key: '/upload',
      name: 'Upload pronto',
      subpages: []
    },
    {
      key: '/database',
      name: 'From database',
      subpages: []
    }
  ]);

  const [pkey, setKey] = useState('ana');

  return (
    <>
      <Background />
      <Router>
        <Dashboard pages={pages} setPages={setPages} pkey={pkey} prontoList={prontoList} setProntoList={setProntoList}/>
        <Routes>
          <Route 
            path="/"
            element=
              {
                <NewPronto 
                  prontoList={prontoList}
                  setProntoList={setProntoList}
                  setKey={setKey}
                  dashboard_content={pages}
                  setDash={setPages}
                />
              } 
          />
          <Route path="/upload" element={<UploadPage setKey={setKey} dashboard_content={pages} setDash={setPages} prontoList={prontoList} setProntoList={setProntoList}/>} />
          {prontoList.map((pronto, index) => {
            return(
                <Route path={"/" + pronto.title}
                  element={
                    <Result 
                      prontoList={prontoList}
                      setProntoList={setProntoList}
                      index={index}
                      setKey={setKey}
                      pkey={"/" + pronto.title}
                    />
                  }
                />
              );

          })}
          <Route 
            path="*"
            element=
              {
                <NewPronto 
                  prontoList={prontoList}
                  setProntoList={setProntoList}
                  setKey={setKey}
                  dashboard_content={pages}
                  setDash={setPages}
                />
              }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;