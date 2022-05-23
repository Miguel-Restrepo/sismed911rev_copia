<?php

namespace App\Http\Controllers;

use App\Models\Sala_motivoatencion;
use Illuminate\Http\Request;

class Sala_motivoatencionController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_motivoatencion::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_motivoatencion::find($id);
        $objeto= Sala_motivoatencion::where('id_motivoatencion',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_motivoatencion::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_motivoatencion::find($id);
        $objeto= Sala_motivoatencion::where('id_motivoatencion',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_motivoatencion::find($id);
        $objeto= Sala_motivoatencion::where('id_motivoatencion',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
