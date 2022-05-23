<?php

namespace App\Console;

use App\Events\CrearInterh;
use App\Events\InactividadInterh;
use App\Events\InactividadPreh;
use App\Events\recordatorios;
use App\Http\Controllers\Alerta_censoController;
use App\Http\Controllers\Interh_maestroController;
use App\Http\Controllers\Preh_maestroController;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            $controlInterh= new Interh_maestroController();
            $registrosInterH=$controlInterh->indexActivos();
            if(count($registrosInterH)>0){
                $cadena="";
                foreach ($registrosInterH as $post) {
                    event(new InactividadInterh($post->codigo, $post->fecha));
                }
                
            }
            $controlPreh= new Preh_maestroController();
            $registrosPreH=$controlPreh->indexActivos();
            if(count($registrosPreH)>0){
                $cadena="";
                foreach ($registrosPreH as $post) {
                    event(new InactividadPreh($post->codigo, $post->fecha));
                }
                
            }
            //METER ACA PASO DE EMERGENCIAS Y URGENCIAS
        })->everyTenMinutes();
        $schedule->call(function () {
            $recordatoriosControl= new Alerta_censoController();
            $recordatorios=$recordatoriosControl->obtenerProximosRecordatorios();
            if(count($recordatorios)>0){
                $cadena="";
                foreach ($recordatorios as $post) {
                    event(new recordatorios($post->texto_recordatorio));
                }
                
            }
            $notificaciones=$recordatoriosControl->obtenerProximosRecordatorios();
            if(count($notificaciones)>0){
                $cadena="";
                foreach ($notificaciones as $post) {
                    event(new recordatorios($post->texto_notificacion));
                }
                
            }
           
        })->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
