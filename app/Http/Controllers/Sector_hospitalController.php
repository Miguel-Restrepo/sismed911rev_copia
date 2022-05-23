<?php

namespace App\Http\Controllers;

use App\Models\Sector_hospital;
use Illuminate\Http\Request;

class Sector_hospitalController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sector_hospital::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sector_hospital::find($id);
        $objeto= Sector_hospital::where('id_sector',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sector_hospital::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sector_hospital::find($id);
        $objeto= Sector_hospital::where('id_sector',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sector_hospital::find($id);
        $objeto= Sector_hospital::where('id_sector',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
