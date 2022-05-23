<?php

use Illuminate\Support\Facades\Route;
use App\Models\Hospitalesgeneral;
use App\Models\Sede_sismed;
use App\Models\Userlevelpermissions;
use App\Models\Userlevels;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/sesion-activa', function () {
    /* $sesion= new Archivos();
    if (session('auth')) {
        $sesion->hay=true;
    }else{
        $sesion->hay=false;
    }*/
    $usuario = auth()->user();
    if ($usuario != null) {
        $usuario->rol = Userlevels::find($usuario->perfil);
        $usuario->hospital = Hospitalesgeneral::find($usuario->hospital);
        $usuario->sede_sismed = Sede_sismed::find($usuario->sede);
        $usuario->accesos = Userlevelpermissions::where('userlevelid', $usuario->perfil)->get();
        return $usuario;
    } else {
        return null;
    }
});

Auth::routes();

Route::fallback(function () {
    return view('welcome');
})->middleware('auth');//Solo deja acceder si ya se inicio sesion
//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
