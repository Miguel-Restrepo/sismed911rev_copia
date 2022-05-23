<?php

namespace App\Http\Controllers;

use App\Models\Tipo_paciente;
use Illuminate\Http\Request;

class Tipo_pacienteController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_paciente::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_paciente::find($id);
        $objeto= Tipo_paciente::where('id_tipopaciente',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_paciente::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_paciente::find($id);
        $objeto= Tipo_paciente::where('id_tipopaciente',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_paciente::find($id);
        $objeto= Tipo_paciente::where('id_tipopaciente',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
