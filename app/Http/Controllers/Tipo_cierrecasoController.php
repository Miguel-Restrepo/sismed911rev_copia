<?php

namespace App\Http\Controllers;

use App\Models\Tipo_cierrecaso;
use Illuminate\Http\Request;

class Tipo_cierrecasoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_cierrecaso::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_cierrecaso::find($id);
        $objeto= Tipo_cierrecaso::where('id_tranlado_fallido',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_cierrecaso::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_cierrecaso::find($id);
        $objeto= Tipo_cierrecaso::where('id_tranlado_fallido',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_cierrecaso::find($id);
        $objeto= Tipo_cierrecaso::where('id_tranlado_fallido',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
