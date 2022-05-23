<?php

namespace App\Http\Controllers;

use App\Models\Tipo_llamada;
use Illuminate\Http\Request;

class Tipo_llamadaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_llamada::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_llamada::find($id);
        $objeto= Tipo_llamada::where('id_llamda_f',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_llamada::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_llamada::find($id);
        $objeto= Tipo_llamada::where('id_llamda_f',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_llamada::find($id);
        $objeto= Tipo_llamada::where('id_llamda_f',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
