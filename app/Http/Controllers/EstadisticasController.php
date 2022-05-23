<?php

namespace App\Http\Controllers;

use App\Models\Distrito;
use App\Models\Interh_maestro;
use App\Models\Preh_servicio_ambulancia;
use App\Models\Provincias;
use App\Models\Servicio_ambulancia;
use App\Models\Tipo_edad;
use App\Models\Tipo_paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstadisticasController extends Controller
{
    //1° PESTAÑA INTERH
    public function interh_asistencia_prestada(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT  interh_maestro.fechahorainterh::timestamp::date as name, count(interh_maestro.fechahorainterh::timestamp::date) as value
                    from interh_maestro 
                    left join hospitalesgeneral on
                                                hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh
                    where 
                    interh_maestro.fechahorainterh >= ? and
                    interh_maestro.fechahorainterh <= ? " . $filtroSRC . " 
                    group by interh_maestro.fechahorainterh::timestamp::date
                    order by name asc;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function interh_motivo_traslado(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT interh_maestro.motivo_traslado as name, count(interh_maestro.motivo_traslado) as value
                        from interh_maestro 
                        left join hospitalesgeneral on
                            hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh
                        where 
                        interh_maestro.fechahorainterh >= ? and
                        interh_maestro.fechahorainterh <= ?  " . $filtroSRC . " 
                        group by interh_maestro.motivo_traslado;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function interh_nacionalidad(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT pacientegeneral.nacionalidad as name, count(pacientegeneral.nacionalidad) as value
                        from interh_maestro 
                        left join pacientegeneral on 
                                                    pacientegeneral.cod_casointerh=interh_maestro.cod_casointerh
                        inner join interh_evaluacionclinica on 
                                                    interh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                        left join hospitalesgeneral on
                                                    hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh
                        where 
                        pacientegeneral.cod_casointerh is not null  and 
                        interh_maestro.fechahorainterh >= ? and
                        interh_maestro.fechahorainterh <= ?  " . $filtroSRC . " 
                        group by pacientegeneral.nacionalidad;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function interh_tipo_px(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT tipo_paciente.nombre_tipopaciente as name, count(tipo_paciente.nombre_tipopaciente) as value
                from interh_maestro 
                left join pacientegeneral on 
                                            pacientegeneral.cod_casointerh=interh_maestro.cod_casointerh
                inner join interh_evaluacionclinica on 
                                            interh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                inner join tipo_paciente on
                                            tipo_paciente.id_tipopaciente = interh_evaluacionclinica.tipo_paciente
                left join hospitalesgeneral on
                                            hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh
                where 
                pacientegeneral.cod_casointerh is not null  and 
                interh_maestro.fechahorainterh >= ? and
                interh_maestro.fechahorainterh <= ? " . $filtroSRC . " 
                group by tipo_paciente.nombre_tipopaciente ;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function interh_segun_condicion(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT interh_evaluacionclinica.cod_paciente as name, count(interh_evaluacionclinica.cod_paciente) as value
                        from interh_maestro 
                        left join pacientegeneral on 
                                                    pacientegeneral.cod_casointerh=interh_maestro.cod_casointerh
                        inner join interh_evaluacionclinica on 
                                                    interh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                        left join hospitalesgeneral on
                                                    hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh

                        where 
                        pacientegeneral.cod_casointerh is not null  and 
                        interh_maestro.fechahorainterh >= ? and
                        interh_maestro.fechahorainterh <= ? " . $filtroSRC . " 
                        group by interh_evaluacionclinica.cod_paciente
                        order by value desc ;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function interh_totales(Request $request)
    { //
        $filtroSRC = "";
        /*  if ($request->SRS != 0 && $request->SRS != null) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='".$request->SRS."'";
        }*/
        $SQLconsulta = "SELECT * 
                        from (SELECT  count(interh_cierre.nombrecierre) as completados
                        from interh_maestro 
                        inner join interh_cierre on 
                                            interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                        inner join tipo_cierrecaso on
                                            tipo_cierrecaso.id_tranlado_fallido =interh_cierre.nombrecierre
                        inner join hospitalesgeneral on
                                            hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh

                        where 
                        interh_cierre.cod_casointerh is not null and 
                        interh_maestro.fechahorainterh >= ? and
                        interh_maestro.fechahorainterh <= ? " . $filtroSRC . " ) comple, 
                        
                        (SELECT  count(interh_maestro.cod_casointerh) as traslado_paciente
                        from interh_maestro 
                        inner join hospitalesgeneral on
                        hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh
                        where  
                        interh_maestro.fechahorainterh >= ? and
                        interh_maestro.fechahorainterh <= ? " . $filtroSRC . " 
                    
                        ) traslad, 
                        (SELECT  count(pacientegeneral.id_paciente) as total_asistencia
                        from interh_maestro 
                        left join pacientegeneral on 
                            pacientegeneral.cod_casointerh=interh_maestro.cod_casointerh
                        where  
                        pacientegeneral.cod_casointerh is not null  and 
                        interh_maestro.fechahorainterh >= ? and
                        interh_maestro.fechahorainterh <= ? " . $filtroSRC . " 
                    
                        ) pasc, 
                        
                        (SELECT  count(interh_cierre.nombrecierre) as fallecidos
                        from interh_maestro 
                        inner join interh_cierre on 
                                            interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                        inner join tipo_cierrecaso on
                                            tipo_cierrecaso.id_tranlado_fallido =interh_cierre.nombrecierre
                        left join hospitalesgeneral on
                                            hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh

                        where 
                        interh_cierre.cod_casointerh is not null and
                        (tipo_cierrecaso.id_tranlado_fallido=9 or tipo_cierrecaso.id_tranlado_fallido=4) and 
                        interh_maestro.fechahorainterh >= ? and
                        interh_maestro.fechahorainterh <= ?  " . $filtroSRC . " ) fall ;";

        $consulta = DB::select($SQLconsulta, array(
            $request->fecha_inicio, $request->fecha_fin,
            $request->fecha_inicio, $request->fecha_fin,
            $request->fecha_inicio, $request->fecha_fin,
            $request->fecha_inicio, $request->fecha_fin
        ));
        return $consulta;
    }
    //2° PESTAÑA INTERH
    public function cola_pacientes(Request $request)
    {
        $filtroSRC = "";
        $whereEstado = "";

        $estado = "";
        if ($request->estado != 0) {
            $whereEstado = " WHERE tipo_trasladowhere = ? ";

            switch ($request->estado) {
                case 1:
                    $estado = "'Completo'";
                    break;
                case 2:
                    $estado = "En espera";
                    break;
                case 3:
                    $estado = "'En proceso'";
                    break;
                case 4:
                    $estado = "'Abortado'";
                    break;
                default:
                    # code...
                    break;
            }
            if ($request->SRS != 0) {
                $filtroSRC = " and municipio_hospitalOrigen='" . $request->SRS . "'";
            }
        } else {
            if ($request->SRS != 0) {
                $filtroSRC = " where municipio_hospitalOrigen='" . $request->SRS . "'";
            }
        }
        $SQLconsulta = "SELECT * FROM (SELECT  
                        im.cod_casointerh||' '||pacientegeneral.id_paciente||id_evaluacionclinica as codigo,
                        *, 
                        CASE 
                    WHEN   completos>0    THEN 'Completo'
                    WHEN   en_espera>0    THEN 'En espera'
                    WHEN   en_proceso>0    THEN 'En proceso'
                    WHEN   abortados>0    THEN 'Abortado'
               END AS tipo_traslado,
               CASE 
                    WHEN   completos>0    THEN '1'
                    WHEN   en_espera>0    THEN '2'
                    WHEN   en_proceso>0    THEN '3'
                    WHEN   abortados>0    THEN '4'
               END AS tipo_trasladowhere,
               hospitalesgeneral.municipio_hospital as municipio_hospitalOrigen,
                       hg.id_hospital  as destino_id_hospital,
                       hg.nombre_hospital  as destino_nombre_hospital,
                       hg.provincia_hospital  as destino_provincia_hospital,
                       hg.municipio_hospital  as destino_municipio_hospital,
                       hg.depto_hospital  as destino_depto_hospital,
                       hg.nivel_hospital  as destino_nivel_hospital,
                       hg.redservicions_hospital  as destino_redservicions_hospital,
                       hg.sector_hospital  as destino_sector_hospital,
                       hg.tipo_hospital  as destino_tipo_hospital,
                       hg.camashab_cali  as destino_camashab_cali,
                       hg.latitud_hospital  as destino_latitud_hospital,
                       hg.longitud_hospital  as destino_longitud_hospital,
                       hg.icon_hospital  as destino_icon_hospital,
                       hg.especialidad  as destino_especialidad,
                       hg.codpolitico  as destino_codpolitico,
                       hg.direccion  as destino_direccion,
                       hg.telefono  as destino_telefono,
                       hg.nombre_responsable  as destino_nombre_responsable,
                       hg.estado  as destino_estado,
                        hg.emt  as destino_emt
                        from interh_maestro im
                            left join pacientegeneral on 
                                                        pacientegeneral.cod_casointerh=im.cod_casointerh
                            inner join interh_evaluacionclinica on 
                                                        interh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                            left join hospitalesgeneral on
                                                        hospitalesgeneral.id_hospital =im.hospital_origneinterh
                            left join hospitalesgeneral hg on
                                                        hg.id_hospital =im.hospital_destinointerh             
                                                        left join
                        (SELECT interh_maestro.cod_casointerh as completos
                                from interh_maestro 
                                inner join interh_cierre on 
                                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                interh_cierre.nombrecierre=9) com on im.cod_casointerh=com.completos  left join
                        (SELECT interh_maestro.cod_casointerh as abortados
                                from interh_maestro 
                                inner join interh_cierre on 
                                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                interh_cierre.nombrecierre!=9) abor on im.cod_casointerh=abor.abortados  left join
                        (SELECT interh_maestro.cod_casointerh as en_espera
                                from interh_maestro 
                                left join servicio_ambulancia on 
                                                    servicio_ambulancia.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                servicio_ambulancia.cod_casointerh is   null) ens on im.cod_casointerh=ens.en_espera  left join
                        (SELECT interh_maestro.cod_casointerh as en_proceso
                                from interh_maestro 
                                left join servicio_ambulancia on 
                                                    servicio_ambulancia.cod_casointerh=interh_maestro.cod_casointerh
                                left join interh_cierre on 
                                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                servicio_ambulancia.cod_casointerh is  not null and
                                interh_cierre.cod_casointerh is null)enp on im.cod_casointerh=enp.en_proceso 
                        where 
                        pacientegeneral.cod_casointerh is not null) XD " . $whereEstado . " " . $filtroSRC . " ;";
        if ($request->estado != 0) {
            $consulta = DB::select($SQLconsulta,  array($request->estado));
        } else {
            $consulta = DB::select($SQLconsulta,  array());
        }

        foreach ($consulta as $post) {
            if ($post->municipio_hospital != null) {

                $post->entidad = Distrito::find($post->municipio_hospital);
            } else if ($post->destino_municipio_hospital != null) {
                $post->entidad = Distrito::find($post->destino_municipio_hospital);
            }
            $post->tipoPaciente = Tipo_paciente::find($post->tipo_paciente);
            $post->codigo_edad = Tipo_edad::find($post->cod_edad);
            $post->ambulancia = Servicio_ambulancia::where('cod_casointerh', $post->cod_casointerh)->first();
        }
        return $consulta;
    }
    //3° pestaña INTERH
    public function regiones()
    {
        $SQLconsulta = "SELECT distrito.nombre_distrito as name, count(distrito.nombre_distrito) as value
                        from interh_maestro 
                        left join hospitalesgeneral on
                                                    hospitalesgeneral.id_hospital =interh_maestro.hospital_origneinterh
                        inner join distrito on
                                                    distrito.cod_distrito=hospitalesgeneral.municipio_hospital
                        left join hospitalesgeneral hg on
                                                        hg.id_hospital =interh_maestro.hospital_destinointerh   
                        group by distrito.nombre_distrito
                        order by  value desc;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function totales()
    {
        $SQLconsulta = "SELECT * from
        (SELECT count(interh_maestro.cod_casointerh) as completos
                from interh_maestro 
                 inner join interh_cierre on 
                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                where 
                interh_cierre.nombrecierre=9) com,
        (SELECT count(interh_maestro.cod_casointerh) as abortados
                from interh_maestro 
                 inner join interh_cierre on 
                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                where 
                interh_cierre.nombrecierre!=9) abor,
        (SELECT count(interh_maestro.cod_casointerh) as en_espera
                from interh_maestro 
                 left join servicio_ambulancia on 
                                    servicio_ambulancia.cod_casointerh=interh_maestro.cod_casointerh
                where 
                servicio_ambulancia.cod_casointerh is   null) ens,
        (SELECT count(interh_maestro.cod_casointerh) as en_proceso
                from interh_maestro 
                 left join servicio_ambulancia on 
                                    servicio_ambulancia.cod_casointerh=interh_maestro.cod_casointerh
                left join interh_cierre on 
                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                where 
                servicio_ambulancia.cod_casointerh is  not null and
                interh_cierre.cod_casointerh is null)enp ;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function tabla()
    {
        $SQLconsulta = "SELECT  extract(month from fechahorainterh) mes, 
        CASE 
                    WHEN   completos>0    THEN 'Completo'
                    WHEN   en_espera>0    THEN 'En espera'
                    WHEN   en_proceso>0    THEN 'En proceso'
                    WHEN   abortados>0    THEN 'Abortado'
               END AS tipo_traslado, im.*,pacientegeneral.*,interh_evaluacionclinica.*, servicio_ambulancia.*, 
                                        hg.id_hospital  as destino_id_hospital,
                                        hg.nombre_hospital  as destino_nombre_hospital,
                                        hg.provincia_hospital  as destino_provincia_hospital,
                                        hg.municipio_hospital  as destino_municipio_hospital,
                                        hg.depto_hospital  as destino_depto_hospital,
                                        hg.nivel_hospital  as destino_nivel_hospital,
                                        hg.redservicions_hospital  as destino_redservicions_hospital,
                                        hg.sector_hospital  as destino_sector_hospital,
                                        hg.tipo_hospital  as destino_tipo_hospital,
                                        hg.camashab_cali  as destino_camashab_cali,
                                        hg.latitud_hospital  as destino_latitud_hospital,
                                        hg.longitud_hospital  as destino_longitud_hospital,
                                        hg.icon_hospital  as destino_icon_hospital,
                                        hg.especialidad  as destino_especialidad,
                                        hg.codpolitico  as destino_codpolitico,
                                        hg.direccion  as destino_direccion,
                                        hg.telefono  as destino_telefono,
                                        hg.nombre_responsable  as destino_nombre_responsable,
                                        hg.estado  as destino_estado,
                                        hg.emt  as destino_emt, 
                                        hospitalesgeneral.*
            
                     from
                        interh_maestro im left join
                        (SELECT interh_maestro.cod_casointerh as completos
                                from interh_maestro 
                                inner join interh_cierre on 
                                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                interh_cierre.nombrecierre=9) com on im.cod_casointerh=com.completos  left join
                        (SELECT interh_maestro.cod_casointerh as abortados
                                from interh_maestro 
                                inner join interh_cierre on 
                                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                interh_cierre.nombrecierre!=9) abor on im.cod_casointerh=abor.abortados  left join
                        (SELECT interh_maestro.cod_casointerh as en_espera
                                from interh_maestro 
                                left join servicio_ambulancia on 
                                                    servicio_ambulancia.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                servicio_ambulancia.cod_casointerh is   null) ens on im.cod_casointerh=ens.en_espera  left join
                        (SELECT interh_maestro.cod_casointerh as en_proceso
                                from interh_maestro 
                                left join servicio_ambulancia on 
                                                    servicio_ambulancia.cod_casointerh=interh_maestro.cod_casointerh
                                left join interh_cierre on 
                                                    interh_cierre.cod_casointerh=interh_maestro.cod_casointerh
                                where 
                                servicio_ambulancia.cod_casointerh is  not null and
                                interh_cierre.cod_casointerh is null)enp on im.cod_casointerh=enp.en_proceso 


                                left join pacientegeneral on 
                                                            pacientegeneral.cod_casointerh=im.cod_casointerh
                                inner join interh_evaluacionclinica on 
                                                            interh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                                left join hospitalesgeneral on
                                                            hospitalesgeneral.id_hospital =im.hospital_origneinterh
                                left join hospitalesgeneral hg on
                                                            hg.id_hospital =im.hospital_destinointerh             
                                left join servicio_ambulancia on servicio_ambulancia.cod_casointerh=im.cod_casointerh
                                where
                               pacientegeneral.cod_casointerh is not null  ;";

        $consulta = DB::select($SQLconsulta, array());

        return $consulta;
    }
    //4°  PESTAÑA
    public function por_tipo()
    {
        $SQLconsulta = "SELECT ambulancias.tipo_conbustible as name, count(ambulancias.tipo_conbustible) as value
                        from ambulancias 
                        inner join mante_amb on 
                                            mante_amb.id_ambulancias=ambulancias.id_ambulancias
                        where mante_amb.fecha_inicio <=NOW() and mante_amb.fecha_fin>=NOW()
                        
                        group by ambulancias.tipo_conbustible
                        order by  value desc;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function fuera_servicio_taller()
    {
        $SQLconsulta = "SELECT ambulancia_taller.nombre_taller as name, count(ambulancia_taller.nombre_taller) as value
                        from ambulancias 
                        inner join mante_amb on 
                                            mante_amb.id_ambulancias=ambulancias.id_ambulancias
                        inner join ambulancia_taller on
                                            ambulancia_taller.id=mante_amb.taller
                        where mante_amb.fecha_inicio <=NOW() and mante_amb.fecha_fin>=NOW()
                        
                        group by ambulancia_taller.nombre_taller
                        order by  value desc;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function fuera_servicio_detalle()
    {
        $SQLconsulta = "SELECT extract(month from fecha_inicio) mes, *
                        from ambulancias 
                        inner join mante_amb on 
                                            mante_amb.id_ambulancias=ambulancias.id_ambulancias
                        inner join ambulancia_taller on
                                            ambulancia_taller.id=mante_amb.taller
                        where mante_amb.fecha_inicio <=NOW() and mante_amb.fecha_fin>=NOW()";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function promedio_respuesta_taller()
    {
        $SQLconsulta = "SELECT   ambulancia_taller.nombre_taller as name, 
                        EXTRACT(DAY FROM avg(age(date(mante_amb.fecha_fin), date(mante_amb.fecha_inicio)))) as value
                        
                        from ambulancias 
                                inner join mante_amb on 
                                                    mante_amb.id_ambulancias=ambulancias.id_ambulancias
                                inner join ambulancia_taller on
                                                    ambulancia_taller.id=mante_amb.taller
                            group by ambulancia_taller.nombre_taller";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function ent_sal_siete_dias()
    {
        $SQLconsulta = "SELECT * from (SELECT count(ambulancias) as ingresos

                        from ambulancias 
                            inner join mante_amb on 
                                                mante_amb.id_ambulancias=ambulancias.id_ambulancias
                            inner join ambulancia_taller on
                                                ambulancia_taller.id=mante_amb.taller
                        where EXTRACT(MONTH FROM age(timestamp 'now()',date(mante_amb.fecha_inicio) ) ) =0 and
                        EXTRACT(YEAR FROM age(timestamp 'now()',date(mante_amb.fecha_inicio) ) ) =0 AND 
                        EXTRACT(DAY FROM age(timestamp 'now()',date(mante_amb.fecha_inicio) ) ) <=7) ent,
                    (SELECT count(ambulancias) as salidas
                    
                        from ambulancias 
                            inner join mante_amb on 
                                                mante_amb.id_ambulancias=ambulancias.id_ambulancias
                            inner join ambulancia_taller on
                                                ambulancia_taller.id=mante_amb.taller
                        where EXTRACT(MONTH FROM age(timestamp 'now()',date(mante_amb.fecha_fin) ) ) =0 and
                        EXTRACT(YEAR FROM age(timestamp 'now()',date(mante_amb.fecha_fin) ) ) =0 AND 
                        EXTRACT(DAY FROM age(timestamp 'now()',date(mante_amb.fecha_fin) ) )  <=7) sali;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    //5°  PESTAÑA
    public function porcentaje_cubierta(Request $request)
    {
        $filtrocodigo="";
        if($request->codigo!="0"){
            $filtrocodigo = " and ambulancias.cod_ambulancias='" . $request->codigo . "'";
        }
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and base_ambulancia.provincia='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT  cubiertas*100/(cubiertas+no_cubiertas)||'%'  as porcentaje_cubiertas,
                    no_cubiertas*100/(cubiertas+no_cubiertas)||'%'  as porcentaje_no_cubiertas
                    from (SELECT count(reg_ambulancias.estado) as cubiertas
                        from reg_ambulancias
                        inner Join base_ambulancia on base_ambulancia.id_base=reg_ambulancias.id_base
                        inner Join ambulancias on ambulancias.id_ambulancias=reg_ambulancias.id_ambulancias
                        inner Join motivo_salidaamb on motivo_salidaamb.id_motivosalida=reg_ambulancias.motivo_salida
                        where reg_ambulancias.estado=1 and
                        reg_ambulancias.fecha_reg >= ? and
                        reg_ambulancias.fecha_reg <= ?
                        " . $filtroSRC . " ".$filtrocodigo.") cu, 
                        (SELECT count(reg_ambulancias.estado) as no_cubiertas
                        from reg_ambulancias
                        inner Join base_ambulancia on base_ambulancia.id_base=reg_ambulancias.id_base
                        inner Join ambulancias on ambulancias.id_ambulancias=reg_ambulancias.id_ambulancias
                        inner Join motivo_salidaamb on motivo_salidaamb.id_motivosalida=reg_ambulancias.motivo_salida
                        where reg_ambulancias.estado=2 and
                        reg_ambulancias.fecha_reg >= ? and
                        reg_ambulancias.fecha_reg <= ?
                        " . $filtroSRC . " ".$filtrocodigo.") no_cu;";

        $consulta = DB::select($SQLconsulta, array(
            $request->fecha_inicio, $request->fecha_fin,
            $request->fecha_inicio, $request->fecha_fin
        ));
        return $consulta;
    }
    public function preposiciones_tabla(Request $request)
    {
        $filtrocodigo="";
        if($request->codigo!="0"){
            $filtrocodigo = " and ambulancias.cod_ambulancias='" . $request->codigo . "'";
        }
        $filtroSRC = "";
        if ($request->SRS != 0) {
            
            $filtroSRC = " and base_ambulancia.provincia='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT *
                from reg_ambulancias
                inner Join base_ambulancia on base_ambulancia.id_base=reg_ambulancias.id_base
                inner Join ambulancias on ambulancias.id_ambulancias=reg_ambulancias.id_ambulancias
                inner Join usuarios on usuarios.id_user=reg_ambulancias.id_user
                inner Join motivo_salidaamb on motivo_salidaamb.id_motivosalida=reg_ambulancias.motivo_salida
                where 
                reg_ambulancias.fecha_reg >= ? and
                reg_ambulancias.fecha_reg <= ?
                " . $filtroSRC . " ".$filtrocodigo.";";
        $consulta = DB::select($SQLconsulta, array(
            $request->fecha_inicio, $request->fecha_fin
        ));
        return $consulta;
    }
    public function motivo_salida(Request $request)
    {
        $filtrocodigo="";
        if($request->codigo!="0"){
            $filtrocodigo = " and ambulancias.cod_ambulancias='" . $request->codigo . "'";
        }
        $filtroSRC = "";
        if ($request->SRS != 0) {
            
            $filtroSRC = " and base_ambulancia.provincia='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT motivo_salidaamb.nombre_motsalida as name, count(motivo_salidaamb.nombre_motsalida) as value
                from reg_ambulancias
                inner Join base_ambulancia on base_ambulancia.id_base=reg_ambulancias.id_base
                inner Join ambulancias on ambulancias.id_ambulancias=reg_ambulancias.id_ambulancias
                inner Join usuarios on usuarios.id_user=reg_ambulancias.id_user
                inner Join motivo_salidaamb on motivo_salidaamb.id_motivosalida=reg_ambulancias.motivo_salida
                where 
                reg_ambulancias.fecha_reg >= ? and
                reg_ambulancias.fecha_reg <= ?
                " . $filtroSRC . " ".$filtrocodigo."
                group by motivo_salidaamb.nombre_motsalida
                order by value desc;";
        $consulta = DB::select($SQLconsulta, array(
            $request->fecha_inicio, $request->fecha_fin
        ));
        return $consulta;
    }
    public function ubicacion_preposiciones(Request $request)
    {
       
        $SQLconsulta = "SELECT base_ambulancia.*
                from reg_ambulancias
                left Join base_ambulancia on base_ambulancia.id_base=reg_ambulancias.id_base
                left Join ambulancias on ambulancias.id_ambulancias=reg_ambulancias.id_ambulancias
                left Join usuarios on usuarios.id_user=reg_ambulancias.id_user
                left Join motivo_salidaamb on motivo_salidaamb.id_motivosalida=reg_ambulancias.motivo_salida 
               ;";
        $consulta = DB::select($SQLconsulta, array(
            $request->fecha_inicio, $request->fecha_fin
        ));
        return $consulta;
    }


    public function ubicacion_preposicionesget()
    {

        $SQLconsulta = "SELECT base_ambulancia.*
                from reg_ambulancias
                left Join base_ambulancia on base_ambulancia.id_base=reg_ambulancias.id_base
                left Join ambulancias on ambulancias.id_ambulancias=reg_ambulancias.id_ambulancias
                left Join usuarios on usuarios.id_user=reg_ambulancias.id_user
                left Join motivo_salidaamb on motivo_salidaamb.id_motivosalida=reg_ambulancias.motivo_salida 
                 ;";
        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }




















    //1° PESTAÑA PREH
    public function preh_asistencia_prestada(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT  preh_maestro.fecha::timestamp::date as name, count(preh_maestro.fecha::timestamp::date) as value
                        from preh_maestro 
                        left join hospitalesgeneral on
                                      hospitalesgeneral.id_hospital =preh_maestro.hospital_destino
                        where 
                        preh_maestro.fecha >= ? and
                        preh_maestro.fecha <= ? " . $filtroSRC . " 
                        group by preh_maestro.fecha::timestamp::date
                        order by name asc;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function preh_motivo_traslado(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT preh_maestro.quepasa as name, count(preh_maestro.quepasa) as value
                        from preh_maestro 
                        left join hospitalesgeneral on
                    hospitalesgeneral.id_hospital =preh_maestro.hospital_destino
                         where 
                         preh_maestro.fecha >= ? and
                         preh_maestro.fecha <= ?  " . $filtroSRC . " 
                         group by preh_maestro.quepasa;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function preh_nacionalidad(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT pacientegeneral.nacionalidad as name, count(pacientegeneral.nacionalidad) as value
                        from preh_maestro 
                        left join pacientegeneral on 
                                                    pacientegeneral.cod_casopreh=preh_maestro.cod_casopreh
                        inner join preh_evaluacionclinica on 
                                                    preh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                        left join hospitalesgeneral on
                                                    hospitalesgeneral.id_hospital =preh_maestro.hospital_destino
                        where 
                        pacientegeneral.cod_casopreh is not null  and 
                        preh_maestro.fecha >= ? and
                        preh_maestro.fecha <= ?  " . $filtroSRC . " 
                        group by pacientegeneral.nacionalidad;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function preh_tipo_px(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT tipo_paciente.nombre_tipopaciente as name, count(tipo_paciente.nombre_tipopaciente) as value
                        from preh_maestro 
                        left join pacientegeneral on 
                                                    pacientegeneral.cod_casopreh=preh_maestro.cod_casopreh
                        inner join preh_evaluacionclinica on 
                                                    preh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                        inner join tipo_paciente on
                                                    tipo_paciente.id_tipopaciente = preh_evaluacionclinica.tipo_paciente
                        left join hospitalesgeneral on
                                                    hospitalesgeneral.id_hospital =preh_maestro.hospital_destino

                 where 
                 pacientegeneral.cod_casopreh is not null  and 
                 preh_maestro.fecha >= ? and
                 preh_maestro.fecha <= ? " . $filtroSRC . " 
                 group by tipo_paciente.nombre_tipopaciente ;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function preh_segun_incidente(Request $request)
    {
        $filtroSRC = "";
        if ($request->SRS != 0) {
            $filtroSRC = " and hospitalesgeneral.municipio_hospital='" . $request->SRS . "'";
        }
        $SQLconsulta = "SELECT incidentes.nombre_es as name, count(incidentes.nombre_es) as value
                        from preh_maestro 
                        left join pacientegeneral on 
                                                    pacientegeneral.cod_casopreh=preh_maestro.cod_casopreh
                        inner join incidentes on 
                                                    incidentes.id_incidente=preh_maestro.incidente
                        left join hospitalesgeneral on
                                                    hospitalesgeneral.id_hospital =preh_maestro.hospital_destino
                         where 
                         pacientegeneral.cod_casopreh is not null  and 
                         preh_maestro.fecha >= ? and
                         preh_maestro.fecha <= ? " . $filtroSRC . " 
                        group by incidentes.nombre_es
                        order by value desc ;";

        $consulta = DB::select($SQLconsulta, array($request->fecha_inicio, $request->fecha_fin));
        return $consulta;
    }
    public function preh_totales(Request $request)
    { //
        $filtroSRC = "";
        /*  if ($request->SRS != 0 && $request->SRS != null) {
             $filtroSRC = " and hospitalesgeneral.municipio_hospital='".$request->SRS."'";
         }*/
        $SQLconsulta = "SELECT * 
         from (SELECT  count(preh_cierre.nombrecierre) as completados
         from preh_maestro 
         inner join preh_cierre on 
         preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
         inner join tipo_cierrecaso on
         tipo_cierrecaso.id_tranlado_fallido =preh_cierre.nombrecierre
         inner join hospitalesgeneral on
         hospitalesgeneral.id_hospital =preh_maestro.hospital_destino 
         where 
         preh_cierre.cod_casopreh is not null  ) comple,                          
         (SELECT  count(preh_maestro.cod_casopreh) as traslado_paciente
         from preh_maestro 
         inner join hospitalesgeneral on
         hospitalesgeneral.id_hospital =preh_maestro.hospital_destino                   
         ) traslad,                          
         (SELECT  count(pacientegeneral.id_paciente) as total_asistencia
         from preh_maestro 
         left join pacientegeneral on 
         pacientegeneral.cod_casopreh=preh_maestro.cod_casopreh
         where  
         pacientegeneral.cod_casopreh is not null 
         ) pasc, 
                                  
         (SELECT  count(preh_cierre.nombrecierre) as fallecidos
         from preh_maestro 
         inner join preh_cierre on 
         preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
         inner join tipo_cierrecaso on
         tipo_cierrecaso.id_tranlado_fallido =preh_cierre.nombrecierre
         left join hospitalesgeneral on
         hospitalesgeneral.id_hospital =preh_maestro.hospital_destino
         where 
         preh_cierre.cod_casopreh is not null and
         (tipo_cierrecaso.id_tranlado_fallido=9 or tipo_cierrecaso.id_tranlado_fallido=4)  ) fall,
         (SELECT  count(preh_maestro) as llamadas
         from preh_maestro 
         where 
         preh_maestro.llamada_fallida is not null  ) llam ;";

        $consulta = DB::select($SQLconsulta, array(
        ));
        return $consulta[0];
    }
    //2° PESTAÑA PREH
    public function cola_pacientespreh(Request $request)
    {
        $filtroSRC = "";
        $whereEstado = "";
        $estado = "";
        if ($request->estado != 0) {
            $whereEstado = " WHERE tipo_trasladowhere = ? ";
            $filtroSRC = " and tipo_traslado=? ";
            switch ($request->estado) {
                case 1:
                    $estado = "'Completo'";
                    break;
                case 2:
                    $estado = "En espera";
                    break;
                case 3:
                    $estado = "'En proceso'";
                    break;
                case 4:
                    $estado = "'Abortado'";
                    break;
                default:
                    # code...
                    break;
            }
            if ($request->SRS != 0) {
                $filtroSRC = " and destino_municipio_hospital='" . $request->SRS . "'";
            }
        } else {
            if ($request->SRS != 0) {
                $filtroSRC = " where destino_municipio_hospital='" . $request->SRS . "'";
            }
        }
        $SQLconsulta = "SELECT * FROM (SELECT  
                        im.cod_casopreh||' '||pacientegeneral.id_paciente||id_evaluacionclinica as codigo,
                        *, 
                        CASE 
                        WHEN   completos>0THEN 'Completo'
                        WHEN   en_espera>0THEN 'En espera'
                        WHEN   en_proceso>0THEN 'En proceso'
                        WHEN   abortados>0THEN 'Abortado'
                        END AS tipo_traslado,
                        CASE 
                        WHEN   completos>0THEN '1'
                        WHEN   en_espera>0THEN '2'
                        WHEN   en_proceso>0THEN '3'
                        WHEN   abortados>0THEN '4'
                        END AS tipo_trasladowhere,
                        hg.id_hospital  as destino_id_hospital,
                        hg.nombre_hospital  as destino_nombre_hospital,
                        hg.provincia_hospital  as destino_provincia_hospital,
                        hg.municipio_hospital  as destino_municipio_hospital,
                        hg.depto_hospital  as destino_depto_hospital,
                        hg.nivel_hospital  as destino_nivel_hospital,
                        hg.redservicions_hospital  as destino_redservicions_hospital,
                        hg.sector_hospital  as destino_sector_hospital,
                        hg.tipo_hospital  as destino_tipo_hospital,
                        hg.camashab_cali  as destino_camashab_cali,
                        hg.latitud_hospital  as destino_latitud_hospital,
                        hg.longitud_hospital  as destino_longitud_hospital,
                        hg.icon_hospital  as destino_icon_hospital,
                        hg.especialidad  as destino_especialidad,
                        hg.codpolitico  as destino_codpolitico,
                        hg.direccion  as destino_direccion,
                        hg.telefono  as destino_telefono,
                        hg.nombre_responsable  as destino_nombre_responsable,
                        hg.estado  as destino_estado,
                        hg.emt  as destino_emt
                        from preh_maestro im
                        left join pacientegeneral on 
                        pacientegeneral.cod_casopreh=im.cod_casopreh
                        inner join preh_evaluacionclinica on 
                        preh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                        left join hospitalesgeneral hg on
                        hg.id_hospital =im.hospital_destino 
                        left join
                        (SELECT preh_maestro.cod_casopreh as completos
                        from preh_maestro 
                        inner join preh_cierre on 
                        preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_cierre.nombrecierre=9) com on im.cod_casopreh=com.completos  left join
                        (SELECT preh_maestro.cod_casopreh as abortados
                        from preh_maestro 
                        inner join preh_cierre on 
                        preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_cierre.nombrecierre!=9) abor on im.cod_casopreh=abor.abortados  left join
                        (SELECT preh_maestro.cod_casopreh as en_espera
                        from preh_maestro 
                        left join preh_servicio_ambulancia on 
                        preh_servicio_ambulancia.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_servicio_ambulancia.cod_casopreh is   null) ens on im.cod_casopreh=ens.en_espera  left join
                        (SELECT preh_maestro.cod_casopreh as en_proceso
                        from preh_maestro 
                        left join preh_servicio_ambulancia on 
                        preh_servicio_ambulancia.cod_casopreh=preh_maestro.cod_casopreh
                        left join preh_cierre on 
                        preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_servicio_ambulancia.cod_casopreh is  not null and
                        preh_cierre.cod_casopreh is null)enp on im.cod_casopreh=enp.en_proceso 
                        where 
                        pacientegeneral.cod_casopreh is not null) XD  " . $whereEstado . " ".$filtroSRC." ;";
        if ($request->estado != 0) {
            $consulta = DB::select($SQLconsulta,  array($request->estado));
        } else {
            $consulta = DB::select($SQLconsulta,  array());
        }

        foreach ($consulta as $post) {
            if ($post->municipio_hospital != null) {

                $post->entidad = Distrito::find($post->municipio_hospital);
            } else if ($post->destino_municipio_hospital != null) {
                $post->entidad = Distrito::find($post->destino_municipio_hospital);
            }
            $post->tipoPaciente = Tipo_paciente::find($post->tipo_paciente);
            $post->codigo_edad = Tipo_edad::find($post->cod_edad);
            $post->ambulancia = Preh_servicio_ambulancia::where('cod_casopreh', $post->cod_casopreh)->first();
        }
        return $consulta;
    }
    //3° pestaña PREH
    public function regionespreh()
    {
        $SQLconsulta = "SELECT distrito.nombre_distrito as name, count(distrito.nombre_distrito) as value
                            from preh_maestro 
                            inner join hospitalesgeneral on
                                                        hospitalesgeneral.id_hospital =preh_maestro.hospital_destino
                            inner join distrito on
                                                        distrito.cod_distrito=hospitalesgeneral.municipio_hospital 
                            inner join provincias on 
                                                        provincias.cod_provincia=hospitalesgeneral.provincia_hospital
                            group by distrito.nombre_distrito
                            order by  value desc;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function totalespreh()
    {
        $SQLconsulta = "SELECT * from
         (SELECT count(preh_maestro.cod_casopreh) as completos
                 from preh_maestro 
                  inner join preh_cierre on 
                                     preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                 where 
                 preh_cierre.nombrecierre=9) com,
         (SELECT count(preh_maestro.cod_casopreh) as abortados
                 from preh_maestro 
                  inner join preh_cierre on 
                                     preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                 where 
                 preh_cierre.nombrecierre!=9) abor,
         (SELECT count(preh_maestro.cod_casopreh) as en_espera
                 from preh_maestro 
                  left join preh_servicio_ambulancia on 
                                     preh_servicio_ambulancia.cod_casopreh=preh_maestro.cod_casopreh
                 where 
                 preh_servicio_ambulancia.cod_casopreh is   null) ens,
         (SELECT count(preh_maestro.cod_casopreh) as en_proceso
                 from preh_maestro 
                  left join preh_servicio_ambulancia on 
                                     preh_servicio_ambulancia.cod_casopreh=preh_maestro.cod_casopreh
                 left join preh_cierre on 
                                     preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                 where 
                 preh_servicio_ambulancia.cod_casopreh is  not null and
                 preh_cierre.cod_casopreh is null)enp ;";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }
    public function tablapreh()
    {
        $SQLconsulta = "SELECT  extract(month from fecha) mes, 
                        CASE 
                        WHEN   completos>0THEN 'Completo'
                        WHEN   en_espera>0THEN 'En espera'
                        WHEN   en_proceso>0THEN 'En proceso'
                        WHEN   abortados>0THEN 'Abortado'
                        END AS tipo_traslado, im.*,pacientegeneral.*,preh_evaluacionclinica.*, preh_servicio_ambulancia.*, 
                        hg.id_hospital  as destino_id_hospital,
                        hg.nombre_hospital  as destino_nombre_hospital,
                        hg.provincia_hospital  as destino_provincia_hospital,
                        hg.municipio_hospital  as destino_municipio_hospital,
                        hg.depto_hospital  as destino_depto_hospital,
                        hg.nivel_hospital  as destino_nivel_hospital,
                        hg.redservicions_hospital  as destino_redservicions_hospital,
                        hg.sector_hospital  as destino_sector_hospital,
                        hg.tipo_hospital  as destino_tipo_hospital,
                        hg.camashab_cali  as destino_camashab_cali,
                        hg.latitud_hospital  as destino_latitud_hospital,
                        hg.longitud_hospital  as destino_longitud_hospital,
                        hg.icon_hospital  as destino_icon_hospital,
                        hg.especialidad  as destino_especialidad,
                        hg.codpolitico  as destino_codpolitico,
                        hg.direccion  as destino_direccion,
                        hg.telefono  as destino_telefono,
                        hg.nombre_responsable  as destino_nombre_responsable,
                        hg.estado  as destino_estado,
                        hg.emt  as destino_emt,
                        incidentes.*,
                        preh_servicio_ambulancia.*
                        
                        from
                        preh_maestro im left join
                        incidentes on 
                                    incidentes.id_incidente=im.incidente  left join
                        (SELECT preh_maestro.cod_casopreh as completos
                        from preh_maestro 
                        inner join preh_cierre on 
                        preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_cierre.nombrecierre=9) com on im.cod_casopreh=com.completos  left join
                        (SELECT preh_maestro.cod_casopreh as abortados
                        from preh_maestro 
                        inner join preh_cierre on 
                        preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_cierre.nombrecierre!=9) abor on im.cod_casopreh=abor.abortados  left join
                        (SELECT preh_maestro.cod_casopreh as en_espera
                        from preh_maestro 
                        left join preh_servicio_ambulancia on 
                        preh_servicio_ambulancia.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_servicio_ambulancia.cod_casopreh is   null) ens on im.cod_casopreh=ens.en_espera  left join
                        (SELECT preh_maestro.cod_casopreh as en_proceso
                        from preh_maestro 
                        left join preh_servicio_ambulancia on 
                        preh_servicio_ambulancia.cod_casopreh=preh_maestro.cod_casopreh
                        left join preh_cierre on 
                        preh_cierre.cod_casopreh=preh_maestro.cod_casopreh
                        where 
                        preh_servicio_ambulancia.cod_casopreh is  not null and
                        preh_cierre.cod_casopreh is null)enp on im.cod_casopreh=enp.en_proceso 
                        
                        
                        left join pacientegeneral on 
                        pacientegeneral.cod_casopreh=im.cod_casopreh
                        inner join preh_evaluacionclinica on 
                        preh_evaluacionclinica.id_paciente=pacientegeneral.id_paciente
                        left join hospitalesgeneral hg on
                        hg.id_hospital =im.hospital_destino 
                        left join preh_servicio_ambulancia on preh_servicio_ambulancia.cod_casopreh=im.cod_casopreh
                        where
                        pacientegeneral.cod_casopreh is not null  ;";

        $consulta = DB::select($SQLconsulta, array());

        return $consulta;
    }
}
