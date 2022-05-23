<?php

namespace App\Http\Controllers;

use App\Models\Cie10dx;
use Illuminate\Http\Request;

class Cie10dxController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cie10dx::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cie10dx::find($id);
        $objeto= Cie10dx::where('codcie10',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cie10dx::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cie10dx::find($id);
        $objeto= Cie10dx::where('codcie10',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cie10dx::find($id);
        $objeto= Cie10dx::where('codcie10',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
