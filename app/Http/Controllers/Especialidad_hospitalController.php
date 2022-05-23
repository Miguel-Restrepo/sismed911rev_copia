<?php

namespace App\Http\Controllers;

use App\Models\Especialidad_hospital;
use Illuminate\Http\Request;

class Especialidad_hospitalController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Especialidad_hospital::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Especialidad_hospital::find($id);
        $objeto= Especialidad_hospital::where('id_especialidad',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Especialidad_hospital::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Especialidad_hospital::find($id);
        $objeto= Especialidad_hospital::where('id_especialidad',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Especialidad_hospital::find($id);
        $objeto= Especialidad_hospital::where('id_especialidad',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
