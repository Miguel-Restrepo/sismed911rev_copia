<?php

namespace App\Http\Controllers;

use App\Models\Reg_ambulancias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Reg_ambulanciasController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $objeto = DB::table('reg_ambulancias')
        ->leftJoin('base_ambulancia', 'base_ambulancia.id_base', '=', 'reg_ambulancias.id_base')
        ->leftJoin('ambulancias', 'ambulancias.id_ambulancias', '=', 'reg_ambulancias.id_ambulancias')
        ->leftJoin('usuarios', 'usuarios.id_user', '=', 'reg_ambulancias.id_user')
        ->leftJoin('motivo_salidaamb', 'motivo_salidaamb.id_motivosalida', '=', 'reg_ambulancias.motivo_salida')
        ->select(
            'reg_ambulancias.*',
            'base_ambulancia.*',
            'ambulancias.*',
            'usuarios.*',
            'motivo_salidaamb.*'
        )
        ->get();
        return $objeto;
    }
    public function show($id){//Muestra uno en especifico
        $objeto= Reg_ambulancias::find($id);
        
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Reg_ambulancias::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        $objeto= Reg_ambulancias::find($id);
        
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        $objeto= Reg_ambulancias::find($id);
        
        $objeto->delete();
        return "OK";
    }
}
