<?php

namespace App\Http\Controllers;

use App\Models\Causa_registro;
use Illuminate\Http\Request;

class Causa_registroController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Causa_registro::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Causa_registro::find($id);
        $objeto= Causa_registro::where('id_registrocausa',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Causa_registro::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Causa_registro::find($id);
        $objeto= Causa_registro::where('id_registrocausa',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Causa_registro::find($id);
        $objeto= Causa_registro::where('id_registrocausa',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
