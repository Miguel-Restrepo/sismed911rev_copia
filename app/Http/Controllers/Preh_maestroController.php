<?php

namespace App\Http\Controllers;

use App\Events\ActualizarPreh;
use App\Models\Archivos;
use App\Models\Hospitalesgeneral;
use App\Models\Incidentes;
use App\Models\Interh_accion;
use App\Models\Interh_evaluacionclinica;
use App\Models\Interh_prioridad;
use App\Models\Pacientegeneral;
use App\Models\Preh_cierre;
use App\Models\Preh_destino;
use App\Models\Preh_evaluacionclinica;
use App\Models\Preh_evaluacionhospital;
use App\Models\Preh_maestro;
use App\Models\Preh_seguimiento;
use App\Models\Preh_servicio_ambulancia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Preh_maestroController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $objeto = DB::table('preh_maestro')
            ->select(
                'preh_maestro.cod_casopreh as codigo',
                'preh_maestro.*'
                
            )
            ->get();
        foreach ($objeto as $post) {
            $post->seguimientos = Preh_seguimiento::where('cod_casopreh', $post->codigo)->get();
            $post->pacientes = Pacientegeneral::where('cod_casopreh', $post->codigo)->get();
            $post->evaluaciones_clinicas = Preh_evaluacionclinica::where('preh_evaluacionclinica.cod_casopreh', $post->codigo)
            ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'preh_evaluacionclinica.id_paciente')->get();
            $post->archivos= Archivos::where('cod_casopreh',$post->codigo)->get();
        }
        return $objeto;
    }
    public function indexActivos()
    { //PARA OBTENER TODOS LOS REGISTROS con filtro de cierre(Que no lo tengan es decir 0)
        $objeto = DB::table('preh_maestro')
            ->leftJoin('incidentes', 'incidentes.id_incidente', '=', 'preh_maestro.incidente')
            ->leftJoin('interh_prioridad', 'interh_prioridad.id_prioridad', '=', 'preh_maestro.prioridad')
            ->leftJoin('preh_cierre', 'preh_cierre.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_destino', 'preh_destino.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_servicio_ambulancia', 'preh_servicio_ambulancia.cod_casopreh', '=', 'preh_maestro.cod_casopreh')  
            ->leftJoin('interh_accion', 'interh_accion.id_accion', '=', 'preh_maestro.accion')
            ->leftJoin('hospitalesgeneral', 'hospitalesgeneral.id_hospital', '=', 'preh_maestro.hospital_destino')
            ->whereNull('preh_cierre.cod_casopreh')
            ->select(
                'preh_maestro.cod_casopreh as codigo',
                'preh_maestro.*',
                'incidentes.*',
                'interh_prioridad.*',
                'preh_cierre.*',
                'preh_destino.*',
                'preh_servicio_ambulancia.*',
                'interh_accion.*',
                'hospitalesgeneral.*'
            )
            ->get();
        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();
        foreach ($retorno as $post) {
            $tmp=strtotime( $post->fecha);
            $post->soloFecha=date('d/m/Y', $tmp);
            $post->soloHora=date('h:i:s', $tmp);
            $post->seguimientos = Preh_seguimiento::where('cod_casopreh', $post->codigo)->get();
            $post->pacientes = Pacientegeneral::where('cod_casopreh', $post->codigo)->get();
            $nombres="";
            foreach ( $post->pacientes as $pacientes) {
                if($nombres=="")
                {
                    $nombres=$pacientes->nombre1.' '. $pacientes->apellido1;
                }else{
                    $nombres=$nombres.', '. $pacientes->nombre1.' '. $pacientes->apellido1;
                }
                
            }
            $post->nombres_pacientes=$nombres;
            $post->evaluaciones_clinicas = Preh_evaluacionclinica::where('preh_evaluacionclinica.cod_casopreh', $post->codigo)
            ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'preh_evaluacionclinica.id_paciente')->get();
            $post->archivos= Archivos::where('cod_casopreh',$post->codigo)->get();
        }
        return $retorno;
    }
    public function indexDespacho()
    { //PARA OBTENER TODOS LOS REGISTROS con filtro de cierre(Que no lo tengan es decir 0)
        $objeto = DB::table('preh_maestro')
            ->leftJoin('incidentes', 'incidentes.id_incidente', '=', 'preh_maestro.incidente')
            ->leftJoin('interh_prioridad', 'interh_prioridad.id_prioridad', '=', 'preh_maestro.prioridad')
            ->leftJoin('preh_cierre', 'preh_cierre.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_destino', 'preh_destino.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_servicio_ambulancia', 'preh_servicio_ambulancia.cod_casopreh', '=', 'preh_maestro.cod_casopreh')  
            ->leftJoin('interh_accion', 'interh_accion.id_accion', '=', 'preh_maestro.accion')
            ->leftJoin('hospitalesgeneral', 'hospitalesgeneral.id_hospital', '=', 'preh_maestro.hospital_destino')
            ->whereNull('preh_cierre.cod_casopreh')
            ->where('interh_accion.id_accion','=','1')
            ->select(
                'preh_maestro.cod_casopreh as codigo',
                'preh_maestro.*',
                'incidentes.*',
                'interh_prioridad.*',
                'preh_cierre.*',
                'preh_destino.*',
                'preh_servicio_ambulancia.*',
                'interh_accion.*',
                'hospitalesgeneral.*'
            )
            ->get();
        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();
        foreach ($retorno as $post) {
            $tmp=strtotime( $post->fecha);
            $post->soloFecha=date('d/m/Y', $tmp);
            $post->soloHora=date('h:i:s', $tmp);
            $post->seguimientos = Preh_seguimiento::where('cod_casopreh', $post->codigo)->get();
            $post->pacientes = Pacientegeneral::where('cod_casopreh', $post->codigo)->get();
            $nombres="";
            foreach ( $post->pacientes as $pacientes) {
                if($nombres=="")
                {
                    $nombres=$pacientes->nombre1.' '. $pacientes->apellido1;
                }else{
                    $nombres=$nombres.', '. $pacientes->nombre1.' '. $pacientes->apellido1;
                }
                
            }
            $post->nombres_pacientes=$nombres;
            $post->evaluaciones_clinicas = Preh_evaluacionclinica::where('preh_evaluacionclinica.cod_casopreh', $post->codigo)
            ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'preh_evaluacionclinica.id_paciente')->get();
            $post->archivos= Archivos::where('cod_casopreh',$post->codigo)->get();
        }
        return $retorno;
    }
    public function show($id)
    { //Muestra uno en especifico
        //$objeto= Preh_maestro::find($id);
        $objeto = Preh_maestro::where('preh_maestro.cod_casopreh', $id)
            ->leftJoin('incidentes', 'incidentes.id_incidente', '=', 'preh_maestro.incidente')
            ->leftJoin('interh_prioridad', 'interh_prioridad.id_prioridad', '=', 'preh_maestro.prioridad')
            ->leftJoin('preh_cierre', 'preh_cierre.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_destino', 'preh_destino.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_servicio_ambulancia', 'preh_servicio_ambulancia.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_seguimiento', 'preh_seguimiento.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('preh_evaluacionclinica', 'preh_evaluacionclinica.cod_casopreh', '=', 'preh_maestro.cod_casopreh')
            ->leftJoin('interh_accion', 'interh_accion.id_accion', '=', 'preh_maestro.accion')
            ->leftJoin('hospitalesgeneral', 'hospitalesgeneral.id_hospital', '=', 'preh_maestro.hospital_destino')
            ->select(
                'preh_maestro.cod_casopreh as codigo',
                'preh_maestro.*',
                'incidentes.*',
                'interh_prioridad.*',
                'preh_cierre.*',
                'preh_destino.*',
                'preh_servicio_ambulancia.*',
                'preh_seguimiento.*',
                'preh_evaluacionclinica.*',
                'interh_accion.*',
                'hospitalesgeneral.*'
            )->first();
        return $objeto;
    }
    public function store(Request $request)
    { //Guardar informacion
        $objeto = Preh_maestro::create($request->all());
        $objeto->save();
        event(new ActualizarPreh('Se ha creado un preh'));
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Preh_maestro::find($id);
        $objeto = Preh_maestro::where('cod_casopreh', $id)->first();
        $objeto->update($request->all());
        event(new ActualizarPreh('Se ha actualizado un preh'));
        return $objeto;
    }
    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Preh_maestro::find($id);
        $objeto = Preh_maestro::where('cod_casopreh', $id)->first();
        $objeto->delete();
        event(new ActualizarPreh('Se ha eliminado un preh'));
        return "OK";
    }
    public function verIncidentes($id)
    { //Muestra uno en especifico
        $objeto1 = Preh_maestro::where('cod_casopreh', $id)->first();
        $objeto = Incidentes::where('id_incidente', $objeto1->incidente)->first();
        return $objeto;
    }
    public function verPrioridad($id)
    { //Muestra uno en especifico
        $objeto1 = Preh_maestro::where('cod_casopreh', $id)->first();
        $objeto = Interh_prioridad::where('id_prioridad', $objeto1->prioridad)->first();
        return $objeto;
    }
    public function verCierre($id)
    { //Muestra uno en especifico
        $objeto = Preh_cierre::where('cod_casopreh', $id)->first();
        return $objeto;
    }
    public function verDestino($id)
    { //Muestra uno en especifico
        $objeto = Preh_destino::where('cod_casopreh', $id)->first();
        return $objeto;
    }
    public function verServicioAmbulancia($id)
    { //Muestra uno en especifico
        $objeto = Preh_servicio_ambulancia::where('cod_casopreh', $id)->first();
        return $objeto;
    }
    public function verSeguimiento($id)
    { //Muestra uno en especifico
        $objeto = Preh_seguimiento::where('cod_casopreh', $id)->get();
        return $objeto;
    }
    public function verEvaluacion($id)
    { //Muestra uno en especifico
        $objeto = Preh_evaluacionclinica::where('cod_casopreh', $id)->first();
        return $objeto;
    }
    public function verAccion($id)
    { //Muestra uno en especifico
        $objeto1 = Preh_maestro::where('cod_casopreh', $id)->first();
        $objeto = Interh_accion::where('id_accion', $objeto1->accion)->first();
        return $objeto;
    }
    public function verHospital($id)
    { //Muestra uno en especifico
        $objeto1 = Preh_maestro::where('cod_casopreh', $id)->first();
        $objeto = Hospitalesgeneral::where('id_hospital', $objeto1->hospital_destino)->first();
        return $objeto;
    }
}
