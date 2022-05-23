<?php

namespace App\Http\Controllers;

use App\Models\Cie10;
use App\Models\Sala_atencionmedica;
use Illuminate\Http\Request;

class Sala_atencionmedicaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_atencionmedica::all();

        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_atencionmedica::find($id);
        $objeto= Sala_atencionmedica::where('id_atencionmedica',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_atencionmedica::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_atencionmedica::find($id);
        $objeto= Sala_atencionmedica::where('id_atencionmedica',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_atencionmedica::find($id);
        $objeto= Sala_atencionmedica::where('id_atencionmedica',$id)->first();
        $objeto->delete();
        return "OK";
    }
    public function verCie10($id){//Muestra uno en especifico
        $objeto1= Sala_atencionmedica::where('id_atencionmedica',$id)->first();
        $objeto= Cie10::where('codigo_cie',$objeto1->cod_cie10)->first();
        return $objeto;
    }
}
