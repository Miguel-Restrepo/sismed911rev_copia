<?php

namespace App\Http\Controllers;

use App\Models\Medicamentos_registros;
use Illuminate\Http\Request;

class Medicamentos_registroController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Medicamentos_registros::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Medicamentos_registros::find($id);
        //$objeto= Medicamentos_registros::where('id_medicamento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Medicamentos_registros::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Medicamentos_registros::find($id);
        //$objeto= Medicamentos_registros::where('id_medicamento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Medicamentos_registros::find($id);
        //$objeto= Medicamentos_registros::where('id_medicamento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
