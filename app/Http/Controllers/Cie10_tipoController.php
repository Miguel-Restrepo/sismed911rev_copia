<?php

namespace App\Http\Controllers;

use App\Models\Cie10_tipo;
use Illuminate\Http\Request;

class Cie10_tipoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cie10_tipo::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cie10_tipo::find($id);
        $objeto= Cie10_tipo::where('COD',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cie10_tipo::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cie10_tipo::find($id);
        $objeto= Cie10_tipo::where('COD',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cie10_tipo::find($id);
        $objeto= Cie10_tipo::where('COD',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
