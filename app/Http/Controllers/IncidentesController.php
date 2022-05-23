<?php

namespace App\Http\Controllers;

use App\Models\Incidentes;
use App\Models\Insumos;
use Illuminate\Http\Request;

class IncidentesController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Incidentes::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Insumos::find($id);
        $objeto= Incidentes::where('id_incidente',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Incidentes::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Insumos::find($id);
        $objeto= Incidentes::where('id_incidente',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Insumos::find($id);
        $objeto= Incidentes::where('id_incidente',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
