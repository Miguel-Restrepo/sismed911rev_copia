<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_pulmon;
use Illuminate\Http\Request;

class Cuerpo_pulmonController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_pulmon::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_pulmon::find($id);
        $objeto= Cuerpo_pulmon::where('id_pulmon',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_pulmon::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_pulmon::find($id);
        $objeto= Cuerpo_pulmon::where('id_pulmon',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_pulmon::find($id);
        $objeto= Cuerpo_pulmon::where('id_pulmon',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
