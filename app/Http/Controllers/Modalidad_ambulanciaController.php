<?php

namespace App\Http\Controllers;

use App\Models\Modalidad_ambulancia;
use Illuminate\Http\Request;

class Modalidad_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Modalidad_ambulancia::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Modalidad_ambulancia::find($id);
        $objeto= Modalidad_ambulancia::where('id_modalidad',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Modalidad_ambulancia::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Modalidad_ambulancia::find($id);
        $objeto= Modalidad_ambulancia::where('id_modalidad',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Modalidad_ambulancia::find($id);
        $objeto= Modalidad_ambulancia::where('id_modalidad',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
