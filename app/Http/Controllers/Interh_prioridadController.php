<?php

namespace App\Http\Controllers;

use App\Models\Interh_prioridad;
use Illuminate\Http\Request;

class Interh_prioridadController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_prioridad::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_prioridad::find($id);
        $objeto= Interh_prioridad::where('id_prioridad',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_prioridad::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_prioridad::find($id);
        $objeto= Interh_prioridad::where('id_prioridad',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_prioridad::find($id);
        $objeto= Interh_prioridad::where('id_prioridad',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
