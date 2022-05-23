<?php

namespace App\Http\Controllers;

use App\Models\Cama;
use Illuminate\Http\Request;

class CamaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $Camas= Cama::all();
        return $Camas;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cama::find($id);
        $objeto= Cama::where('id_sala_camas',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cama::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cama::find($id);
        $objeto= Cama::where('id_sala_camas',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cama::find($id);
        $objeto= Cama::where('id_sala_camas',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
