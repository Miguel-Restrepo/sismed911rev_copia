<?php

namespace App\Http\Controllers;

use App\Models\Procedimiento_registro;
use Illuminate\Http\Request;

class Procedimiento_registroController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Procedimiento_registro::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Procedimiento_registro::find($id);
        //$objeto= Procedimiento_registro::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Procedimiento_registro::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Procedimiento_registro::find($id);
        //$objeto= Procedimiento_registro::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Procedimiento_registro::find($id);
        //$objeto= Procedimiento_registro::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
