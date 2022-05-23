<?php

namespace App\Http\Controllers;

use App\Models\Interh_estado;
use Illuminate\Http\Request;

class Interh_estadoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_estado::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_estado::find($id);
        $objeto= Interh_estado::where('id_estadointeh',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_estado::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_estado::find($id);
        $objeto= Interh_estado::where('id_estadointeh',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_estado::find($id);
        $objeto= Interh_estado::where('id_estadointeh',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
