<?php

namespace App\Http\Controllers;

use App\Models\Condicion_paciente;
use Illuminate\Http\Request;

class Condicion_pacienteController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Condicion_paciente::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Condicion_paciente::find($id);
        $objeto= Condicion_paciente::where('id_condicionpaciente',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Condicion_paciente::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Condicion_paciente::find($id);
        $objeto= Condicion_paciente::where('id_condicionpaciente',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Condicion_paciente::find($id);
        $objeto= Condicion_paciente::where('id_condicionpaciente',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
