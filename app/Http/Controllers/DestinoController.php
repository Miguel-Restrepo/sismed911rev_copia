<?php

namespace App\Http\Controllers;

use App\Models\Destino;
use Illuminate\Http\Request;

class DestinoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Destino::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Destino::find($id);
        $objeto= Destino::where('id_destino',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Destino::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Destino::find($id);
        $objeto= Destino::where('id_destino',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Destino::find($id);
        $objeto= Destino::where('id_destino',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
