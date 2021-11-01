
/* Reporte Status de Reservas*/
function reportStatus(){
    $.ajax({
        url:"http://150.136.55.225:80/api/Reservation/report-status",
        //url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarStatus(respuesta);
        }
    });
}

function pintarStatus(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td></td>";
        myTable+="<td>Total Reservas Completadas</td>";
        myTable+="<td></td>";
        myTable+="<td>Total Reservas Canceladas</td>";
    "</tr>";
    
    myTable+="<tr>";
       myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#miListaStatus").html(myTable);
}


/*  Reporte Clientes y Cantidad de Reservas  */
function reportClient(){
    $.ajax({
        url:"http://150.136.55.225:80/api/Reservation/report-clients",
        //url:"http://localhost:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
        }
    });
}

function pintarRespuestaClient(respuesta){


    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Total</td>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Email</td>";
        myTable+="<td>Edad</td>";
    "</tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
    
    "</tr>";
    }
    myTable+="</table>";
    $("#miListaClientes").html(myTable);
}


/**  Traer reporte de Fechas */
function reportDate(){
    
    if(document.getElementById("dateOne").value.length == 0 || document.getElementById("dateTwo").value.length == 0){
        alert("Todos los campos son obligatorios")
    }else{
        var fechaInicio = document.getElementById("dateOne").value;
        var fechaCierre = document.getElementById("dateTwo").value;
    

        $.ajax({
            url:"http://150.136.55.225:80/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            //url:"http://localhost:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
    }
}
function pintarRespuestaDate(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Nombre Cliente</td>";
        myTable+="<td>Fecha Inicio</td>";
        myTable+="<td>Fecha Devolucion</td>";
        myTable+="<td>Estado</td>";
     "</tr>";
      
    for(i=0;i<respuesta.length;i++){
    
    myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
      
      
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaDates").html(myTable);
}