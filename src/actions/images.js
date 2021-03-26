export const getImages = (data) => {
    return {
        type: 'LISTAR_IMAGENES',
        list: data
    }
    
}

export const showResultResizeProcess = (_msg,_orientation) => {
    return {
        type: 'REDIMENSIONAR_IMAGEN',
        msg: _msg,
        orientation: _orientation
    }
    
}