<?php

namespace App\Http\Controllers;

use App\Models\Sala_localizaciontrauma;
use Illuminate\Http\Request;

class Sala_localizaciontraumaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Sala_localizaciontrauma::all();
        return $acercades;
    }
    public function show($id){//Muestra uno en especifico
        //$objeto= Sala_localizaciontrauma::find($id);
        $objeto= Sala_localizaciontrauma::where('id_localizaciontrauma',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Sala_localizaciontrauma::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Sala_localizaciontrauma::find($id);
        $objeto= Sala_localizaciontrauma::where('id_localizaciontrauma',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Sala_localizaciontrauma::find($id);
        $objeto= Sala_localizaciontrauma::where('id_localizaciontrauma',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
