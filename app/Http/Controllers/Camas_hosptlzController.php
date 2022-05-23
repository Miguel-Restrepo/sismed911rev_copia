<?php

namespace App\Http\Controllers;

use App\Models\Camas_hosptlz;
use Illuminate\Http\Request;

class Camas_hosptlzController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Camas_hosptlz::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Camas_hosptlz::find($id);
        //$objeto= Camas_hosptlz::where('id_acerca',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Camas_hosptlz::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Camas_hosptlz::find($id);
        //$objeto= Camas_hosptlz::where('id_acerca',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Camas_hosptlz::find($id);
        //$objeto= Camas_hosptlz::where('id_acerca',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
