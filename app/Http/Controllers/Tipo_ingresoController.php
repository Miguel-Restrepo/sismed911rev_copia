<?php

namespace App\Http\Controllers;

use App\Models\Tipo_ingreso;
use Illuminate\Http\Request;

class Tipo_ingresoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_ingreso::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_ingreso::find($id);
        $objeto= Tipo_ingreso::where('id_ingreso',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_ingreso::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_ingreso::find($id);
        $objeto= Tipo_ingreso::where('id_ingreso',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_ingreso::find($id);
        $objeto= Tipo_ingreso::where('id_ingreso',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
