<?php

namespace App\Http\Controllers;

use App\Models\Riesgo;
use Illuminate\Http\Request;

class RiesgoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $Riesgos= Riesgo::all();
        return $Riesgos;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Riesgo::find($id);
        
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Riesgo::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Riesgo::find($id);
        
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Riesgo::find($id);
        
        $objeto->delete();
        return "OK";
    }
}
