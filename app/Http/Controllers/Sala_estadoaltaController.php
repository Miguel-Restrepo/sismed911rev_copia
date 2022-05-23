<?php

namespace App\Http\Controllers;

use App\Models\Sala_estadoalta;
use Illuminate\Http\Request;

class Sala_estadoaltaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_estadoalta::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_estadoalta::find($id);
        $objeto= Sala_estadoalta::where('id_estadoalta',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_estadoalta::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_estadoalta::find($id);
        $objeto= Sala_estadoalta::where('id_estadoalta',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_estadoalta::find($id);
        $objeto= Sala_estadoalta::where('id_estadoalta',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
