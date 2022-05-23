<?php

namespace App\Http\Controllers;

use App\Models\Provincias;
use Illuminate\Http\Request;

class ProvinciasController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Provincias::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Provincias::find($id);
        $objeto= Provincias::where('cod_provincia',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Provincias::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Provincias::find($id);
        $objeto= Provincias::where('cod_provincia',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Provincias::find($id);
        $objeto= Provincias::where('cod_provincia',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
