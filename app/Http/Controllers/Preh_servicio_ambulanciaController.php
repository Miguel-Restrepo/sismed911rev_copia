<?php

namespace App\Http\Controllers;

use App\Models\Preh_servicio_ambulancia;
use Illuminate\Http\Request;

class Preh_servicio_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Preh_servicio_ambulancia::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Preh_servicio_ambulancia::find($id);
        $objeto= Preh_servicio_ambulancia::where('id_servicioambulancia',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Preh_servicio_ambulancia::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Preh_servicio_ambulancia::find($id);
        $objeto= Preh_servicio_ambulancia::where('id_servicioambulancia',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Preh_servicio_ambulancia::find($id);
        $objeto= Preh_servicio_ambulancia::where('id_servicioambulancia',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
