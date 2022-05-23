<?php

namespace App\Http\Controllers;

use App\Models\Ambulancia_taller;
use App\Models\Mante_amb;
use Illuminate\Http\Request;

class Mante_ambController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Mante_amb::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Mante_amb::find($id);
        //$objeto= Mante_amb::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Mante_amb::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Mante_amb::find($id);
        //$objeto= Mante_amb::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Mante_amb::find($id);
        //$objeto= Mante_amb::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
    public function verTaller($id){//Muestra uno en especifico
        $objeto= Ambulancia_taller::find($id);
        return $objeto;
    }
}
