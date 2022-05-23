<?php

namespace App\Http\Controllers;

use App\Models\Insumos_registros;
use Illuminate\Http\Request;

class Insumos_registroController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Insumos_registros::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Insumos_registros::find($id);
        //$objeto= Insumos_registros::where('id_insumo',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Insumos_registros::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Insumos_registros::find($id);
        //$objeto= Insumos_registros::where('id_insumo',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Insumos_registros::find($id);
        //$objeto= Insumos_registros::where('id_insumo',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
