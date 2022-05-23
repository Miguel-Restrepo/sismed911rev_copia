<?php

namespace App\Http\Controllers;

use App\Models\Sala_examen;
use Illuminate\Http\Request;

class Sala_examenController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_examen::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_examen::find($id);
        $objeto= Sala_examen::where('id_examen',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_examen::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_examen::find($id);
        $objeto= Sala_examen::where('id_examen',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_examen::find($id);
        $objeto= Sala_examen::where('id_examen',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
