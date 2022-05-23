<?php

namespace App\Http\Controllers;

use App\Models\Servicio_disponibilidad;
use Illuminate\Http\Request;

class Servicio_disponibilidadController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Servicio_disponibilidad::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Servicio_disponibilidad::find($id);
        $objeto= Servicio_disponibilidad::where('servicio_disponabilidad',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Servicio_disponibilidad::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Servicio_disponibilidad::find($id);
        $objeto= Servicio_disponibilidad::where('servicio_disponabilidad',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Servicio_disponibilidad::find($id);
        $objeto= Servicio_disponibilidad::where('servicio_disponabilidad',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
