<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_neuro;
use Illuminate\Http\Request;

class Cuerpo_neuroController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_neuro::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_neuro::find($id);
        $objeto= Cuerpo_neuro::where('id_neuro',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_neuro::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_neuro::find($id);
        $objeto= Cuerpo_neuro::where('id_neuro',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_neuro::find($id);
        $objeto= Cuerpo_neuro::where('id_neuro',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
