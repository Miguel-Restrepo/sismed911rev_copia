<?php

namespace App\Http\Controllers;

use App\Models\Obstetrico_registro;
use Illuminate\Http\Request;

class Obstetrico_registroController extends Controller
{
    //78
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Obstetrico_registro::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Obstetrico_registro::find($id);
        //$objeto= Obstetrico_registro::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Obstetrico_registro::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Obstetrico_registro::find($id);
        //$objeto= Obstetrico_registro::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Obstetrico_registro::find($id);
        //$objeto= Obstetrico_registro::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
