<?php

namespace App\Http\Controllers;

use App\Models\Division_hosp;
use Illuminate\Http\Request;

class Division_hospController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Division_hosp::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Division_hosp::find($id);
        $objeto= Division_hosp::where('id_division',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Division_hosp::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Division_hosp::find($id);
        $objeto= Division_hosp::where('id_division',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Division_hosp::find($id);
        $objeto= Division_hosp::where('id_division',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
