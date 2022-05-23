<?php

namespace App\Http\Controllers;

use App\Models\Terminos;
use Illuminate\Http\Request;

class TerminosController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Terminos::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Terminos::find($id);
        $objeto= Terminos::where('id_terminos',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Terminos::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Terminos::find($id);
        $objeto= Terminos::where('id_terminos',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Terminos::find($id);
        $objeto= Terminos::where('id_terminos',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
