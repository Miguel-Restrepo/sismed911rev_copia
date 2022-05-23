<?php

namespace App\Http\Controllers;

use App\Models\Explo_general_cat;
use Illuminate\Http\Request;

class Explo_general_catController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Explo_general_cat::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Explo_general_cat::find($id);
        //$objeto= Explo_general_cat::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Explo_general_cat::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Explo_general_cat::find($id);
        //$objeto= Explo_general_cat::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Explo_general_cat::find($id);
        //$objeto= Explo_general_cat::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
