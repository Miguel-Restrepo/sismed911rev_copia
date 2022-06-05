<?php

namespace App\Http\Controllers;

use App\Models\Hospitalesgeneral;
use App\Models\Monitoreo;
use App\Models\Pacientegeneral;
use App\Models\Sala_admission;
use App\Models\Sala_atencionmedica;
use App\Models\Sala_atencionmedica_examen;
use App\Models\Sala_atencionmedica_medicamentos;
use App\Models\Sala_causatrauma;
use App\Models\Sala_localizaciontrauma;
use App\Models\Sala_motivoatencion;
use App\Models\Sala_signos;
use App\Models\Tipo_edad;
use App\Models\Tipo_ingreso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Sala_admissionController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $objeto = DB::table('sala_admission')
            ->leftJoin('sala_motivoatencion', 'sala_motivoatencion.id_motivoatencion', '=', 'sala_admission.id_motivoatencion')
            ->leftJoin('sala_signos', 'sala_signos.id_signos', '=', 'sala_admission.id_signos')
            ->leftJoin('sala_causatrauma', 'sala_causatrauma.id_salaCausa', '=', 'sala_admission.id_causatrauma')
            ->leftJoin('sala_localizaciontrauma', 'sala_localizaciontrauma.id_localizaciontrauma', '=', 'sala_admission.id_localizaciontrauma')
            ->leftJoin('tipo_ingreso', 'tipo_ingreso.id_ingreso', '=', 'sala_admission.id_ingreso')
            ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'sala_admission.id_paciente')
            ->leftJoin('sala_atencionmedica', 'sala_atencionmedica.id_admision', '=', 'sala_admission.id_admision')
            ->select(
                'sala_admission.id_admision as codigo',
                'sala_admission.*',
                'sala_motivoatencion.*',
                'sala_signos.*',
                'sala_causatrauma.*',
                'sala_localizaciontrauma.*',
                'tipo_ingreso.*',
                'pacientegeneral.*',
                'sala_atencionmedica.*'
            )
            ->get();
        foreach ($objeto as $post) {
            $post->monitoreo = Monitoreo::where('id_salaatencionmedica', $post->codigo)->first();
            if($post->monitoreo==null){
                $post->monitoreo= new Monitoreo();
                $post->monitoreo->id_salaatencionmedica=$post->codigo;
            }
        }
        return $objeto;
    }
    public function clasificacion()
    {
        $objeto = DB::table('sala_admission')
            ->leftJoin('sala_motivoatencion', 'sala_motivoatencion.id_motivoatencion', '=', 'sala_admission.id_motivoatencion')
            ->leftJoin('sala_signos', 'sala_signos.id_signos', '=', 'sala_admission.id_signos')
            ->leftJoin('sala_causatrauma', 'sala_causatrauma.id_salaCausa', '=', 'sala_admission.id_causatrauma')
            ->leftJoin('sala_localizaciontrauma', 'sala_localizaciontrauma.id_localizaciontrauma', '=', 'sala_admission.id_localizaciontrauma')
            ->leftJoin('tipo_ingreso', 'tipo_ingreso.id_ingreso', '=', 'sala_admission.id_ingreso')
            ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'sala_admission.id_paciente')
            ->leftJoin('sala_atencionmedica', 'sala_atencionmedica.id_admision', '=', 'sala_admission.id_admision')
            ->leftJoin('tipo_id', 'tipo_id.id_tipo', '=', 'pacientegeneral.tipo_doc')
            ->leftJoin('tipo_edad', 'tipo_edad.id_edad', '=', 'pacientegeneral.cod_edad')
            ->leftJoin('tipo_genero', 'tipo_genero.id_genero', '=', 'pacientegeneral.genero')
            ->leftJoin('departamento', 'departamento.cod_dpto', '=', 'pacientegeneral.dpto_pte')
            ->leftJoin('provincias', 'provincias.cod_provincia', '=', 'pacientegeneral.provin_pte')
            ->leftJoin('distrito_reniec', 'distrito_reniec.cod_distrito', '=', 'pacientegeneral.distrito_pte')
            ->whereNull('sala_admission.fecha_inicio_clasificacion')
            ->select(
                'sala_admission.id_admision as codigo',
                'sala_admission.*',
                'sala_motivoatencion.*',
                'sala_signos.*',
                'sala_causatrauma.*',
                'sala_localizaciontrauma.*',
                'tipo_ingreso.*',
                'pacientegeneral.*',
                'sala_atencionmedica.*',
                'pacientegeneral.*',
                'tipo_id.*',
                'tipo_edad.*',
                'tipo_genero.*',
                'departamento.*',
                'provincias.*',
                'distrito_reniec.*'
            )->orderBy("codigo",'desc')
            ->get();
        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();
        return $retorno;
    }
    public function urgencias()
    {
        $SQLconsulta = "select sala_admission.id_admision as codigo, * 
                        from sala_admission 
                        left join sala_atencionmedica on sala_atencionmedica.id_admision=sala_admission.id_admision
                        left join sala_motivoatencion on sala_motivoatencion.id_motivoatencion=sala_admission.id_motivoatencion
                        left join sala_signos on sala_signos.id_signos=sala_admission.id_signos
                        
                        left join sala_localizaciontrauma on sala_localizaciontrauma.id_localizaciontrauma=sala_admission.id_localizaciontrauma
                        left join  tipo_ingreso on tipo_ingreso.id_ingreso=sala_admission.id_ingreso
                        left join pacientegeneral on pacientegeneral.id_paciente=sala_admission.id_paciente
                        
                        where id_estadoalta is null and( clasificacion_admision=? or
                         clasificacion_admision=? or 
                         clasificacion_admision=?)";

        $objeto = DB::select($SQLconsulta, array("Azul", "Verde", "Amarillo"));


        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();

        foreach ($retorno as $post) {
            $post->general = explode(",", substr($post->general, 1, -1));
            $post->cabeza = explode(",", substr($post->cabeza, 1, -1));
            $post->ojo = explode(",", substr($post->ojo, 1, -1));
            $post->otorrino = explode(",", substr($post->otorrino, 1, -1));
            $post->boca = explode(",", substr($post->boca, 1, -1));
            $post->cuello = explode(",", substr($post->cuello, 1, -1));
            $post->torax = explode(",", substr($post->torax, 1, -1));
            $post->corazon = explode(",", substr($post->corazon, 1, -1));
            $post->pulmon = explode(",", substr($post->pulmon, 1, -1));
            $post->abdomen = explode(",", substr($post->abdomen, 1, -1));
            $post->pelvis = explode(",", substr($post->pelvis, 1, -1));
            $post->rectal = explode(",", substr($post->rectal, 1, -1));
            $post->genital = explode(",", substr($post->genital, 1, -1));
            $post->extremidad = explode(",", substr($post->extremidad, 1, -1));
            $post->neuro = explode(",", substr($post->neuro, 1, -1));
            $post->piel = explode(",", substr($post->piel, 1, -1));

            $post->medicamentos = Sala_atencionmedica_medicamentos::where('id_atencionmedica', $post->id_atencionmedica)
                ->leftjoin('medicamentos', 'medicamentos.id_medicamento', '=', 'sala_atencionmedica_medicamentos.id_medicamentos')
                ->get();
            $post->examenes = Sala_atencionmedica_examen::where('id_atencionmedica', $post->id_atencionmedica)
                ->leftjoin('sala_examen', 'sala_examen.id_examen', '=', 'sala_atencionmedica_examen.id_examen')
                ->get();
            $post->hospital = Hospitalesgeneral::find($post->admision_hospital);
            $post->paciente = Pacientegeneral::find($post->id_paciente);
            if ($post->paciente != null) {
                $post->paciente->codigo_edad = Tipo_edad::find($post->paciente->cod_edad);
            }
        }
        return $retorno;
    }
    public function emergencias()
    {

        $SQLconsulta = "select sala_admission.id_admision as codigo, * 
            from sala_admission 
            left join sala_atencionmedica on sala_atencionmedica.id_admision=sala_admission.id_admision
            left join sala_motivoatencion on sala_motivoatencion.id_motivoatencion=sala_admission.id_motivoatencion
            left join sala_signos on sala_signos.id_signos=sala_admission.id_signos
            
            left join sala_localizaciontrauma on sala_localizaciontrauma.id_localizaciontrauma=sala_admission.id_localizaciontrauma
            left join  tipo_ingreso on tipo_ingreso.id_ingreso=sala_admission.id_ingreso
            left join pacientegeneral on pacientegeneral.id_paciente=sala_admission.id_paciente
            
            where id_estadoalta is null and( clasificacion_admision=? or
             clasificacion_admision=?)";

        $objeto = DB::select($SQLconsulta, array("Rojo", "Naranja"));
        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();
        foreach ($retorno as $post) {
            $post->general = explode(",", substr($post->general, 1, -1));
            $post->cabeza = explode(",", substr($post->cabeza, 1, -1));
            $post->ojo = explode(",", substr($post->ojo, 1, -1));
            $post->otorrino = explode(",", substr($post->otorrino, 1, -1));
            $post->boca = explode(",", substr($post->boca, 1, -1));
            $post->cuello = explode(",", substr($post->cuello, 1, -1));
            $post->torax = explode(",", substr($post->torax, 1, -1));
            $post->corazon = explode(",", substr($post->corazon, 1, -1));
            $post->pulmon = explode(",", substr($post->pulmon, 1, -1));
            $post->abdomen = explode(",", substr($post->abdomen, 1, -1));
            $post->pelvis = explode(",", substr($post->pelvis, 1, -1));
            $post->rectal = explode(",", substr($post->rectal, 1, -1));
            $post->genital = explode(",", substr($post->genital, 1, -1));
            $post->extremidad = explode(",", substr($post->extremidad, 1, -1));
            $post->neuro = explode(",", substr($post->neuro, 1, -1));
            $post->piel = explode(",", substr($post->piel, 1, -1));

            $post->medicamentos = Sala_atencionmedica_medicamentos::where('id_atencionmedica', $post->id_atencionmedica)
                ->leftjoin('medicamentos', 'medicamentos.id_medicamento', '=', 'sala_atencionmedica_medicamentos.id_medicamentos')
                ->get();
            $post->examenes = Sala_atencionmedica_examen::where('id_atencionmedica', $post->id_atencionmedica)
                ->leftjoin('sala_examen', 'sala_examen.id_examen', '=', 'sala_atencionmedica_examen.id_examen')
                ->get();
            $post->hospital = Hospitalesgeneral::find($post->admision_hospital);
            $post->paciente = Pacientegeneral::find($post->id_paciente);
            if ($post->paciente != null) {
                $post->paciente->codigo_edad = Tipo_edad::find($post->paciente->cod_edad);
            }
            foreach ($objeto as $post) {
                $post->monitoreo = Monitoreo::where('id_salaatencionmedica', $post->codigo)->first();
                if($post->monitoreo==null){
                    $post->monitoreo= new Monitoreo();
                    $post->monitoreo->id_salaatencionmedica=$post->codigo;
                }
            }
        }
        return $retorno;
    }
    public function show($id)
    { //Muestra uno en especifico
        //$objeto= Sala_admission::find($id);
        $objeto = Sala_admission::where('id_admision', $id)->leftJoin('sala_motivoatencion', 'sala_motivoatencion.id_motivoatencion', '=', 'sala_admission.id_motivoatencion')
            ->leftJoin('sala_signos', 'sala_signos.id_signos', '=', 'sala_admission.id_signos')
            ->leftJoin('sala_causatrauma', 'sala_causatrauma.id_salaCausa', '=', 'sala_admission.id_causatrauma')
            ->leftJoin('sala_localizaciontrauma', 'sala_localizaciontrauma.id_localizaciontrauma', '=', 'sala_admission.id_localizaciontrauma')
            ->leftJoin('tipo_ingreso', 'tipo_ingreso.id_ingreso', '=', 'sala_admission.id_ingreso')
            ->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'sala_admission.id_paciente')
            ->leftJoin('sala_atencionmedica', 'sala_atencionmedica.id_admision', '=', 'sala_admission.id_admision')
            ->select(
                'sala_admission.id_admision as codigo',
                'sala_admission.*',
                'sala_motivoatencion.*',
                'sala_signos.*',
                'sala_causatrauma.*',
                'sala_localizaciontrauma.*',
                'tipo_ingreso.*',
                'pacientegeneral.*',
                'sala_atencionmedica.*'
            )->first();
        return $objeto;
    }
    public function store(Request $request)
    { //Guardar informacion
        $objeto = Sala_admission::create($request->all());
        $objeto->save();
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Sala_admission::find($id);
        $objeto = Sala_admission::where('id_admision', $id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Sala_admission::find($id);
        $objeto = Sala_admission::where('id_admision', $id)->first();
        $objeto->delete();
        return "OK";
    }
    public function verMotivoAtencion($id)
    { //Muestra uno en especifico
        $objeto1 = Sala_admission::where('id_admision', $id)->first();
        $objeto = Sala_motivoatencion::where('id_motivoatencion', $objeto1->id_motivoatencion)->first();
        return $objeto;
    }

    public function verSignos($id)
    { //Muestra uno en especifico
        $objeto1 = Sala_admission::where('id_admision', $id)->first();
        $objeto = Sala_signos::where('id_signos', $objeto1->id_signos)->first();
        return $objeto;
    }

    public function verCausa($id)
    { //Muestra uno en especifico
        $objeto1 = Sala_admission::where('id_admision', $id)->first();
        $objeto = Sala_causatrauma::where('id_salaCausa', $objeto1->id_causatrauma)->first();
        return $objeto;
    }

    public function verLocalizacion($id)
    { //Muestra uno en especifico
        $objeto1 = Sala_admission::where('id_admision', $id)->first();
        $objeto = Sala_localizaciontrauma::where('id_localizaciontrauma', $objeto1->id_localizaciontrauma)->first();
        return $objeto;
    }
    public function verTipoIngreso($id)
    { //Muestra uno en especifico
        $objeto1 = Sala_admission::where('id_admision', $id)->first();
        $objeto = Tipo_ingreso::where('id_ingreso', $objeto1->id_ingreso)->first();
        return $objeto;
    }
    public function verPacienteGeneral($id)
    { //Muestra uno en especifico
        $objeto1 = Sala_admission::where('id_admision', $id)->first();
        $objeto = Pacientegeneral::where('id_paciente', $objeto1->id_paciente)->first();
        return $objeto;
    }
    public function verSalaAtencionMedica($id)
    { //Muestra uno en especifico
        $objeto = Sala_atencionmedica::where('id_admision', $id)->first();
        return $objeto;
    }
}
