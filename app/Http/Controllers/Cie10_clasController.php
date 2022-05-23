<?php

namespace App\Http\Controllers;

use App\Models\Cie10_clas;
use Illuminate\Http\Request;

class Cie10_clasController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cie10_clas::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cie10_clas::find($id);
        $objeto= Cie10_clas::where('cod',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cie10_clas::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cie10_clas::find($id);
        $objeto= Cie10_clas::where('cod',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cie10_clas::find($id);
        $objeto= Cie10_clas::where('cod',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
