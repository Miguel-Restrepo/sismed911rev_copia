<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Historial_ubicaciones;
use Illuminate\Http\Request;

class Historial_ubicacionesController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        /*$acercades= Historial_ubicaciones::all();
        return $acercades;*/
        $objeto = DB::table('historial_ubicaciones')
        ->leftJoin('ambulancias','ambulancias.id_ambulancias','=','historial_ubicaciones.id_ambulancia')
        ->leftJoin('base_ambulancia','base_ambulancia.id_base','=','historial_ubicaciones.id_base')
        ->select(
            'historial_ubicaciones.id as codigo',
            'historial_ubicaciones.*',
            'base_ambulancia.*',
            'ambulancias.*'
        )->get();

        return $objeto;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Historial_ubicaciones::find($id);
        //$objeto= Firmas_registro::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Historial_ubicaciones::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Historial_ubicaciones::find($id);
        //$objeto= Firmas_registro::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Historial_ubicaciones::find($id);
        //$objeto= Firmas_registro::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
