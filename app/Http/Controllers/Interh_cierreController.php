<?php

namespace App\Http\Controllers;

use App\Events\ActualizarInterh;
use App\Models\Interh_cierre;
use Illuminate\Http\Request;

class Interh_cierreController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_cierre::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_cierre::find($id);
        $objeto= Interh_cierre::where('id_cierre',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_cierre::create($request->all());
        $objeto->save();
        event(new ActualizarInterh('Se ha cerrado un interh'));
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_cierre::find($id);
        $objeto= Interh_cierre::where('id_cierre',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_cierre::find($id);
        $objeto= Interh_cierre::where('id_cierre',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
