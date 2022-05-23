<?php

namespace App\Http\Controllers;

use App\Models\Explo_fisica;
use Illuminate\Http\Request;

class Explo_fisicaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Explo_fisica::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Explo_fisica::find($id);
        //$objeto= Explo_fisica::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Explo_fisica::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Explo_fisica::find($id);
        //$objeto= Explo_fisica::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Explo_fisica::find($id);
        //$objeto= Explo_fisica::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
