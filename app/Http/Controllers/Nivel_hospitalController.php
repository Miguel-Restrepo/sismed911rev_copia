<?php

namespace App\Http\Controllers;

use App\Models\Nivel_hospital;
use Illuminate\Http\Request;

class Nivel_hospitalController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Nivel_hospital::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Nivel_hospital::find($id);
        $objeto= Nivel_hospital::where('id_nivel',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Nivel_hospital::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Nivel_hospital::find($id);
        $objeto= Nivel_hospital::where('id_nivel',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Nivel_hospital::find($id);
        $objeto= Nivel_hospital::where('id_nivel',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
