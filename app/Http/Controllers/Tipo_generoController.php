<?php

namespace App\Http\Controllers;

use App\Models\Tipo_genero;
use Illuminate\Http\Request;

class Tipo_generoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Tipo_genero::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Tipo_genero::find($id);
        $objeto= Tipo_genero::where('id_genero',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Tipo_genero::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Tipo_genero::find($id);
        $objeto= Tipo_genero::where('id_genero',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Tipo_genero::find($id);
        $objeto= Tipo_genero::where('id_genero',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
