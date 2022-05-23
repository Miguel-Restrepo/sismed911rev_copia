<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_piel;
use Illuminate\Http\Request;

class Cuerpo_pielController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_piel::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_piel::find($id);
        $objeto= Cuerpo_piel::where('id_piel',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_piel::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_piel::find($id);
        $objeto= Cuerpo_piel::where('id_piel',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_piel::find($id);
        $objeto= Cuerpo_piel::where('id_piel',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
