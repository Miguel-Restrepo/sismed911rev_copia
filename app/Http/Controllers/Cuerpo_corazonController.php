<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_corazon;
use Illuminate\Http\Request;

class Cuerpo_corazonController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_corazon::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_corazon::find($id);
        $objeto= Cuerpo_corazon::where('id_corazon',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_corazon::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_corazon::find($id);
        $objeto= Cuerpo_corazon::where('id_corazon',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_corazon::find($id);
        $objeto= Cuerpo_corazon::where('id_corazon',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
