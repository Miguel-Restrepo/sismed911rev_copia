<?php

namespace App\Http\Controllers;

use App\Events\ActualizarInterh;
use App\Models\Archivos;
use App\Models\Hospitalesgeneral;
use App\Models\Interh_accion;
use App\Models\Interh_cierre;
use App\Models\Interh_evaluacionclinica;
use App\Models\Interh_maestro;
use App\Models\Interh_motivoatencion;
use App\Models\Interh_prioridad;
use App\Models\Interh_seguimiento;
use App\Models\Interh_tiposervicio;
use App\Models\Pacientegeneral;
use App\Models\Servicio_ambulancia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Interh_maestroController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $objeto = Interh_maestro::select(
            'interh_maestro.cod_casointerh as codigo',
            'interh_maestro.*',
            'hospitalesgeneral.*',
            'interh_prioridad.*',
            'interh_cierre.*',
            'interh_tiposervicio.*',
            'interh_motivoatencion.*',
            'interh_accion.*',
            'servicio_ambulancia.*',
            'hg.id_hospital  as destino_id_hospital',
            'hg.nombre_hospital  as destino_nombre_hospital',
            'hg.provincia_hospital  as destino_provincia_hospital',
            'hg.municipio_hospital  as destino_municipio_hospital',
            'hg.depto_hospital  as destino_depto_hospital',
            'hg.nivel_hospital  as destino_nivel_hospital',
            'hg.redservicions_hospital  as destino_redservicions_hospital',
            'hg.sector_hospital  as destino_sector_hospital',
            'hg.tipo_hospital  as destino_tipo_hospital',
            'hg.camashab_cali  as destino_camashab_cali',
            'hg.latitud_hospital  as destino_latitud_hospital',
            'hg.longitud_hospital  as destino_longitud_hospital',
            'hg.icon_hospital  as destino_icon_hospital',
            'hg.especialidad  as destino_especialidad',
            'hg.codpolitico  as destino_codpolitico',
            'hg.direccion  as destino_direccion',
            'hg.telefono  as destino_telefono',
            'hg.nombre_responsable  as destino_nombre_responsable',
            'hg.estado  as destino_estado',
            'hg.emt  as destino_emt'
        )
            ->leftJoin('hospitalesgeneral', 'hospitalesgeneral.id_hospital', '=', 'interh_maestro.hospital_origneinterh')
            ->leftJoin('hospitalesgeneral as hg', 'hg.id_hospital', '=', 'interh_maestro.hospital_destinointerh')
            ->leftJoin('interh_prioridad', 'interh_prioridad.id_prioridad', '=', 'interh_maestro.prioridadinterh')
            ->leftJoin('interh_cierre', 'interh_cierre.cod_casointerh', '=', 'interh_maestro.cod_casointerh')
            ->leftJoin('interh_tiposervicio', 'interh_tiposervicio.id_tiposervicion', '=', 'interh_maestro.tipo_serviciointerh')
            ->leftJoin('interh_motivoatencion', 'interh_motivoatencion.id_motivoatencion', '=', 'interh_maestro.motivo_atencioninteh')
            ->leftJoin('interh_accion', 'interh_accion.id_accion', '=', 'interh_maestro.accioninterh')
            ->leftJoin('servicio_ambulancia', 'servicio_ambulancia.cod_casointerh', '=', 'interh_maestro.cod_casointerh')
            ->orderBy('prioridadinterh')
            ->get();

        foreach ($objeto as $post) {
            $post->seguimientos = Interh_seguimiento::where('cod_casointerh', $post->codigo)->get();
            $post->pacientes = Pacientegeneral::where('cod_casointerh', $post->codigo)->get();
            $post->evaluaciones_clinicas = Interh_evaluacionclinica::where('cod_casointerh', $post->codigo)->get();
            $post->archivos = Archivos::where('cod_casointerh', $post->codigo)->get();
        }
        return $objeto;
    }

    public function show($id)
    { //Muestra uno en especifico
        $objeto = Interh_maestro::select(
            'interh_maestro.cod_casointerh as codigo',
            'interh_maestro.*',
            'hospitalesgeneral.*',
            'interh_prioridad.*',
            'interh_cierre.*',
            'interh_tiposervicio.*',
            'interh_motivoatencion.*',
            'interh_accion.*',
            'servicio_ambulancia.*',
            'hg.id_hospital  as destino_id_hospital',
            'hg.nombre_hospital  as destino_nombre_hospital',
            'hg.provincia_hospital  as destino_provincia_hospital',
            'hg.municipio_hospital  as destino_municipio_hospital',
            'hg.depto_hospital  as destino_depto_hospital',
            'hg.nivel_hospital  as destino_nivel_hospital',
            'hg.redservicions_hospital  as destino_redservicions_hospital',
            'hg.sector_hospital  as destino_sector_hospital',
            'hg.tipo_hospital  as destino_tipo_hospital',
            'hg.camashab_cali  as destino_camashab_cali',
            'hg.latitud_hospital  as destino_latitud_hospital',
            'hg.longitud_hospital  as destino_longitud_hospital',
            'hg.icon_hospital  as destino_icon_hospital',
            'hg.especialidad  as destino_especialidad',
            'hg.codpolitico  as destino_codpolitico',
            'hg.direccion  as destino_direccion',
            'hg.telefono  as destino_telefono',
            'hg.nombre_responsable  as destino_nombre_responsable',
            'hg.estado  as destino_estado',
            'hg.emt  as destino_emt'
        )
            ->leftJoin('hospitalesgeneral', 'hospitalesgeneral.id_hospital', '=', 'interh_maestro.hospital_origneinterh')
            ->leftJoin('hospitalesgeneral as hg', 'hg.id_hospital', '=', 'interh_maestro.hospital_destinointerh')
            ->leftJoin('interh_prioridad', 'interh_prioridad.id_prioridad', '=', 'interh_maestro.prioridadinterh')
            ->leftJoin('interh_cierre', 'interh_cierre.cod_casointerh', '=', 'interh_maestro.cod_casointerh')
            ->leftJoin('interh_tiposervicio', 'interh_tiposervicio.id_tiposervicion', '=', 'interh_maestro.tipo_serviciointerh')
            ->leftJoin('interh_motivoatencion', 'interh_motivoatencion.id_motivoatencion', '=', 'interh_maestro.motivo_atencioninteh')
            ->leftJoin('interh_accion', 'interh_accion.id_accion', '=', 'interh_maestro.accioninterh')
            ->leftJoin('servicio_ambulancia', 'servicio_ambulancia.cod_casointerh', '=', 'interh_maestro.cod_casointerh')
            ->where('interh_maestro.cod_casointerh', $id)
            ->first();

        foreach ($objeto as $post) {
            $post->seguimientos = Interh_seguimiento::where('cod_casointerh', $post->codigo)->get();
            $post->pacientes = Pacientegeneral::where('cod_casointerh', $post->codigo)->get();
            $post->evaluaciones_clinicas = Interh_evaluacionclinica::where('cod_casointerh', $post->codigo)
                ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'interh_evaluacionclinica.id_paciente')->get();
            $post->archivos = Archivos::where('cod_casointerh', $post->codigo)->get();
        }
        return $objeto;
    }

    public function store(Request $request)
    { //Guardar informacion
        $objeto = Interh_maestro::create($request->all());
        $objeto->save();
        event(new ActualizarInterh('Se ha creado un interh'));
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Interh_maestro::find($id);
        $objeto = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto->update($request->all());
        event(new ActualizarInterh('Se ha actualizado un interh'));
        return $objeto;
    }

    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Interh_maestro::find($id);
        $objeto = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto->delete();
        event(new ActualizarInterh('Se ha eliminado un interh'));
        return "OK";
    }

    public function indexActivos()
    { //PARA OBTENER TODOS LOS REGISTROS con filtro de cierre(Que no lo tengan es decir 0)
        $objeto = DB::table('interh_maestro')->leftJoin('hospitalesgeneral', 'hospitalesgeneral.id_hospital', '=', 'interh_maestro.hospital_origneinterh')
            ->leftJoin('hospitalesgeneral as hg', 'hg.id_hospital', '=', 'interh_maestro.hospital_destinointerh')
            ->leftJoin('interh_prioridad', 'interh_prioridad.id_prioridad', '=', 'interh_maestro.prioridadinterh')
            ->leftJoin('interh_cierre', 'interh_cierre.cod_casointerh', '=', 'interh_maestro.cod_casointerh')
            ->leftJoin('interh_tiposervicio', 'interh_tiposervicio.id_tiposervicion', '=', 'interh_maestro.tipo_serviciointerh')
            ->leftJoin('interh_motivoatencion', 'interh_motivoatencion.id_motivoatencion', '=', 'interh_maestro.motivo_atencioninteh')
            ->leftJoin('interh_accion', 'interh_accion.id_accion', '=', 'interh_maestro.accioninterh')
            ->leftJoin('servicio_ambulancia', 'servicio_ambulancia.cod_casointerh', '=', 'interh_maestro.cod_casointerh')
            ->whereNull('interh_cierre.cod_casointerh')
            ->select(
                'interh_maestro.cod_casointerh as codigo',
                'interh_maestro.*',
                'hospitalesgeneral.*',
                'interh_prioridad.*',
                'interh_cierre.*',
                'interh_tiposervicio.*',
                'interh_motivoatencion.*',
                'interh_accion.*',
                'servicio_ambulancia.*',
                'hg.id_hospital  as destino_id_hospital',
                'hg.nombre_hospital  as destino_nombre_hospital',
                'hg.provincia_hospital  as destino_provincia_hospital',
                'hg.municipio_hospital  as destino_municipio_hospital',
                'hg.depto_hospital  as destino_depto_hospital',
                'hg.nivel_hospital  as destino_nivel_hospital',
                'hg.redservicions_hospital  as destino_redservicions_hospital',
                'hg.sector_hospital  as destino_sector_hospital',
                'hg.tipo_hospital  as destino_tipo_hospital',
                'hg.camashab_cali  as destino_camashab_cali',
                'hg.latitud_hospital  as destino_latitud_hospital',
                'hg.longitud_hospital  as destino_longitud_hospital',
                'hg.icon_hospital  as destino_icon_hospital',
                'hg.especialidad  as destino_especialidad',
                'hg.codpolitico  as destino_codpolitico',
                'hg.direccion  as destino_direccion',
                'hg.telefono  as destino_telefono',
                'hg.nombre_responsable  as destino_nombre_responsable',
                'hg.estado  as destino_estado',
                'hg.emt  as destino_emt'
            )
            ->orderBy('prioridadinterh')
            ->orderByDesc('fechahorainterh')

            ->get();

        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();
        foreach ($objeto as $post) {
            //
            $tmp = strtotime($post->fechahorainterh);
            $post->soloFecha = date('d/m/Y', $tmp);
            $post->soloHora = date('h:i:s', $tmp);
            $post->seguimientos = Interh_seguimiento::where('cod_casointerh', $post->codigo)->get();
            $post->pacientes = Pacientegeneral::where('cod_casointerh', $post->codigo)->get();
            $nombres = "";
            foreach ($post->pacientes as $pacientes) {
                if ($nombres == "") {
                    $nombres = $pacientes->nombre1 . ' ' . $pacientes->apellido1;
                } else {
                    $nombres = $nombres . ', ' . $pacientes->nombre1 . ' ' . $pacientes->apellido1;
                }
            }
            $post->nombres_pacientes = $nombres;
            $post->evaluaciones_clinicas = Interh_evaluacionclinica::where('interh_evaluacionclinica.cod_casointerh', $post->codigo)
                ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'interh_evaluacionclinica.id_paciente')->get();
            $post->archivos = Archivos::where('cod_casointerh', $post->codigo)->get();
        }
        return $retorno;
    }

    public function verHospitalOrigen($id)
    { //Muestra uno en especifico
        $objeto1 = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto = Hospitalesgeneral::where('id_hospital', $objeto1->hospital_origneinterh)->first();
        return $objeto;
    }

    public function verHospitalDestino($id)
    { //Muestra uno en especifico
        $objeto1 = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto = Hospitalesgeneral::where('id_hospital', $objeto1->hospital_destinointerh)->first();
        return $objeto;
    }

    public function verPrioridad($id)
    { //Muestra uno en especifico
        $objeto1 = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto = Interh_prioridad::where('id_prioridad', $objeto1->prioridadinterh)->first();
        return $objeto;
    }

    public function verCierre($id)
    { //Muestra uno en especifico
        $objeto = Interh_cierre::where('cod_casointerh', $id)->first();
        return $objeto;
    }

    public function verTipoServicio($id)
    { //Muestra uno en especifico
        $objeto1 = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto = Interh_tiposervicio::where('id_tiposervicion', $objeto1->tipo_serviciointerh)->first();
        return $objeto;
    }

    public function verMotivoAtencion($id)
    { //Muestra uno en especifico
        $objeto1 = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto = Interh_motivoatencion::where('id_motivoatencion', $objeto1->motivo_atencioninteh)->first();
        return $objeto;
    }

    public function verAccion($id)
    { //Muestra uno en especifico
        $objeto1 = Interh_maestro::where('cod_casointerh', $id)->first();
        $objeto = Interh_accion::where('id_accion', $objeto1->accioninterh)->first();
        return $objeto;
    }

    public function verPacienteGeneral($id)
    { //Muestra uno en especifico
        $objeto = Pacientegeneral::where('cod_casointerh', $id)->first();
        return $objeto;
    }

    public function verEvaluacion($id)
    { //Muestra uno en especifico
        $objeto = Interh_evaluacionclinica::where('cod_casointerh', $id)->first();
        return $objeto;
    }

    public function verSeguimiento($id)
    { //Muestra uno en especifico
        $objeto = Interh_seguimiento::where('cod_casointerh', $id)->first();
        return $objeto;
    }

    public function verServicioAmbulancia($id)
    { //Muestra uno en especifico
        $objeto = Servicio_ambulancia::where('cod_casointerh', $id)->first();
        return $objeto;
    }
}
