<?php

namespace App\Http\Controllers;

use App\Models\Userlevels;
use Illuminate\Http\Request;

class UserlevelsController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Userlevels::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Userlevels::find($id);
        $objeto= Userlevels::where('userlevelid',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Userlevels::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Userlevels::find($id);
        $objeto= Userlevels::where('userlevelid',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Userlevels::find($id);
        $objeto= Userlevels::where('userlevelid',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
