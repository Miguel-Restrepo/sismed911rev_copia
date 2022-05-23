<?php

namespace App\Http\Controllers;

use App\Models\Interh_motivoatencion;
use Illuminate\Http\Request;

class Interh_motivoatencionController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_motivoatencion::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_motivoatencion::find($id);
        $objeto= Interh_motivoatencion::where('id_motivoatencion',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_motivoatencion::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_motivoatencion::find($id);
        $objeto= Interh_motivoatencion::where('id_motivoatencion',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_motivoatencion::find($id);
        $objeto= Interh_motivoatencion::where('id_motivoatencion',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
