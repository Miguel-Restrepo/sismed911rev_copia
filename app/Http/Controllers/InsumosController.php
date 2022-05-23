<?php

namespace App\Http\Controllers;

use App\Models\Insumos;
use Illuminate\Http\Request;

class InsumosController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Insumos::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Insumos::find($id);
        $objeto= Insumos::where('id_insumo',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Insumos::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Insumos::find($id);
        $objeto= Insumos::where('id_insumo',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Insumos::find($id);
        $objeto= Insumos::where('id_insumo',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
