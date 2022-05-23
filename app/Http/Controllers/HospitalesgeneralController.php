<?php

namespace App\Http\Controllers;

use App\Models\Bloques_div;
use App\Models\Camas_hosptlz;
use App\Models\Camas_pedtria;
use App\Models\Camas_uci;
use App\Models\Disponibilidad_hospitalaria;
use App\Models\Hospitalesgeneral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HospitalesgeneralController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= DB::table('hospitalesgeneral')
        ->leftJoin('departamento', 'departamento.cod_dpto', '=', 'hospitalesgeneral.depto_hospital')
        ->leftJoin('provincias', 'provincias.cod_provincia', '=', 'hospitalesgeneral.provincia_hospital')
        ->leftJoin('distrito', 'distrito.cod_distrito', '=', 'hospitalesgeneral.municipio_hospital')
        ->leftJoin('especialidad_hospital', 'especialidad_hospital.id_especialidad', '=', 'hospitalesgeneral.especialidad')
        ->select(
            'hospitalesgeneral.id_hospital as codigo',
            'hospitalesgeneral.*',
            'departamento.*',
            'provincias.*',
            'distrito.*',
            'especialidad_hospital.*'
        )
        ->get();
          
        $collection = collect($acercades);
        $var=$collection->unique('codigo');
        $retorno=$var->values()->all();
        
        return $retorno;
    }
    public function disponibilidades(){
        $objeto= DB::table('hospitalesgeneral')
        ->join('disponibilidad_hospitalaria', 'disponibilidad_hospitalaria.cod_hospital','=','hospitalesgeneral.id_hospital')
        
        ->get();
        $collection = collect($objeto);
            $var=$collection->unique('id_hospital');
            $objetos=$var->values()->all();
        //$objetos= Hospitalesgeneral::all();
        foreach ($objetos as $post) {
            $post->disponibilidades=Disponibilidad_hospitalaria::where('cod_hospital',$post->id_hospital)
            ->leftjoin('servicio_disponibilidad','servicio_disponibilidad.servicio_disponabilidad','=','disponibilidad_hospitalaria.servicio_disponibilidad')
            ->get();
            # code...
        }
        return $objetos;

    }
    public function censos(){
        $objeto= DB::table('hospitalesgeneral')
        ->join('censo_camas', 'censo_camas.id_hospital','=','hospitalesgeneral.id_hospital')

        ->get();
        $collection = collect($objeto);
            $var=$collection->unique('id_hospital');
            $objetos=$var->values()->all();
        //$objetos= Hospitalesgeneral::all();
       foreach ($objetos as $post) {
            $post->camas_uci=Camas_uci::where('id_camas',$post->id_cama)->get();
            $post->camas_pediatra=Camas_pedtria::where('id_camas',$post->id_cama)->get();
            $post->camas_hospital=Camas_hosptlz::where('id_camas',$post->id_cama)->get();
            $post->bloque=Bloques_div::where('id',$post->id_bloque)->first();
            # code...
       }
        return $objetos;

    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Hospitalesgeneral::find($id);
        $objeto= Hospitalesgeneral::where('id_hospital',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= new Hospitalesgeneral($request->all());
        $objeto1=Hospitalesgeneral::latest('id_hospital')->first();
        $objeto->id_hospital=$objeto1->id_hospital+1;
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Hospitalesgeneral::find($id);
        $objeto= Hospitalesgeneral::where('id_hospital',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Hospitalesgeneral::find($id);
        $objeto= Hospitalesgeneral::where('id_hospital',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
