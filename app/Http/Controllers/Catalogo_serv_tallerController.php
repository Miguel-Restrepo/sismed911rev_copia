<?php

namespace App\Http\Controllers;

use App\Models\Catalogo_serv_taller;
use Illuminate\Http\Request;

class Catalogo_serv_tallerController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Catalogo_serv_taller::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Catalogo_serv_taller::find($id);
        $objeto= Catalogo_serv_taller::where('id_catalogo',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Catalogo_serv_taller::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Catalogo_serv_taller::find($id);
        $objeto= Catalogo_serv_taller::where('id_catalogo',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Catalogo_serv_taller::find($id);
        $objeto= Catalogo_serv_taller::where('id_catalogo',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
