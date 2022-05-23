<?php

namespace App\Http\Controllers;

use App\Events\UsuarioLogeado;
use Illuminate\Support\Facades\Validator;
use App\Models\Code_planta;
use App\Models\Hospitalesgeneral;
use App\Models\Usuarios;
use App\Http\Controllers\AuthEspecial;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class UsuariosController extends Controller
{
    //
    public function index()
    { //PARA OBTENER TODOS LOS REGISTROS
        $acercades = Usuarios::all();
        return $acercades;
    }
    public function complej()
    {
        $objeto = DB::table('usuarios')->leftJoin('sede_sismed', 'sede_sismed.id_sede', '=', 'usuarios.sede')
            ->leftJoin('userlevels', 'userlevels.userlevelid', '=', 'usuarios.perfil')
            //->leftJoin('code_planta', 'code_planta.idacode', '=', 'usuarios.acode')
            //->leftJoin('hospitalesgeneral', 'hospitalesgeneral.id_hospital', '=', 'usuarios.hospital')
            ->select(

                'usuarios.*',
                'userlevels.*',
                'sede_sismed.*'
                //'code_planta.*',
                //'hospitalesgeneral.*'

            )
            ->get();
        foreach ($objeto as $post) {
            $post->code = Code_planta::where('nombreacode', $post->acode)->first();
            $post->hospital = Hospitalesgeneral::where('id_hospital', $post->hospital)->first();
        }
        return $objeto;
    }
    public function logeado(Request $request)
    {
        $objeto = Usuarios::where('email', $request->correo)->first();
        event(new UsuarioLogeado('jaime' . $objeto->nombre1 . ' ' . $objeto->nombre2));
    }
    public function cambiarpassword(Request $request)
    {
        $objeto = Usuarios::find($request->id);
      //  if (Hash::make($request->viejaPassword) == $objeto->password) {
            $objeto->password = Hash::make($request->nueva_password);
            $objeto->save();
            return "OK";
        //} else {
         //   return "KO";
        //}
    }

    public function show($id)
    { //Muestra uno en especifico
        //$objeto= Usuarios::find($id);
        $objeto = Usuarios::where('id_user', $id)->first();
        return $objeto;
    }
    public function store(Request $request)
    { //Guardar informacion
        $objeto = new Usuarios();

        $objeto->fecha_creacion = $request->fecha_creacion;
        $objeto->nombres = $request->nombres;
        $objeto->apellidos = $request->apellidos;
        $objeto->telefono = $request->telefono;
        $objeto->login = $request->login;
        $objeto->perfil = $request->perfil;
        $objeto->sede = $request->sede;
        $objeto->acode = $request->acode;
        $objeto->hospital = $request->hospital;
        $objeto->password = Hash::make($request->password);
        $objeto->email = $request->login;


        $objeto->save();
        return $objeto;
    }

    public function update(Request $request, $id)
    { //actualiza informacion
        //$objeto= Usuarios::find($id);
        $objeto = Usuarios::where('id_user', $id)->first();
        $objeto->update($request->all());
        return $objeto;
    }
    public function destroy($id)
    { //Muestra uno en especifico
        //$objeto= Usuarios::find($id);
        $objeto = Usuarios::where('id_user', $id)->first();
        $objeto->delete();
        return "OK";
    }
}
