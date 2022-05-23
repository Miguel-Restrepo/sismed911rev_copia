<?php

namespace App\Http\Controllers;

use App\Models\Causa_externa;
use Illuminate\Http\Request;

class Causa_externaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Causa_externa::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Causa_externa::find($id);
        $objeto= Causa_externa::where('id_causa',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Causa_externa::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Causa_externa::find($id);
        $objeto= Causa_externa::where('id_causa',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Causa_externa::find($id);
        $objeto= Causa_externa::where('id_causa',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
