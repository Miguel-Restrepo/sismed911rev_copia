<?php

namespace App\Http\Controllers;

use App\Models\Preh_seguimiento;
use Illuminate\Http\Request;

class Preh_seguimientoController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Preh_seguimiento::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Preh_seguimiento::find($id);
        $objeto= Preh_seguimiento::where('id_seguimiento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Preh_seguimiento::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Preh_seguimiento::find($id);
        $objeto= Preh_seguimiento::where('id_seguimiento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Preh_seguimiento::find($id);
        $objeto= Preh_seguimiento::where('id_seguimiento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
