<?php

namespace App\Http\Controllers;

use App\Models\Provincias_reniec;
use Illuminate\Http\Request;

class Provincias_reniecController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Provincias_reniec::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Provincias_reniec::find($id);
        $objeto= Provincias_reniec::where('cod_provincia',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Provincias_reniec::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Provincias_reniec::find($id);
        $objeto= Provincias_reniec::where('cod_provincia',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Provincias_reniec::find($id);
        $objeto= Provincias_reniec::where('cod_provincia',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
