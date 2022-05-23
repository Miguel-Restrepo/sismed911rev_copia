<?php

namespace App\Http\Controllers;

use App\Models\Tipo_ambulancia;
use Illuminate\Http\Request;

class Tipo_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_ambulancia::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_ambulancia::find($id);
        $objeto= Tipo_ambulancia::where('id_tipotransport',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_ambulancia::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_ambulancia::find($id);
        $objeto= Tipo_ambulancia::where('id_tipotransport',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_ambulancia::find($id);
        $objeto= Tipo_ambulancia::where('id_tipotransport',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
