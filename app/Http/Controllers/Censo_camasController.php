<?php

namespace App\Http\Controllers;

use App\Models\Censo_camas;
use Illuminate\Http\Request;

class Censo_camasController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Censo_camas::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Censo_camas::find($id);
        $objeto= Censo_camas::where('id_cama',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Censo_camas::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Censo_camas::find($id);
        $objeto= Censo_camas::where('id_cama',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Censo_camas::find($id);
        $objeto= Censo_camas::where('id_cama',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
