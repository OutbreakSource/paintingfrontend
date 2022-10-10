import logo from './logo.svg';
import './App.css';
import UploadImages from "./UploadImages";
import Detection from "./Detection";

function App() {
  return (
    <div className="App">
      <UploadImages/>
      <Detection/>
        <div>
            <text>Emotion Detected: </text>
            <text>Currently not working</text>
        </div>
    </div>
  );
}

export default App;
