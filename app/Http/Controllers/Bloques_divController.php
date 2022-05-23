<?php

namespace App\Http\Controllers;

use App\Models\Bloques_div;
use Illuminate\Http\Request;

class Bloques_divController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Bloques_div::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Bloques_div::find($id);
        //$objeto= Bloques_div::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Bloques_div::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Bloques_div::find($id);
        //$objeto= Bloques_div::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Bloques_div::find($id);
        //$objeto= Bloques_div::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
