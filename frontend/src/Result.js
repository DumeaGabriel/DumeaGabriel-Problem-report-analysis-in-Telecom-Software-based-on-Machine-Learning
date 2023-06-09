// CSS files
import './Result.css';

// Components
import MainDiv from './MainDiv';
import parse from 'html-react-parser'
import LoadingDots from './LoadingDots';

// React related
import { Chart } from "react-google-charts";

function Result({prontoList, setProntoList, index, setKey, pkey}){

    setKey(pkey);

    const accuracy = Number((prontoList[index].accuracy * 100).toFixed(2));

    const data = [
      ["Task", "Hours per Day"],
      ["", accuracy],
      ["", (100.0 - accuracy)]
    ];
    
    const options = {
      title: "",
      is3D: false,
      pieHole: 0.8,
      legend: "none",
      pieSliceText: "none",
      slices: {
        0: { color: "rgb(66, 167, 255)" },
        1: { color: "transparent" },
      },
    };

    function savePronto() {
      fetch('/save-pronto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prontoList[index])
      })
      .catch(error => console.error(error));

      const auxList = prontoList.slice();
      auxList[index] = {...auxList[index], saved: true};
      setProntoList(auxList);
    }

    return(
      <div className='result-content'>
        <div className='main-div-result'>
          <MainDiv headerText={prontoList[index].presentInDB ? "Pronto" : "Prediction"} result={true}>
              <div className='result-div'>
                  {prontoList[index].title != '' ? <p><strong>Titlu:</strong> {prontoList[index].title}</p> : null}
                  {prontoList[index].feature != '' ? <p><strong>Feature:</strong> {prontoList[index].feature}</p> : null}
                  {prontoList[index].release != '' ? <p><strong>Release:</strong> {prontoList[index].release}</p> : null}
                  {prontoList[index].groupInCharge != '' ? <p><strong>Group in charge:</strong> {prontoList[index].groupInCharge}</p> : null}
                  <p><strong>Descriere:</strong></p>{parse(prontoList[index].description)}
                  <div className='result'><p><strong>{prontoList[index].presentInDB ? "State" : "Predicted state"}:</strong></p> {prontoList[index].state === '' ? <LoadingDots /> : <p>{prontoList[index].state}</p>}</div>
              </div>
          </MainDiv>
        </div>
        <div className='save-pronto-div'>
          <MainDiv headerText={"Accuracy"} result={false}>
            <p className='accuracy-text1'>The accuracy for this prediction is:</p>
            <div className='d-chart'>
              <p className='accuracy-value'>{accuracy + "%"}</p>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"40vh"}
              />
            </div>
            {
              prontoList[index].presentInDB ? <div className='thx-msg'>This pronto is present in our database.</div> :
              !prontoList[index].isValid ? <div className='thx-msg'>This pronto has empty fields, so it can't be saved</div> :
              prontoList[index].saved ? <div className='thx-msg'>Thanks for helping us improve our algorithm!</div> :
                            <div className='save-pronto-question'>
                              <p className='accuracy-question'>Is this state prediction correct?</p>
                              <button className='accuracy-yes-button accuracy-button' onClick={savePronto}>Yes</button>
                            </div>
            }
          </MainDiv>
        </div>
      </div>
    );
}

export default Result;