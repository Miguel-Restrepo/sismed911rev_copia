<?php

namespace App\Http\Controllers;

use App\Models\Despacho_preh;
use Illuminate\Http\Request;

class Despacho_prehController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Despacho_preh::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Despacho_preh::find($id);
        $objeto= Despacho_preh::where('id_despacho',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Despacho_preh::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Despacho_preh::find($id);
        $objeto= Despacho_preh::where('id_despacho',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Despacho_preh::find($id);
        $objeto= Despacho_preh::where('id_despacho',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
