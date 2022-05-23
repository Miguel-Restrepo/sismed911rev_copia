<?php

namespace App\Http\Controllers;

use App\Models\Tipo_id;
use Illuminate\Http\Request;

class Tipo_idController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_id::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_id::find($id);
        $objeto= Tipo_id::where('id_tipo',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_id::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_id::find($id);
        $objeto= Tipo_id::where('id_tipo',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_id::find($id);
        $objeto= Tipo_id::where('id_tipo',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
