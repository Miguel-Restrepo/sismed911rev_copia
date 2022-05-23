<?php

namespace App\Http\Controllers;

use App\Models\Cama;
use App\Models\Evolucion;
use App\Models\Monitoreo;
use App\Models\Pacientegeneral;
use App\Models\Procedimientos;
use App\Models\Sala_admission;
use App\Models\Sala_examen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MonitoreoController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $Monitoreos = Monitoreo::all();
        foreach ($Monitoreos as $post) {
            $post->sala_admision = Sala_admission::find($post->id_salaatencionmedica);
            $post->paciente = Pacientegeneral::find($post->sala_admision->id_paciente);
            $post->cama = Cama::find($post->no_cama);
            $post->evoluciones = Evolucion::where('id_monitoreo', $post->id)->get();
            $post->procedimiento = Procedimientos::find($post->procedimientos_sala);
            $post->examenes = array([]);
            $post->ids_riesgo = explode(",", substr($post->id_riesgo, 1, -1));
            $riesgos = "";
            foreach ($post->ids_riesgo as $id) {
                if ($id == "1") {
                    $riesgos = $riesgos . ", " . "Riesgo de febrite";
                } else if ($id == "2") {
                    $riesgos = $riesgos . ", " . "Riesgo de caída";
                } else if ($id == "3") {
                    $riesgos = $riesgos . ", " . "Exturbación de Sonda nasogástrica";
                } else if ($id == "4") {
                    $riesgos = $riesgos . ", " . "Riesgo de ulcera de Decubito";
                } else if ($id == "5") {
                    $riesgos = $riesgos . ", " . "Riesgo de Extubación Accidental";
                }
            }
            $riesgos = substr($riesgos, 1);
            foreach ($post->evoluciones as $postevo) {
                $postevo->examen = Sala_examen::find($postevo->examen);
            }
            $post->riegos = $riesgos;
        }
        return $Monitoreos;
    }
    public function show($id)
    { //Muestra uno en especifico
        $objeto = Monitoreo::find($id);

        return $objeto;
    }
    public function store(Request $request)
    { //Guardar informacion

        $objeto = Monitoreo::where('id_salaatencionmedica', $request->id_salaatencionmedica)->first();
        if ($objeto) {
            $objeto->update($request->all());
        } else {
            $objeto = Monitoreo::create($request->all());
            $objeto->save();
            return $objeto;
        }
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        $objeto = Monitoreo::find($id);

        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id)
    { //Muestra uno en especifico
        $objeto = Monitoreo::find($id);

        $objeto->delete();
        return "OK";
    }
    public function paciente()
    {
        $SQLconsulta = "SELECT fb, total, internados-fb as internados,((internados)/total) as media
                        from (SELECT count(*) as total
                            FROM monitoreo
                            inner join sala_admission on monitoreo.id_salaatencionmedica=sala_admission.id_admision
                            inner join pacientegeneral on pacientegeneral.id_paciente= sala_admission.id_paciente
                            inner join cama on cama.id_sala_camas=monitoreo.no_cama
                            inner join sala_atencionmedica on sala_atencionmedica.id_admision=sala_admission.id_admision) as tot,
                            (SELECT count(*) as internados
                            FROM monitoreo
                            inner join sala_admission on monitoreo.id_salaatencionmedica=sala_admission.id_admision
                            inner join pacientegeneral on pacientegeneral.id_paciente= sala_admission.id_paciente
                            inner join cama on cama.id_sala_camas=monitoreo.no_cama
                            inner join sala_atencionmedica on sala_atencionmedica.id_admision=sala_admission.id_admision
                            where id_estadoalta is null) as inter,
                            (SELECT COUNT(*) as FB
                            FROM monitoreo
                            where id_riesgo[1]=1 ) fb
            ";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta[0];
    }
    public function censoCamas()
    {
        $SQLconsulta = "SELECT total-ocupadas as disponibles, *
                        from (SELECT count(*) as total from cama) tot,
                            (SELECT count(*) as ocupadas
                            FROM monitoreo
                            inner join sala_admission on monitoreo.id_salaatencionmedica=sala_admission.id_admision
                            inner join pacientegeneral on pacientegeneral.id_paciente= sala_admission.id_paciente
                            inner join cama on cama.id_sala_camas=monitoreo.no_cama
                            inner join sala_atencionmedica on sala_atencionmedica.id_admision=sala_admission.id_admision
                                where id_estadoalta is null)  oc
";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta[0];
    }
    public function necesidades()
    {
        $SQLconsulta = "SELECT *
                        FROM
                        (SELECT count(monitoreo.*) as minimo 
                        from monitoreo
                        where necesidad='Cuidado mínimo') mi,
                        (SELECT count(monitoreo.*) as intermedio 
                        from monitoreo
                        where necesidad='Cuidado intermedio') inter,
                        (SELECT count(monitoreo.*) as intensivo 
                        from monitoreo
                        where necesidad='Cuidado intensivo')inten
";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta[0];
    }
    public function riesgos()
    {
        $SQLconsulta = "SELECT * FROM
                        (SELECT count(*) as r1 
                        from monitoreo
                        where id_riesgo[1]=1 or 
                            id_riesgo[2]=1 or
                            id_riesgo[3]=1 or
                            id_riesgo[4]=1 or
                            id_riesgo[5]=1 ) T1,
                        (SELECT count(*) as r2 
                        from monitoreo
                        where id_riesgo[1]=2 or 
                            id_riesgo[2]=2 or
                            id_riesgo[3]=2 or
                            id_riesgo[4]=2 or
                            id_riesgo[5]=2 ) T2,
                        (SELECT count(*) as r3 
                        from monitoreo
                        where id_riesgo[1]=3 or 
                            id_riesgo[2]=3 or
                            id_riesgo[3]=3 or
                            id_riesgo[4]=3 or
                            id_riesgo[5]=3 ) T3,
                        (SELECT count(*) as r4 
                        from monitoreo
                        where id_riesgo[1]=4 or 
                            id_riesgo[2]=4 or
                            id_riesgo[3]=4 or
                            id_riesgo[4]=4 or
                            id_riesgo[5]=4 ) T4,
                        (SELECT count(*) as r5
                        from monitoreo
                        where id_riesgo[1]=5 or 
                            id_riesgo[2]=5 or
                            id_riesgo[3]=5 or
                            id_riesgo[4]=5 or
                            id_riesgo[5]=5 ) T5
                            
";

        $consulta = DB::select($SQLconsulta, array());
        return $consulta[0];
    }
}
