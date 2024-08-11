import app from "./app";

const port = process.env.PORT || 3002;

app.listen(port, () => 
    {
        console.log('Se ha iniciado el servidor');
    });