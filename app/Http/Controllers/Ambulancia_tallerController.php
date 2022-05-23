<?php

namespace App\Http\Controllers;

use App\Models\Ambulancia_taller;
use Illuminate\Http\Request;

class Ambulancia_tallerController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Ambulancia_taller::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Ambulancia_taller::find($id);
        //$objeto= Ambulancia_taller::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Ambulancia_taller::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Ambulancia_taller::find($id);
        //$objeto= Ambulancia_taller::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Ambulancia_taller::find($id);
        //$objeto= Ambulancia_taller::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
