import React from "react";
import { connect } from 'react-redux'

const ProgressBarFiles = ({ progressBar }) => (
    <div>
       {(progressBar && progressBar.map((progressInfo, index) => (
        <div className="mb-2" key={index}>
        <span>{progressInfo.fileName}</span>
        <div className="progress">
            <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progressInfo.percentage}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progressInfo.percentage + "%" }}
            >
            {progressInfo.percentage}%
            </div>
        </div>
        </div>
        )))}
        
    </div>
  )

const mapStateToProps = (state) => {
    return {
        progressBar : state.uploadImage.progressBar
    }
}
  
const ProgressBar = connect(
    mapStateToProps
)(ProgressBarFiles)
  
  export default ProgressBar;