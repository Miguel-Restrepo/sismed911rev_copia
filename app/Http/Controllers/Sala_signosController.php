<?php

namespace App\Http\Controllers;

use App\Models\Sala_signos;
use Illuminate\Http\Request;

class Sala_signosController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_signos::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_signos::find($id);
        $objeto= Sala_signos::where('id_signos',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_signos::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_signos::find($id);
        $objeto= Sala_signos::where('id_signos',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_signos::find($id);
        $objeto= Sala_signos::where('id_signos',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
