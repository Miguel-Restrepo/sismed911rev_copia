<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Recordatorio_taller;
use Illuminate\Http\Request;

class Recordatorio_tallerController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
       /* $acercades= Recordatorio_taller::all();
        return $acercades;*/
        $objeto = DB::table('recordatorio_taller')->leftJoin('catalogo_serv_taller', 'catalogo_serv_taller.id_catalogo', '=', 'recordatorio_taller.servicio')
        ->leftJoin('ambulancias','ambulancias.id_ambulancias','=','recordatorio_taller.vehiculo')
        ->select(
            'recordatorio_taller.id as codigo',
            'recordatorio_taller.*',
            'catalogo_serv_taller.*',
            'ambulancias.*'
        )->get();

        return $objeto;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Recordatorio_taller::find($id);
        //$objeto= Recordatorio_taller::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Recordatorio_taller::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Recordatorio_taller::find($id);
        //$objeto= Recordatorio_taller::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Recordatorio_taller::find($id);
        //$objeto= Recordatorio_taller::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
