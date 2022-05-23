<?php

namespace App\Http\Controllers;

use App\Models\Userlevelpermissions;
use Illuminate\Http\Request;

class UserlevelpermissionsController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Userlevelpermissions::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Userlevelpermissions::find($id);
        $objeto= Userlevelpermissions::where('userlevelid',$id)->get();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Userlevelpermissions::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Userlevelpermissions::find($id);
        $objeto= Userlevelpermissions::where('userlevelid',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Userlevelpermissions::find($id);
        $objeto= Userlevelpermissions::where('userlevelid',$id)->first();
        $objeto->delete();
        return "OK";
    }
    public function destruir(Request $request){//Muestra uno en especifico
        //$objeto= Userlevelpermissions::find($id);
        $objeto= Userlevelpermissions::where('userlevelid',$request->userlevelid)
        ->where('tablename', $request->tablename)->where('permission',$request->permission)->first();
        $objeto->delete();
        return "OK";
    }
}
