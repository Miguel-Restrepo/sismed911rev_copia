<?php

namespace App\Http\Controllers;

use App\Models\Base_ambulancia;
use Illuminate\Http\Request;

class Base_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Base_ambulancia::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Base_ambulancia::find($id);
        $objeto= Base_ambulancia::where('id_base',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Base_ambulancia::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Base_ambulancia::find($id);
        $objeto= Base_ambulancia::where('id_base',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Base_ambulancia::find($id);
        $objeto= Base_ambulancia::where('id_base',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
