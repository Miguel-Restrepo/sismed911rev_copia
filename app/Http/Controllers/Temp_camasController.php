<?php

namespace App\Http\Controllers;

use App\Models\Temp_camas;
use Illuminate\Http\Request;

class Temp_camasController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Temp_camas::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Temp_camas::find($id);
        $objeto= Temp_camas::where('id_hospital',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Temp_camas::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Temp_camas::find($id);
        $objeto= Temp_camas::where('id_hospital',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Temp_camas::find($id);
        $objeto= Temp_camas::where('id_hospital',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
