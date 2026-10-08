const API_URL = "https://api.themoviedb.org/3"; 

const API_TOKEN = process.env.REACT_APP_TMDB_TOKEN; 

export const api = async (endpoint) => { 
    const response = await fetch(`${API_URL}${endpoint}`, { 
        headers: { 
        Authorization: `Bearer ${API_TOKEN}`, 
        accept: "application/json", 
        }, 
    }); 
    
    if (!response.ok) {
        console.log("Status:", response.status);
        console.log("Token:", API_TOKEN);
        throw new Error("Failed to fetch data from TMDB");
    }
    return response.json(); 
};