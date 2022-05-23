<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_cuello;
use Illuminate\Http\Request;

class Cuerpo_cuelloController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_cuello::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_cuello::find($id);
        $objeto= Cuerpo_cuello::where('id_cuello',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_cuello::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_cuello::find($id);
        $objeto= Cuerpo_cuello::where('id_cuello',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_cuello::find($id);
        $objeto= Cuerpo_cuello::where('id_cuello',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
