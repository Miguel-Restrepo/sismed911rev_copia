<?php

namespace App\Http\Controllers;

use App\Models\Marca_ambulancia;
use Illuminate\Http\Request;

class Marca_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Marca_ambulancia::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Marca_ambulancia::find($id);
        //$objeto= Marca_ambulancia::where('id_medicamento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Marca_ambulancia::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Marca_ambulancia::find($id);
        //$objeto= Marca_ambulancia::where('id_medicamento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Marca_ambulancia::find($id);
        //$objeto= Marca_ambulancia::where('id_medicamento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
