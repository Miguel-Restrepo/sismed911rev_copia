<?php

namespace App\Http\Controllers;

use App\Models\Camas_uci;
use Illuminate\Http\Request;

class Camas_uciController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Camas_uci::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Camas_uci::find($id);
        //$objeto= Camas_uci::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Camas_uci::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Camas_uci::find($id);
        //$objeto= Camas_uci::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Camas_uci::find($id);
        //$objeto= Camas_uci::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
