<?php

namespace App\Http\Controllers;

use App\Models\Sala_atencionmedica_examen;
use Illuminate\Http\Request;

class Sala_atencionmedica_examenController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_atencionmedica_examen::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_atencionmedica_examen::find($id);
        $objeto= Sala_atencionmedica_examen::where('id_atencionmedica_examen',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_atencionmedica_examen::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_atencionmedica_examen::find($id);
        $objeto= Sala_atencionmedica_examen::where('id_atencionmedica_examen',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_atencionmedica_examen::find($id);
        $objeto= Sala_atencionmedica_examen::where('id_atencionmedica_examen',$id)->first();
        $objeto->delete();
        return "OK";
    }
    public function eliminar(Request $request){//Guardar informacion
        $objeto= Sala_atencionmedica_examen::where('id_atencionmedica',$request->id_atencionmedica)
        ->where('id_examen',$request->id_examen)->firts();
        $objeto->delete();
        return "Ok";
    }
    
}
