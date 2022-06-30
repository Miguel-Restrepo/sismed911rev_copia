<?php

namespace App\Http\Controllers;

use App\Models\Base_ambulancia;
use App\Models\Departamento;
use App\Models\Depto_reniec;
use App\Models\Distrito;
use App\Models\Distrito_reniec;
use App\Models\Provincias;
use App\Models\Provincias_reniec;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class Base_ambulanciaController extends Controller
{
    //
    public function index(){//PARA OBTENER TODOS LOS REGISTROS
        $acercades= Base_ambulancia::all();
        foreach ($acercades as $post) {
            $post->departamento = Departamento::find($post->dpto);
            $post->distrito = Distrito::find($post->distrito);
            $post->provincia = Provincias::find($post->provincia);
            
        }
        return $acercades;
    }
    public function indexe(){//PARA OBTENER TODOS LOS REGISTROS
        $SQLconsulta = "SELECT
        departamento.nombre_dpto,
        provincias.nombre_provincia,
        distrito.nombre_distrito
        FROM
        departamento
        INNER JOIN
        provincias
        ON
        departamento.cod_dpto = provincias.cod_departamento
        INNER JOIN
        distrito
        ON
        provincias.cod_departamento = distrito.cod_dpto AND
        provincias.cod_provincia = distrito.cod_provincia;";

        $acercades = DB::select($SQLconsulta, array());
     
        return $acercades;
    }
    
    public function show($id){//Muestra uno en especifico
        //$objeto= Base_ambulancia::find($id);
        $objeto= Base_ambulancia::where('id_base',$id)->first();
        return $objeto;
    }
    public function store(Request $request){//Guardar informacion
        $objeto= Base_ambulancia::create($request->all());
        $objeto->save();
        return $objeto;
    }
    
    public function update(Request $request, $id){//actualiza informacion
        //$objeto= Base_ambulancia::find($id);
        $objeto= Base_ambulancia::where('id_base',$id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id){//Muestra uno en especifico
        //$objeto= Base_ambulancia::find($id);
        $objeto= Base_ambulancia::where('id_base',$id)->first();
        $objeto->delete();
        return "OK";
    }
}
