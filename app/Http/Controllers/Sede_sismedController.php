<?php

namespace App\Http\Controllers;

use App\Models\Sede_sismed;
use Illuminate\Http\Request;

class Sede_sismedController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sede_sismed::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sede_sismed::find($id);
        $objeto= Sede_sismed::where('id_sede',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sede_sismed::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sede_sismed::find($id);
        $objeto= Sede_sismed::where('id_sede',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sede_sismed::find($id);
        $objeto= Sede_sismed::where('id_sede',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
