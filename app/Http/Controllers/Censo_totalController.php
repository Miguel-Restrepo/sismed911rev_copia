<?php

namespace App\Http\Controllers;

use App\Models\Censo_total;
use Illuminate\Http\Request;

class Censo_totalController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Censo_total::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Censo_total::find($id);
        $objeto= Censo_total::where('id_hospital',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Censo_total::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Censo_total::find($id);
        $objeto= Censo_total::where('id_hospital',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Censo_total::find($id);
        $objeto= Censo_total::where('id_hospital',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
