document.addEventListener("DOMContentLoaded", function () {
    const blogId = 1; // ID del blog que deseas obtener

    // Función para obtener y mostrar el blog
    function fetchAndDisplayBlog(blogId) {
        fetch(`https://ejemplo.com/api/blogs/${blogId}`)
            .then(response => response.json())
            .then(data => {
                const blogContainer = document.getElementById("blog-container");
                
                // Crear elementos HTML para mostrar los datos
                const titleElement = document.createElement("h2");
                titleElement.textContent = data.titulo;

                const contentElement = document.createElement("p");
                contentElement.textContent = data.parrafo1;

                // Agregar elementos al contenedor
                blogContainer.appendChild(titleElement);
                blogContainer.appendChild(contentElement);
            })
            .catch(error => {
                console.error("Error al obtener el blog:", error);
            });
    }

    // Llamar a la función para obtener y mostrar el blog
    fetchAndDisplayBlog(blogId);
});