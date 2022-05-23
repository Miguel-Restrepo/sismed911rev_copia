<?php

namespace App\Http\Controllers;

use App\Models\Code_planta;
use Illuminate\Http\Request;

class Code_plantaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Code_planta::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Code_planta::find($id);
        $objeto= Code_planta::where('idacode',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Code_planta::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Code_planta::find($id);
        $objeto= Code_planta::where('idacode',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Code_planta::find($id);
        $objeto= Code_planta::where('idacode',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
