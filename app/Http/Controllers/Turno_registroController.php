<?php

namespace App\Http\Controllers;

use App\Models\Turno_registro;
use Illuminate\Http\Request;

class Turno_registroController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Turno_registro::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Turno_registro::find($id);
        //$objeto= Turno_registro::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Turno_registro::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Turno_registro::find($id);
        //$objeto= Turno_registro::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Turno_registro::find($id);
        //$objeto= Turno_registro::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
