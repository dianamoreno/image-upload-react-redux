import React from 'react';
import '../res/styles/App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AddImage from "./AddImage";
import ProgressBar  from "./ProgressBar"
import ImagesList  from "./ImagesList"

function App() {
  return (
    <div className="container">
      <AddImage />
      <div className="content">
        <ProgressBar />
        <ImagesList />
      </div>
    </div>
  );
}

export default App;