import "dotenv/config";
import app from "./app";

const PORT = process.env.APP_PORT || 3310; 

app.listen(PORT, () => {
    console.log("Server running on port 3310");
});