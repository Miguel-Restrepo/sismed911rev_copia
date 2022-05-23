<?php

namespace App\Http\Controllers;

use App\Events\ActualizarPreh;
use App\Models\Preh_cierre;
use Illuminate\Http\Request;

class Preh_cierreController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Preh_cierre::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Preh_cierre::find($id);
        $objeto= Preh_cierre::where('id_cierre',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Preh_cierre::create($request->all());
        $objeto->save();
        event(new ActualizarPreh('Se ha cerrado un preh'));
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Preh_cierre::find($id);
        $objeto= Preh_cierre::where('id_cierre',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Preh_cierre::find($id);
        $objeto= Preh_cierre::where('id_cierre',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
