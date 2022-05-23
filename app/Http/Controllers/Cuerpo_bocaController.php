<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_boca;
use Illuminate\Http\Request;

class Cuerpo_bocaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_boca::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_boca::find($id);
        $objeto= Cuerpo_boca::where('id_boca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_boca::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_boca::find($id);
        $objeto= Cuerpo_boca::where('id_boca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_boca::find($id);
        $objeto= Cuerpo_boca::where('id_boca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
