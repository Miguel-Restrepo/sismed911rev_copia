<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_torax;
use Illuminate\Http\Request;

class Cuerpo_toraxController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_torax::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_torax::find($id);
        $objeto= Cuerpo_torax::where('id_torax',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_torax::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_torax::find($id);
        $objeto= Cuerpo_torax::where('id_torax',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_torax::find($id);
        $objeto= Cuerpo_torax::where('id_torax',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
