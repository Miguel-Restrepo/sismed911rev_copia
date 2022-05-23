<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_ojo;
use Illuminate\Http\Request;

class Cuerpo_ojoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_ojo::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_ojo::find($id);
        $objeto= Cuerpo_ojo::where('id_ojo',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_ojo::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_ojo::find($id);
        $objeto= Cuerpo_ojo::where('id_ojo',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_ojo::find($id);
        $objeto= Cuerpo_ojo::where('id_ojo',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
