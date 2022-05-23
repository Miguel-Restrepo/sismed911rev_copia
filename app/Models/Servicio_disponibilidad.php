<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio_disponibilidad extends Model
{
    use HasFactory;
    protected $table= "servicio_disponibilidad";
    public $timestamps = false;//Evita columnas de actualizacion y creacion
    protected $primaryKey = 'servicio_disponabilidad';//Define id
     //protected $fillable= [''];//Especifica los campo a guardar
     protected $guarded= [];//especifica que quiere ignorar
}
