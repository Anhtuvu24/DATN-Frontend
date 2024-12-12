import { storage, ref, getDownloadURL, getMetadata } from "../assets/configFirebase.js";

export const getFileInfo = async (urlFirebase) => {
    try {
        // Kiểm tra nếu là URL trực tiếp
        if (urlFirebase.startsWith("https://storage.googleapis.com/")) {
            return { url: urlFirebase, metadata: null }; // Trả về URL trực tiếp và metadata null
        }

        // Nếu không phải URL trực tiếp, xử lý như path
        const fileRef = ref(storage, urlFirebase);
        const url = await getDownloadURL(fileRef); // Lấy URL tải xuống
        const metadata = await getMetadata(fileRef); // Lấy metadata của file

        return { url, metadata };
    } catch (error) {
        console.error("Error fetching file info:", error);
        throw error; // Ném lỗi để xử lý ngoài
    }
};
