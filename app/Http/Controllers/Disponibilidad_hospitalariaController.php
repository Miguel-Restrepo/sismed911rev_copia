<?php

namespace App\Http\Controllers;

use App\Models\Disponibilidad_hospitalaria;
use Illuminate\Http\Request;

class Disponibilidad_hospitalariaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Disponibilidad_hospitalaria::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Disponibilidad_hospitalaria::find($id);
        $objeto= Disponibilidad_hospitalaria::where('id_disponibilida',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Disponibilidad_hospitalaria::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Disponibilidad_hospitalaria::find($id);
        $objeto= Disponibilidad_hospitalaria::where('id_disponibilida',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Disponibilidad_hospitalaria::find($id);
        $objeto= Disponibilidad_hospitalaria::where('id_disponibilida',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
