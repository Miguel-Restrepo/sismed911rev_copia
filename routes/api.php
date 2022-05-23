<?php

use App\Http\Controllers\acercadeController;
use App\Http\Controllers\Alerta_censoController;
use App\Http\Controllers\Ambulancia_tallerController;
use App\Http\Controllers\AmbulanciasController;
use App\Http\Controllers\Antecedentes_registroController;
use App\Http\Controllers\ArchivosController;
use App\Http\Controllers\AseguradoresController;
use App\Http\Controllers\Base_ambulanciaController;
use App\Http\Controllers\Bloques_divController;
use App\Http\Controllers\CamaController;
use App\Http\Controllers\Camas_hospitalController;
use App\Http\Controllers\Camas_hosptlzController;
use App\Http\Controllers\Camas_pedtriaController;
use App\Http\Controllers\Camas_uciController;
use App\Http\Controllers\Caso_mltpleController;
use App\Http\Controllers\Catalogo_serv_tallerController;
use App\Http\Controllers\Causa_externaController;
use App\Http\Controllers\Causa_registroController;
use App\Http\Controllers\Causa_trauma_categoriaController;
use App\Http\Controllers\Causa_trauma_situacionController;
use App\Http\Controllers\Censo_camasController;
use App\Http\Controllers\Censo_totalController;
use App\Http\Controllers\Cie10_clasController;
use App\Http\Controllers\Cie10_tipoController;
use App\Http\Controllers\Cie10Controller;
use App\Http\Controllers\Cie10dxController;
use App\Http\Controllers\Code_plantaController;
use App\Http\Controllers\Condicion_pacienteController;
use App\Http\Controllers\Cuerpo_abdomenController;
use App\Http\Controllers\Cuerpo_bocaController;
use App\Http\Controllers\Cuerpo_cabezaController;
use App\Http\Controllers\Cuerpo_corazonController;
use App\Http\Controllers\Cuerpo_cuelloController;
use App\Http\Controllers\Cuerpo_extremidadController;
use App\Http\Controllers\Cuerpo_generalController;
use App\Http\Controllers\Cuerpo_genitalController;
use App\Http\Controllers\Cuerpo_neuroController;
use App\Http\Controllers\Cuerpo_ojoController;
use App\Http\Controllers\Cuerpo_otorrinoController;
use App\Http\Controllers\Cuerpo_pelvisController;
use App\Http\Controllers\Cuerpo_pielController;
use App\Http\Controllers\Cuerpo_pulmonController;
use App\Http\Controllers\Cuerpo_rectalController;
use App\Http\Controllers\Cuerpo_toraxController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\Depto_reniecController;
use App\Http\Controllers\Despacho_prehController;
use App\Http\Controllers\DestinoController;
use App\Http\Controllers\Disponibilidad_hospitalariaController;
use App\Http\Controllers\Distrito_reniecController;
use App\Http\Controllers\DistritoController;
use App\Http\Controllers\Division_hospController;
use App\Http\Controllers\Especial_ambulanciaController;
use App\Http\Controllers\Especialidad_hospitalController;
use App\Http\Controllers\EspecialidadController;
use App\Http\Controllers\EstadisticasController;
use App\Http\Controllers\EvolucionController;
use App\Http\Controllers\Explo_fisica_registroController;
use App\Http\Controllers\Explo_fisicaController;
use App\Http\Controllers\Explo_general_afeccionController;
use App\Http\Controllers\Explo_general_catController;
use App\Http\Controllers\Explo_general_registroController;
use App\Http\Controllers\Firmas_registroController;
use App\Http\Controllers\Historial_ubicacionesController;
use App\Http\Controllers\HospitalesgeneralController;
use App\Http\Controllers\ImagendxController;
use App\Http\Controllers\IncidentesController;
use App\Http\Controllers\Insumos_registroController;
use App\Http\Controllers\InsumosController;
use App\Http\Controllers\Interh_accionController;
use App\Http\Controllers\Interh_cierreController;
use App\Http\Controllers\Interh_estadoController;
use App\Http\Controllers\Interh_evaluacionclinicaController;
use App\Http\Controllers\Interh_maestroController;
use App\Http\Controllers\Interh_motivoatencionController;
use App\Http\Controllers\Interh_prioridadController;
use App\Http\Controllers\Interh_seguimientoController;
use App\Http\Controllers\Interh_tiposervicioController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Mante_ambController;
use App\Http\Controllers\Medicamentos_registroController;
use App\Http\Controllers\MedicamentosController;
use App\Http\Controllers\Modalidad_ambulanciaController;
use App\Http\Controllers\MonitoreoController;
use App\Http\Controllers\Motivo_salidaambController;
use App\Http\Controllers\Nivel_hospitalController;
use App\Http\Controllers\Obstetrico_registroController;
use App\Http\Controllers\PacientegeneralController;
use App\Http\Controllers\Preh_cierreController;
use App\Http\Controllers\Preh_destinoController;
use App\Http\Controllers\Preh_evaluacionclinicaController;
use App\Http\Controllers\Preh_maestroController;
use App\Http\Controllers\Preh_seguimientoController;
use App\Http\Controllers\Preh_servicio_ambulanciaController;
use App\Http\Controllers\Procedimiento_registroController;
use App\Http\Controllers\Procedimiento_tiposController;
use App\Http\Controllers\ProcedimientosController;
use App\Http\Controllers\Provincias_reniecController;
use App\Http\Controllers\ProvinciasController;
use App\Http\Controllers\Recordatorio_tallerController;
use App\Http\Controllers\Reg_ambulanciasController;
use App\Http\Controllers\Sala_admissionController;
use App\Http\Controllers\Sala_atencionmedica_examenController;
use App\Http\Controllers\Sala_atencionmedica_medicamentosController;
use App\Http\Controllers\Sala_atencionmedicaController;
use App\Http\Controllers\Sala_causatraumaController;
use App\Http\Controllers\Sala_estadoaltaController;
use App\Http\Controllers\Sala_examenController;
use App\Http\Controllers\Sala_localizaciontraumaController;
use App\Http\Controllers\Sala_medicamentosController;
use App\Http\Controllers\Sala_motivoatencionController;
use App\Http\Controllers\Sala_signosController;
use App\Http\Controllers\Sala_sistemaController;
use App\Http\Controllers\Sector_hospitalController;
use App\Http\Controllers\Sede_sismedController;
use App\Http\Controllers\Servicio_ambulanciaController;
use App\Http\Controllers\Servicio_disponibilidadController;
use App\Http\Controllers\Servicios_divisionController;
use App\Http\Controllers\Temp_camasController;
use App\Http\Controllers\TerminosController;
use App\Http\Controllers\Tipo_ambulanciaController;
use App\Http\Controllers\Tipo_cierrecasoController;
use App\Http\Controllers\Tipo_edadController;
use App\Http\Controllers\Tipo_generoController;
use App\Http\Controllers\Tipo_idController;
use App\Http\Controllers\Tipo_ingresoController;
use App\Http\Controllers\Tipo_llamadaController;
use App\Http\Controllers\Tipo_pacienteController;
use App\Http\Controllers\Trauma_registroController;
use App\Http\Controllers\TriageController;
use App\Http\Controllers\Turno_registroController;
use App\Http\Controllers\UserlevelpermissionsController;
use App\Http\Controllers\UserlevelsController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\WebservicesController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Auth::routes();
//RUTAS DEFINITIVAS
Route::controller(acercadeController::class)->group(function () {
    Route::get('acercade', 'index'); //Para obtener todos
    Route::get('acercade/{id}', 'show'); //Para consultar especifico
    Route::post('acercade', 'store'); //Para guardar
    Route::put('acercade/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('acercade/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Alerta_censoController::class)->group(function () {
    Route::get('alerta_censo', 'index'); //Para obtener todos
    Route::get('alerta_censo/{id}', 'show'); //Para consultar especifico
    Route::post('alerta_censo', 'store'); //Para guardar
    Route::put('alerta_censo/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('alerta_censo/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Ambulancia_tallerController::class)->group(function () {
    Route::get('ambulancia_taller', 'index'); //Para obtener todos
    Route::get('ambulancia_taller/{id}', 'show'); //Para consultar especifico
    Route::post('ambulancia_taller', 'store'); //Para guardar
    Route::put('ambulancia_taller/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('ambulancia_taller/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(AmbulanciasController::class)->group(function () {
    Route::get('ambulancias', 'index'); //Para obtener todosver
    Route::get('ambulancias/codigos', 'codigos'); //Para obtener todosver
    Route::get('ambulancias/listaespecial', 'consultaEspecial'); //lista especial
    Route::get('ambulancias/eventos', 'sacarEventos'); //Para obtener todos
    Route::get('ambulancias/{id}', 'show'); //Para consultar especifico
    Route::get('ambulancia/{id}', 'ver'); //Para consultar especifico
    Route::get('ambulancias/{id}/historial_ubicaciones', 'verUbicaciones'); //Para consultar especifico
    Route::get('ambulancias/{id}/base', 'verBase'); //Para consultar especifico
    Route::get('ambulancias/{id}/mantenimiento', 'VerMantenimiento'); //Para consultar especifico
    Route::get('ambulancias/{id}/modalidad', 'verModalidad'); //Para consultar especifico
    Route::get('ambulancias/{id}/especial', 'verEspecial'); //Para consultar especifico
    Route::get('ambulancias/{id}/recordatorio', 'verRecordatorio'); //Para consultar especifico
    Route::post('ambulancias', 'store'); //Para guardar
    Route::put('ambulancias/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('ambulancias/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Antecedentes_registroController::class)->group(function () {
    Route::get('antecedentes_registro', 'index'); //Para obtener todos
    Route::get('antecedentes_registro/{id}', 'show'); //Para consultar especifico
    Route::post('antecedentes_registro', 'store'); //Para guardar
    Route::put('antecedentes_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('antecedentes_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(AseguradoresController::class)->group(function () {
    Route::get('aseguradores', 'index'); //Para obtener todos
    Route::get('aseguradores/{id}', 'show'); //Para consultar especifico
    Route::post('aseguradores', 'store'); //Para guardar
    Route::put('aseguradores/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('aseguradores/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(ArchivosController::class)->group(function () {
    Route::get('archivo', 'index'); //Para obtener todos
    Route::get('archivo/{id}', 'show'); //Para consultar especifico
    Route::post('archivo', 'store'); //Para guardar
    Route::put('archivo/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('archivo/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Base_ambulanciaController::class)->group(function () {
    Route::get('base_ambulancia', 'index'); //Para obtener todos
    Route::get('base_ambulancia/{id}', 'show'); //Para consultar especifico
    Route::post('base_ambulancia', 'store'); //Para guardar
    Route::put('base_ambulancia/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('base_ambulancia/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Bloques_divController::class)->group(function () {
    Route::get('bloque_div', 'index'); //Para obtener todos
    Route::get('bloque_div/{id}', 'show'); //Para consultar especifico
    Route::post('bloque_div', 'store'); //Para guardar
    Route::put('bloque_div/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('bloque_div/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(CamaController::class)->group(function () {
    Route::get('cama', 'index'); //Para obtener todos
    Route::get('cama/{id}', 'show'); //Para consultar especifico
    Route::post('cama', 'store'); //Para guardar
    Route::put('cama/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cama/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Camas_hospitalController::class)->group(function () {
    Route::get('camas_hopital', 'index'); //Para obtener todos
    Route::get('camas_hopital/{id}', 'show'); //Para consultar especifico
    Route::post('camas_hopital', 'store'); //Para guardar
    Route::put('camas_hopital/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('camas_hopital/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Camas_hosptlzController::class)->group(function () {
    Route::get('camas_hosptlz', 'index'); //Para obtener todos
    Route::get('camas_hosptlz/{id}', 'show'); //Para consultar especifico
    Route::post('camas_hosptlz', 'store'); //Para guardar
    Route::put('camas_hosptlz/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('camas_hosptlz/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Camas_pedtriaController::class)->group(function () {
    Route::get('camas_pedtria', 'index'); //Para obtener todos
    Route::get('camas_pedtria/{id}', 'show'); //Para consultar especifico
    Route::post('camas_pedtria', 'store'); //Para guardar
    Route::put('camas_pedtria/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('camas_pedtria/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Camas_uciController::class)->group(function () {
    Route::get('camas_uci', 'index'); //Para obtener todos
    Route::get('camas_uci/{id}', 'show'); //Para consultar especifico
    Route::post('camas_uci', 'store'); //Para guardar
    Route::put('camas_uci/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('camas_uci/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Caso_mltpleController::class)->group(function () {
    Route::get('caso_mltple', 'index'); //Para obtener todos
    Route::get('caso_mltple/{id}', 'show'); //Para consultar especifico
    Route::post('caso_mltple', 'store'); //Para guardar
    Route::put('caso_mltple/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('caso_mltple/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Catalogo_serv_tallerController::class)->group(function () {
    Route::get('catalogo_serv_taller', 'index'); //Para obtener todos
    Route::get('catalogo_serv_taller/{id}', 'show'); //Para consultar especifico
    Route::post('catalogo_serv_taller', 'store'); //Para guardar
    Route::put('catalogo_serv_taller/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('catalogo_serv_taller/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Causa_externaController::class)->group(function () {
    Route::get('causa_externa', 'index'); //Para obtener todos
    Route::get('causa_externa/{id}', 'show'); //Para consultar especifico
    Route::post('causa_externa', 'store'); //Para guardar
    Route::put('causa_externa/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('causa_externa/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Causa_registroController::class)->group(function () {
    Route::get('causa_registro', 'index'); //Para obtener todos
    Route::get('causa_registro/{id}', 'show'); //Para consultar especifico
    Route::post('causa_registro', 'store'); //Para guardar
    Route::put('causa_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('causa_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Causa_trauma_categoriaController::class)->group(function () {
    Route::get('causa_trauma_categoria', 'index'); //Para obtener todos
    Route::get('causa_trauma_categoria/{id}', 'show'); //Para consultar especifico
    Route::post('causa_trauma_categoria', 'store'); //Para guardar
    Route::put('causa_trauma_categoria/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('causa_trauma_categoria/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Causa_trauma_situacionController::class)->group(function () {
    Route::get('causa_trauma_situacion', 'index'); //Para obtener todos
    Route::get('causa_trauma_situacion/{id}', 'show'); //Para consultar especifico
    Route::post('causa_trauma_situacion', 'store'); //Para guardar
    Route::put('causa_trauma_situacion/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('causa_trauma_situacion/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Censo_camasController::class)->group(function () {
    Route::get('censo_Camas', 'index'); //Para obtener todos
    Route::get('censo_Camas/{id}', 'show'); //Para consultar especifico
    Route::post('censo_Camas', 'store'); //Para guardar
    Route::put('censo_Camas/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('censo_Camas/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Censo_totalController::class)->group(function () {
    Route::get('censo_total', 'index'); //Para obtener todos
    Route::get('censo_total/{id}', 'show'); //Para consultar especifico
    Route::post('censo_total', 'store'); //Para guardar
    Route::put('censo_total/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('censo_total/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cie10Controller::class)->group(function () {
    Route::get('cie10', 'index'); //Para obtener todos
    Route::get('cie10/{id}', 'show'); //Para consultar especifico
    Route::post('cie10', 'store'); //Para guardar
    Route::put('cie10/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cie10/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cie10_clasController::class)->group(function () {
    Route::get('cie_clas', 'index'); //Para obtener todos
    Route::get('cie_clas/{id}', 'show'); //Para consultar especifico
    Route::post('cie_clas', 'store'); //Para guardar
    Route::put('cie_clas/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cie_clas/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cie10_tipoController::class)->group(function () {
    Route::get('cie10_tipo', 'index'); //Para obtener todos
    Route::get('cie10_tipo/{id}', 'show'); //Para consultar especifico
    Route::post('cie10_tipo', 'store'); //Para guardar
    Route::put('cie10_tipo/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cie10_tipo/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cie10dxController::class)->group(function () {
    Route::get('cie10dx', 'index'); //Para obtener todos
    Route::get('cie10dx/{id}', 'show'); //Para consultar especifico
    Route::post('cie10dx', 'store'); //Para guardar
    Route::put('cie10dx/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cie10dx/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Code_plantaController::class)->group(function () {
    Route::get('code_planta', 'index'); //Para obtener todos
    Route::get('code_planta/{id}', 'show'); //Para consultar especifico
    Route::post('code_planta', 'store'); //Para guardar
    Route::put('code_planta/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('code_planta/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Condicion_pacienteController::class)->group(function () {
    Route::get('condicion_paciente', 'index'); //Para obtener todos
    Route::get('condicion_paciente/{id}', 'show'); //Para consultar especifico
    Route::post('condicion_paciente', 'store'); //Para guardar
    Route::put('condicion_paciente/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('condicion_paciente/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_abdomenController::class)->group(function () {
    Route::get('cuerpo_abdomen', 'index'); //Para obtener todos
    Route::get('cuerpo_abdomen/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_abdomen', 'store'); //Para guardar
    Route::put('cuerpo_abdomen/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_abdomen/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_bocaController::class)->group(function () {
    Route::get('cuerpo_boca', 'index'); //Para obtener todos
    Route::get('cuerpo_boca/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_boca', 'store'); //Para guardar
    Route::put('cuerpo_boca/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_boca/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_cabezaController::class)->group(function () {
    Route::get('cuerpo_cabeza', 'index'); //Para obtener todos
    Route::get('cuerpo_cabeza/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_cabeza', 'store'); //Para guardar
    Route::put('cuerpo_cabeza/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_cabeza/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_corazonController::class)->group(function () {
    Route::get('cuerpo_corazon', 'index'); //Para obtener todos
    Route::get('cuerpo_corazon/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_corazon', 'store'); //Para guardar
    Route::put('cuerpo_corazon/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_corazon/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_cuelloController::class)->group(function () {
    Route::get('cuerpo_cuello', 'index'); //Para obtener todos
    Route::get('cuerpo_cuello/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_cuello', 'store'); //Para guardar
    Route::put('cuerpo_cuello/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_cuello/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_extremidadController::class)->group(function () {
    Route::get('cuerpo_extremidad', 'index'); //Para obtener todos
    Route::get('cuerpo_extremidad/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_extremidad', 'store'); //Para guardar
    Route::put('cuerpo_extremidad/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_extremidad/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_generalController::class)->group(function () {
    Route::get('cuerpo_general', 'index'); //Para obtener todos
    Route::get('cuerpo_general/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_general', 'store'); //Para guardar
    Route::put('cuerpo_general/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_general/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_genitalController::class)->group(function () {
    Route::get('cuerpo_genital', 'index'); //Para obtener todos
    Route::get('cuerpo_genital/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_genital', 'store'); //Para guardar
    Route::put('cuerpo_genital/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_genital/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_neuroController::class)->group(function () {
    Route::get('cuerpo_neuro', 'index'); //Para obtener todos
    Route::get('cuerpo_neuro/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_neuro', 'store'); //Para guardar
    Route::put('cuerpo_neuro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_neuro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_ojoController::class)->group(function () {
    Route::get('cuerpo_ojo', 'index'); //Para obtener todos
    Route::get('cuerpo_ojo/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_ojo', 'store'); //Para guardar
    Route::put('cuerpo_ojo/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_ojo/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_otorrinoController::class)->group(function () {
    Route::get('cuerpo_otorrino', 'index'); //Para obtener todos
    Route::get('cuerpo_otorrino/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_otorrino', 'store'); //Para guardar
    Route::put('cuerpo_otorrino/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_otorrino/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_pelvisController::class)->group(function () {
    Route::get('cuerpo_pelvis', 'index'); //Para obtener todos
    Route::get('cuerpo_pelvis/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_pelvis', 'store'); //Para guardar
    Route::put('cuerpo_pelvis/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_pelvis/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_pielController::class)->group(function () {
    Route::get('cuerpo_piel', 'index'); //Para obtener todos
    Route::get('cuerpo_piel/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_piel', 'store'); //Para guardar
    Route::put('cuerpo_piel/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_piel/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_pulmonController::class)->group(function () {
    Route::get('cuerpo_pulmon', 'index'); //Para obtener todos
    Route::get('cuerpo_pulmon/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_pulmon', 'store'); //Para guardar
    Route::put('cuerpo_pulmon/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_pulmon/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_rectalController::class)->group(function () {
    Route::get('cuerpo_rectal', 'index'); //Para obtener todos
    Route::get('cuerpo_rectal/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_rectal', 'store'); //Para guardar
    Route::put('cuerpo_rectal/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_rectal/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Cuerpo_toraxController::class)->group(function () {
    Route::get('cuerpo_torax', 'index'); //Para obtener todos
    Route::get('cuerpo_torax/{id}', 'show'); //Para consultar especifico
    Route::post('cuerpo_torax', 'store'); //Para guardar
    Route::put('cuerpo_torax/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('cuerpo_torax/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(DepartamentoController::class)->group(function () {
    Route::get('departamento', 'index'); //Para obtener todos
    Route::get('departamento/anidados', 'anidado'); //Para obtener todos
    Route::get('departamento/{id}', 'show'); //Para consultar especifico
    Route::post('departamento', 'store'); //Para guardar
    Route::put('departamento/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('departamento/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Depto_reniecController::class)->group(function () {
    Route::get('depto_reniec', 'index'); //Para obtener todos
    Route::get('depto_reniec/{id}', 'show'); //Para consultar especifico
    Route::post('depto_reniec', 'store'); //Para guardar
    Route::put('depto_reniec/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('depto_reniec/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Despacho_prehController::class)->group(function () {
    Route::get('despacho_preh', 'index'); //Para obtener todos
    Route::get('despacho_preh/{id}', 'show'); //Para consultar especifico
    Route::post('despacho_preh', 'store'); //Para guardar
    Route::put('despacho_preh/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('despacho_preh/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(DestinoController::class)->group(function () {
    Route::get('destino', 'index'); //Para obtener todos
    Route::get('destino/{id}', 'show'); //Para consultar especifico
    Route::post('destino', 'store'); //Para guardar
    Route::put('destino/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('destino/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Disponibilidad_hospitalariaController::class)->group(function () {
    Route::get('disponibilidad_hospitalaria', 'index'); //Para obtener todos
    Route::get('disponibilidad_hospitalaria/{id}', 'show'); //Para consultar especifico
    Route::post('disponibilidad_hospitalaria', 'store'); //Para guardar
    Route::put('disponibilidad_hospitalaria/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('disponibilidad_hospitalaria/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Distrito_reniecController::class)->group(function () {
    Route::get('distrito_reniec', 'index'); //Para obtener todos
    Route::get('distrito_reniec/{id}', 'show'); //Para consultar especifico
    Route::post('distrito_reniec', 'store'); //Para guardar
    Route::put('distrito_reniec/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('distrito_reniec/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(DistritoController::class)->group(function () {
    Route::get('distrito', 'index'); //Para obtener todos
    Route::get('distrito/{id}', 'show'); //Para consultar especifico
    Route::post('distrito', 'store'); //Para guardar
    Route::put('distrito/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('distrito/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Division_hospController::class)->group(function () {
    Route::get('division_hosp', 'index'); //Para obtener todos
    Route::get('division_hosp/{id}', 'show'); //Para consultar especifico
    Route::post('division_hosp', 'store'); //Para guardar
    Route::put('division_hosp/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('division_hosp/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(EstadisticasController::class)->group(function () {
    //1°PESTAÑA INTERH
    Route::post('estadisticas/interh/asistencia_prestada', 'interh_asistencia_prestada');
    Route::post('estadisticas/interh/motivo_traslado', 'interh_motivo_traslado');
    Route::post('estadisticas/interh/nacionalidad', 'interh_nacionalidad');
    Route::post('estadisticas/interh/tipo_px', 'interh_tipo_px');
    Route::post('estadisticas/interh/segun_condicion', 'interh_segun_condicion');
    Route::post('estadisticas/interh/totales', 'interh_totales');
    //2°PESTAÑA INTERH
    Route::post('estadisticas/interh/cola_pacientes', 'cola_pacientes');
    //3° PESTAÑA
    Route::get('estadisticas/interh/regiones', 'regiones');
    Route::get('estadisticas/interh/totales', 'totales');
    Route::get('estadisticas/interh/tabla', 'tabla');
    //1°PESTAÑA PREH
    Route::post('estadisticas/preh/asistencia_prestada', 'preh_asistencia_prestada');
    Route::post('estadisticas/preh/motivo_traslado', 'preh_motivo_traslado');
    Route::post('estadisticas/preh/nacionalidad', 'preh_nacionalidad');
    Route::post('estadisticas/preh/tipo_px', 'preh_tipo_px');
    Route::post('estadisticas/preh/segun_incidente', 'preh_segun_incidente');
    Route::post('estadisticas/preh/totales', 'preh_totales');
    //2°PESTAÑA PREH
    Route::post('estadisticas/preh/cola_pacientes', 'cola_pacientespreh');
    //3° PESTAÑA PREH
    Route::get('estadisticas/preh/regiones', 'regionespreh');
    Route::get('estadisticas/preh/totales', 'totalespreh');
    Route::get('estadisticas/preh/tabla', 'tablapreh');
    //4° PESTAÑA
    Route::get('estadisticas/ambulancia/por_tipo', 'por_tipo');
    Route::get('estadisticas/ambulancia/fuera_servicio_taller', 'fuera_servicio_taller');
    Route::get('estadisticas/ambulancia/fuera_servicio_detalle', 'fuera_servicio_detalle');
    Route::get('estadisticas/ambulancia/promedio_respuesta_taller', 'promedio_respuesta_taller');
    Route::get('estadisticas/ambulancia/ent_sal_siete_dias', 'ent_sal_siete_dias');
    //5°PESTAÑA
    Route::post('estadisticas/interh/porcentaje_cubierta', 'porcentaje_cubierta');
    Route::post('estadisticas/interh/preposiciones_tabla', 'preposiciones_tabla');
    Route::post('estadisticas/interh/motivo_salida', 'motivo_salida');
    Route::get('estadisticas/interh/ubicacion_preposiciones', 'ubicacion_preposicionesget');
    Route::post('estadisticas/interh/ubicacion_preposiciones', 'ubicacion_preposiciones');
});

Route::controller(EvolucionController::class)->group(function () {
    Route::get('evolucion', 'index'); //Para obtener todos
    Route::get('evolucion/{id}', 'show'); //Para consultar especifico
    Route::post('evolucion', 'store'); //Para guardar
    Route::put('evolucion/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('evolucion/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Especial_ambulanciaController::class)->group(function () {
    Route::get('especial_ambulancia', 'index'); //Para obtener todos
    Route::get('especial_ambulancia/{id}', 'show'); //Para consultar especifico
    Route::post('especial_ambulancia', 'store'); //Para guardar
    Route::put('especial_ambulancia/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('especial_ambulancia/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(EspecialidadController::class)->group(function () {
    Route::get('especialidad', 'index'); //Para obtener todos
    Route::get('especialidad/{id}', 'show'); //Para consultar especifico
    Route::post('especialidad', 'store'); //Para guardar
    Route::put('especialidad/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('especialidad/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Especialidad_hospitalController::class)->group(function () {
    Route::get('especialidad_hospital', 'index'); //Para obtener todos
    Route::get('especialidad_hospital/{id}', 'show'); //Para consultar especifico
    Route::post('especialidad_hospital', 'store'); //Para guardar
    Route::put('especialidad_hospital/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('especialidad_hospital/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Explo_fisicaController::class)->group(function () {
    Route::get('explo_fisica', 'index'); //Para obtener todos
    Route::get('explo_fisica/{id}', 'show'); //Para consultar especifico
    Route::post('explo_fisica', 'store'); //Para guardar
    Route::put('explo_fisica/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('explo_fisica/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Explo_fisica_registroController::class)->group(function () {
    Route::get('explo_fisica_registro', 'index'); //Para obtener todos
    Route::get('explo_fisica_registro/{id}', 'show'); //Para consultar especifico
    Route::post('explo_fisica_registro', 'store'); //Para guardar
    Route::put('explo_fisica_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('explo_fisica_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Explo_general_afeccionController::class)->group(function () {
    Route::get('explo_general_afeccion', 'index'); //Para obtener todos
    Route::get('explo_general_afeccion/{id}', 'show'); //Para consultar especifico
    Route::post('explo_general_afeccion', 'store'); //Para guardar
    Route::put('explo_general_afeccion/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('explo_general_afeccion/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Explo_general_catController::class)->group(function () {
    Route::get('explo_general_cat', 'index'); //Para obtener todos
    Route::get('explo_general_cat/{id}', 'show'); //Para consultar especifico
    Route::post('explo_general_cat', 'store'); //Para guardar
    Route::put('explo_general_cat/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('explo_general_cat/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Explo_general_registroController::class)->group(function () {
    Route::get('explo_general_registro', 'index'); //Para obtener todos
    Route::get('explo_general_registro/{id}', 'show'); //Para consultar especifico
    Route::post('explo_general_registro', 'store'); //Para guardar
    Route::put('explo_general_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('explo_general_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Firmas_registroController::class)->group(function () {
    Route::get('firmas_registro', 'index'); //Para obtener todos
    Route::get('firmas_registro/{id}', 'show'); //Para consultar especifico
    Route::post('firmas_registro', 'store'); //Para guardar
    Route::put('firmas_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('firmas_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Historial_ubicacionesController::class)->group(function () {
    Route::get('historial_ubicaciones', 'index'); //Para obtener todos
    Route::get('historial_ubicaciones/{id}', 'show'); //Para consultar especifico
    Route::post('historial_ubicaciones', 'store'); //Para guardar
    Route::put('historial_ubicaciones/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('historial_ubicaciones/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(HospitalesgeneralController::class)->group(function () {
    Route::get('hospitalesgeneral', 'index'); //Para obtener todos
    Route::get('hospitalesgeneral/censos', 'censos'); //Para obtener todos
    Route::get('hospitalesgeneral/disponibilidades', 'disponibilidades'); //Para obtener todos
    Route::get('hospitalesgeneral/{id}', 'show'); //Para consultar especifico
    Route::post('hospitalesgeneral', 'store'); //Para guardar
    Route::put('hospitalesgeneral/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('hospitalesgeneral/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(ImagendxController::class)->group(function () {
    Route::get('imagendx', 'index'); //Para obtener todos
});

Route::controller(IncidentesController::class)->group(function () {
    Route::get('incidentes', 'index'); //Para obtener todos
    Route::get('incidentes/{id}', 'show'); //Para consultar especifico
    Route::post('incidentes', 'store'); //Para guardar
    Route::put('incidentes/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('incidentes/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(InsumosController::class)->group(function () {
    Route::get('insumos', 'index'); //Para obtener todos
    Route::get('insumos/{id}', 'show'); //Para consultar especifico
    Route::post('insumos', 'store'); //Para guardar
    Route::put('insumos/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('insumos/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Insumos_registroController::class)->group(function () {
    Route::get('insumos_registro', 'index'); //Para obtener todos
    Route::get('insumos_registro/{id}', 'show'); //Para consultar especifico
    Route::post('insumos_registro', 'store'); //Para guardar
    Route::put('insumos_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('insumos_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_accionController::class)->group(function () {
    Route::get('interh_accion', 'index'); //Para obtener todos
    Route::get('interh_accion/{id}', 'show'); //Para consultar especifico
    Route::post('interh_accion', 'store'); //Para guardar
    Route::put('interh_accion/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_accion/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_cierreController::class)->group(function () {
    Route::get('interh_cierre', 'index'); //Para obtener todos
    Route::get('interh_cierre/{id}', 'show'); //Para consultar especifico
    Route::post('interh_cierre', 'store'); //Para guardar
    Route::put('interh_cierre/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_cierre/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_estadoController::class)->group(function () {
    Route::get('interh_estado', 'index'); //Para obtener todos
    Route::get('interh_estado/{id}', 'show'); //Para consultar especifico
    Route::post('interh_estado', 'store'); //Para guardar
    Route::put('interh_estado/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_estado/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_evaluacionclinicaController::class)->group(function () {
    Route::get('interh_evaluacionclinica', 'index'); //Para obtener todos
    Route::get('interh_evaluacionclinica/{id}', 'show'); //Para consultar especifico
    Route::post('interh_evaluacionclinica', 'store'); //Para guardar
    Route::put('interh_evaluacionclinica/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_evaluacionclinica/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_maestroController::class)->group(function () {
    Route::get('interh_maestro', 'index'); //Para obtener todos
    Route::get('interh_maestro/habilitados', 'indexActivos'); //Para obtener todos los habilitados(no cerrados)
    Route::get('interh_maestro/{id}', 'show'); //Para consultar especifico
    Route::get('interh_maestro/{id}/hospitalorigen', 'verHospitalOrigen'); //Para consultar especifico
    Route::get('interh_maestro/{id}/hospitaldestino', 'verHospitalDestino'); //Para consultar especifico
    Route::get('interh_maestro/{id}/prioridad', 'verPrioridad'); //Para consultar especifico
    Route::get('interh_maestro/{id}/cierre', 'verCierre'); //Para consultar especifico
    Route::get('interh_maestro/{id}/tiposervicio', 'verTipoServicio'); //Para consultar especifico
    Route::get('interh_maestro/{id}/motivoatencion', 'verMotivoAtencion'); //Para consultar especifico
    Route::get('interh_maestro/{id}/accion', 'verAccion'); //Para consultar especifico
    Route::get('interh_maestro/{id}/pacientegeneral', 'verPacienteGeneral'); //Para consultar especifico
    Route::get('interh_maestro/{id}/evaluacion', 'verEvaluacion'); //Para consultar especifico
    Route::get('interh_maestro/{id}/seguimiento', 'verSeguimiento'); //Para consultar especifico
    Route::get('interh_maestro/{id}/servicioambulancia', 'verServicioAmbulancia'); //Para consultar especifico
    Route::post('interh_maestro', 'store'); //Para guardar
    Route::put('interh_maestro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_maestro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete

});

Route::controller(Interh_motivoatencionController::class)->group(function () {
    Route::get('interh_motivoatencion', 'index'); //Para obtener todos
    Route::get('interh_motivoatencion/{id}', 'show'); //Para consultar especifico
    Route::post('interh_motivoatencion', 'store'); //Para guardar
    Route::put('interh_motivoatencion/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_motivoatencion/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_prioridadController::class)->group(function () {
    Route::get('interh_prioridad', 'index'); //Para obtener todos
    Route::get('interh_prioridad/{id}', 'show'); //Para consultar especifico
    Route::post('interh_prioridad', 'store'); //Para guardar
    Route::put('interh_prioridad/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_prioridad/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_seguimientoController::class)->group(function () {
    Route::get('interh_seguimiento', 'index'); //Para obtener todos
    Route::get('interh_seguimiento/{id}', 'show'); //Para consultar especifico
    Route::post('interh_seguimiento', 'store'); //Para guardar
    Route::put('interh_seguimiento/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_seguimiento/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Interh_tiposervicioController::class)->group(function () {
    Route::get('interh_tiposervicio', 'index'); //Para obtener todos
    Route::get('interh_tiposervicio/{id}', 'show'); //Para consultar especifico
    Route::post('interh_tiposervicio', 'store'); //Para guardar
    Route::put('interh_tiposervicio/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('interh_tiposervicio/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Mante_ambController::class)->group(function () {
    Route::get('mante_amb', 'index'); //Para obtener todos
    Route::get('mante_amb/{id}', 'show'); //Para consultar especifico
    Route::get('mante_amb/{id}/taller', 'verTaller'); //Para consultar especifico
    Route::post('mante_amb', 'store'); //Para guardar
    Route::put('mante_amb/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('mante_amb/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Medicamentos_registroController::class)->group(function () {
    Route::get('medicamentos_registro', 'index'); //Para obtener todos
    Route::get('medicamentos_registro/{id}', 'show'); //Para consultar especifico
    Route::post('medicamentos_registro', 'store'); //Para guardar
    Route::put('medicamentos_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('medicamentos_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(MedicamentosController::class)->group(function () {
    Route::get('medicamentos', 'index'); //Para obtener todos
    Route::get('medicamentos/{id}', 'show'); //Para consultar especifico
    Route::post('medicamentos', 'store'); //Para guardar
    Route::put('medicamentos/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('medicamentos/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Modalidad_ambulanciaController::class)->group(function () {
    Route::get('modalidad_ambulancia', 'index'); //Para obtener todos
    Route::get('modalidad_ambulancia/{id}', 'show'); //Para consultar especifico
    Route::post('modalidad_ambulancia', 'store'); //Para guardar
    Route::put('modalidad_ambulancia/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('modalidad_ambulancia/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(MonitoreoController::class)->group(function () {
    Route::get('monitoreo', 'index'); //Para obtener todos
    Route::get('monitoreo/paciente', 'paciente'); //Para obtener todos
    Route::get('monitoreo/censo_camas', 'censoCamas'); //Para obtener todos
    Route::get('monitoreo/necesidades', 'necesidades'); //Para obtener todos
    Route::get('monitoreo/riesgos', 'riesgos'); //Para obtener todos
    Route::get('monitoreo/{id}', 'show'); //Para consultar especifico
    Route::post('monitoreo', 'store'); //Para guardar
    Route::put('monitoreo/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('monitoreo/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Motivo_salidaambController::class)->group(function () {
    Route::get('motivo_salidaamb', 'index'); //Para obtener todos
    Route::get('motivo_salidaamb/{id}', 'show'); //Para consultar especifico
    Route::post('motivo_salidaamb', 'store'); //Para guardar
    Route::put('motivo_salidaamb/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('motivo_salidaamb/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Nivel_hospitalController::class)->group(function () {
    Route::get('nivel_hospital', 'index'); //Para obtener todos
    Route::get('nivel_hospital/{id}', 'show'); //Para consultar especifico
    Route::post('nivel_hospital', 'store'); //Para guardar
    Route::put('nivel_hospital/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('nivel_hospital/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Obstetrico_registroController::class)->group(function () {
    Route::get('obstetrico_registro', 'index'); //Para obtener todos
    Route::get('obstetrico_registro/{id}', 'show'); //Para consultar especifico
    Route::post('obstetrico_registro', 'store'); //Para guardar
    Route::put('obstetrico_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('obstetrico_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(PacientegeneralController::class)->group(function () {
    Route::get('pacientegeneral', 'index'); //Para obtener todos
    Route::get('pacientegeneral/{id}', 'show'); //Para consultar especifico
    Route::get('pacientegeneral/{id}/tipo_id', 'verTipoId'); //Para consultar especifico
    Route::get('pacientegeneral/{id}/tipo_genero', 'verTipoGenero'); //Para consultar especifico
    Route::get('pacientegeneral/{id}/tipo_edad', 'verTipoEdad'); //Para consultar especifico
    Route::get('pacientegeneral/{id}/departamento', 'verDepartamento'); //Para consultar especifico
    Route::get('pacientegeneral/{id}/provincias', 'verProvincias'); //Para consultar especifico
    Route::get('pacientegeneral/{id}/distrito_reniec', 'verDistrito'); //Para consultar especifico
    Route::get('pacientegeneral/{id}/salasadmision', 'verSalasAdmision'); //Para consultar especifico
    Route::post('pacientegeneral', 'store'); //Para guardar
    Route::post('pacientegeneral/get_token', 'getToken'); //Para obtener el token
    Route::post('pacientegeneral/get_datos', 'getDatos'); //Para obtener los datos según una cédula dada
    Route::put('pacientegeneral/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('pacientegeneral/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Preh_cierreController::class)->group(function () {
    Route::get('preh_cierre', 'index'); //Para obtener todos
    Route::get('preh_cierre/{id}', 'show'); //Para consultar especifico
    Route::post('preh_cierre', 'store'); //Para guardar
    Route::put('preh_cierre/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('preh_cierre/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Preh_destinoController::class)->group(function () {
    Route::get('preh_destino', 'index'); //Para obtener todos
    Route::get('preh_destino/{id}', 'show'); //Para consultar especifico
    Route::post('preh_destino', 'store'); //Para guardar
    Route::put('preh_destino/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('preh_destino/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Preh_evaluacionclinicaController::class)->group(function () {
    Route::get('preh_evaluacionclinica', 'index'); //Para obtener todos
    Route::get('preh_evaluacionclinica/{id}', 'show'); //Para consultar especifico
    Route::post('preh_evaluacionclinica', 'store'); //Para guardar
    Route::put('preh_evaluacionclinica/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('preh_evaluacionclinica/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Preh_maestroController::class)->group(function () {
    Route::get('preh_maestro', 'index'); //Para obtener todos
    Route::get('preh_maestro/habilitados', 'indexActivos'); //Para obtener todos los habilitados(no cerrados)
    Route::get('preh_maestro/despacho', 'indexDespacho'); //Para obtener todos los habilitados de despacho
    Route::get('preh_maestro/{id}', 'show'); //Para consultar especifico
    Route::get('preh_maestro/{id}/incidentes', 'verIncidentes'); //Para consultar especifico
    Route::get('preh_maestro/{id}/prioridad', 'verPrioridad'); //Para consultar especifico
    Route::get('preh_maestro/{id}/cierre', 'verCierre'); //Para consultar especifico
    Route::get('preh_maestro/{id}/destino', 'verDestino'); //Para consultar especifico
    Route::get('preh_maestro/{id}/servicio_ambulancia', 'verServicioAmbulancia'); //Para consultar especifico
    Route::get('preh_maestro/{id}/seguimiento', 'verSeguimiento'); //Para consultar especifico
    Route::get('preh_maestro/{id}/evaluacionclinica', 'verEvaluacion'); //Para consultar especifico
    Route::get('preh_maestro/{id}/accion', 'verAccion'); //Para consultar especifico
    Route::get('preh_maestro/{id}/hospitalesgeneral', 'verHospital'); //Para consultar especifico
    Route::post('preh_maestro', 'store'); //Para guardar
    Route::put('preh_maestro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('preh_maestro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Preh_seguimientoController::class)->group(function () {
    Route::get('preh_seguimiento', 'index'); //Para obtener todos
    Route::get('preh_seguimiento/{id}', 'show'); //Para consultar especifico
    Route::post('preh_seguimiento', 'store'); //Para guardar
    Route::put('preh_seguimiento/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('preh_seguimiento/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Preh_servicio_ambulanciaController::class)->group(function () {
    Route::get('preh_servicio_ambulancia', 'index'); //Para obtener todos
    Route::get('preh_servicio_ambulancia/{id}', 'show'); //Para consultar especifico
    Route::post('preh_servicio_ambulancia', 'store'); //Para guardar
    Route::put('preh_servicio_ambulancia/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('preh_servicio_ambulancia/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(ProcedimientosController::class)->group(function () {
    Route::get('procedimientos', 'index'); //Para obtener todos
    Route::get('procedimientos/{id}', 'show'); //Para consultar especifico
    Route::post('procedimientos', 'store'); //Para guardar
    Route::put('procedimientos/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('procedimientos/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Procedimiento_registroController::class)->group(function () {
    Route::get('procedimiento_registro', 'index'); //Para obtener todos
    Route::get('procedimiento_registro/{id}', 'show'); //Para consultar especifico
    Route::post('procedimiento_registro', 'store'); //Para guardar
    Route::put('procedimiento_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('procedimiento_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Procedimiento_tiposController::class)->group(function () {
    Route::get('procedimiento_tipo', 'index'); //Para obtener todos
    Route::get('procedimiento_tipo/{id}', 'show'); //Para consultar especifico
    Route::post('procedimiento_tipo', 'store'); //Para guardar
    Route::put('procedimiento_tipo/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('procedimiento_tipo/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Provincias_reniecController::class)->group(function () {
    Route::get('provincias_reniec', 'index'); //Para obtener todos
    Route::get('provincias_reniec/{id}', 'show'); //Para consultar especifico
    Route::post('provincias_reniec', 'store'); //Para guardar
    Route::put('provincias_reniec/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('provincias_reniec/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(ProvinciasController::class)->group(function () {
    Route::get('provincias', 'index'); //Para obtener todos
    Route::get('provincias/{id}', 'show'); //Para consultar especifico
    Route::post('provincias', 'store'); //Para guardar
    Route::put('provincias/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('provincias/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Recordatorio_tallerController::class)->group(function () {
    Route::get('recordatorio_taller', 'index'); //Para obtener todos
    Route::get('recordatorio_taller/{id}', 'show'); //Para consultar especifico
    Route::post('recordatorio_taller', 'store'); //Para guardar
    Route::put('recordatorio_taller/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('recordatorio_taller/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Reg_ambulanciasController::class)->group(function () {
    Route::get('reg_ambulancias', 'index'); //Para obtener todos
    Route::get('reg_ambulancias/{id}', 'show'); //Para consultar especifico
    Route::post('reg_ambulancias', 'store'); //Para guardar
    Route::put('reg_ambulancias/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('reg_ambulancias/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_admissionController::class)->group(function () {
    Route::get('sala_admision', 'index'); //Para obtener todos
    Route::get('sala_admision/clasificacion', 'clasificacion'); //Para obtener todos
    Route::get('sala_admision/urgencias', 'urgencias'); //Para obtener todos
    Route::get('sala_admision/emergencias', 'emergencias'); //Para obtener todos
    Route::get('sala_admision/{id}', 'show'); //Para consultar especifico
    Route::get('sala_admision/{id}/motivoatencion', 'verMotivoAtencion'); //Para consultar especifico
    Route::get('sala_admision/{id}/signos', 'verSignos'); //Para consultar especifico
    Route::get('sala_admision/{id}/causatrauma', 'verCausa'); //Para consultar especifico
    Route::get('sala_admision/{id}/localizaciontrauma', 'verLocalizacion'); //Para consultar especifico
    Route::get('sala_admision/{id}/tipo_ingreso', 'verTipoIngreso'); //Para consultar especifico
    Route::get('sala_admision/{id}/paciente_general', 'verPacienteGeneral'); //Para consultar especifico
    Route::get('sala_admision/{id}/sala_atencionmedica', 'verSalaAtencionMedica'); //Para consultar especifico
    Route::post('sala_admision', 'store'); //Para guardar
    Route::put('sala_admision/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_admision/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_atencionmedica_examenController::class)->group(function () {
    Route::get('sala_atencionmedica_examen', 'index'); //Para obtener todos
    Route::get('sala_atencionmedica_examen/{id}', 'show'); //Para consultar especifico
    Route::post('sala_atencionmedica_examen', 'store'); //Para guardar
    Route::put('sala_atencionmedica_examen/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::post('sala_atencionmedica_examen/eliminar', 'eliminar'); //Para guardar
    Route::delete('sala_atencionmedica_examen/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_atencionmedica_medicamentosController::class)->group(function () {
    Route::get('sala_atencionmedica_medicamentos', 'index'); //Para obtener todos
    Route::get('sala_atencionmedica_medicamentos/{id}', 'show'); //Para consultar especifico
    Route::post('sala_atencionmedica_medicamentos', 'store'); //Para guardar
    Route::put('sala_atencionmedica_medicamentos/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::post('sala_atencionmedica_medicamentos/eliminar', 'eliminar'); //Para guardar
    Route::delete('sala_atencionmedica_medicamentos/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_atencionmedicaController::class)->group(function () {
    Route::get('sala_atencionmedica', 'index'); //Para obtener todos
    Route::get('sala_atencionmedica/{id}', 'show'); //Para consultar especifico
    Route::get('sala_atencionmedica/{id}/cie10', 'verCie10'); //Para consultar especifico
    Route::post('sala_atencionmedica', 'store'); //Para guardar
    Route::put('sala_atencionmedica/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_atencionmedica/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_causatraumaController::class)->group(function () {
    Route::get('sala_causatrauma', 'index'); //Para obtener todos
    Route::get('sala_causatrauma/{id}', 'show'); //Para consultar especifico
    Route::post('sala_causatrauma', 'store'); //Para guardar
    Route::put('sala_causatrauma/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_causatrauma/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_estadoaltaController::class)->group(function () {
    Route::get('sala_estadoalta', 'index'); //Para obtener todos
    Route::get('sala_estadoalta/{id}', 'show'); //Para consultar especifico
    Route::post('sala_estadoalta', 'store'); //Para guardar
    Route::put('sala_estadoalta/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_estadoalta/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_examenController::class)->group(function () {
    Route::get('sala_examen', 'index'); //Para obtener todos
    Route::get('sala_examen/{id}', 'show'); //Para consultar especifico
    Route::post('sala_examen', 'store'); //Para guardar
    Route::put('sala_examen/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_examen/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_localizaciontraumaController::class)->group(function () {
    Route::get('sala_localizaciontrauma', 'index'); //Para obtener todos
    Route::get('sala_localizaciontrauma/{id}', 'show'); //Para consultar especifico
    Route::post('sala_localizaciontrauma', 'store'); //Para guardar
    Route::put('sala_localizaciontrauma/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_localizaciontrauma/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_medicamentosController::class)->group(function () {
    Route::get('sala_medicamentos', 'index'); //Para obtener todos
    Route::get('sala_medicamentos/{id}', 'show'); //Para consultar especifico
    Route::post('sala_medicamentos', 'store'); //Para guardar
    Route::put('sala_medicamentos/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_medicamentos/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_motivoatencionController::class)->group(function () {
    Route::get('sala_motivoatencion', 'index'); //Para obtener todos
    Route::get('sala_motivoatencion/{id}', 'show'); //Para consultar especifico
    Route::post('sala_motivoatencion', 'store'); //Para guardar
    Route::put('sala_motivoatencion/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_motivoatencion/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_signosController::class)->group(function () {
    Route::get('sala_signos', 'index'); //Para obtener todos
    Route::get('sala_signos/{id}', 'show'); //Para consultar especifico
    Route::post('sala_signos', 'store'); //Para guardar
    Route::put('sala_signos/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_signos/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sala_sistemaController::class)->group(function () {
    Route::get('sala_sistema', 'index'); //Para obtener todos
    Route::get('sala_sistema/{id}', 'show'); //Para consultar especifico
    Route::post('sala_sistema', 'store'); //Para guardar
    Route::put('sala_sistema/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sala_sistema/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sector_hospitalController::class)->group(function () {
    Route::get('sector_hospital', 'index'); //Para obtener todos
    Route::get('sector_hospital/{id}', 'show'); //Para consultar especifico
    Route::post('sector_hospital', 'store'); //Para guardar
    Route::put('sector_hospital/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sector_hospital/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Sede_sismedController::class)->group(function () {
    Route::get('sede_sismed', 'index'); //Para obtener todos
    Route::get('sede_sismed/{id}', 'show'); //Para consultar especifico
    Route::post('sede_sismed', 'store'); //Para guardar
    Route::put('sede_sismed/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('sede_sismed/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Servicio_ambulanciaController::class)->group(function () {
    Route::get('servicio_ambulancia', 'index'); //Para obtener todos
    Route::get('servicio_ambulancia/{id}', 'show'); //Para consultar especifico
    Route::post('servicio_ambulancia', 'store'); //Para guardar
    Route::put('servicio_ambulancia/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('servicio_ambulancia/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Servicio_disponibilidadController::class)->group(function () {
    Route::get('servicio_disponibilidad', 'index'); //Para obtener todos
    Route::get('servicio_disponibilidad/{id}', 'show'); //Para consultar especifico
    Route::post('servicio_disponibilidad', 'store'); //Para guardar
    Route::put('servicio_disponibilidad/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('servicio_disponibilidad/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Servicios_divisionController::class)->group(function () {
    Route::get('servicios_division', 'index'); //Para obtener todos
    Route::get('servicios_division/{id}', 'show'); //Para consultar especifico
    Route::post('servicios_division', 'store'); //Para guardar
    Route::put('servicios_division/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('servicios_division/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Temp_camasController::class)->group(function () {
    Route::get('temp_camascontroller', 'index'); //Para obtener todos
    Route::get('temp_camascontroller/{id}', 'show'); //Para consultar especifico
    Route::post('temp_camascontroller', 'store'); //Para guardar
    Route::put('temp_camascontroller/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('temp_camascontroller/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(TerminosController::class)->group(function () {
    Route::get('terminos', 'index'); //Para obtener todos
    Route::get('terminos/{id}', 'show'); //Para consultar especifico
    Route::post('terminos', 'store'); //Para guardar
    Route::put('terminos/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('terminos/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_ambulanciaController::class)->group(function () {
    Route::get('tipo_ambulancia', 'index'); //Para obtener todos
    Route::get('tipo_ambulancia/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_ambulancia', 'store'); //Para guardar
    Route::put('tipo_ambulancia/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_ambulancia/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_cierrecasoController::class)->group(function () {
    Route::get('tipo_cierrecaso', 'index'); //Para obtener todos
    Route::get('tipo_cierrecaso/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_cierrecaso', 'store'); //Para guardar
    Route::put('tipo_cierrecaso/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_cierrecaso/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_edadController::class)->group(function () {
    Route::get('tipo_edad', 'index'); //Para obtener todos
    Route::get('tipo_edad/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_edad', 'store'); //Para guardar
    Route::put('tipo_edad/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_edad/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_generoController::class)->group(function () {
    Route::get('tipo_genero', 'index'); //Para obtener todos
    Route::get('tipo_genero/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_genero', 'store'); //Para guardar
    Route::put('tipo_genero/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_genero/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_idController::class)->group(function () {
    Route::get('tipo_id', 'index'); //Para obtener todos
    Route::get('tipo_id/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_id', 'store'); //Para guardar
    Route::put('tipo_id/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_id/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_ingresoController::class)->group(function () {
    Route::get('tipo_ingreso', 'index'); //Para obtener todos
    Route::get('tipo_ingreso/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_ingreso', 'store'); //Para guardar
    Route::put('tipo_ingreso/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_ingreso/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_llamadaController::class)->group(function () {
    Route::get('tipo_llamada', 'index'); //Para obtener todos
    Route::get('tipo_llamada/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_llamada', 'store'); //Para guardar
    Route::put('tipo_llamada/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_llamada/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Tipo_pacienteController::class)->group(function () {
    Route::get('tipo_paciente', 'index'); //Para obtener todos
    Route::get('tipo_paciente/{id}', 'show'); //Para consultar especifico
    Route::post('tipo_paciente', 'store'); //Para guardar
    Route::put('tipo_paciente/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('tipo_paciente/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Trauma_registroController::class)->group(function () {
    Route::get('trauma_registro', 'index'); //Para obtener todos
    Route::get('trauma_registro/{id}', 'show'); //Para consultar especifico
    Route::post('trauma_registro', 'store'); //Para guardar
    Route::put('trauma_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('trauma_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(TriageController::class)->group(function () {
    Route::get('triage', 'index'); //Para obtener todos
    Route::get('triage/{id}', 'show'); //Para consultar especifico
    Route::post('triage', 'store'); //Para guardar
    Route::put('triage/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('triage/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(Turno_registroController::class)->group(function () {
    Route::get('turno_registro', 'index'); //Para obtener todos
    Route::get('turno_registro/{id}', 'show'); //Para consultar especifico
    Route::post('turno_registro', 'store'); //Para guardar
    Route::put('turno_registro/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('turno_registro/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(UserlevelpermissionsController::class)->group(function () {
    Route::get('userlevelpermissions', 'index'); //Para obtener todos
    Route::get('userlevelpermissions/{id}', 'show'); //Para consultar especifico
    Route::post('userlevelpermissions', 'store'); //Para guardar
    Route::put('userlevelpermissions/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('userlevelpermissions/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
    Route::post('userlevelpermissions/destruir', 'destruir');
});

Route::controller(UserlevelsController::class)->group(function () {
    Route::get('userlevels', 'index'); //Para obtener todos
    Route::get('userlevels/{id}', 'show'); //Para consultar especifico
    Route::post('userlevels', 'store'); //Para guardar
    Route::put('userlevels/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('userlevels/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});

Route::controller(UsuariosController::class)->group(function () {
    Route::get('usuarios', 'index'); //Para obtener todos
    Route::post('loguear', 'logeado'); //manda el broadccast de q si se logueo
    Route::get('usuarios/DavidcomplicadoDeMiercoles', 'complej'); //Para obtener todos
    Route::get('usuarios/{id}', 'show'); //Para consultar especifico
    Route::post('usuarios', 'store'); //Para guardar
    Route::put('usuarios/cambiarpassword', 'cambiarpassword'); //Para actualizar//metodo cambiable a put
    Route::put('usuarios/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('usuarios/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete

});

Route::controller(WebservicesController::class)->group(function () {
    Route::get('webservices', 'index'); //Para obtener todos
    Route::get('webservices/{id}', 'show'); //Para consultar especifico
    Route::post('webservices', 'store'); //Para guardar
    Route::put('webservices/{id}', 'update'); //Para actualizar//metodo cambiable a put
    Route::delete('webservices/{id}/delete', 'destroy'); //Para eliminar un registro, cambiable a delete
});
