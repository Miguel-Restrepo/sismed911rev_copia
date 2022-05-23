<?php

namespace App\Http\Controllers;

use App\Models\Interh_accion;
use Illuminate\Http\Request;

class Interh_accionController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_accion::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_accion::find($id);
        $objeto= Interh_accion::where('id_accion',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_accion::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_accion::find($id);
        $objeto= Interh_accion::where('id_accion',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_accion::find($id);
        $objeto= Interh_accion::where('id_accion',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
