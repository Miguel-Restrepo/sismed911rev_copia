<?php

namespace App\Http\Controllers;

use App\Models\Servicios_division;
use Illuminate\Http\Request;

class Servicios_divisionController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Servicios_division::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Servicios_division::find($id);
        $objeto= Servicios_division::where('id_servicio',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Servicios_division::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Servicios_division::find($id);
        $objeto= Servicios_division::where('id_servicio',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Servicios_division::find($id);
        $objeto= Servicios_division::where('id_servicio',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
