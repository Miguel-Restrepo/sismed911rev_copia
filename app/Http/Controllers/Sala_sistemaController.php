<?php

namespace App\Http\Controllers;

use App\Models\Sala_sistema;
use Illuminate\Http\Request;

class Sala_sistemaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_sistema::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_sistema::find($id);
        $objeto= Sala_sistema::where('id_sistema',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_sistema::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_sistema::find($id);
        $objeto= Sala_sistema::where('id_sistema',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_sistema::find($id);
        $objeto= Sala_sistema::where('id_sistema',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
