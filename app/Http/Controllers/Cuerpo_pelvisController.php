<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_pelvis;
use Illuminate\Http\Request;

class Cuerpo_pelvisController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_pelvis::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_pelvis::find($id);
        $objeto= Cuerpo_pelvis::where('id_pelvis',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_pelvis::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_pelvis::find($id);
        $objeto= Cuerpo_pelvis::where('id_pelvis',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_pelvis::find($id);
        $objeto= Cuerpo_pelvis::where('id_pelvis',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
