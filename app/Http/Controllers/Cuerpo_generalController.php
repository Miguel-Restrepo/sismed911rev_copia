<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_general;
use Illuminate\Http\Request;

class Cuerpo_generalController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_general::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_general::find($id);
        $objeto= Cuerpo_general::where('id_general',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_general::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_general::find($id);
        $objeto= Cuerpo_general::where('id_general',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_general::find($id);
        $objeto= Cuerpo_general::where('id_general',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
