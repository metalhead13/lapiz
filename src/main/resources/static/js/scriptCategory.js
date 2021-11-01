//Manejador "POST"
function agregarCategory() {

    if($("#name").val().length == 0 || $("#description").val() == 0){
        alert("Todos los campos son obligatorios")
    }else{
            let elemento = {
                name: $("#name").val(),
                description: $("#description").val()
            }

            let dataToSend = JSON.stringify(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://150.136.55.225:80/api/Category/save",
                //url: "http://localhost:8080/api/Category/save",
                data: dataToSend,
                datatype: "json",

                success: function (response) {
                    console.log(response);
                    //Limpiar Campos
                    $("#resultado").empty();
                    $("#name").val("");
                    $("#description").val("");

                    //Listar Tabla
                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("NO se ha guardado Correctamente!")
                }
            });
    }
}



//Manejador GET
function listarCategory() {
    $.ajax({
        url:"http://150.136.55.225:80/api/Category/all",
        //url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaCategoria(response);
        }
    });
}

function pintarRespuestaCategoria(response) {

    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<td>Nombre Categoria</td>";
    myTable += "<td>Descripcion Categoria</td>";
    "</tr>";

    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].name + "</td>";
        myTable += "<td>" + response[i].description + "</td>";
        myTable += '<td><button class = "botonCategory2" onclick="borrarCategory(' + response[i].id + ')">Borrar Categoria!</button></td>';
        myTable += '<td><button class = "botonCategory2" onclick="cargarDatosCategory(' + response[i].id + ')">Editar Categoria!</button></td>';
        myTable += '<td><button class = "botonCategory2" onclick="actualizarCategory(' + response[i].id + ')">Actualizar Categoria!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#miListaCategory").html(myTable);
}


//Manejador DELETE
function borrarCategory(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://150.136.55.225:80/api/Category/"+idElemento,
            //url: "http://localhost:8080/api/Category/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaCategory").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se ha Eliminado Correctamente")
            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosCategory(id) {
    $.ajax({
        dataType: 'json',
        url:"http://150.136.55.225:80/api/Category/"+id,
        //url: "http://localhost:8080/api/Category/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#name").val(item.name);
            $("#description").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarCategory(idElemento) {
    
    if($("#name").val().length == 0 || $("#description").val().length == 0){
        alert("Todos los campos deben estar completos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name").val(),
            description: $("#description").val()
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/json",
            url:"http://150.136.55.225:80/api/Category/update",
            //url: "http://localhost:8080/api/Category/update",
            type: "PUT",

            success: function (response) {
                //console.log(response);
                $("#miListaCategory").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado").empty();
                $("#name").val("");
                $("#description").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se ha Actualizado Correctamente")
            }
        });
    }

}

function autoInicioCategory() {
    console.log("Se esta ejecutando el autoinicio de Category...");
    $.ajax({
        url:"http://150.136.55.225:80/api/Category/all",
        //url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {

            let $select = $("#select-category");
            $.each(response, function (id, name) {
                $select.append('<option value=' + name.id + '>' + name.name + '</option>');
                console.log("select " + name.id);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}