<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_abdomen;
use Illuminate\Http\Request;

class Cuerpo_abdomenController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_abdomen::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_abdomen::find($id);
        $objeto= Cuerpo_abdomen::where('id_abdomen',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_abdomen::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_abdomen::find($id);
        $objeto= Cuerpo_abdomen::where('id_abdomen',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_abdomen::find($id);
        $objeto= Cuerpo_abdomen::where('id_abdomen',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
