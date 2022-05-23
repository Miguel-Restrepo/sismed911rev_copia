<?php

namespace App\Http\Controllers;

use App\Models\Procedimiento_tipos;
use Illuminate\Http\Request;

class Procedimiento_tiposController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Procedimiento_tipos::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Procedimiento_tipos::find($id);
        //$objeto= Procedimiento_tipos::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Procedimiento_tipos::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Procedimiento_tipos::find($id);
        //$objeto= Procedimiento_tipos::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Procedimiento_tipos::find($id);
        //$objeto= Procedimiento_tipos::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
