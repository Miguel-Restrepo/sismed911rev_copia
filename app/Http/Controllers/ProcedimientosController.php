<?php

namespace App\Http\Controllers;

use App\Models\Procedimientos;
use Illuminate\Http\Request;

class ProcedimientosController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $Procedimientoss= Procedimientos::all();
        return $Procedimientoss;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Procedimientos::find($id);
        $objeto= Procedimientos::where('id_sala_procedimiento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Procedimientos::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Procedimientos::find($id);
        $objeto= Procedimientos::where('id_sala_procedimiento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Procedimientos::find($id);
        $objeto= Procedimientos::where('id_sala_procedimiento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
