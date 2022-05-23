<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_extremidad;
use Illuminate\Http\Request;

class Cuerpo_extremidadController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_extremidad::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_extremidad::find($id);
        $objeto= Cuerpo_extremidad::where('id_extremidad',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_extremidad::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_extremidad::find($id);
        $objeto= Cuerpo_extremidad::where('id_extremidad',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_extremidad::find($id);
        $objeto= Cuerpo_extremidad::where('id_extremidad',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
