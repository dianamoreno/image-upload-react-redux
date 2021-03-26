import React from "react";
import { connect } from "react-redux";
import {getImages, showResultResizeProcess} from "../actions/images"
import {updateUploadProgress, endUploadProccess} from "../actions/upload"
import UploadService from "../services/fileUpload";
import ResizeImageService from "../services/resizeImage";

class ImagesList extends React.Component {
    
    constructor(props) {
        super(props);
                
        //tamaño de hoja A4 (796 x 1123 pixeles)
        this.widthA4 = 796; //horizontal
        this.heightA4 = 1123; //vertical

    }

    //metodo que se llama una vez se ha cargado el componente para hacer el request y 
    //traer la lista de imagenes disponibles en el servidor
    componentDidMount() {
        this.getImagesL()
    }

    getImagesL(){
        UploadService.getFiles()
        .then((response) => {
            //lanzamos la accion que actualizara el estado
            this.props.getImagesList(response.data)
        
        })
        .catch(() => {
            //si el servicio no esta disponible y da error retornamos null para ignorar esta acción
            return null;
        });
    }

    uploadImages(){
        
        let selectedFiles = this.props.selectedImages
        for (let i = 0; i < selectedFiles.length; i++) {
            this.upload(i, selectedFiles[i]);
        }
    }

    //metodo que haciendo uso de la librería de Axios 
    //lanza la petición web al API que se encarga de subir los archivos 
    //al directorio local del servidor
    upload(idx, file) {
 
        let _progressBar = [...this.props.progressBar];
    
        UploadService.upload(file, (event) => {
          _progressBar[idx].percentage = Math.round((100 * event.loaded) / event.total);
          console.log("entra request")
          console.log(event)
          this.props.updateUploadProgressImg(_progressBar)

        })
        .then(() => {
            //console.log("entra then")
            let nextMessage = "Imagen(es) cargada(s) exitosamente";
            this.props.endUploadProccessImg(nextMessage)
        
            this.getImagesL()
            
        })
        .catch(() => {
            _progressBar[idx].percentage = 0;
            let nextMessage = "No se pudo cargar la imagen: " + file.name+". ";
            this.props.endUploadProccessImg(nextMessage)
        });
        
    }

    //metodo que implementa el algoritmo de redimension de la imagen
    resizeItem (width, heigth) { 

        let res = ResizeImageService.resize(this.widthA4,this.heightA4,width,heigth)
        let msg = res[0];

        let newWidth = res[2];
        let newHeight = res[3];

        let orientation = ResizeImageService.orientation(newWidth,newHeight)
        
        // actualizamos valor de estado del mensaje de alerta para que se renderice el DOM 
        this.props.showResultResize(msg,orientation)

    }
    render (){

        //se activa el procesamiento de imagenes para la carga
        if(this.props.procesarImagenes && this.props.procesarImagenes === "S"){
            console.log("entra if this.props.procesarImagenes="+this.props.procesarImagenes)
            this.uploadImages()
        } 

        return (
            <div>
                {this.props.showAlertMessage ? <div className="alert alert-danger" role="alert">{this.props.alertMessage}</div> : null}

                {this.props.showResultMessage ?  

                    <div className="alert alert-success" role="alert">
                        <p>{this.props.resultMessageSize}</p>
                        <p>{this.props.resultMessageOrientation}</p>
                    </div> : null
                }

                { this.props.imagesList &&(
                <div className="card mt-3">
                    <div className="card-header">Lista de Imagenes</div>
                    <ul className="list-group list-group-flush">
                    
                            {this.props.imagesList.map((img, index) => (
                        
                                <li className="list-group-item" key={index}>
                                <p><a href={img.url} target="_blank" rel="noreferrer">Ver {img.name}</a></p>
                                <p>{"Tamaño original (ancho x alto):"+img.width+"px X "+img.height+"px"}</p>
                                <img src={img.url} alt={img.name} height="100px"  />
                                <div className="content-detail-info"> 
                                    <button className="btn btn-info btn-sm"
                                    onClick={()=>this.resizeItem(img.width, img.height)}>Redimensionar</button> 
                                    </div> 
                                
                                </li>
                            ))}
                        
            
                    </ul>
                </div>
                )}

            </div>
        )
    }   
    
}

const mapStateToProps = (state) => {
    return {
        alertMessage: state.uploadImage.alertMessage,
        showAlertMessage: state.uploadImage.showAlertMessage,
        showResultMessage: state.uploadImage.showResultMessage,
        resultMessageSize: state.uploadImage.resultMessageSize,
        resultMessageOrientation: state.uploadImage.resultMessageOrientation,
        imagesList: state.uploadImage.imagesList,
        selectedImages: state.uploadImage.selectedImages,
        procesarImagenes: state.uploadImage.procesarImagenes,
        progressBar: state.uploadImage.progressBar
    }
}

const mapDispatchToProps = (dispatch, props) => {

    return {
        getImagesList: (data) => dispatch(getImages(data)),
        updateUploadProgressImg: (progress) => dispatch(updateUploadProgress(progress)),
        endUploadProccessImg: (msg) => dispatch(endUploadProccess(msg)),
        showResultResize: (msg,orientation) => dispatch(showResultResizeProcess(msg,orientation))
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(ImagesList);