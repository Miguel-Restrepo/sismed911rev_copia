<?php

namespace App\Http\Controllers;

use App\Models\Preh_destino;
use Illuminate\Http\Request;

class Preh_destinoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Preh_destino::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Preh_destino::find($id);
        $objeto= Preh_destino::where('id_destino',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Preh_destino::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Preh_destino::find($id);
        $objeto= Preh_destino::where('id_destino',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Preh_destino::find($id);
        $objeto= Preh_destino::where('id_destino',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
