//metodo que valida los actions para ejecutar la acción
// correspondiente según la interaccion del usuario con la página
const uploadImage = (state = {}, action) => {

    switch (action.type) {
        case 'SELECCCIONAR_ARCHIVOS':

            let selectedFiles = action.files;
            let files = []
            for (let selectedFile of selectedFiles) {
                files.push(selectedFile);
            }

            return {
                ...state,
                selectedImages: files
            }
            
        case 'CARGAR_ARCHIVOS' :
            return uploadImages(state, action)
            
        case 'LISTAR_IMAGENES':
            return {
                ...state,
                imagesList: action.list
            }

        case 'REFRESCAR_PROGRESO_CARGA' :
            return{
                ...state,
                progressBar: action.progress,
                procesarImagenes: ""
            }
        
        case "FINALIZAR_CARGA":
            return{
                ...state,
                progressBar: [],
                procesarImagenes: "",
                showAlertMessage: true,
                alertMessage: action.text,
                selectedImages: []
            }

        case "REDIMENSIONAR_IMAGEN":
            return{
                ...state,
                showAlertMessage: false,
                showResultMessage: true,
                resultMessageSize: action.msg,
                resultMessageOrientation: action.orientation,
                progressBar: []
            }

        default:
            return state;
    }
};

export default uploadImage;

//metodo que evalua si todos las imagenes seleccionadas son de tipo JPG
const imageTypeValidation = (files, imageTypeAccepted) => {


    for (let file of files) {
        if(file.type.toLowerCase() !== imageTypeAccepted)
            return false;
    }

    return true;
}

//método que recorre la lista de imagenes para mostrar la barra del progreso de carga de cada una
const uploadImages = (state = {}, action) => {

    const selectedFiles = state.selectedImages

    if(selectedFiles.length > 0){

        if( imageTypeValidation(selectedFiles, action.imgType) ){
            // actualizamos limpiando el valor de estado del mensaje de alerta para que se renderice el DOM 
            let _progressBar = [];
            for (let selectedFile of selectedFiles) {
                _progressBar.push({ percentage: 0, fileName: selectedFile.name });
            }

            return {
                ...state,
                showAlertMessage: false,
                alertMessage: "",
                progressBar: _progressBar,
                procesarImagenes: "S"
            }
          
        } else {
             
            return {
                ...state,
                showAlertMessage: true,
                alertMessage: "Solo se permiten imagenes tipo "+action.imgType,
                showResultMessage: false,
                progressBar: [],
                procesarImagenes: ""                   
            }
            
        }

    } else {

        return {
            ...state,
            showAlertMessage: true,
            alertMessage: "No ha seleccionado ningún archivo aún!",
            showResultMessage: false,
            progressBar: [],
            procesarImagenes: ""                           
        }
    }
}