<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Acercade;
class acercadeController extends Controller
{
    //
    
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Acercade::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Acercade::find($id);
        $objeto= Acercade::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Acercade::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Acercade::find($id);
        $objeto= Acercade::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Acercade::find($id);
        $objeto= Acercade::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
    /*public function create(){//Crear uno
        return "Modulo interhospitalario crear";
    }*/
}
