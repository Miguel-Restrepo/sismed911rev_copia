<?php

namespace App\Http\Controllers;

use App\Models\Interh_evaluacionclinica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Interh_evaluacionclinicaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_evaluacionclinica::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_evaluacionclinica::find($id);
        $objeto= Interh_evaluacionclinica::where('id_evaluacionclinica',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_evaluacionclinica::create($request->all());
        $objeto->save();
    
        return DB::table('interh_evaluacionclinica')->where('id_evaluacionclinica',$objeto->id_evaluacionclinica)->leftJoin('pacientegeneral', 'pacientegeneral.id_paciente', '=', 'interh_evaluacionclinica.id_paciente')->first();
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_evaluacionclinica::find($id);
        $objeto= Interh_evaluacionclinica::where('id_evaluacionclinica',$id)->get();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_evaluacionclinica::find($id);
        $objeto= Interh_evaluacionclinica::where('id_evaluacionclinica',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
