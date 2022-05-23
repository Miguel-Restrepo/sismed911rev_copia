<?php

namespace App\Http\Controllers;

use App\Models\Sala_medicamentos;
use Illuminate\Http\Request;

class Sala_medicamentosController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_medicamentos::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_medicamentos::find($id);
        $objeto= Sala_medicamentos::where('id_medicamento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_medicamentos::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_medicamentos::find($id);
        $objeto= Sala_medicamentos::where('id_medicamento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_medicamentos::find($id);
        $objeto= Sala_medicamentos::where('id_medicamento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
