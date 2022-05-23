<?php

namespace App\Http\Controllers;

use App\Models\Cuerpo_genital;
use Illuminate\Http\Request;

class Cuerpo_genitalController extends Controller
{
    //}
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Cuerpo_genital::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Cuerpo_genital::find($id);
        $objeto= Cuerpo_genital::where('id_genital',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Cuerpo_genital::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Cuerpo_genital::find($id);
        $objeto= Cuerpo_genital::where('id_genital',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Cuerpo_genital::find($id);
        $objeto= Cuerpo_genital::where('id_genital',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
