<?php

namespace App\Http\Controllers;

use App\Models\Servicio_ambulancia;
use Illuminate\Http\Request;

class Servicio_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Servicio_ambulancia::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Servicio_ambulancia::find($id);
        $objeto= Servicio_ambulancia::where('id_servcioambulacia',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Servicio_ambulancia::create($request->except('id_servcioambulacia'));
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Servicio_ambulancia::find($id);
        $objeto= Servicio_ambulancia::where('id_servcioambulacia',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Servicio_ambulancia::find($id);
        $objeto= Servicio_ambulancia::where('id_servcioambulacia',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
