import axios from "axios";

const upload = async(file) =>{
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","fiverr");
// cloudinary mode should be unsigned
    try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/hector/images/upload",
        data);

        const {url} = res.data;

        return url;
    } catch (error) {
        console.log(error);
    }
};
export default upload;