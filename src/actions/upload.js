
export const selectFiles = (evento) => {
    return {
        type: 'SELECCCIONAR_ARCHIVOS',
        files: evento.target.files
    }
}

const imageTypeAccepted = "image/jpeg";
export const uploadImages = () =>{
    return {
        type: 'CARGAR_ARCHIVOS', 
        imgType: imageTypeAccepted
    }
}

export const updateUploadProgress = (_progress) =>{
    return {
        type: 'REFRESCAR_PROGRESO_CARGA',
        progress: _progress
    }
}

export const endUploadProccess = (msg, orientation) =>{
    return {
        type: 'FINALIZAR_CARGA',
        text: msg
    }
}
