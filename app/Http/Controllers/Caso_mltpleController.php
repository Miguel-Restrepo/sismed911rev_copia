<?php

namespace App\Http\Controllers;
use App\Models\Caso_mltple;
use Illuminate\Http\Request;

class Caso_mltpleController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Camas_::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= caso_mltple::find($id);
        $objeto= Caso_mltple::where('id_casomltple',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= caso_mltple::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= caso_mltple::find($id);
        $objeto= caso_mltple::where('id_casomltple',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= caso_mltple::find($id);
        $objeto= caso_mltple::where('id_casomltple',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
