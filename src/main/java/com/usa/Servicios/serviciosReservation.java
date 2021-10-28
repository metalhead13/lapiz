package com.usa.Servicios;

import com.nimbusds.jose.shaded.json.parser.ParseException;
import com.usa.Controlador.custom.CountClient;
import com.usa.Controlador.custom.StatusAmount;
import com.usa.Modelo.Reservation;
import com.usa.Repositorio.ReservationRepositorio;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class serviciosReservation {
    
    @Autowired
    private ReservationRepositorio metodosCrud;
    
    public List<Reservation> getAll(){
        return metodosCrud.getAll();
    }
    
    public Optional<Reservation> getReservation(int idReservation){
        return metodosCrud.getReservation(idReservation);
    }
    
    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation() == null){
            return metodosCrud.save(reservation);
        }else{
            Optional<Reservation> evt=metodosCrud.getReservation(reservation.getIdReservation());
            if(evt.isEmpty()){
                return metodosCrud.save(reservation);
            }else{
                return reservation;
            }
        }
    }
    
    public Reservation update(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> evt = metodosCrud.getReservation(reservation.getIdReservation());
            if (!evt.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    evt.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    evt.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus() != null) {
                    evt.get().setStatus(reservation.getStatus());
                }
                metodosCrud.save(evt.get());
                return evt.get();
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }
    
    public boolean deleteReservation(int idReservation) {
        Boolean del = getReservation(idReservation).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return del;
    }
   
    public List<CountClient> getTopClient(){
        return metodosCrud.getTopClient();
    }

    
    public StatusAmount getStatusReport(){
        List<Reservation> completed = metodosCrud.getReservationByStatus("completed");
        List<Reservation> cancelled = metodosCrud.getReservationByStatus("cancelled");

        return new StatusAmount(completed.size(), cancelled.size());

    }

    public List<Reservation> getReservationPeriod(String dato1, String dato2){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date dateOne = new Date();
        Date dateTwo = new Date();

        try {
            dateOne = parser.parse(dato1);
            dateTwo = parser.parse(dato2);
        }catch (Exception evt){
        }
        if (dateOne.before(dateTwo)){
            return metodosCrud.getReservationByPeriod(dateOne, dateOne);
        }else {
            return new ArrayList<>();
        }
    }
}
