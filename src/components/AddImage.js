import React from "react";
import { connect } from "react-redux";
import {selectFiles, uploadImages} from "../actions/upload"


let AddImage = ({ progressBar, dispatch }) => {
  let input

  return (
    <div className="row">
        <div className="col-8">
        <label className="btn btn-default p-0">
            <input type="file" accept="image/jpeg" onChange={ (e) => {dispatch(selectFiles(e))} }
            ref={node => { input = node }}
            />
        </label>
        </div>

        <div className="col-4">
        <button
            className="btn btn-secondary btn-sm"
            onClick={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                dispatch(uploadImages())
                input.value = ''
            }}
            disabled={(progressBar && progressBar.length)? true : false}
        >
            Cargar
        </button>
        </div>
    </div>
  )

}

const mapStateToProps = (state) => {
    return {
        progressBar : state.uploadImage.progressBar
    }
}
  
const AddImages = connect(
    mapStateToProps
)(AddImage)


export default AddImages;
