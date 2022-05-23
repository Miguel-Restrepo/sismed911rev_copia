<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recordatorio_taller extends Model
{
    use HasFactory;
    protected $table= "recordatorio_taller";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
