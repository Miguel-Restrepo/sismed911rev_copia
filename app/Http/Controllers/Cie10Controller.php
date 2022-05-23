<?php

namespace App\Http\Controllers;

use App\Models\Cie10;
use Illuminate\Http\Request;

class Cie10Controller extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cie10::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cie10::find($id);
        $objeto= Cie10::where('codigo_cie',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cie10::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cie10::find($id);
        $objeto= Cie10::where('codigo_cie',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cie10::find($id);
        $objeto= Cie10::where('codigo_cie',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
