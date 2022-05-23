<?php

namespace App\Http\Controllers;

use App\Models\Webservices;
use Illuminate\Http\Request;

class WebservicesController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Webservices::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Webservices::find($id);
        $objeto= Webservices::where('id_parametros',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Webservices::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Webservices::find($id);
        $objeto= Webservices::where('id_parametros',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Webservices::find($id);
        $objeto= Webservices::where('id_parametros',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
