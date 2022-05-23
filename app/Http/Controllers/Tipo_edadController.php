<?php

namespace App\Http\Controllers;

use App\Models\Tipo_edad;
use Illuminate\Http\Request;

class Tipo_edadController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_edad::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_edad::find($id);
        $objeto= Tipo_edad::where('id_edad',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_edad::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_edad::find($id);
        $objeto= Tipo_edad::where('id_edad',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_edad::find($id);
        $objeto= Tipo_edad::where('id_edad',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
