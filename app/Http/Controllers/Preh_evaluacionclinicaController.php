<?php

namespace App\Http\Controllers;

use App\Models\Preh_evaluacionclinica;
use Illuminate\Http\Request;

class Preh_evaluacionclinicaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Preh_evaluacionclinica::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Preh_evaluacionclinica::find($id);
        $objeto= Preh_evaluacionclinica::where('id_evaluacionclinica',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Preh_evaluacionclinica::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Preh_evaluacionclinica::find($id);
        $objeto= Preh_evaluacionclinica::where('id_evaluacionclinica',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Preh_evaluacionclinica::find($id);
        $objeto= Preh_evaluacionclinica::where('id_evaluacionclinica',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
