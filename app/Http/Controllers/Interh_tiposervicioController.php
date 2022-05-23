<?php

namespace App\Http\Controllers;

use App\Models\Interh_tiposervicio;
use Illuminate\Http\Request;

class Interh_tiposervicioController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Interh_tiposervicio::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Interh_tiposervicio::find($id);
        $objeto= Interh_tiposervicio::where('id_tiposervicion',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Interh_tiposervicio::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Interh_tiposervicio::find($id);
        $objeto= Interh_tiposervicio::where('id_tiposervicion',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Interh_tiposervicio::find($id);
        $objeto= Interh_tiposervicio::where('id_tiposervicion',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
