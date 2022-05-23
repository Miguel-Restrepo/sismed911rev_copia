<?php

namespace App\Http\Controllers;

use App\Models\Depto_reniec;
use Illuminate\Http\Request;

class Depto_reniecController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Depto_reniec::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Depto_reniec::find($id);
        $objeto= Depto_reniec::where('cod_dpto',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Depto_reniec::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Depto_reniec::find($id);
        $objeto= Depto_reniec::where('cod_dpto',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Depto_reniec::find($id);
        $objeto= Depto_reniec::where('cod_dpto',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
