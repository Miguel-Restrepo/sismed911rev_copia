<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_cabeza;
use Illuminate\Http\Request;

class Cuerpo_cabezaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_cabeza::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_cabeza::find($id);
        $objeto= Cuerpo_cabeza::where('id_cabeza',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_cabeza::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_cabeza::find($id);
        $objeto= Cuerpo_cabeza::where('id_cabeza',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_cabeza::find($id);
        $objeto= Cuerpo_cabeza::where('id_cabeza',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
