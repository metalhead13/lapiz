//Manejador "POST"
function agregarCliente() {
            
    if($("#name3").val().length == 0 || $("#name3").val().length == 0 || $("#password").val().length == 0 || $("#age").val().length == 0){
        alert("Todos los campos son obligatorios")
    }else{
            let elemento = {
                name: $("#name3").val(),
                email: $("#name3").val(),
                password: $("#password").val(),
                age: $("#age").val(),
                
            }

            let dataToSend = JSON.stringify(elemento);

            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                data: dataToSend,
                url:"http://150.136.55.225:80/api/Client/save",
                //url: "http://localhost:8080/api/Client/save",
                type: "POST",

                success: function (response) {
                    console.log(response);
                    //Limpiar Campos
                    $("#resultado3").empty();
                    $("#name3").val("");
                    $("#email").val("");
                    $("#password").val(""),
                    $("#age").val("");

                    //Listar Tabla

                    alert("¡Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se gauardo Correctamente!")
                }
            });
    }
}


function listarCliente() {
    $.ajax({
        url:"http://150.136.55.225:80/api/Client/all",
        //url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaCliente(response);
        }
    });
}

function pintarRespuestaCliente(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Email</td>";
        myTable+="<td>Password</td>";
        myTable+="<td>Edad</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].email + "</td>";
        myTable+="<td>" + response[i].password + "</td>";
        myTable+="<td>" + response[i].age + "</td>";
        myTable+='<td><button class = "botonCliente2" onclick="borrarCliente(' + response[i].idClient + ')">Borrar Cliente!</button></td>';
        myTable+='<td><button class = "botonCliente2" onclick="cargarDatosCliente(' + response[i].idClient + ')">Editar Cliente!</button></td>';
        myTable+='<td><button class = "botonCliente2" onclick="actualizarCliente(' + response[i].idClient + ')">Actualizar Cliente!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaCliente").html(myTable);

}

//Manejador DELETE
function borrarCliente(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://150.136.55.225:80/api/Client/"+idElemento,
            //url: "http://localhost:8080/api/Client/" + idElemento,
            type: 'DELETE',
            contentType: "application/json",
            success: function (response) {
                console.log(response);
                $("#miListaClient").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosCliente(id) {
    $.ajax({
        dataType: 'json',
        url:"http://150.136.55.225:80/api/Client/"+id,
        //url: "http://localhost:8080/api/Client/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#name3").val(item.name);
            $("#email").val(item.email);
            $("#password").val(item.password);
            $("#age").val(item.age);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarCliente(idElemento) {
    
    if($("#name3").val().length == 0 || $("#email").val().length == 0 || $("#password").val().length == 0 || $("#age").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idClient: idElemento,
            name: $("#name3").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            age: $("#age").val()
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/json",
            url:"http://150.136.55.225:80/api/Client/update",
            //url: "http://localhost:8080/api/Client/update",
            type: "PUT",

            success: function (response) {
                //console.log(response);
                $("#miListaClient").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado3").empty();
                $("#name3").val("");
                $("#email").val("");
                $("#password").val("");
                $("#age").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}

function autoInicioClient() {
    console.log("Se esta ejecutando el autoinicio de Client...");
    $.ajax({
        url:"http://150.136.55.225:80/api/Client/all",
        //url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {

            let $select = $("#select-client");
            $.each(response, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                console.log("select " + name.idClient);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}