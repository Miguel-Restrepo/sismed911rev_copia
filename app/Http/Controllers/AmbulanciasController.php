<?php

namespace App\Http\Controllers;

use App\Models\Ambulancias;
use App\Models\Base_ambulancia;
use App\Models\Especial_ambulancia;
use App\Models\Historial_ubicaciones;
use App\Models\Mante_amb;
use App\Models\Modalidad_ambulancia;
use App\Models\Reg_ambulancias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AmbulanciasController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $objeto = DB::table('ambulancias')->leftJoin('base_ambulancia', 'base_ambulancia.id_base', '=', 'ambulancias.ubicacion')
            ->leftJoin('mante_amb', 'mante_amb.id_ambulancias', '=', 'ambulancias.id_ambulancias')
            ->leftJoin('modalidad_ambulancia', 'modalidad_ambulancia.id_modalidad', '=', 'ambulancias.modalidad')
            ->leftJoin('especial_ambulancia', 'especial_ambulancia.id_especialambulancia', '=', 'ambulancias.especial')
            ->leftJoin('ambulancia_taller', 'ambulancia_taller.id', '=', 'mante_amb.taller')
            ->leftJoin('recordatorio_taller', 'recordatorio_taller.vehiculo', '=', 'ambulancias.id_ambulancias')
            ->select(
                'ambulancias.id_ambulancias as codigo',
                'ambulancias.*',
                'base_ambulancia.*',
                'mante_amb.*',
                'modalidad_ambulancia.*',
                'especial_ambulancia.*',
                'ambulancia_taller.*',
                'recordatorio_taller.*'
            )
            ->get();
        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();
        return $retorno;
    }

    public function codigos()
    {
        $SQLconsulta = "SELECT cod_ambulancias
                from ambulancias ;";
        $consulta = DB::select($SQLconsulta, array());
        return $consulta;
    }

    public function sacarEventos()
    {
        $objeto = DB::table('ambulancias')
            ->leftJoin('base_ambulancia', 'base_ambulancia.id_base', '=', 'ambulancias.ubicacion')
            ->leftJoin('mante_amb', 'mante_amb.id_ambulancias', '=', 'ambulancias.id_ambulancias')
            ->leftJoin('modalidad_ambulancia', 'modalidad_ambulancia.id_modalidad', '=', 'ambulancias.modalidad')
            ->leftJoin('especial_ambulancia', 'especial_ambulancia.id_especialambulancia', '=', 'ambulancias.especial')
            ->leftJoin('ambulancia_taller', 'ambulancia_taller.id', '=', 'mante_amb.taller')
            ->leftJoin('recordatorio_taller', 'recordatorio_taller.vehiculo', '=', 'ambulancias.id_ambulancias')
            ->whereNotNull('recordatorio_taller.id')
            ->select(
                'ambulancias.id_ambulancias as codigo',
                'ambulancias.*',
                'base_ambulancia.*',
                'ambulancias.*',
                'mante_amb.*',
                'modalidad_ambulancia.*',
                'especial_ambulancia.*',
                'ambulancia_taller.*',
                'recordatorio_taller.*'
            )
            ->get();
        $collection = collect($objeto);
        $var = $collection->unique('codigo');
        $retorno = $var->values()->all();
        return $retorno;
    }

    public function consultaEspecial()
    {
        return Reg_ambulancias::select('ambulancias.id_ambulancias', 'ambulancias.cod_ambulancias', 'base_ambulancia.nombre as codigo')
            ->join('base_ambulancia', 'base_ambulancia.id_base', '=', 'reg_ambulancias.id_base')
            ->join('ambulancias', 'ambulancias.id_ambulancias', '=', 'reg_ambulancias.id_ambulancias')
            ->where('reg_ambulancias.estado', 1)
            ->distinct('ambulancias.id_ambulancias')
            ->get();
    }

    public function show($id)
    { //Muestra uno en especifico
        $objeto = Ambulancias::where('ambulancias.id_ambulancias', $id)
            ->leftJoin('base_ambulancia', 'base_ambulancia.id_base', '=', 'ambulancias.ubicacion')
            ->leftJoin('mante_amb', 'mante_amb.id_ambulancias', '=', 'ambulancias.id_ambulancias')
            ->leftJoin('modalidad_ambulancia', 'modalidad_ambulancia.id_modalidad', '=', 'ambulancias.modalidad')
            ->leftJoin('especial_ambulancia', 'especial_ambulancia.id_especialambulancia', '=', 'ambulancias.especial')
            ->leftJoin('ambulancia_taller', 'ambulancia_taller.id', '=', 'mante_amb.taller')
            ->leftJoin('recordatorio_taller', 'recordatorio_taller.vehiculo', '=', 'ambulancias.id_ambulancias')
            ->select(
                'ambulancias.id_ambulancias as codigo',
                'ambulancias.*',
                'base_ambulancia.*',
                'mante_amb.*',
                'modalidad_ambulancia.*',
                'especial_ambulancia.*',
                'ambulancia_taller.*',
                'recordatorio_taller.*'
            )
            ->first();
        return $objeto;
    }

    public function ver($id)
    {
        $objeto = Ambulancias::where('ambulancias.id_ambulancias', $id)->first();
        return $objeto;
    }

    public function store(Request $request)
    { //Guardar informacion
        $objeto = new Ambulancias($request->all());
        //$objeto = Ambulancias::create($request->all());
        $objeto1 = Ambulancias::latest('id_ambulancias')->first();
        $objeto->id_ambulancias = $objeto1->id_ambulancias + 1;
        $objeto->save();
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Ambulancias::find($id);
        $objeto = Ambulancias::where('id_ambulancias', $id)->first();
        $objeto->update($request->all());
        return $objeto;
    }

    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Ambulancias::find($id);
        $objeto = Ambulancias::where('id_ambulancias', $id)->first();
        $objeto->delete();
        return "OK";
    }

    public function verUbicaciones($id)
    { //Muestra uno en especifico
        $objeto = Historial_ubicaciones::where('id_ambulancia', $id)->get();
        return $objeto;
    }

    public function verBase($id)
    { //Muestra uno en especifico
        $objeto1 = Ambulancias::where('id_ambulancias', $id)->first();
        $objeto = Base_ambulancia::where('id_base', $objeto1->ubicacion)->first();
        return $objeto;
    }

    public function VerMantenimiento($id)
    { //Muestra uno en especifico
        $objeto = Mante_amb::where('id_ambulancias', $id)->get();
        return $objeto;
    }

    public function verModalidad($id)
    { //Muestra uno en especifico
        $objeto1 = Ambulancias::where('id_ambulancias', $id)->first();
        $objeto = Modalidad_ambulancia::where('id_modalidad', $objeto1->modalidad)->first();
        return $objeto;
    }

    public function verEspecial($id)
    { //Muestra uno en especifico
        $objeto1 = Ambulancias::where('id_ambulancias', $id)->first();
        $objeto = Especial_ambulancia::where('id_especialambulancia', $objeto1->especial)->first();
        return $objeto;
    }

    public function verRecordatorio($id)
    { //Muestra uno en especifico
        //$objeto = Recordatorio_taller::where('vehiculo', $id)->first();

        $objeto = DB::table('recordatorio_taller')->leftJoin('catalogo_serv_taller', 'catalogo_serv_taller.id_catalogo', '=', 'recordatorio_taller.servicio')
            ->leftJoin('ambulancias', 'ambulancias.id_ambulancias', '=', 'recordatorio_taller.vehiculo')
            ->where('recordatorio_taller.vehiculo', '=', $id)
            ->select(
                'recordatorio_taller.id as codigo',
                'recordatorio_taller.*',
                'catalogo_serv_taller.*',
                'ambulancias.*'
            )->first();
        return $objeto;
    }
}
