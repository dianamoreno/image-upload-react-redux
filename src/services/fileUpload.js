import http from "../common/http-api.common";

class FileUploadService {
  
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", //tipo de dato a enviar
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/files", {
      headers: {
        "Content-type": "application/json" //tipo de dato que se recibe en la respuesta
      }
    });
  }
}

export default new FileUploadService();