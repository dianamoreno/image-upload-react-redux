/**
 * Algoritmo que permite reimensionar una imagen
 * preservando el ratio del ancho y alto de la imagen.
 */
class ResizeImage {

    /*este metodo calcula el nuevo ancho y alto de la imagen teniendo en cuenta
    el ancho y alto maximos, y el ancho y alto de la imagen original
    como resultado retorna las nuevas dimensiones claculados
    */
    resize(maxWidth, maxHeight, width, height) {

        let msg = "";

        //validamos si la imagen original es más pequeña o igual en dimensiones
        //a las dimensiones maximas definidas, si es así, se mantienen los tamaños originales 
        if(maxWidth >= width && maxHeight >= height){
            msg = "El tamaño que debe tener la imagen para entrar en una hoja tamaño A4 (796 x 1123 pixeles) sin márgenes es el de la imagen original. Ancho: "+width+"px Alto: "+height+"px";
            return [msg, width, height, width, height]

        }  else {

            //se calcula el ratio de los tamaños maximos deseados y los tamaños originales.
            let widthRatio = maxWidth / width;
            let heightRatio = maxHeight / height;

            // Ratio a usar para cacular las nuevas dimensiones de la imagen, debe ser el valor menor.
            // para garantizar que al reducir la imagen las dos dimensiones queden por debajo del
            // margen de los dos maximos
            let ratio = widthRatio < heightRatio? widthRatio : heightRatio;

            // Se calculcan las nueva dimensiones.
            let newWidth  = width  * ratio;
            let newHeight = height * ratio;
            
            //redondeamos valor decimal
            if(newWidth === maxWidth) newHeight = Math.round(newHeight);
            if(newHeight === maxHeight) newWidth = Math.round(newWidth);

            msg = "El tamaño que debe tener la imagen para entrar en una hoja tamaño A4 (796 x 1123 pixeles) sin márgenes es Ancho: "+newWidth+"px Alto: "+newHeight+"px. Tamaño original("+width+"x"+height+")";
            return [msg, width, height, newWidth, newHeight]
        }
    }
  
    orientation(width,height) {
      return width > height? "Orientacion Pagina: VERTICAL" : "Orientacion Pagina: HORIZONTAL" ;
    }
  }
  
  export default new ResizeImage();