<?php

namespace App\Http\Controllers;

use App\Models\Medicamentos;
use Illuminate\Http\Request;

class MedicamentosController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Medicamentos::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Medicamentos::find($id);
        $objeto= Medicamentos::where('id_medicamento',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Medicamentos::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Medicamentos::find($id);
        $objeto= Medicamentos::where('id_medicamento',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Medicamentos::find($id);
        $objeto= Medicamentos::where('id_medicamento',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
