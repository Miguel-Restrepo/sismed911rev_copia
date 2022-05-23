<?php

namespace App\Http\Controllers;

use App\Models\Distrito_reniec;
use Illuminate\Http\Request;

class Distrito_reniecController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Distrito_reniec::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Distrito_reniec::find($id);
        $objeto= Distrito_reniec::where('cod_distrito',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Distrito_reniec::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Distrito_reniec::find($id);
        $objeto= Distrito_reniec::where('cod_distrito',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Distrito_reniec::find($id);
        $objeto= Distrito_reniec::where('cod_distrito',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
