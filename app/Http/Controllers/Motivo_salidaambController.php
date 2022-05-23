<?php

namespace App\Http\Controllers;

use App\Models\Motivo_salidaamb;
use Illuminate\Http\Request;

class Motivo_salidaambController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $Riesgos= Motivo_salidaamb::all();
        return $Riesgos;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Motivo_salidaamb::find($id);
        
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Motivo_salidaamb::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Motivo_salidaamb::find($id);
        
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Motivo_salidaamb::find($id);
        
        $objeto->delete();
        return "OK";
    }
}
