<?php

namespace App\Http\Controllers;

use App\Models\Aseguradores;
use Illuminate\Http\Request;

class AseguradoresController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Aseguradores::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Aseguradores::find($id);
        $objeto= Aseguradores::where('id_asegurador',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Aseguradores::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Aseguradores::find($id);
        $objeto= Aseguradores::where('id_asegurador',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Aseguradores::find($id);
        $objeto= Aseguradores::where('id_asegurador',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
