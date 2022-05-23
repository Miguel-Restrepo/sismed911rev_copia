<?php

namespace App\Http\Controllers;

use App\Models\Triage;
use Illuminate\Http\Request;

class TriageController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Triage::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Triage::find($id);
        $objeto= Triage::where('id_triage',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Triage::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Triage::find($id);
        $objeto= Triage::where('id_triage',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Triage::find($id);
        $objeto= Triage::where('id_triage',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
