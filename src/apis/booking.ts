import axios from "axios";
const API_URL= "http://localhost:5000";
export const getBooking = async (accessToken:string)=>{
    try {
        
        
        const response = await axios.get(`${API_URL}/booking/getAll`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}