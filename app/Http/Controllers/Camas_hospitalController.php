<?php

namespace App\Http\Controllers;

use App\Models\Camas_hospital;
use Illuminate\Http\Request;

class Camas_hospitalController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Camas_hospital::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Camas_hospital::find($id);
        $objeto= Camas_hospital::where('id_hospital',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Camas_hospital::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Camas_hospital::find($id);
        $objeto= Camas_hospital::where('id_hospital',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Camas_hospital::find($id);
        $objeto= Camas_hospital::where('id_hospital',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
