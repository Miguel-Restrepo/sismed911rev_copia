<?php

namespace App\Http\Controllers;

use App\Models\Distrito;
use Illuminate\Http\Request;

class DistritoController extends Controller
{
    //

    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Distrito::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Distrito::find($id);
        $objeto= Distrito::where('cod_distrito',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Distrito::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Distrito::find($id);
        $objeto= Distrito::where('cod_distrito',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Distrito::find($id);
        $objeto= Distrito::where('cod_distrito',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
