<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_rectal;
use Illuminate\Http\Request;

class Cuerpo_rectalController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_rectal::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_rectal::find($id);
        $objeto= Cuerpo_rectal::where('id_rectal',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_rectal::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_rectal::find($id);
        $objeto= Cuerpo_rectal::where('id_rectal',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_rectal::find($id);
        $objeto= Cuerpo_rectal::where('id_rectal',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
