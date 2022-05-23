<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_otorrino;
use Illuminate\Http\Request;

class Cuerpo_otorrinoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_otorrino::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_otorrino::find($id);
        $objeto= Cuerpo_otorrino::where('id_otorrino',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_otorrino::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_otorrino::find($id);
        $objeto= Cuerpo_otorrino::where('id_otorrino',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_otorrino::find($id);
        $objeto= Cuerpo_otorrino::where('id_otorrino',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
