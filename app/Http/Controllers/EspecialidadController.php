<?php

namespace App\Http\Controllers;

use App\Models\Especialidad;
use Illuminate\Http\Request;

class EspecialidadController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $Especialidads= Especialidad::all();
        return $Especialidads;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Especialidad::find($id);
        $objeto= Especialidad::where('id_especialidad',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Especialidad::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Especialidad::find($id);
        $objeto= Especialidad::where('id_especialidad',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Especialidad::find($id);
        $objeto= Especialidad::where('id_especialidad',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
