<?php

namespace App\Http\Controllers;

use App\Models\Interh_seguimiento;
use Illuminate\Http\Request;

class Interh_seguimientoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_seguimiento::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_seguimiento::find($id);
        $objeto= Interh_seguimiento::where('id_seguimiento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_seguimiento::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_seguimiento::find($id);
        $objeto= Interh_seguimiento::where('id_seguimiento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_seguimiento::find($id);
        $objeto= Interh_seguimiento::where('id_seguimiento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
