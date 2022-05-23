<?php

namespace App\Http\Controllers;

use App\Models\Especial_ambulancia;
use Illuminate\Http\Request;

class Especial_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Especial_ambulancia::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Especial_ambulancia::find($id);
        $objeto= Especial_ambulancia::where('id_especialambulancia',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Especial_ambulancia::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Especial_ambulancia::find($id);
        $objeto= Especial_ambulancia::where('id_especialambulancia',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Especial_ambulancia::find($id);
        $objeto= Especial_ambulancia::where('id_especialambulancia',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
