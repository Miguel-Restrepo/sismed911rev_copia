<?php

namespace App\Http\Controllers;

use App\Models\Tipo_combustible;
use Illuminate\Http\Request;

class Tipo_combustibleController extends Controller
{
    // 
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_combustible::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Tipo_combustible::find($id);
        //$objeto= Tipo_combustible::where('id_medicamento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_combustible::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Tipo_combustible::find($id);
        //$objeto= Tipo_combustible::where('id_medicamento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Tipo_combustible::find($id);
        //$objeto= Tipo_combustible::where('id_medicamento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
