import { useEffect, useState } from "react";
import axios from 'axios';
export default function Listsections({ sec, changeView}) {
    const [section, setSection] = useState([])

    useEffect(() => {
        const getSections = async () => {
            const token = "9b283bfdcd20e30335607fd4eb2a0c0610b672d7";
            try {
                const response = await axios.get(`http://localhost:8000/api/getSection/1`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setSection(response.data);
               
            } catch (error) {
                console.error('Error fetching sections:', error);
                alert(error.response);
            }
        }

        getSections(); // Trigger the function to fetch sections
    }, []); // Run once on component mount

   
    
    return (
        <>
            {
                section.map((val, idx) => (
                    <button onClick={(e)=>changeView(e)} key={val.sid}>{ val.qtype}</button>
                ))
            }
        </>
      
    );
}