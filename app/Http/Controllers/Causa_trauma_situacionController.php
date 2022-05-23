<?php

namespace App\Http\Controllers;

use App\Models\Causa_trauma_situacion;
use Illuminate\Http\Request;

class Causa_trauma_situacionController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Causa_trauma_situacion::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Causa_trauma_situacion::find($id);
        //$objeto= Causa_trauma_situacion::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Causa_trauma_situacion::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Causa_trauma_situacion::find($id);
        //$objeto= Causa_trauma_situacion::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Causa_trauma_situacion::find($id);
        //$objeto= Causa_trauma_situacion::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
