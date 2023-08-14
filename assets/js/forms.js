document.getElementById("blogForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera normal

    const formData = new FormData(); // Crea un nuevo objeto FormData

   await handleTextFields(event);

   sendDataToBackend(formData);




function handleTextFields(event) {
    const textFields = event.currentTarget.querySelectorAll('input[type="text"]');
    textFields.forEach(field => {
        const fieldName = field.name;
        const fieldValue = field.value;
        formData.append(fieldName, fieldValue);
    });

    const fileFields = event.currentTarget.querySelectorAll('input[type="file"]');
    fileFields.forEach(field => {
        const fieldName = field.name;
        const file = field.files[0];
        console.log(fieldName,file)
        if (file) {
            formData.append(fieldName, file);
        }
    });     
    
}   
});
    


   

function sendDataToBackend(data) {
    const url = "http://127.0.0.1:8000/api/blogs/crear-blog"; // Reemplazar con la URL real del servicio backend

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        console.log("Respuesta del servidor:", responseData);
        // Aquí puedes manejar la respuesta del servidor como desees
    })
    .catch(error => {
        console.error("Error:", error);
    });
}