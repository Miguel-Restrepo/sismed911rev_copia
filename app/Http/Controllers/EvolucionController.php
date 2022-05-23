<?php

namespace App\Http\Controllers;

use App\Models\Evolucion;
use Illuminate\Http\Request;

class EvolucionController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $Especialidads= Evolucion::all();
        return $Especialidads;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Evolucion::find($id);
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Evolucion::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Evolucion::find($id);
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Evolucion::find($id);
        $objeto->delete();
        return "OK";
    }
}
